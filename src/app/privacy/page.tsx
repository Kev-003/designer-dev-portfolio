// app/privacy/page.tsx
// Route: /privacy

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kevern",
  description:
    "How this site handles (or rather, doesn't handle) your personal data.",
  robots: { index: true, follow: true },
};

const EFFECTIVE_DATE = "June 05 2025";
const CONTACT_EMAIL = "kevern.design@gmail.com";
const SITE_URL = "https://designer-dev-portfolio.kevern920.workers.dev";

// ─── Third-party table data ────────────────────────────────────────────────────

const thirdParties = [
  {
    platform: "GitHub",
    purpose: "Source code & project repositories",
    url: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
    label: "github.com/privacy",
  },
  {
    platform: "LinkedIn",
    purpose: "Professional profile",
    url: "https://www.linkedin.com/legal/privacy-policy",
    label: "linkedin.com/legal/privacy-policy",
  },
  {
    platform: "Facebook",
    purpose: "Social profile",
    url: "https://www.facebook.com/privacy/policy/",
    label: "facebook.com/privacy/policy",
  },
  {
    platform: "Instagram",
    purpose: "Creative work & social presence",
    url: "https://privacycenter.instagram.com/policy/",
    label: "privacycenter.instagram.com",
  },
];

// ─── Rights list ──────────────────────────────────────────────────────────────

const rights = [
  {
    title: "Right to be informed",
    desc: "You have the right to know how your data is being used. This document fulfills that obligation.",
  },
  {
    title: "Right of access",
    desc: "You may request a copy of any personal data I hold about you.",
  },
  {
    title: "Right to rectification",
    desc: "You may request correction of inaccurate personal data.",
  },
  {
    title: "Right to erasure",
    desc: "You may request deletion of your personal data, subject to legitimate retention obligations.",
  },
  {
    title: "Right to object",
    desc: "You may object to the processing of your personal data.",
  },
  {
    title: "Right to data portability",
    desc: "You may request your data in a structured, machine-readable format.",
  },
];

// ─── TOC ──────────────────────────────────────────────────────────────────────

const toc = [
  { id: "overview", index: "00", heading: "Overview" },
  {
    id: "data-collected",
    index: "01",
    heading: "Data Collected — And By Whom",
  },
  { id: "cookies", index: "02", heading: "Cookies & Local Storage" },
  {
    id: "third-parties",
    index: "03",
    heading: "Third-Party Links & Social Platforms",
  },
  { id: "legal-basis", index: "04", heading: "Legal Basis for Processing" },
  { id: "your-rights", index: "05", heading: "Your Rights" },
  { id: "children", index: "06", heading: "Children's Privacy" },
  { id: "changes", index: "07", heading: "Changes to This Policy" },
  { id: "contact", index: "08", heading: "Contact" },
];

// ─── Shared sub-component classes ─────────────────────────────────────────────
// Keeping these as constants avoids repetition while staying Tailwind-only.

const sectionWrap =
  "grid grid-cols-[3rem_1fr] gap-x-8 py-12 border-t border-white/[0.06] max-sm:grid-cols-1 max-sm:gap-y-2";

const sectionIndex = "font-mono text-[0.65rem] opacity-25 tracking-wide pt-1";

const sectionHeading = "text-lg font-normal tracking-tight mb-5";

const prose =
  "text-sm leading-relaxed text-zinc-400 space-y-4 [&_strong]:font-medium [&_strong]:text-brand";

const inlineLink =
  "underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity";

const inlineCode =
  "font-mono text-[0.8em] bg-white/[0.06] px-1.5 py-0.5 rounded-sm";

