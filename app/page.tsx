"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import {
  ArrowUp,
  Menu,
  X,
  Compass,
  Heart,
  MessageSquare,
  Users,
  Palette,
  BarChart3,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Check,
  Linkedin,
  Twitter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Form schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  organisation: z.string().min(2, "Organisation name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  engagementType: z.string().min(1, "Please select an engagement type"),
  areasOfInterest: z.array(z.string()).optional(),
  budgetRange: z.string().min(1, "Please select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted",
  }),
})

type ContactFormData = z.infer<typeof contactFormSchema>

// Data
const services = [
  {
    icon: Compass,
    title: "Culture Strategy & Diagnosis",
    description: "Uncover what's working, what's not, and where your culture needs to evolve to support your goals.",
  },
  {
    icon: Heart,
    title: "Values, Behaviours & Rituals",
    description: "Define meaningful values and translate them into everyday behaviours and team rituals that stick.",
  },
  {
    icon: MessageSquare,
    title: "Leadership Comms & Narrative",
    description: "Craft authentic leadership communications that inspire trust and align your organisation.",
  },
  {
    icon: Users,
    title: "Employee Experience & Onboarding",
    description: "Design memorable onboarding and employee experiences that reinforce your culture from day one.",
  },
  {
    icon: Palette,
    title: "Brand Alignment Workshops",
    description: "Ensure your internal culture and external brand tell the same story, consistently.",
  },
  {
    icon: BarChart3,
    title: "Measurement & Culture Dashboards",
    description: "Build practical measurement frameworks to track culture health and demonstrate progress.",
  },
]

const approachSteps = [
  {
    step: "01",
    title: "Listen",
    description: "Deep discovery through interviews, surveys, and observation to understand your current state.",
    outcomes: ["Stakeholder interviews", "Culture pulse survey", "Document review", "Observation notes"],
  },
  {
    step: "02",
    title: "Diagnose",
    description: "Synthesise findings into clear themes, tensions, and opportunities for meaningful change.",
    outcomes: ["Culture diagnosis report", "Key themes & tensions", "Opportunity mapping", "Prioritisation framework"],
  },
  {
    step: "03",
    title: "Design",
    description: "Co-create practical solutions that fit your context, people, and business realities.",
    outcomes: ["Culture principles", "Behaviour frameworks", "Comms templates", "Ritual design"],
  },
  {
    step: "04",
    title: "Embed",
    description: "Support implementation with coaching, toolkits, and measurement to ensure lasting change.",
    outcomes: ["Rollout plan", "Leader coaching", "Implementation toolkit", "Progress tracking"],
  },
]

const caseStudies = [
  {
    type: "Seed-stage startup",
    challenge: "Founders struggled to articulate their culture as the team grew from 5 to 25 people.",
    solution: "Facilitated values workshops, created a culture playbook, and designed onboarding rituals.",
    result: "90% of new hires reported feeling \"deeply aligned\" with company values within 30 days.",
    details: "Working closely with the founding team over 4 weeks, we ran discovery interviews with all employees, facilitated a collaborative values workshop, and translated insights into a practical culture playbook. The playbook included daily rituals, meeting norms, and a structured onboarding programme that new hires now consistently praise.",
  },
  {
    type: "SME (80 employees)",
    challenge: "Leadership team communication felt inconsistent and was creating confusion across departments.",
    solution: "Developed a leadership narrative framework and trained senior leaders on consistent messaging.",
    result: "Employee understanding of company direction improved by 45% in quarterly surveys.",
    details: "The engagement began with a communication audit, identifying gaps between leadership intent and employee perception. We then co-created a narrative framework with the leadership team, including key messages, communication rhythms, and feedback loops. Monthly coaching sessions ensured the framework became embedded in how leaders showed up.",
  },
  {
    type: "Scale-up (200+ employees)",
    challenge: "Rapid growth had diluted the original culture; brand and internal experience felt misaligned.",
    solution: "Ran brand-culture alignment workshops and redesigned the employee experience journey.",
    result: "Glassdoor rating improved from 3.2 to 4.1 within 6 months.",
    details: "This comprehensive engagement involved cross-functional workshops bringing together marketing, HR, and operations leaders. We mapped the employee journey against brand promises, identified friction points, and co-designed improvements. The result was a unified experience where external brand and internal culture reinforced each other at every touchpoint.",
  },
]

