import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-20">
        <div className="flex flex-col items-center text-center">
          {/* Pill badge */}
          <Link
            href="#"
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm transition-colors hover:bg-secondary"
          >
            <Badge variant="default" className="rounded-full px-2 py-0.5 text-xs">
              New
            </Badge>
            <span className="text-muted-foreground">
              The leading SaaS Starter Kit for ambitious developers
            </span>
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-[72px] lg:leading-[1.1]">
            The ultimate SaaS Starter{" "}
            <br className="hidden sm:block" />
            for your next project
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            Build and Ship a SaaS faster than ever before with the next-gen SaaS
            Starter Kit. Production-ready. Scalable. And easy to customize.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" className="px-8 text-base">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="px-8 text-base">
              Contact Us
            </Button>
          </div>

          {/* Hero image */}
          <div className="mt-16 w-full max-w-[1064px]">
            <div className="overflow-hidden rounded-2xl border-[8px] border-border/50 shadow-2xl">
              <Image
                src="/hero-banner.png"
                alt="Makerkit Dashboard"
                width={1064}
                height={600}
                className="w-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
