"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

// Alert variant styles matching Bootstrap 5 design
const alertVariants = {
  primary: {
    bg: "bg-[#cfe2ff]",
    border: "border-[#b6d4fe]",
    text: "text-[#084298]",
    link: "text-[#06357a]",
  },
  secondary: {
    bg: "bg-[#e2e3e5]",
    border: "border-[#d3d6d8]",
    text: "text-[#41464b]",
    link: "text-[#34383c]",
  },
  success: {
    bg: "bg-[#d1e7dd]",
    border: "border-[#badbcc]",
    text: "text-[#0f5132]",
    link: "text-[#0c4128]",
  },
  danger: {
    bg: "bg-[#f8d7da]",
    border: "border-[#f5c2c7]",
    text: "text-[#842029]",
    link: "text-[#6a1a21]",
  },
  warning: {
    bg: "bg-[#fff3cd]",
    border: "border-[#ffecb5]",
    text: "text-[#664d03]",
    link: "text-[#523e02]",
  },
  info: {
    bg: "bg-[#cff4fc]",
    border: "border-[#b6effb]",
    text: "text-[#055160]",
    link: "text-[#04414d]",
  },
  light: {
    bg: "bg-[#fefefe]",
    border: "border-[#fdfdfe]",
    text: "text-[#636464]",
    link: "text-[#4f5050]",
  },
  dark: {
    bg: "bg-[#d3d3d4]",
    border: "border-[#bcbebf]",
    text: "text-[#141619]",
    link: "text-[#101214]",
  },
};

type AlertVariant = keyof typeof alertVariants;

function Alert({
  variant,
  children,
  dismissible = false,
  onDismiss,
  className = "",
}: {
  variant: AlertVariant;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}) {
  const styles = alertVariants[variant];
  return (
    <div
      className={`relative rounded px-4 py-3 border ${styles.bg} ${styles.border} ${styles.text} ${className}`}
      role="alert"
    >
      {children}
      {dismissible && (
        <button
          type="button"
          className="absolute top-3 right-4 text-current opacity-50 hover:opacity-75 text-xl leading-none"
          onClick={onDismiss}
          aria-label="Close"
        >
          &times;
        </button>
      )}
    </div>
  );
}

function AlertLink({
  variant,
  href = "#",
  children,
}: {
  variant: AlertVariant;
  href?: string;
  children: React.ReactNode;
}) {
  const styles = alertVariants[variant];
  return (
    <a href={href} className={`font-bold underline ${styles.link}`}>
      {children}
    </a>
  );
}

