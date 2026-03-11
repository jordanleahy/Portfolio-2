"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/lib/data";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const timeline = [
  {
    company: "SmarterDx",
    role: "Senior Product Designer",
    period: "2024 – 2025",
    description:
      "Redesigned clinical diagnostics UI, boosting accuracy 60%. Owned the explainable AI layer for CDI verification workflows.",
  },
  {
    company: "PrescriberPoint",
    role: "Senior UX Designer",
    period: "2023 – 2024",
    description:
      "Designed ML-powered prior authorization system that reduced response time from 3 days to 5 minutes.",
  },
  {
    company: "BCG X",
    role: "Product Designer",
    period: "2022 – 2023",
    description:
      "Design strategy for enterprise digital transformation projects across healthcare and financial services.",
  },
  {
    company: "Definitive Healthcare",
    role: "Lead Product Designer",
    period: "2021 – 2022",
    description:
      "Led data-driven redesign of hospital profiles serving 3M+ page views. Restructured IA for 500+ metrics.",
  },
  {
    company: "HTD Health",
    role: "UX Designer",
    period: "2019 – 2021",
    description:
      "Healthcare technology design across multiple client engagements.",
  },
];

const tools = [
  "Figma",
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Claude / Cursor",
  "Firebase",
  "Vercel",
];

export function AboutContent() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32">
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
            About
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            {SITE_DATA.author.bio}
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-10">
            // Experience
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="group border-b border-white/5 py-8 first:pt-0"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xl font-bold font-display uppercase tracking-tight group-hover:text-primary transition-colors">
                      {item.company}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground/60 shrink-0">
                    {item.period}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tools */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-10">
            // Tools & Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="text-sm font-mono text-muted-foreground border border-white/10 px-4 py-2 rounded-full hover:border-primary/30 hover:text-white transition-colors"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all duration-300"
            >
              Get in Touch <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
