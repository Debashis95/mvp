from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import os
import re

from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
import resend

app = FastAPI(title="MVP Engineering Studio API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173"), "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

resend.api_key = os.getenv("RESEND_API_KEY", "")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "owner@mvpengineering.studio")
GOOGLE_CALENDAR_ID = os.getenv("GOOGLE_CALENDAR_ID", "primary")


class BookingRequest(BaseModel):
    full_name: str
    email: EmailStr
    company_name: str
    project_type: str
    startup_stage: str
    meeting_date: str  # YYYY-MM-DD
    meeting_time: str  # e.g. "10:00 AM"
    timezone: str
    budget: str
    project_description: str


class BookingResponse(BaseModel):
    success: bool
    message: str
    meet_link: str
    event_id: str


def get_google_calendar_service():
    creds = Credentials(
        token=None,
        refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
        client_id=os.getenv("GOOGLE_CLIENT_ID"),
        client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
        token_uri="https://oauth2.googleapis.com/token",
    )
    return build("calendar", "v3", credentials=creds)


def parse_meeting_time(date_str: str, time_str: str):
    """Parse meeting date/time strings into datetime objects."""
    time_map = {
        "09:00 AM": "09:00", "10:00 AM": "10:00", "11:00 AM": "11:00",
        "12:00 PM": "12:00", "01:00 PM": "13:00", "02:00 PM": "14:00",
        "03:00 PM": "15:00", "04:00 PM": "16:00", "05:00 PM": "17:00",
    }
    time_24 = time_map.get(time_str, "10:00")
    start_dt = datetime.strptime(f"{date_str} {time_24}", "%Y-%m-%d %H:%M")
    end_dt = start_dt + timedelta(hours=1)
    return start_dt, end_dt


def send_client_confirmation_email(booking: BookingRequest, meet_link: str):
    html = f"""
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0f; color: #e5e7eb; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 12px 24px; border-radius: 12px; color: white; font-weight: 700; font-size: 18px;">
            🚀 MVP Engineering Studio
          </div>
        </div>

        <div style="background: #13131a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; margin-bottom: 24px;">
          <h1 style="color: #fff; font-size: 24px; font-weight: 700; margin: 0 0 8px 0;">Meeting Scheduled! ✅</h1>
          <p style="color: #9ca3af; margin: 0 0 24px 0;">Hi {booking.full_name}, your discovery call has been confirmed.</p>

          <div style="background: #1a1a2e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
            <div style="margin-bottom: 12px;">
              <span style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Date</span>
              <p style="color: #fff; font-weight: 600; margin: 4px 0 0 0;">{booking.meeting_date}</p>
            </div>
            <div style="margin-bottom: 12px;">
              <span style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Time</span>
              <p style="color: #fff; font-weight: 600; margin: 4px 0 0 0;">{booking.meeting_time} ({booking.timezone})</p>
            </div>
            <div>
              <span style="color: #9ca3af; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Google Meet Link</span>
              <p style="margin: 4px 0 0 0;"><a href="{meet_link}" style="color: #6366f1; font-weight: 600; text-decoration: none;">{meet_link}</a></p>
            </div>
          </div>

          <a href="{meet_link}" style="display: block; text-align: center; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 16px;">
            Join Google Meet
          </a>
        </div>

        <p style="text-align: center; color: #6b7280; font-size: 14px;">
          MVP Engineering Studio · <a href="mailto:{OWNER_EMAIL}" style="color: #6366f1; text-decoration: none;">{OWNER_EMAIL}</a>
        </p>
      </div>
    </body>
    </html>
    """

    resend.Emails.send({
        "from": f"MVP Engineering Studio <noreply@{os.getenv('RESEND_DOMAIN', 'mvpengineering.studio')}>",
        "to": booking.email,
        "subject": f"Your Discovery Call is Confirmed — {booking.meeting_date} at {booking.meeting_time}",
        "html": html,
    })


