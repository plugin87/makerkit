import Link from "next/link"

const footerSections = [
  {
    title: "About",
    links: [
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Product",
    links: [{ label: "Documentation", href: "#docs" }],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of License", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-[28px] font-bold tracking-tight">
              makerkit
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Build and Ship a SaaS faster than ever before with the next-gen
              SaaS Starter Kit.
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              &copy; Copyright {new Date().getFullYear()} Makerkit. All Rights
              Reserved.
            </p>
          </div>

          {/* Nav columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold">{section.title}</h3>
              <ul className="mt-3 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
