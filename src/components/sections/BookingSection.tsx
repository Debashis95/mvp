import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { format, isBefore, startOfToday } from "date-fns"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Building2,
  Briefcase,
  DollarSign,
  MessageSquare,
  CheckCircle2,
  Copy,
  Video,
  CalendarPlus,
  Globe,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const bookingSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(1, "Company name is required"),
  projectType: z.string().min(1, "Select a project type"),
  startupStage: z.string().min(1, "Select startup stage"),
  meetingDate: z.date().refine((d) => !!d, { message: "Select a meeting date" }),
  meetingTime: z.string().min(1, "Select a meeting time"),
  timezone: z.string().min(1, "Select timezone"),
  budget: z.string().min(1, "Select budget range"),
  projectDescription: z.string().min(20, "Description must be at least 20 characters"),
})

type BookingForm = z.infer<typeof bookingSchema>

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM",
]

const timezones = [
  { value: "America/New_York", label: "EST (New York)" },
  { value: "America/Los_Angeles", label: "PST (Los Angeles)" },
  { value: "America/Chicago", label: "CST (Chicago)" },
  { value: "America/Denver", label: "MST (Denver)" },
  { value: "Europe/London", label: "GMT (London)" },
  { value: "Europe/Paris", label: "CET (Paris)" },
  { value: "Asia/Dubai", label: "GST (Dubai)" },
  { value: "Asia/Kolkata", label: "IST (India)" },
  { value: "Asia/Singapore", label: "SGT (Singapore)" },
  { value: "Australia/Sydney", label: "AEDT (Sydney)" },
]

interface SuccessData {
  meetLink: string
  meetingDate: string
  meetingTime: string
  timezone: string
}

function SuccessCard({ data, onReset }: { data: SuccessData; onReset: () => void }) {
  const [copied, setCopied] = useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(data.meetLink)
    setCopied(true)
    toast.success("Meeting link copied!")
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-500/20"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-foreground mb-2"
      >
        Meeting Scheduled Successfully!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground mb-8"
      >
        A confirmation email has been sent to your inbox.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card rounded-2xl p-6 mb-6 text-left space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Video className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Google Meet Link</p>
            <p className="text-sm font-medium text-primary truncate max-w-xs">{data.meetLink}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Meeting Date</p>
            <p className="text-sm font-medium text-foreground">{data.meetingDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-400/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Meeting Time</p>
            <p className="text-sm font-medium text-foreground">{data.meetingTime} • {data.timezone}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <Button
          size="lg"
          onClick={() => window.open(data.meetLink, "_blank")}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 glow-sm"
        >
          <Video className="w-4 h-4" />
          Open Google Meet
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={copyLink}
          className="border-border gap-2"
        >
          <Copy className="w-4 h-4" />
          {copied ? "Copied!" : "Copy Link"}
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={onReset}
          className="gap-2 text-muted-foreground"
        >
          <CalendarPlus className="w-4 h-4" />
          Book Another
        </Button>
      </motion.div>
    </motion.div>
  )
}

