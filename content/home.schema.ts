import { z } from "zod"

const navLinkSchema = z.object({
  href: z.string(),
  label: z.string(),
})

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const siteMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
})

const siteSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  meta: siteMetaSchema,
})

const headerSchema = z.object({
  logoText: z.string(),
  primaryCta: ctaSchema,
  navLinks: z.array(navLinkSchema),
})

const heroSchema = z.object({
  heading: z.string(),
  subheading: z.string(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema,
  trustBullets: z.array(z.string()),
})

const metricSchema = z.object({
  value: z.string(),
  label: z.string(),
})

const socialProofSchema = z.object({
  metrics: z.array(metricSchema),
  selectedClientsLine: z.string(),
})

const serviceItemSchema = z.object({
  iconId: z.string(),
  title: z.string(),
  description: z.string(),
})

const servicesSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  items: z.array(serviceItemSchema),
})

const approachStepSchema = z.object({
  step: z.string(),
  title: z.string(),
  description: z.string(),
  outcomes: z.array(z.string()),
})

const approachSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  steps: z.array(approachStepSchema),
})

const caseStudySchema = z.object({
  type: z.string(),
  challenge: z.string(),
  solutionHeading: z.string(),
  solution: z.string(),
  resultHeading: z.string(),
  result: z.string(),
  details: z.string(),
  readMoreLabel: z.string(),
  closeLabel: z.string(),
})

const resultsSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  caseStudies: z.array(caseStudySchema),
})

const testimonialItemSchema = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
})

const testimonialsSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  items: z.array(testimonialItemSchema),
})

const pricingTierSchema = z.object({
  name: z.string(),
  price: z.string(),
  priceSuffix: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  ctaLabel: z.string(),
  ctaHref: z.string(),
  popular: z.boolean(),
})

const pricingSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  tiers: z.array(pricingTierSchema),
  footnote: z.string(),
})

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

const faqSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  items: z.array(faqItemSchema),
})

const contactDetailsSchema = z.object({
  email: z.string(),
  phone: z.string(),
  location: z.string(),
  hours: z.string(),
})

const selectOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
})

const checkboxOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
})

const formFieldSchema = z.object({
  fullName: z.object({ label: z.string(), placeholder: z.string() }),
  organisation: z.object({ label: z.string(), placeholder: z.string() }),
  email: z.object({ label: z.string(), placeholder: z.string() }),
  phone: z.object({ label: z.string(), placeholder: z.string() }),
  engagementType: z.object({
    label: z.string(),
    placeholder: z.string(),
    options: z.array(selectOptionSchema),
  }),
  budgetRange: z.object({
    label: z.string(),
    placeholder: z.string(),
    options: z.array(selectOptionSchema),
  }),
  areasOfInterest: z.object({
    label: z.string(),
    options: z.array(checkboxOptionSchema),
  }),
  message: z.object({
    label: z.string(),
    placeholder: z.string(),
  }),
  consent: z.object({
    label: z.string(),
  }),
})

const formSchema = z.object({
  successTitle: z.string(),
  successBody: z.string(),
  toastSuccess: z.string(),
  submitIdleLabel: z.string(),
  submitLoadingLabel: z.string(),
  fields: formFieldSchema,
})

const contactSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  details: contactDetailsSchema,
  form: formSchema,
})

const footerLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
})

const footerColumnSchema = z.object({
  title: z.string(),
  links: z.array(footerLinkSchema),
})

const socialLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
  iconId: z.string(),
})

const footerSchema = z.object({
  brandName: z.string(),
  brandBlurb: z.string(),
  columns: z.array(footerColumnSchema),
  socialLinks: z.array(socialLinkSchema),
})

export const HomeContentSchema = z.object({
  site: siteSchema,
  header: headerSchema,
  hero: heroSchema,
  socialProof: socialProofSchema,
  servicesSection: servicesSectionSchema,
  approachSection: approachSectionSchema,
  resultsSection: resultsSectionSchema,
  testimonialsSection: testimonialsSectionSchema,
  pricingSection: pricingSectionSchema,
  faqSection: faqSectionSchema,
  contactSection: contactSectionSchema,
  footer: footerSchema,
})

export type HomeContent = z.infer<typeof HomeContentSchema>
