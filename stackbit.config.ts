import { defineStackbitConfig, type SiteMapEntry } from "@stackbit/types"
import { GitContentSource } from "@stackbit/cms-git"

const linkObjectFields = [
  { type: "string" as const, name: "label" },
  { type: "string" as const, name: "href" },
]

const homeModel = {
  name: "Home",
  type: "page" as const,
  urlPath: "/",
  filePath: "content/home.json",
  label: "Home",
  fields: [
    {
      type: "object" as const,
      name: "site",
      label: "Site",
      fields: [
        { type: "string" as const, name: "name" },
        { type: "string" as const, name: "tagline" },
        {
          type: "object" as const,
          name: "meta",
          fields: [
            { type: "string" as const, name: "title" },
            { type: "string" as const, name: "description" },
          ],
        },
      ],
    },
    {
      type: "object" as const,
      name: "header",
      label: "Header",
      fields: [
        { type: "string" as const, name: "logoText" },
        { type: "object" as const, name: "primaryCta", label: "Primary CTA", fields: linkObjectFields },
        {
          type: "list" as const,
          name: "navLinks",
          label: "Nav Links",
          items: { type: "object" as const, fields: linkObjectFields },
        },
      ],
    },
    {
      type: "object" as const,
      name: "hero",
      label: "Hero",
      fields: [
        { type: "string" as const, name: "heading" },
        { type: "text" as const, name: "subheading" },
        { type: "object" as const, name: "primaryCta", label: "Primary CTA", fields: linkObjectFields },
        { type: "object" as const, name: "secondaryCta", label: "Secondary CTA", fields: linkObjectFields },
        { type: "list" as const, name: "trustBullets", label: "Trust Bullets", items: { type: "string" as const } },
      ],
    },
    {
      type: "object" as const,
      name: "socialProof",
      label: "Social Proof",
      fields: [
        {
          type: "list" as const,
          name: "metrics",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "value" },
              { type: "string" as const, name: "label" },
            ],
          },
        },
        { type: "string" as const, name: "selectedClientsLine" },
      ],
    },
    {
      type: "object" as const,
      name: "servicesSection",
      label: "Services Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "string" as const, name: "subtitle" },
        {
          type: "list" as const,
          name: "items",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "iconId" },
              { type: "string" as const, name: "title" },
              { type: "text" as const, name: "description" },
            ],
          },
        },
      ],
    },
    {
      type: "object" as const,
      name: "approachSection",
      label: "Approach Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "string" as const, name: "subtitle" },
        {
          type: "list" as const,
          name: "steps",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "step" },
              { type: "string" as const, name: "title" },
              { type: "text" as const, name: "description" },
              { type: "list" as const, name: "outcomes", items: { type: "string" as const } },
            ],
          },
        },
      ],
    },
    {
      type: "object" as const,
      name: "resultsSection",
      label: "Results Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "string" as const, name: "subtitle" },
        {
          type: "list" as const,
          name: "caseStudies",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "type" },
              { type: "text" as const, name: "challenge" },
              { type: "string" as const, name: "solutionHeading" },
              { type: "text" as const, name: "solution" },
              { type: "string" as const, name: "resultHeading" },
              { type: "text" as const, name: "result" },
              { type: "text" as const, name: "details" },
              { type: "string" as const, name: "readMoreLabel" },
              { type: "string" as const, name: "closeLabel" },
            ],
          },
        },
      ],
    },
    {
      type: "object" as const,
      name: "testimonialsSection",
      label: "Testimonials Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "string" as const, name: "subtitle" },
        {
          type: "list" as const,
          name: "items",
          items: {
            type: "object" as const,
            fields: [
              { type: "text" as const, name: "quote" },
              { type: "string" as const, name: "name" },
              { type: "string" as const, name: "role" },
              { type: "string" as const, name: "company" },
            ],
          },
        },
      ],
    },
    {
      type: "object" as const,
      name: "pricingSection",
      label: "Pricing Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "string" as const, name: "subtitle" },
        {
          type: "list" as const,
          name: "tiers",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "name" },
              { type: "string" as const, name: "price" },
              { type: "string" as const, name: "priceSuffix" },
              { type: "text" as const, name: "description" },
              { type: "list" as const, name: "features", items: { type: "string" as const } },
              { type: "string" as const, name: "ctaLabel" },
              { type: "string" as const, name: "ctaHref" },
              { type: "boolean" as const, name: "popular" },
            ],
          },
        },
        { type: "string" as const, name: "footnote" },
      ],
    },
    {
      type: "object" as const,
      name: "faqSection",
      label: "FAQ Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "string" as const, name: "subtitle" },
        {
          type: "list" as const,
          name: "items",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "question" },
              { type: "text" as const, name: "answer" },
            ],
          },
        },
      ],
    },
    {
      type: "object" as const,
      name: "contactSection",
      label: "Contact Section",
      fields: [
        { type: "string" as const, name: "id" },
        { type: "string" as const, name: "title" },
        { type: "text" as const, name: "subtitle" },
        {
          type: "object" as const,
          name: "details",
          fields: [
            { type: "string" as const, name: "email" },
            { type: "string" as const, name: "phone" },
            { type: "string" as const, name: "location" },
            { type: "string" as const, name: "hours" },
          ],
        },
        {
          type: "object" as const,
          name: "form",
          fields: [
            { type: "string" as const, name: "successTitle" },
            { type: "text" as const, name: "successBody" },
            { type: "string" as const, name: "toastSuccess" },
            { type: "string" as const, name: "submitIdleLabel" },
            { type: "string" as const, name: "submitLoadingLabel" },
            {
              type: "object" as const,
              name: "fields",
              label: "Form Fields",
              fields: [
                { type: "object" as const, name: "fullName", fields: [{ type: "string" as const, name: "label" }, { type: "string" as const, name: "placeholder" }] },
                { type: "object" as const, name: "organisation", fields: [{ type: "string" as const, name: "label" }, { type: "string" as const, name: "placeholder" }] },
                { type: "object" as const, name: "email", fields: [{ type: "string" as const, name: "label" }, { type: "string" as const, name: "placeholder" }] },
                { type: "object" as const, name: "phone", fields: [{ type: "string" as const, name: "label" }, { type: "string" as const, name: "placeholder" }] },
                {
                  type: "object" as const,
                  name: "engagementType",
                  fields: [
                    { type: "string" as const, name: "label" },
                    { type: "string" as const, name: "placeholder" },
                    { type: "list" as const, name: "options", items: { type: "object" as const, fields: [{ type: "string" as const, name: "value" }, { type: "string" as const, name: "label" }] } },
                  ],
                },
                {
                  type: "object" as const,
                  name: "budgetRange",
                  fields: [
                    { type: "string" as const, name: "label" },
                    { type: "string" as const, name: "placeholder" },
                    { type: "list" as const, name: "options", items: { type: "object" as const, fields: [{ type: "string" as const, name: "value" }, { type: "string" as const, name: "label" }] } },
                  ],
                },
                {
                  type: "object" as const,
                  name: "areasOfInterest",
                  fields: [
                    { type: "string" as const, name: "label" },
                    { type: "list" as const, name: "options", items: { type: "object" as const, fields: [{ type: "string" as const, name: "id" }, { type: "string" as const, name: "label" }] } },
                  ],
                },
                { type: "object" as const, name: "message", fields: [{ type: "string" as const, name: "label" }, { type: "string" as const, name: "placeholder" }] },
                { type: "object" as const, name: "consent", fields: [{ type: "string" as const, name: "label" }] },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object" as const,
      name: "footer",
      label: "Footer",
      fields: [
        { type: "string" as const, name: "brandName" },
        { type: "string" as const, name: "brandBlurb" },
        {
          type: "list" as const,
          name: "columns",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "title" },
              {
                type: "list" as const,
                name: "links",
                items: { type: "object" as const, fields: linkObjectFields },
              },
            ],
          },
        },
        {
          type: "list" as const,
          name: "socialLinks",
          items: {
            type: "object" as const,
            fields: [
              { type: "string" as const, name: "label" },
              { type: "string" as const, name: "href" },
              { type: "string" as const, name: "iconId" },
            ],
          },
        },
      ],
    },
  ],
}

const gitContentSource = new GitContentSource({
  rootPath: __dirname,
  contentDirs: ["content"],
  models: [homeModel],
})

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  contentSources: [gitContentSource],
  siteMap: ({ documents }): SiteMapEntry[] => {
    // Map the Home model document (from content/home.json) to the root URL so the sitemap shows the home page
    const homeDoc = documents.find((doc) => doc.modelName === "Home")
    if (!homeDoc) return []
    return [{ urlPath: "/", document: homeDoc }]
  },
})