const testimonials = [
  {
    quote: "Working with The Culture Consultancy was transformative. The diagnosis surfaced things we'd been avoiding, but the recommendations were practical and achievable.",
    name: "Sarah Chen",
    role: "CEO",
    company: "TechFlow",
  },
  {
    quote: "What I appreciated most was the lack of jargon. Clear thinking, clear actions, clear results. Exactly what we needed.",
    name: "Marcus Johnson",
    role: "Head of People",
    company: "Brightside Health",
  },
  {
    quote: "The values work has genuinely changed how our teams operate. It's not just words on a wall anymore—people actually reference them in conversations.",
    name: "Emma Williams",
    role: "Founder",
    company: "GreenLeaf Studios",
  },
  {
    quote: "Finally, a consultant who listens more than they talk. The insights were spot-on because they were built on genuine understanding of our context.",
    name: "David Park",
    role: "COO",
    company: "Nexus Partners",
  },
]

const pricingTiers = [
  {
    name: "Starter Session",
    price: "£750",
    description: "A focused session to tackle a specific culture challenge or question.",
    features: [
      "2-hour deep-dive session",
      "Pre-session briefing call",
      "Summary notes & recommendations",
      "30-day email follow-up",
    ],
    cta: "Enquire",
    popular: false,
  },
  {
    name: "Sprint",
    price: "£3,500",
    description: "A 2-week intensive to diagnose and design solutions for a specific area.",
    features: [
      "Discovery interviews (up to 8)",
      "Culture diagnosis report",
      "Co-design workshop",
      "Practical recommendations",
      "Implementation guidance",
    ],
    cta: "Enquire",
    popular: true,
  },
  {
    name: "Partner",
    price: "£7,500",
    description: "A 4-6 week engagement for comprehensive culture transformation.",
    features: [
      "Full discovery phase",
      "Comprehensive diagnosis",
      "Multiple design workshops",
      "Leadership coaching (3 sessions)",
      "Implementation toolkit",
      "Progress review checkpoint",
    ],
    cta: "Enquire",
    popular: false,
  },
]

const faqs = [
  {
    question: "What are typical engagement timelines?",
    answer: "Most engagements range from 2-6 weeks, depending on scope. Starter Sessions are single events, Sprints typically run for 2 weeks, and Partner engagements usually span 4-6 weeks. We'll agree on timelines before we start based on your specific needs.",
  },
  {
    question: "How do engagements work with a solo consultant?",
    answer: "You get direct access to senior expertise without the overhead of a large consultancy. I handle all discovery, design, and delivery personally—meaning consistent quality and no junior handoffs. For larger projects, I occasionally bring in trusted specialists, always with your agreement.",
  },
  {
    question: "Do you work remotely or on-site in the UK?",
    answer: "Both. I'm based in the UK and happy to work on-site for workshops and key meetings. Discovery interviews and ongoing support often work well remotely. We'll design the right mix for your context and preferences.",
  },
  {
    question: "What industries do you specialise in?",
    answer: "I've worked across tech, healthcare, professional services, and creative industries. Culture challenges share common patterns regardless of sector—what matters most is your willingness to engage honestly with the process.",
  },
  {
    question: "What do you need from us to start?",
    answer: "A discovery call to understand your context and goals, access to key stakeholders for interviews, and a primary point of contact. I'll provide a clear brief of what's needed once we agree on scope.",
  },
  {
    question: "How do you measure culture impact?",
    answer: "Measurement is tailored to your goals. This might include pulse surveys, engagement metrics, qualitative feedback, or business outcomes like retention and productivity. I'll help you define meaningful measures that make sense for your context.",
  },
  {
    question: "Is there a minimum contract?",
    answer: "No minimum contract. Starter Sessions are standalone. Larger engagements are scoped and priced individually based on your needs. If we're not the right fit, I'll tell you—there's no benefit in forcing an engagement.",
  },
  {
    question: "Can you support comms and brand alignment too?",
    answer: "Yes. Culture and brand are deeply connected. I help organisations ensure their internal culture and external brand tell the same story. This often involves working alongside your marketing or comms teams.",
  },
]

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#results", label: "Results" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
]

