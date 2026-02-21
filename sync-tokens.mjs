#!/usr/bin/env node

/**
 * Design Token Sync Script
 *
 * Reads token JSON files from /tokens directory and generates globals.css
 * Supports Figma Tokens Studio export format (DTCG) and simplified format.
 *
 * Usage:
 *   npm run sync-tokens              # Read local JSON files, generate CSS once
 *   npm run sync-tokens:watch        # Watch tokens/ for changes, auto-generate CSS
 */

import { readFileSync, writeFileSync, readdirSync, watch } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const TOKENS_DIR = resolve(ROOT, "tokens")
const CSS_FILE = resolve(ROOT, "app/globals.css")

// --- Color conversion: hex → oklch ---

function hexToOklch(hex, alpha = 1.0) {
  hex = hex.replace("#", "")
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const toLinear = (c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  const rl = toLinear(r),
    gl = toLinear(g),
    bl = toLinear(b)

  const x = 0.4124564 * rl + 0.3575761 * gl + 0.1804375 * bl
  const y = 0.2126729 * rl + 0.7151522 * gl + 0.072175 * bl
  const z = 0.0193339 * rl + 0.119192 * gl + 0.9503041 * bl

  const cbrt = (v) => (v >= 0 ? v ** (1 / 3) : -((-v) ** (1 / 3)))
  const l = cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m = cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s = cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z)

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
  const bVal = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s

  const C = Math.sqrt(a ** 2 + bVal ** 2)
  const h = ((Math.atan2(bVal, a) * 180) / Math.PI + 360) % 360

  let result
  if (C < 0.002) {
    result = `oklch(${L.toFixed(3)} 0 0`
  } else {
    result = `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${h.toFixed(3)}`
  }

  if (alpha < 1.0) {
    result += ` / ${Math.round(alpha * 100)}%)`
  } else {
    result += ")"
  }

  return result
}

// --- Parse token file ---

function parseTokenFile(filePath) {
  const raw = JSON.parse(readFileSync(filePath, "utf-8"))
  const tokens = {}

  for (const [key, value] of Object.entries(raw)) {
    if (key === "$extensions" || key === "$type") continue
    if (!value || !value.$value) continue

    let hex, alpha
    if (typeof value.$value === "object" && value.$value.hex) {
      hex = value.$value.hex
      alpha = value.$value.alpha ?? 1.0
    } else if (
      typeof value.$value === "string" &&
      value.$value.startsWith("#")
    ) {
      hex = value.$value
      alpha = 1.0
    } else {
      continue
    }

    tokens[key] = { hex, alpha, oklch: hexToOklch(hex, alpha) }
  }

  const modeName = raw.$extensions?.["com.figma.modeName"] ?? null
  return { tokens, modeName }
}

// --- CSS variable ordering (matches shadcn convention) ---

const CSS_VAR_ORDER = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]

function generateCssBlock(tokens) {
  const lines = []
  for (const name of CSS_VAR_ORDER) {
    if (tokens[name]) {
      lines.push(`  --${name}: ${tokens[name].oklch};`)
    }
  }
  for (const name of Object.keys(tokens)) {
    if (!CSS_VAR_ORDER.includes(name)) {
      lines.push(`  --${name}: ${tokens[name].oklch};`)
    }
  }
  return lines.join("\n")
}

// --- Generate globals.css ---

function generateCss(modeMap) {
  const light = modeMap["light"]
  const dark = modeMap["dark"]

  // Collect extra modes (not light/dark)
  const extraModes = Object.keys(modeMap).filter(
    (k) => k !== "light" && k !== "dark"
  )

  const customVariants = ["@custom-variant dark (&:is(.dark *));"]
  for (const mode of extraModes) {
    customVariants.push(`@custom-variant ${mode} (&:is(.${mode} *));`)
  }

  let css = `@import "tailwindcss";
@import "tw-animate-css";

${customVariants.join("\n")}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
}

:root {
  --radius: 0.625rem;
${light ? generateCssBlock(light) : "  /* No light tokens found */"}
}

.dark {
${dark ? generateCssBlock(dark) : "  /* No dark tokens found */"}
}
`

  for (const mode of extraModes) {
    css += `
.${mode} {
${generateCssBlock(modeMap[mode])}
}
`
  }

  css += `
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`

  return css
}

// --- Read all token files and generate CSS ---

function syncOnce() {
  const files = readdirSync(TOKENS_DIR).filter((f) =>
    f.endsWith(".tokens.json")
  )

  if (files.length === 0) {
    console.error("No .tokens.json files found in /tokens directory")
    process.exit(1)
  }

  const modeMap = {}
  for (const file of files) {
    const filePath = resolve(TOKENS_DIR, file)
    const { tokens, modeName } = parseTokenFile(filePath)
    const key = (modeName || file.replace(".tokens.json", "")).toLowerCase()
    modeMap[key] = tokens
    console.log(
      `  Read ${file} → "${key}" mode (${Object.keys(tokens).length} tokens)`
    )
  }

  console.log(`  Modes: ${Object.keys(modeMap).join(", ")}`)

  const css = generateCss(modeMap)
  writeFileSync(CSS_FILE, css)
  console.log(`  Generated → app/globals.css`)
  return modeMap
}

// --- Watch mode ---

function startWatch() {
  console.log("Watching tokens/ for changes...\n")
  syncOnce()
  console.log()

  let debounce = null
  watch(TOKENS_DIR, { recursive: false }, (_eventType, filename) => {
    if (!filename?.endsWith(".tokens.json")) return
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(() => {
      const time = new Date().toLocaleTimeString()
      console.log(`[${time}] ${filename} changed`)
      try {
        syncOnce()
      } catch (err) {
        console.error("  Error:", err.message)
      }
      console.log()
    }, 300)
  })

  console.log("Press Ctrl+C to stop.\n")
}

// --- Main ---

function main() {
  const isWatch = process.argv.includes("--watch")

  if (isWatch) {
    startWatch()
  } else {
    syncOnce()
    console.log("Done!")
  }
}

main()