const subHeading =
  "font-mono text-[0.7rem] tracking-[0.12em] uppercase text-zinc-500 mt-7 mb-2";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-24 mx-auto max-w-4xl">
      {/* ── Header ── */}
      <header className="mb-16 pb-12 border-b border-white/[0.08]">
        <p className="font-mono text-[0.7rem] tracking-[0.18em] uppercase opacity-40 mb-4">
          Legal
        </p>
        <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] mb-5">
          Privacy Policy
        </h1>
        <p className="font-mono text-xs tracking-wide opacity-40 mb-6">
          Effective: {EFFECTIVE_DATE}&nbsp;&nbsp;·&nbsp;&nbsp;Jurisdiction:
          Philippines (RA 10173)&nbsp;&nbsp;·&nbsp;&nbsp;GDPR-aware
        </p>
        <p className="text-lg font-light text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          This is a static portfolio. There are no forms, no cookies, and no
          analytics. This document exists to be transparent about the few places
          data touches the infrastructure.
        </p>
      </header>

      {/* ── Table of Contents ── */}
      <nav
        aria-label="Table of contents"
        className="mb-16 p-6 border border-white/[0.07] bg-white/[0.02]"
      >
        <p className="font-mono text-[0.65rem] tracking-[0.16em] uppercase opacity-35 mb-4">
          Contents
        </p>
        <ol className="flex flex-col gap-2 list-none p-0 m-0">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="flex items-baseline gap-4 text-sm text-current no-underline opacity-50 hover:opacity-100 transition-opacity"
              >
                <span className="font-mono text-[0.7rem] opacity-50 min-w-[2ch]">
                  {item.index}
                </span>
                {item.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Sections ── */}

      {/* 00 — Overview */}
      <section id="overview" className={sectionWrap}>
        <span className={sectionIndex}>00</span>
        <div>
          <h2 className={sectionHeading}>Overview</h2>
          <div className={prose}>
            <p>
              This website is a personal portfolio operated by{" "}
              <strong>Kevern Angeles</strong> (&ldquo;I&rdquo;,
              &ldquo;me&rdquo;), a designer and developer based in Bataan,
              Philippines. It is a static informational site with no user
              accounts, no forms, and no client-side tracking scripts.
            </p>
            <p>
              This Privacy Policy explains what data may be incidentally
              processed when you visit this site, who processes it, and your
              rights under applicable law — particularly the{" "}
              <strong>
                Philippine Data Privacy Act of 2017 (Republic Act No. 10173)
              </strong>{" "}
              and, where applicable, the{" "}
              <strong>EU General Data Protection Regulation (GDPR)</strong>.
            </p>
            <p>
              If nothing else: I don&apos;t collect your data. No forms, no
              cookies, no analytics. The sections below document what the
              infrastructure layer sees and what third parties do when you click
              their links.
            </p>
          </div>
        </div>
      </section>

      {/* 01 — Data Collected */}
      <section id="data-collected" className={sectionWrap}>
        <span className={sectionIndex}>01</span>
        <div>
          <h2 className={sectionHeading}>Data Collected — And By Whom</h2>
          <div className={prose}>
            <p>
              This site itself collects <strong>no personal data</strong>{" "}
              through any interface I control. There are no input forms, contact
              forms, newsletter sign-ups, comment sections, or authentication
              flows on any page.
            </p>

            <p className={subHeading}>Infrastructure Telemetry (Cloudflare)</p>
            <p>
              This site is deployed on{" "}
              <strong>Cloudflare Workers &amp; Pages</strong>. Cloudflare, as
              the infrastructure provider and data processor, automatically
              collects aggregate, anonymized network metrics for operational
              purposes. This includes:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              <li>Request counts and HTTP status codes</li>
              <li>Bandwidth and traffic volume</li>
              <li>Worker CPU time and wall time</li>
              <li>Error rates and geographic distribution of requests</li>
              <li>
                Standard HTTP request metadata (User-Agent string, referring
                URL, IP address anonymized at the edge)
              </li>
            </ul>
            <p>
              Cloudflare acts as a <strong>data processor</strong> under its own
              privacy terms. I, as the site operator, see only aggregated,
              non-personally-identifiable dashboard metrics — not raw IP logs or
              individual request records tied to identifiable individuals.
            </p>
            <p>
              Cloudflare&apos;s full Privacy Policy:{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                cloudflare.com/privacypolicy
              </a>
            </p>

            <p className={subHeading}>Email (mailto: Links)</p>
            <p>
              Contact links on this site use the{" "}
              <code className={inlineCode}>mailto:</code> protocol, which opens
              your local email client. No data is transmitted to this server
              when you click these links. Any email you send goes directly to{" "}
              <code className={inlineCode}>{CONTACT_EMAIL}</code> and is stored
              in Google&apos;s infrastructure (Gmail). I will use information in
              your email solely to respond to your inquiry.
            </p>
            <p>
              Google&apos;s Privacy Policy:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLink}
              >
                policies.google.com/privacy
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 02 — Cookies */}
      <section id="cookies" className={sectionWrap}>
        <span className={sectionIndex}>02</span>
        <div>
          <h2 className={sectionHeading}>Cookies &amp; Local Storage</h2>
          <div className={prose}>
            <p>
              This site does <strong>not</strong> set any first-party cookies,
              session cookies, persistent cookies, or use browser local storage
              for any tracking or personalization purpose.
            </p>
            <p>
              Cloudflare may set a short-lived security cookie (
              <code className={inlineCode}>__cf_bm</code>) to distinguish human
              visitors from automated bots as part of its Bot Management
              service. This is a strictly necessary technical cookie with a
              30-minute lifetime and does not track you across sites. It falls
              under Cloudflare&apos;s data processing activities, not mine.
            </p>
            <p>
              No consent banner is currently displayed because no analytics,
              advertising, or non-essential cookies are in use. If this changes,
              a proper consent mechanism will be added before deployment.
            </p>
          </div>
        </div>
      </section>

      {/* 03 — Third Parties */}
      <section id="third-parties" className={sectionWrap}>
        <span className={sectionIndex}>03</span>
        <div>
          <h2 className={sectionHeading}>
            Third-Party Links &amp; Social Platforms
          </h2>
          <div className={prose}>
            <p>
              This site contains links to external platforms I maintain profiles
              on. Clicking these links takes you off this site and into their
              own privacy environments. I have no control over and no
              responsibility for how those platforms collect or process data.
            </p>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr>
                    {["Platform", "Purpose", "Privacy Policy"].map((h) => (
                      <th
                        key={h}
                        className="text-left font-mono tracking-[0.1em] uppercase text-zinc-500 px-3 py-2 border-b border-white/10"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {thirdParties.map((row) => (
                    <tr
                      key={row.platform}
                      className="border-b border-white/[0.04]"
                    >
                      <td className="px-3 py-2.5 align-top">{row.platform}</td>
                      <td className="px-3 py-2.5 align-top text-zinc-500">
                        {row.purpose}
                      </td>
                      <td className="px-3 py-2.5 align-top">
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={inlineLink}
                        >
                          {row.label}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              This site embeds no third-party iframes, tracking pixels, social
              widgets, or external JavaScript bundles from ad networks or
              analytics providers.
            </p>
          </div>
        </div>
      </section>

      {/* 04 — Legal Basis */}
      <section id="legal-basis" className={sectionWrap}>
        <span className={sectionIndex}>04</span>
        <div>
          <h2 className={sectionHeading}>Legal Basis for Processing</h2>
          <div className={prose}>
            <p>
              Under the Philippine Data Privacy Act and the GDPR, any processing
              of personal data requires a lawful basis. The only processing
              scenario on this site is email communication initiated voluntarily
              by you.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2">
              <li>
                <strong>Lawful basis (DPA 2017 §12(b)):</strong> Processing is
                necessary in order to respond to a communication you initiated.
              </li>
              <li>
                <strong>Lawful basis (GDPR Art. 6(1)(f)):</strong> Legitimate
                interest — responding to a direct business inquiry you sent.
              </li>
            </ul>
            <p>
              Email data is retained only as long as needed for the purpose of
              the exchange and is not shared with third parties.
            </p>
          </div>
        </div>
      </section>

      {/* 05 — Your Rights */}
      <section id="your-rights" className={sectionWrap}>
        <span className={sectionIndex}>05</span>
        <div>
          <h2 className={sectionHeading}>Your Rights</h2>
          <div className={prose}>
            <p>
              Under the Philippine Data Privacy Act of 2017 and, where
              applicable, the GDPR, you have the following rights with respect
              to any personal data I may hold (i.e., data from email you sent
              me):
            </p>
            <ul className="list-none p-0 flex flex-col gap-3">
              {rights.map((r) => (
                <li key={r.title} className="flex gap-3">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                  <span>
                    <strong>{r.title}</strong>
                    {" — "}
                    {r.desc}
                  </span>
                </li>
              ))}
              <li className="flex gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                <span>
                  <strong>Right to lodge a complaint</strong>
                  {" — "}
                  Philippine residents may file a complaint with the{" "}
                  <a
                    href="https://www.privacy.gov.ph"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={inlineLink}
                  >
                    National Privacy Commission (NPC)
                  </a>
                  . EU residents may file with their relevant supervisory
                  authority.
                </span>
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact me at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLink}>
                {CONTACT_EMAIL}
              </a>
              . I will respond within 15 business days, consistent with NPC
              guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* 06 — Children */}
      <section id="children" className={sectionWrap}>
        <span className={sectionIndex}>06</span>
        <div>
          <h2 className={sectionHeading}>Children&apos;s Privacy</h2>
          <div className={prose}>
            <p>
              This site is not directed at children under the age of 18. I do
              not knowingly collect personal information from minors. If you
              believe a minor has sent me personal data, please contact me and I
              will delete it promptly.
            </p>
          </div>
        </div>
      </section>

      {/* 07 — Changes */}
      <section id="changes" className={sectionWrap}>
        <span className={sectionIndex}>07</span>
        <div>
          <h2 className={sectionHeading}>Changes to This Policy</h2>
          <div className={prose}>
            <p>
              This policy may be updated to reflect changes in site features,
              infrastructure, or applicable law. When updated, the effective
              date at the top of this page will change. Continued use of the
              site after any update constitutes acknowledgment of the revised
              policy.
            </p>
            <p>
              Given the minimal data processing involved, significant changes
              are unlikely unless I add analytics, a contact form, or other
              interactive features in the future.
            </p>
          </div>
        </div>
      </section>

      {/* 08 — Contact */}
      <section id="contact" className={sectionWrap}>
        <span className={sectionIndex}>08</span>
        <div>
          <h2 className={sectionHeading}>Contact</h2>
          <div className={prose}>
            <p>
              For any privacy-related questions, requests, or concerns, reach me
              directly:
            </p>
            <ul className="list-none p-0 flex flex-col gap-1.5">
              {[
                { label: "Name", value: "Kevern Angeles" },
                { label: "Location", value: "Bataan, Philippines" },
              ].map((item) => (
                <li key={item.label}>
                  <strong>{item.label}:</strong> {item.value}
                </li>
              ))}
              <li>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className={inlineLink}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <strong>Site:</strong>{" "}
                <a
                  href={SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={inlineLink}
                >
                  {SITE_URL}
                </a>
              </li>
            </ul>
            <p>
              I am not currently required to appoint a Data Protection Officer
              under the DPA 2017 (as I process personal data only incidentally
              and in limited scope), but I am personally accountable for
              compliance with this policy.
            </p>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="mt-16 pt-8 border-t border-white/[0.06] flex flex-wrap justify-between items-center gap-3 text-sm opacity-45 max-sm:flex-col max-sm:items-start">
        <Link
          href="/"
          className="underline underline-offset-2 hover:opacity-100 transition-opacity"
        >
          ← Back to site
        </Link>
        <p>
          Questions?{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-2 hover:opacity-100 transition-opacity"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </footer>
    </main>
  );
}