export function BookingSection() {
  const [step, setStep] = useState<"form" | "success">("form")
  const [successData, setSuccessData] = useState<SuccessData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      timezone: "America/New_York",
    },
  })

  const selectedDate = watch("meetingDate")
  const selectedTime = watch("meetingTime")

  const onSubmit = async (data: BookingForm) => {
    setIsLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"
      const response = await axios.post(`${apiUrl}/api/bookings`, {
        full_name: data.fullName,
        email: data.email,
        company_name: data.companyName,
        project_type: data.projectType,
        startup_stage: data.startupStage,
        meeting_date: format(data.meetingDate, "yyyy-MM-dd"),
        meeting_time: data.meetingTime,
        timezone: data.timezone,
        budget: data.budget,
        project_description: data.projectDescription,
      })

      setSuccessData({
        meetLink: response.data.meet_link || "https://meet.google.com/example-link",
        meetingDate: format(data.meetingDate, "MMMM d, yyyy"),
        meetingTime: data.meetingTime,
        timezone: timezones.find(t => t.value === data.timezone)?.label || data.timezone,
      })
      setStep("success")
    } catch {
      // For demo: show success with placeholder data
      setSuccessData({
        meetLink: "https://meet.google.com/demo-link-placeholder",
        meetingDate: format(data.meetingDate, "MMMM d, yyyy"),
        meetingTime: data.meetingTime,
        timezone: timezones.find(t => t.value === data.timezone)?.label || data.timezone,
      })
      setStep("success")
      toast.info("Demo mode: Backend not connected. Showing success preview.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    reset()
    setStep("form")
    setSuccessData(null)
  }

  return (
    <section id="booking" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,oklch(0.62_0.24_265/10%),transparent)]" />

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <CalendarPlus className="w-4 h-4" />
            Calendly-style booking
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-balance mb-4">
            Book{" "}
            <span className="gradient-text">Discovery Call</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium booking experience for calendar shorts and time to win in dis s at the calenddar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10"
        >
          <AnimatePresence mode="wait">
            {step === "success" && successData ? (
              <SuccessCard key="success" data={successData} onReset={handleReset} />
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Personal Info */}
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="fullName"
                        {...register("fullName")}
                        placeholder="John Doe"
                        className={`bg-background/50 border-border focus:border-primary ${errors.fullName ? "border-destructive" : ""}`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-destructive">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="john@company.com"
                        className={`bg-background/50 border-border focus:border-primary ${errors.email ? "border-destructive" : ""}`}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Project Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-sm font-medium flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        Company Name
                      </Label>
                      <Input
                        id="companyName"
                        {...register("companyName")}
                        placeholder="Acme Inc."
                        className={`bg-background/50 border-border ${errors.companyName ? "border-destructive" : ""}`}
                      />
                      {errors.companyName && (
                        <p className="text-xs text-destructive">{errors.companyName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Project Type</Label>
                      <Controller
                        name="projectType"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={`bg-background/50 border-border ${errors.projectType ? "border-destructive" : ""}`}>
                              <SelectValue placeholder="Project Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="web-app">Web Application</SelectItem>
                              <SelectItem value="mobile-app">Mobile Application</SelectItem>
                              <SelectItem value="saas">SaaS Platform</SelectItem>
                              <SelectItem value="ai-app">AI-Powered App</SelectItem>
                              <SelectItem value="marketplace">Marketplace</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.projectType && (
                        <p className="text-xs text-destructive">{errors.projectType.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Startup Stage</Label>
                      <Controller
                        name="startupStage"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={`bg-background/50 border-border ${errors.startupStage ? "border-destructive" : ""}`}>
                              <SelectValue placeholder="Startup Stage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="idea">Idea Stage</SelectItem>
                              <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                              <SelectItem value="seed">Seed</SelectItem>
                              <SelectItem value="series-a">Series A</SelectItem>
                              <SelectItem value="growth">Growth Stage</SelectItem>
                              <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.startupStage && (
                        <p className="text-xs text-destructive">{errors.startupStage.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        Estimated Budget
                      </Label>
                      <Controller
                        name="budget"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className={`bg-background/50 border-border ${errors.budget ? "border-destructive" : ""}`}>
                              <SelectValue placeholder="Budget Range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5k-10k">$5K – $10K</SelectItem>
                              <SelectItem value="10k-25k">$10K – $25K</SelectItem>
                              <SelectItem value="25k-50k">$25K – $50K</SelectItem>
                              <SelectItem value="50k-100k">$50K – $100K</SelectItem>
                              <SelectItem value="100k+">$100K+</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.budget && (
                        <p className="text-xs text-destructive">{errors.budget.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Schedule Meeting
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Calendar */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Select Date
                      </Label>
                      <div className="border border-border rounded-xl overflow-hidden bg-background/50">
                        <Controller
                          name="meetingDate"
                          control={control}
                          render={({ field }) => (
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                isBefore(date, startOfToday()) ||
                                date.getDay() === 0 ||
                                date.getDay() === 6
                              }
                              className="rounded-xl w-full"
                            />
                          )}
                        />
                      </div>
                      {errors.meetingDate && (
                        <p className="text-xs text-destructive mt-1">{errors.meetingDate.message}</p>
                      )}
                    </div>

                    {/* Time slots + timezone */}
                    <div className="space-y-5">
                      <div>
                        <Label className="text-sm font-medium mb-3 block flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          Available Time Slots
                          {selectedDate && (
                            <span className="text-primary font-normal">
                              — {format(selectedDate, "MMM d")}
                            </span>
                          )}
                        </Label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <motion.button
                              key={slot}
                              type="button"
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setValue("meetingTime", slot, { shouldValidate: true })}
                              className={`py-2.5 px-3 text-xs font-medium rounded-lg border transition-all duration-200 ${
                                selectedTime === slot
                                  ? "bg-primary text-primary-foreground border-primary glow-sm"
                                  : "border-border bg-background/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                              }`}
                            >
                              {slot}
                            </motion.button>
                          ))}
                        </div>
                        {errors.meetingTime && (
                          <p className="text-xs text-destructive mt-1">{errors.meetingTime.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5" />
                          Timezone
                        </Label>
                        <Controller
                          name="timezone"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="bg-background/50 border-border">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                {timezones.map((tz) => (
                                  <SelectItem key={tz.value} value={tz.value}>
                                    {tz.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <Label htmlFor="projectDescription" className="text-sm font-medium flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Project Description
                  </Label>
                  <Textarea
                    id="projectDescription"
                    {...register("projectDescription")}
                    placeholder="Tell us about your project, goals, and what you're looking to build..."
                    rows={4}
                    className={`bg-background/50 border-border resize-none ${errors.projectDescription ? "border-destructive" : ""}`}
                  />
                  {errors.projectDescription && (
                    <p className="text-xs text-destructive">{errors.projectDescription.message}</p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold py-6 text-base gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Scheduling your call...
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="w-5 h-5" />
                      Schedule Call
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
