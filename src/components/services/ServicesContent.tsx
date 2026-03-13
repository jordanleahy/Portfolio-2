"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { Footer } from "@/components/Footer";
import { SITE_DATA } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRef, useEffect, useState } from "react";
import { TerminalMcp } from "./TerminalMcp";
import { PersonaAgent } from "./PersonaAgent";

// ─── Animated wireframe components ──────────────────────────────────

function PulseRing({ delay = 0, size = 120 }: { delay?: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full border border-primary/20"
      style={{ width: size, height: size }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.8, 1.4, 0.8], opacity: [0, 0.6, 0] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function HeartbeatLine() {
  return (
    <div className="relative w-full h-16 overflow-hidden">
      <svg viewBox="0 0 400 60" className="w-full h-full" preserveAspectRatio="none">
        <motion.path
          d="M0,30 L80,30 L100,30 L110,10 L120,50 L130,5 L140,55 L150,30 L170,30 L400,30"
          fill="none"
          stroke="url(#heartbeat-gradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.path
          d="M0,30 L80,30 L100,30 L110,10 L120,50 L130,5 L140,55 L150,30 L170,30 L400,30"
          fill="none"
          stroke="url(#heartbeat-gradient)"
          strokeWidth="2"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1], pathOffset: [0, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
        />
        <defs>
          <linearGradient id="heartbeat-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
            <stop offset="30%" stopColor="rgb(34, 197, 94)" />
            <stop offset="70%" stopColor="rgb(139, 92, 246)" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function AgentWireframe({ label, nodes }: { label: string; nodes: string[] }) {
  return (
    <div className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Scanning line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Label */}
      <div className="flex items-center gap-3 mb-6">
        <motion.div
          className="w-2 h-2 rounded-full bg-secondary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
      </div>

      {/* Agent nodes */}
      <div className="space-y-3">
        {nodes.map((node, i) => (
          <motion.div
            key={node}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-3"
          >
            <motion.div
              className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center bg-white/[0.03]"
              whileInView={{
                borderColor: ["rgba(255,255,255,0.1)", "rgba(139,92,246,0.5)", "rgba(255,255,255,0.1)"],
              }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5 + i * 0.3, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-primary/50"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex-1">
              <motion.div
                className="h-2 rounded-full bg-white/5"
                whileInView={{ backgroundColor: ["rgba(255,255,255,0.03)", "rgba(139,92,246,0.15)", "rgba(255,255,255,0.05)"] }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 + i * 0.2, repeat: Infinity }}
                style={{ width: `${60 + Math.random() * 35}%` }}
              />
            </div>
            <span className="text-xs font-mono text-muted-foreground/40">{node}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom pulse */}
      <div className="mt-6 flex items-center gap-2">
        <motion.div
          className="flex-1 h-[1px] bg-gradient-to-r from-secondary/30 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono text-secondary/50">ACTIVE</span>
      </div>
    </div>
  );
}

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 1500;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          tick();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── Main Component ─────────────────────────────────────────────────

export function ServicesContent() {
  const featuredStudies = SITE_DATA.caseStudies.slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* ── FRAME 1: THE HOOK ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Pulse rings behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <PulseRing delay={0} size={200} />
          <PulseRing delay={0.8} size={350} />
          <PulseRing delay={1.6} size={500} />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-mono text-sm text-secondary uppercase tracking-[0.4em] mb-10"
          >
            A different kind of designer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-[8rem] font-bold uppercase tracking-tighter leading-[0.85]"
          >
            What if your
            <br />
            designer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-primary to-secondary">
              built the
              <br />
              agents
            </span>{" "}
            too?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16"
          >
            <HeartbeatLine />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-[1px] h-10 bg-gradient-to-b from-white/20 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── FRAME 2: RESEARCH AGENTS ──────────────────────────── */}
      <section className="min-h-screen flex items-center px-6 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] mb-4 block">
              01 / Research
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              I build agents
              <br />
              that do the
              <br />
              <span className="text-secondary">research.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Competitive intel. Market signals. Clinical evidence. My orchestration agents surface what matters before the first sketch.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TerminalMcp />
          </motion.div>
        </div>
      </section>

      {/* ── FRAME 3: PERSONA AGENTS ───────────────────────────── */}
      <section className="min-h-screen flex items-center px-6 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4 block">
              02 / Personas
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Agents that
              <br />
              know your{" "}
              <span className="text-primary">users.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Automated persona synthesis from real clinical interviews, support tickets, and usage data. Not assumptions — evidence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <PersonaAgent />
          </motion.div>
        </div>
      </section>

      {/* ── FRAME 4: PRODUCT AGENTS ───────────────────────────── */}
      <section className="min-h-screen flex items-center px-6 py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-secondary uppercase tracking-[0.3em] mb-4 block">
              03 / Product
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Agents that
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                ship product.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              From design system generation to automated QA flows. I architect agent pipelines that compress months of work into weeks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <AgentWireframe
              label="Product Agent"
              nodes={["Spec", "Generate", "Test", "Deploy"]}
            />
          </motion.div>
        </div>
      </section>

      {/* ── FRAME 5: THE RESULTS ──────────────────────────────── */}
      <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4 block">
              // The results
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-8">
              This is what
              <br />I shipped with them.
            </h2>

            {/* Stats bar */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12">
              {[
                { value: 60, suffix: "%", label: "Accuracy boost" },
                { value: 3, suffix: " days → 5 min", label: "Prior auth time" },
                { value: 3, suffix: "M+", label: "Page views redesigned" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold font-display text-white">
                    <CountUp target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Case study cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStudies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/work/${study.slug}`}
                  className="group block relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-primary/30 transition-all duration-500 aspect-[16/9]"
                >
                  {study.image && (
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-contain opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs font-mono text-secondary uppercase tracking-widest">
                      {study.subtitle}
                    </span>
                    <h3 className="text-lg font-bold font-display mt-2 group-hover:text-primary transition-colors leading-tight">
                      {study.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/30 mt-3 group-hover:text-primary transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRAME 6: CTA ──────────────────────────────────────── */}
      <section className="py-40 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <PulseRing delay={0} size={150} />
          <PulseRing delay={0.6} size={300} />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-4"
          >
            See the work.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12"
          >
            Then decide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/#work">
              <Button
                size="lg"
                className="rounded-full px-12 py-8 text-xl bg-primary text-white hover:bg-primary/90 shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:shadow-[0_0_60px_rgba(139,92,246,0.8)] transition-all duration-300"
              >
                View Case Studies <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
