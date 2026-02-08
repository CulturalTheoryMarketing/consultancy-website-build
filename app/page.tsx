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

import homeJson from "@/content/home.json"
import { HomeContentSchema, type HomeContent } from "@/content/home.schema"
import type { LucideIcon } from "lucide-react"
import { Logo } from "@/components/logo"

const content: HomeContent = HomeContentSchema.parse(homeJson)

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  heart: Heart,
  "message-square": MessageSquare,
  users: Users,
  palette: Palette,
  "bar-chart-3": BarChart3,
  linkedin: Linkedin,
  twitter: Twitter,
}
const getIcon = (id: string): LucideIcon => ICONS[id] ?? Compass

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
    toast.success(content.contactSection.form.toastSuccess)
    form.reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#" className="font-serif text-lg font-medium tracking-tight text-foreground">
            {content.header.logoText}
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {content.header.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="ml-4 rounded-xl">
              <a href={content.header.primaryCta.href}>{content.header.primaryCta.label}</a>
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
              {content.header.navLinks.map((link) => (
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
                <a href={content.header.primaryCta.href} onClick={() => setMobileMenuOpen(false)}>
                  {content.header.primaryCta.label}
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
                  {content.hero.heading}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">
                  {content.hero.subheading}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Button asChild size="lg" className="rounded-xl text-base">
                    <a href={content.hero.primaryCta.href}>{content.hero.primaryCta.label}</a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-xl text-base bg-transparent">
                    <a href={content.hero.secondaryCta.href}>{content.hero.secondaryCta.label}</a>
                  </Button>
                </div>
                <div className="mt-10 flex flex-wrap gap-6">
                  {content.hero.trustBullets.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 text-foreground" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abstract Card Stack */}
              <div className="relative hidden w-full lg:block" aria-hidden="true">
                <Logo backgroundcolor="#faf8f5" textcolor="black" primarycolor="#eb1588" />
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="border-y bg-secondary/50 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 sm:grid-cols-3 lg:gap-12">
              {content.socialProof.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <p className="font-serif text-3xl font-medium text-foreground">{metric.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {content.socialProof.selectedClientsLine}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id={content.servicesSection.id} className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.servicesSection.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {content.servicesSection.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {content.servicesSection.items.map((service) => {
                const Icon = getIcon(service.iconId)
                return (
                  <Card key={service.title} className="rounded-2xl border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-accent">
                        <Icon className="size-5 text-foreground" />
                      </div>
                      <CardTitle className="text-lg font-medium">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section id={content.approachSection.id} className="scroll-mt-20 bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.approachSection.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {content.approachSection.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-4">
              {content.approachSection.steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < content.approachSection.steps.length - 1 && (
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
        <section id={content.resultsSection.id} className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.resultsSection.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {content.resultsSection.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {content.resultsSection.caseStudies.map((study) => (
                <Card key={study.type} className="flex flex-col rounded-2xl border-0 bg-card shadow-sm">
                  <CardHeader>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {study.type}
                    </span>
                    <CardTitle className="mt-2 text-lg font-medium">Challenge</CardTitle>
                    <CardDescription className="text-sm">{study.challenge}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">{study.solutionHeading}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{study.solution}</p>
                    <div className="mt-4 rounded-xl bg-accent/50 p-4">
                      <p className="text-sm font-medium text-foreground">{study.resultHeading}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{study.result}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full rounded-xl">
                          {study.readMoreLabel}
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
                          <p className="text-sm font-medium text-foreground">{study.resultHeading}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{study.result}</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline" className="rounded-xl bg-transparent">{study.closeLabel}</Button>
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
        <section id={content.testimonialsSection.id} className="scroll-mt-20 bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.testimonialsSection.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {content.testimonialsSection.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {content.testimonialsSection.items.map((testimonial) => (
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
        <section id={content.pricingSection.id} className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.pricingSection.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {content.pricingSection.subtitle}
              </p>
            </div>
            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {content.pricingSection.tiers.map((tier) => (
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
                      <span className="text-sm text-muted-foreground">{tier.priceSuffix}</span>
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
                      <a href={tier.ctaHref}>{tier.ctaLabel}</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {content.pricingSection.footnote}
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id={content.faqSection.id} className="scroll-mt-20 bg-secondary/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                {content.faqSection.title}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                {content.faqSection.subtitle}
              </p>
            </div>
            <Accordion type="single" collapsible className="mt-12">
              {content.faqSection.items.map((faq, index) => (
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
        <section id={content.contactSection.id} className="scroll-mt-20 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Info */}
              <div>
                <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  {content.contactSection.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground text-pretty">
                  {content.contactSection.subtitle}
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="size-5" />
                    <span>{content.contactSection.details.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="size-5" />
                    <span>{content.contactSection.details.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="size-5" />
                    <span>{content.contactSection.details.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="size-5" />
                    <span>{content.contactSection.details.hours}</span>
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
                      <h3 className="mt-4 text-lg font-medium text-foreground">{content.contactSection.form.successTitle}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {content.contactSection.form.successBody}
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
                                <FormLabel>{content.contactSection.form.fields.fullName.label}</FormLabel>
                                <Input placeholder={content.contactSection.form.fields.fullName.placeholder} className="rounded-xl" {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="organisation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.contactSection.form.fields.organisation.label}</FormLabel>
                                <Input placeholder={content.contactSection.form.fields.organisation.placeholder} className="rounded-xl" {...field} />
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
                                <FormLabel>{content.contactSection.form.fields.email.label}</FormLabel>
                                <Input type="email" placeholder={content.contactSection.form.fields.email.placeholder} className="rounded-xl" {...field} />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{content.contactSection.form.fields.phone.label}</FormLabel>
                                <Input placeholder={content.contactSection.form.fields.phone.placeholder} className="rounded-xl" {...field} />
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
                                <FormLabel>{content.contactSection.form.fields.engagementType.label}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder={content.contactSection.form.fields.engagementType.placeholder} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {content.contactSection.form.fields.engagementType.options.map((opt) => (
                                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
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
                                <FormLabel>{content.contactSection.form.fields.budgetRange.label}</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger className="w-full rounded-xl">
                                    <SelectValue placeholder={content.contactSection.form.fields.budgetRange.placeholder} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {content.contactSection.form.fields.budgetRange.options.map((opt) => (
                                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
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
                              <FormLabel>{content.contactSection.form.fields.areasOfInterest.label}</FormLabel>
                              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {content.contactSection.form.fields.areasOfInterest.options.map((item) => (
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
                              <FormLabel>{content.contactSection.form.fields.message.label}</FormLabel>
                              <Textarea
                                placeholder={content.contactSection.form.fields.message.placeholder}
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
                                  {content.contactSection.form.fields.consent.label}
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
                          {isSubmitting ? content.contactSection.form.submitLoadingLabel : content.contactSection.form.submitIdleLabel}
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
                {content.footer.brandName}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {content.footer.brandBlurb}
              </p>
            </div>
            {content.footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-sm font-medium text-foreground">{col.title}</p>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {content.footer.brandName}. All rights reserved.
            </p>
            <div className="flex gap-4">
              {content.footer.socialLinks.map((link) => {
                const Icon = getIcon(link.iconId)
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label={link.label}
                  >
                    <Icon className="size-5" />
                  </a>
                )
              })}
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