export default function AlertsPage() {
  const [showLiveAlert, setShowLiveAlert] = useState(true);
  const [showDismissAlert, setShowDismissAlert] = useState(true);

  return (
    <div className="min-h-screen bg-white text-[#212529]">
      {/* Header */}
      <header className="bg-[#7952b3] text-white">
        <div className="mx-auto flex h-[60px] max-w-[960px] items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              fill="currentColor"
              viewBox="0 0 118 94"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
              />
            </svg>
            <span className="text-xl font-semibold">Bootstrap</span>
            <span className="ml-1 rounded bg-[#6a42a0] px-1.5 py-0.5 text-[10px] font-semibold">
              Design System
            </span>
          </div>
          <Link href="#" className="flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
            Document Link
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-[960px] px-6 py-12">
        {/* Title */}
        <h1 className="text-[2.5rem] font-medium leading-tight mb-2">Alerts</h1>
        <p className="text-[#6c757d] text-base mb-10">
          Provide contextual feedback messages for typical user actions with the handful of available
          and flexible alert messages.
        </p>

        {/* Examples */}
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-2">Examples</h2>
          <p className="text-sm text-[#212529] mb-4">
            Alerts are available for any length of text, as well as an optional close button. For
            proper styling, use one of the eight required contextual classes (e.g., .alert-success).
            For inline dismissal, use the alerts JavaScript plugin.
          </p>
          <div className="space-y-3">
            {(Object.keys(alertVariants) as AlertVariant[]).map((variant) => (
              <Alert key={variant} variant={variant}>
                A simple {variant} alert—check it out!
              </Alert>
            ))}
          </div>
        </section>

        {/* Accessibility tip */}
        <div className="mb-10 rounded border border-[#b6d4fe] bg-[#cfe2ff] p-4 text-[#084298]">
          <h6 className="font-bold mb-1">Accessibility tip:</h6>
          <p className="text-sm">
            Using color to add meaning only provides a visual indication, which will not be conveyed
            to users of assistive technologies – such as screen readers. Ensure that information
            denoted by the color is either obvious from the content itself (e.g. the visible text),
            or is included through alternative means, such as additional text hidden with the
            .visually-hidden class.
          </p>
        </div>

        {/* Live example */}
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-2">Live example</h2>
          <p className="text-sm text-[#212529] mb-4">
            Click the button below to show an alert (hidden with inline styles to start), then
            dismiss (and destroy) it with the built-in close button.
          </p>
          {showLiveAlert && (
            <Alert variant="primary" dismissible onDismiss={() => setShowLiveAlert(false)}>
              Nice, you triggered this alert message!
            </Alert>
          )}
          {!showLiveAlert && (
            <button
              className="mt-2 rounded bg-[#0d6efd] px-4 py-2 text-sm text-white hover:bg-[#0b5ed7]"
              onClick={() => setShowLiveAlert(true)}
            >
              Show live alert
            </button>
          )}
        </section>

        {/* Link color */}
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-2">Link color</h2>
          <p className="text-sm text-[#212529] mb-4">
            Use the .alert-link utility class to quickly provide matching colored links within any
            alert.
          </p>
          <div className="space-y-3">
            {(Object.keys(alertVariants) as AlertVariant[]).map((variant) => (
              <Alert key={variant} variant={variant}>
                A simple {variant} alert with{" "}
                <AlertLink variant={variant}>an example link</AlertLink>. Give it a click if you
                like.
              </Alert>
            ))}
          </div>
        </section>

        {/* Additional content */}
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-2">Additional content</h2>
          <p className="text-sm text-[#212529] mb-4">
            Alerts can also contain additional HTML elements like headings, paragraphs and dividers.
          </p>
          <Alert variant="success">
            <h4 className="text-xl font-bold mb-1">Well done!</h4>
            <p className="text-sm mb-3">
              Aww yeah, you successfully read this important alert message. This example text is
              going to run a bit longer so that you can see how spacing within an alert works with
              this kind of content.
            </p>
            <hr className="border-[#badbcc] my-3" />
            <p className="text-sm mb-0">
              Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
            </p>
          </Alert>
        </section>

        {/* Icons */}
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-2">Icons</h2>
          <p className="text-sm text-[#212529] mb-2">
            Similarly, you can use flexbox utilities and Bootstrap Icons to create alerts with icons.
            Depending on your icons and content, you may want to add more utilities or custom styles.
          </p>
          <div className="mb-4">
            <Alert variant="warning" className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
              <span>An example alert with an icon</span>
            </Alert>
          </div>
          <p className="text-sm text-[#212529] mb-4">
            Need more than one icon for your alerts? Consider using more Bootstrap Icons and making a
            local SVG sprite like so to easily reference the same icons repeatedly.
          </p>
          <div className="space-y-3">
            <Alert variant="primary" className="flex items-center gap-2">
              <InfoCircledIcon className="h-4 w-4 flex-shrink-0" />
              <span>An example alert with an icon</span>
            </Alert>
            <Alert variant="success" className="flex items-center gap-2">
              <CheckCircledIcon className="h-4 w-4 flex-shrink-0" />
              <span>An example success alert with an icon</span>
            </Alert>
            <Alert variant="warning" className="flex items-center gap-2">
              <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
              <span>An example warning alert with an icon</span>
            </Alert>
            <Alert variant="danger" className="flex items-center gap-2">
              <CrossCircledIcon className="h-4 w-4 flex-shrink-0" />
              <span>An example danger alert with an icon</span>
            </Alert>
          </div>
        </section>

        {/* Dismissing */}
        <section className="mb-10">
          <h2 className="text-2xl font-medium mb-2">Dismissing</h2>
          <p className="text-sm text-[#212529] mb-4">
            Using the alert JavaScript plugin, it&apos;s possible to dismiss any alert inline.
            Here&apos;s how:
          </p>
          <ul className="list-disc pl-6 text-sm text-[#212529] space-y-1 mb-4">
            <li>
              Be sure you&apos;ve loaded the alert plugin, or the compiled Bootstrap JavaScript.
            </li>
            <li>
              Add a close button and the .alert-dismissible class, which adds extra padding to the
              right of the alert and positions the close button.
            </li>
            <li>
              On the close button, add the data-bs-dismiss=&quot;alert&quot; attribute, which
              triggers the JavaScript functionality. Be sure to use the &lt;button&gt; element with
              it for proper behavior across all devices.
            </li>
            <li>
              To animate alerts when dismissing them, be sure to add the .fade and .show classes.
            </li>
          </ul>
          <p className="text-sm text-[#212529] mb-4">
            You can see this in action with a live demo:
          </p>
          {showDismissAlert && (
            <Alert
              variant="warning"
              dismissible
              onDismiss={() => setShowDismissAlert(false)}
            >
              Holy guacamole! You should check in on some of those fields below.
            </Alert>
          )}
          {!showDismissAlert && (
            <button
              className="mt-2 rounded bg-[#ffc107] px-4 py-2 text-sm text-[#212529] hover:bg-[#ffca2c]"
              onClick={() => setShowDismissAlert(true)}
            >
              Reset alert
            </button>
          )}

          <div className="mt-6 rounded border border-[#f5c2c7] bg-[#f8d7da] p-4 text-[#842029] text-sm">
            When an alert is dismissed, the element is completely removed from the page structure. If
            a keyboard user dismisses the alert using the close button, their focus will suddenly be
            lost and, depending on the browser, reset to the start of the page/document. For this
            reason, we recommend including additional JavaScript that listens for the closed.bs.alert
            event and programmatically sets focus() to the most appropriate location in the page. If
            you&apos;re planning to move focus to a non-interactive element that normally does not
            receive focus, make sure to add tabindex=&quot;-1&quot; to the element.
          </div>
        </section>

        {/* CSS */}
        <section className="mb-10">
          <h2 className="text-[2rem] font-medium mb-4">CSS</h2>

          <h3 className="text-xl font-medium mb-2">Variables</h3>
          <p className="text-sm text-[#212529] mb-4">
            As part of Bootstrap&apos;s evolving CSS variables approach, alerts now use local CSS
            variables on .alert for enhanced real-time customization. Values for the CSS variables
            are set via Sass, so Sass customization is still supported, too.
          </p>
          <div className="rounded bg-[#f8f9fa] border border-[#dee2e6] p-4 font-mono text-sm text-[#212529] overflow-x-auto">
            <pre className="whitespace-pre">{`--#{$prefix}alert-bg: transparent;
--#{$prefix}alert-padding-x: #{$alert-padding-x};
--#{$prefix}alert-padding-y: #{$alert-padding-y};
--#{$prefix}alert-margin-bottom: #{$alert-margin-bottom};
--#{$prefix}alert-color: inherit;
--#{$prefix}alert-border-color: transparent;
--#{$prefix}alert-border: #{$alert-border-width} solid var(--#{$prefix}alert-border-color);
--#{$prefix}alert-border-radius: #{$alert-border-radius};
--#{$prefix}alert-link-color: inherit;`}</pre>
          </div>
        </section>

        {/* Sass variables */}
        <section className="mb-10">
          <h3 className="text-xl font-medium mb-4">Sass variables</h3>
          <div className="overflow-x-auto rounded border border-[#dee2e6]">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["$alert-padding-y:", "$spacer;"],
                  ["$alert-padding-x:", "$spacer;"],
                  ["$alert-margin-bottom:", "1rem;"],
                  ["$alert-border-radius:", "var(--#{$prefix}border-radius);"],
                  ["$alert-link-font-weight:", "$font-weight-bold;"],
                  ["$alert-border-width:", "var(--#{$prefix}border-width);"],
                  [
                    "$alert-dismissible-padding-r:",
                    "$alert-padding-x * 3; // 3x covers width of x plus default padding on either side",
                  ],
                ].map(([variable, value], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f8f9fa]"}>
                    <td className="px-4 py-2 font-mono text-[#d63384]">{variable}</td>
                    <td className="px-4 py-2 font-mono">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