const areasOfInterestOptions = [
  { id: "culture-strategy", label: "Culture strategy" },
  { id: "values-behaviours", label: "Values & behaviours" },
  { id: "leadership-comms", label: "Leadership comms" },
  { id: "onboarding", label: "Onboarding" },
  { id: "brand-alignment", label: "Brand alignment" },
  { id: "measurement", label: "Measurement" },
]

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      organisation: "",
      email: "",
      phone: "",
      engagementType: "",
      areasOfInterest: [],
      budgetRange: "",
      message: "",
      consent: false,
    },
  })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSubmitted(true)
    toast.success("Thank you for your enquiry! I'll be in touch within 24 hours.")
    form.reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="font-serif text-lg font-medium tracking-tight text-foreground">
            The Culture Consultancy Co.
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="ml-4 rounded-xl">
              <a href="#contact">Book a call</a>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="border-t bg-background px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-2 rounded-xl">
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Book a call
                </a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="max-w-2xl">
                <h1 className="font-serif text-4xl font-medium leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  Culture isn't a perk. It's the strategy
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                  I help founders and leaders build healthy, high-performing organisations by aligning
                  culture, brand, and behaviour. Practical strategy, not fluffy theory.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="rounded-xl text-base">
                    <a href="#contact">Book a discovery call</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl text-base bg-transparent">
                    <a href="#services">Explore services</a>
                  </Button>
                </div>
                <div className="mt-10 flex flex-wrap gap-6">
                  {["Senior-led", "Practical playbooks", "Clear measurement"].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-foreground" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abstract Card Stack */}
              <div className="relative hidden h-96 lg:block" aria-hidden="true">
                <div className="absolute right-0 top-8 h-64 w-72 rotate-6 rounded-2xl bg-accent/50 shadow-lg" />
                <div className="absolute right-8 top-4 h-64 w-72 -rotate-3 rounded-2xl bg-secondary shadow-lg" />
                <div className="absolute right-16 top-0 h-64 w-72 rotate-1 rounded-2xl bg-card shadow-xl border">
                  <div className="p-6">
                    <div className="h-3 w-24 rounded-full bg-muted" />
                    <div className="mt-4 h-2 w-full rounded-full bg-muted" />
                    <div className="mt-2 h-2 w-3/4 rounded-full bg-muted" />
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <div className="h-12 rounded-lg bg-accent" />
                      <div className="h-12 rounded-lg bg-accent" />
                      <div className="h-12 rounded-lg bg-accent" />
                    </div>
                    <div className="mt-6 h-2 w-1/2 rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="border-y bg-secondary/50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-foreground">10+</p>
                <p className="mt-1 text-sm text-muted-foreground">Years experience</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-foreground">2–6</p>
                <p className="mt-1 text-sm text-muted-foreground">Week engagements</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl font-medium text-foreground">Remote + UK</p>
                <p className="mt-1 text-sm text-muted-foreground">Flexible delivery</p>
              </div>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Selected clients: Technology startups • Healthcare providers • Professional services • Creative agencies
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                How I can help
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Practical services at the intersection of culture, brand, and communications.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title} className="rounded-2xl border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent">
                      <service.icon className="size-5 text-foreground" />
                    </div>
                    <CardTitle className="text-lg font-medium">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section id="approach" className="scroll-mt-20 bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                My approach
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                A clear, collaborative process that respects your context and delivers practical outcomes.
              </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-4">
              {approachSteps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < approachSteps.length - 1 && (
                    <div className="absolute left-1/2 top-12 hidden h-px w-full bg-border lg:block" />
                  )}
                  <Card className="relative rounded-2xl border-0 bg-card shadow-sm">
                    <CardHeader>
                      <span className="font-serif text-4xl font-medium text-muted-foreground/30">
                        {step.step}
                      </span>
                      <CardTitle className="mt-2 text-xl font-medium">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                      <ul className="mt-4 space-y-1">
                        {step.outcomes.map((outcome) => (
                          <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="size-3" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results / Case Studies Section */}
        <section id="results" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Real results
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Examples of how culture work translates into meaningful change.
              </p>
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {caseStudies.map((study) => (
                <Card key={study.type} className="flex flex-col rounded-2xl border-0 bg-card shadow-sm">
                  <CardHeader>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {study.type}
                    </span>
                    <CardTitle className="mt-2 text-lg font-medium">Challenge</CardTitle>
                    <CardDescription className="text-sm">{study.challenge}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">What I did</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{study.solution}</p>
                    <div className="mt-4 rounded-xl bg-accent/50 p-4">
                      <p className="text-sm font-medium text-foreground">Result</p>
                      <p className="mt-1 text-sm text-muted-foreground">{study.result}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full rounded-xl">
                          Read more
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg rounded-2xl">
                        <DialogHeader>
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {study.type}
                          </span>
                          <DialogTitle className="mt-2">{study.challenge}</DialogTitle>
                          <DialogDescription className="mt-4 text-left leading-relaxed">
                            {study.details}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="rounded-xl bg-accent/50 p-4">
                          <p className="text-sm font-medium text-foreground">Result</p>
                          <p className="mt-1 text-sm text-muted-foreground">{study.result}</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className="rounded-xl bg-transparent">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="scroll-mt-20 bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                What clients say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Honest feedback from leaders who've worked with me.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="rounded-2xl border-0 bg-card shadow-sm">
                  <CardContent className="pt-6">
                    <blockquote className="text-base leading-relaxed text-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-accent">
                        <span className="text-sm font-medium text-foreground">
                          {testimonial.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Investment
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Clear pricing, no surprises. Choose the engagement that fits your needs.
              </p>
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl shadow-sm ${
                    tier.popular
                      ? "border-2 border-foreground bg-card"
                      : "border-0 bg-card"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">{tier.name}</CardTitle>
                    <div className="mt-2">
                      <span className="font-serif text-4xl font-medium text-foreground">
                        {tier.price}
                      </span>
                      <span className="text-sm text-muted-foreground"> starting from</span>
                    </div>
                    <CardDescription className="mt-2">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className={`w-full rounded-xl ${
                        tier.popular ? "" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      <a href="#contact">{tier.cta}</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Final pricing depends on scope and timeline. All engagements begin with a free discovery call.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-20 bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                Common questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Answers to things clients often ask before we start working together.
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Info */}
              <div>
                <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  {"Let's connect"}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground text-pretty">
                  Ready to explore how culture work could help your organisation? I'd love to hear
                  from you. Fill out the form or get in touch directly.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="size-5" />
                    <span>hello@thecultureconsultancy.co</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="size-5" />
                    <span>+44 (0) 7XXX XXXXXX</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="size-5" />
                    <span>United Kingdom</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="size-5" />
                    <span>Monday – Friday, 9am – 5pm</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <Card className="rounded-2xl border-0 bg-card shadow-sm">
                <CardContent className="pt-6">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="flex size-12 items-center justify-center rounded-full bg-accent">
                        <Check className="size-6 text-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-foreground">Thank you!</h3>
                      <p className="mt-2 text-muted-foreground">
                        I'll be in touch within 24 hours to arrange a discovery call.
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full name *</FormLabel>
                                <Input placeholder="Your name" className="rounded-xl" {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="organisation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Organisation *</FormLabel>
                                <Input placeholder="Company name" className="rounded-xl" {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <Input type="email" placeholder="you@company.com" className="rounded-xl" {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <Input placeholder="+44" className="rounded-xl" {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="engagementType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Engagement type *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="starter">Starter Session</SelectItem>
                                    <SelectItem value="sprint">Sprint</SelectItem>
                                    <SelectItem value="partner">Partner</SelectItem>
                                    <SelectItem value="not-sure">Not sure yet</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="budgetRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Budget range *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder="Select..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="under-1k">{"< £1k"}</SelectItem>
                                    <SelectItem value="1k-3k">£1k – £3k</SelectItem>
                                    <SelectItem value="3k-7k">£3k – £7k</SelectItem>
                                    <SelectItem value="7k-plus">£7k+</SelectItem>
                                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="areasOfInterest"
                          render={() => (
                            <FormItem>
                              <FormLabel>Areas of interest</FormLabel>
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {areasOfInterestOptions.map((item) => (
                                  <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="areasOfInterest"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={item.id}
                                          className="flex flex-row items-center gap-2 space-y-0"
                                        >
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...(field.value || []), item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item.id
                                                    )
                                                  )
                                            }}
                                          />
                                          <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                                            {item.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <Textarea
                                placeholder="Tell me a bit about your situation and what you're hoping to achieve..."
                                className="min-h-24 resize-none rounded-xl"
                                {...field}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="consent"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start gap-3 space-y-0">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-normal text-muted-foreground cursor-pointer">
                                  I agree to be contacted about my enquiry *
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full rounded-xl"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send enquiry"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-serif text-lg font-medium text-foreground">
                The Culture Consultancy Co.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Senior-led culture consultancy for founders and leaders.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Services</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground">
                    Culture Strategy
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground">
                    Values & Behaviours
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-muted-foreground hover:text-foreground">
                    Leadership Comms
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">About</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#approach" className="text-sm text-muted-foreground hover:text-foreground">
                    Approach
                  </a>
                </li>
                <li>
                  <a href="#results" className="text-sm text-muted-foreground hover:text-foreground">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Legal</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} The Culture Consultancy Co. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  )
}
