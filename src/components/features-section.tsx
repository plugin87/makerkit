import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const components = [
  { name: "Accordion", count: 2 },
  { name: "Alert", count: 2 },
  { name: "Aspect Ratio", count: 2 },
  { name: "Avatar", count: 2 },
  { name: "Badge", count: 2 },
  { name: "Breadcrumb", count: 2 },
  { name: "Button", count: 2 },
  { name: "Calendar", count: 2 },
  { name: "Card", count: 2 },
  { name: "Carousel", count: 2 },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm">
            <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">
              Free
            </Badge>
            <span className="text-muted-foreground">Block Components</span>
          </div>

          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Beautiful UI Components Built with ShadcnUI and Nextjs
          </h2>

          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            A Collection of Copy-and-paste components for building modern web
            applications. Built on top of ShadcnUI and TailwindCSS.
          </p>
        </div>

        {/* Component grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {components.map((component) => (
            <Link
              key={component.name}
              href="#"
              className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-foreground/20"
            >
              {/* Image placeholder */}
              <div className="aspect-[4/3] w-full bg-secondary" />

              {/* Card content */}
              <div className="px-3 py-3">
                <h3 className="text-sm font-semibold">{component.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {component.count} Components
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Button size="lg" className="px-8">
            Browse All Components
          </Button>
        </div>
      </div>
    </section>
  )
}
