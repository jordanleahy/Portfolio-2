"use client";

import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { SITE_DATA } from "@/lib/data";
import Link from "next/link";
import { Mail, Linkedin, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: SITE_DATA.hero.email,
    href: `mailto:${SITE_DATA.hero.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/jordanleahy",
    href: SITE_DATA.footer.linkedin,
  },
];

export function ContactContent() {
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
            Let's Talk
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            Open to full-time product design roles and consulting engagements.
            Based in Brooklyn, NY — available for remote work.
          </p>
        </motion.div>

        {/* Contact Links */}
        <div className="space-y-4 mb-20">
          {contactLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            >
              <Link
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center gap-6 py-8 border-b border-white/5 hover:border-primary/30 transition-colors"
              >
                <link.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest mb-1">
                    {link.label}
                  </p>
                  <p className="text-xl md:text-2xl font-bold font-display tracking-tight group-hover:text-primary transition-colors">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-mono text-green-500 uppercase tracking-widest">
              Open to Work
            </span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            I'm currently looking for my next full-time product design role,
            ideally at a company using AI to improve healthcare outcomes. I'm
            also available for consulting on clinical workflow design and AI
            interface strategy.
          </p>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