def send_studio_notification_email(booking: BookingRequest, meet_link: str):
    html = f"""
    <!DOCTYPE html>
    <html>
    <body style="font-family: sans-serif; background: #0a0a0f; color: #e5e7eb; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background: #13131a; border-radius: 16px; padding: 32px; border: 1px solid rgba(255,255,255,0.08);">
        <h1 style="color: #6366f1; margin-top: 0;">New Discovery Call Booked 🎉</h1>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #9ca3af; width: 140px;">Client Name</td><td style="color: #fff; font-weight: 600;">{booking.full_name}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Email</td><td style="color: #fff;">{booking.email}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Company</td><td style="color: #fff;">{booking.company_name}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Project Type</td><td style="color: #fff;">{booking.project_type}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Startup Stage</td><td style="color: #fff;">{booking.startup_stage}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Meeting Date</td><td style="color: #fff; font-weight: 600;">{booking.meeting_date}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Meeting Time</td><td style="color: #fff; font-weight: 600;">{booking.meeting_time} ({booking.timezone})</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Budget</td><td style="color: #10b981; font-weight: 600;">{booking.budget}</td></tr>
          <tr><td style="padding: 8px 0; color: #9ca3af;">Meet Link</td><td><a href="{meet_link}" style="color: #6366f1;">{meet_link}</a></td></tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #1a1a2e; border-radius: 8px;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Project Description</p>
          <p style="color: #e5e7eb; margin: 0;">{booking.project_description}</p>
        </div>
      </div>
    </body>
    </html>
    """

    resend.Emails.send({
        "from": f"MVP Engineering Studio <noreply@{os.getenv('RESEND_DOMAIN', 'mvpengineering.studio')}>",
        "to": OWNER_EMAIL,
        "subject": f"[New Booking] {booking.full_name} — {booking.meeting_date} at {booking.meeting_time}",
        "html": html,
    })


@app.post("/api/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingRequest):
    try:
        service = get_google_calendar_service()
        start_dt, end_dt = parse_meeting_time(booking.meeting_date, booking.meeting_time)

        event = {
            "summary": f"Discovery Call — {booking.full_name} ({booking.company_name})",
            "description": (
                f"Client: {booking.full_name}\n"
                f"Email: {booking.email}\n"
                f"Company: {booking.company_name}\n"
                f"Project Type: {booking.project_type}\n"
                f"Startup Stage: {booking.startup_stage}\n"
                f"Budget: {booking.budget}\n\n"
                f"Project Description:\n{booking.project_description}"
            ),
            "start": {
                "dateTime": start_dt.isoformat(),
                "timeZone": booking.timezone,
            },
            "end": {
                "dateTime": end_dt.isoformat(),
                "timeZone": booking.timezone,
            },
            "attendees": [{"email": booking.email}],
            "conferenceData": {
                "createRequest": {
                    "requestId": f"mvp-{booking.email}-{booking.meeting_date}",
                    "conferenceSolutionKey": {"type": "hangoutsMeet"},
                }
            },
            "reminders": {
                "useDefault": False,
                "overrides": [
                    {"method": "email", "minutes": 60},
                    {"method": "popup", "minutes": 15},
                ],
            },
        }

        created_event = service.events().insert(
            calendarId=GOOGLE_CALENDAR_ID,
            body=event,
            conferenceDataVersion=1,
            sendUpdates="all",
        ).execute()

        meet_link = (
            created_event.get("conferenceData", {})
            .get("entryPoints", [{}])[0]
            .get("uri", "https://meet.google.com")
        )

        # Send emails
        try:
            send_client_confirmation_email(booking, meet_link)
            send_studio_notification_email(booking, meet_link)
        except Exception as email_err:
            print(f"Email error (non-fatal): {email_err}")

        return BookingResponse(
            success=True,
            message="Meeting scheduled successfully",
            meet_link=meet_link,
            event_id=created_event["id"],
        )

    except Exception as e:
        print(f"Booking error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "ok", "service": "MVP Engineering Studio API"}
