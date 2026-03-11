"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// ─── Persona data ───────────────────────────────────────────────────

const personas = [
  {
    role: "CFO",
    title: "Chief Financial Officer",
    command: 'analyze persona --role "CFO"',
    painPoints: [
      "Revenue leakage from missed diagnoses",
      "Denial rates climbing quarter over quarter",
    ],
    goals: [
      "Maximize net revenue per encounter",
      "Reduce cost-to-collect ratio",
    ],
  },
  {
    role: "PA",
    title: "Physician Advisor",
    command: 'analyze persona --role "Physician Advisor"',
    painPoints: [
      "Too many charts to review per shift",
      "AI flags without clinical context",
    ],
    goals: [
      "Validate diagnoses in under 2 minutes",
      "Trust the evidence presented",
    ],
  },
  {
    role: "RCM",
    title: "Revenue Cycle Manager",
    command: 'analyze persona --role "Revenue Cycle Manager"',
    painPoints: [
      "Manual workflows bottleneck billing",
      "Inconsistent coding accuracy across team",
    ],
    goals: [
      "Automate pre-bill review process",
      "Reduce days in accounts receivable",
    ],
  },
  {
    role: "CDI",
    title: "CDI Specialist",
    command: 'analyze persona --role "CDI Specialist"',
    painPoints: [
      "Generic UI for all condition types",
      "Evidence scattered across multiple tabs",
    ],
    goals: [
      "Condition-specific validation views",
      "All evidence surfaced in one place",
    ],
  },
];

const processingSteps = [
  "Clustering pain points...",
  "Mapping decision criteria...",
  "Profile generated ✓",
];

// ─── Typing hook ────────────────────────────────────────────────────

function useTypingText(text: string, isActive: boolean, speed = 20) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!isActive) {
      setDisplayed("");
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, isActive, speed]);

  return displayed;
}

// ─── Cursor ─────────────────────────────────────────────────────────

function Cursor({ color = "bg-green-400/70" }: { color?: string }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className={`inline-block w-[6px] h-[13px] ${color} ml-[1px] align-middle`}
    />
  );
}

// ─── Mini terminal (left side) ──────────────────────────────────────

function MiniTerminal({
  persona,
  phase,
  stepIndex,
}: {
  persona: (typeof personas)[0];
  phase: "typing" | "processing" | "done" | "idle";
  stepIndex: number;
}) {
  const typedCommand = useTypingText(
    persona.command,
    phase === "typing" || phase === "processing" || phase === "done",
    25
  );
  const commandDone = typedCommand.length >= persona.command.length;

  return (
    <div className="bg-[#0a0a0a] border border-green-500/20 rounded-xl overflow-hidden font-mono text-xs">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#111] border-b border-green-500/10">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <span className="text-green-500/40 text-[9px] ml-1">persona-agent</span>
        <div className="ml-auto flex items-center gap-1">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-3 space-y-2">
        {/* Command */}
        <div className="text-green-500/60">
          <span className="text-green-400">$</span>{" "}
          <span className="text-green-300">{typedCommand}</span>
          {!commandDone && <Cursor color="bg-green-300" />}
        </div>

        {/* Processing steps */}
        <AnimatePresence>
          {commandDone &&
            processingSteps.slice(0, stepIndex + 1).map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-[11px] ${
                  i === processingSteps.length - 1 && stepIndex >= processingSteps.length - 1
                    ? "text-green-400 font-bold"
                    : "text-green-500/50"
                }`}
              >
                {i < processingSteps.length - 1 || stepIndex >= processingSteps.length - 1
                  ? step
                  : (
                    <>
                      {step.replace("...", "")}
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        ...
                      </motion.span>
                    </>
                  )}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Persona card (right side) ──────────────────────────────────────

function PersonaCard({
  persona,
  buildPhase,
}: {
  persona: (typeof personas)[0];
  buildPhase: number; // 0=hidden, 1=title, 2=avatar, 3=pains, 4=goals, 5=complete
}) {
  return (
    <div className="relative">
      {/* Glow on complete */}
      {buildPhase >= 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.3] }}
          transition={{ duration: 1.5 }}
          className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-sm"
        />
      )}

      <div className="relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 min-h-[320px] overflow-hidden">
        {/* Scanning line during build */}
        {buildPhase > 0 && buildPhase < 5 && (
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Role badge */}
        <AnimatePresence mode="wait">
          {buildPhase >= 1 && (
            <motion.div
              key={persona.role + "-title"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mb-5"
            >
              <span className="text-[10px] font-mono text-primary/50 uppercase tracking-[0.3em] block mb-2">
                Persona
              </span>
              <h3 className="text-2xl font-bold font-display uppercase tracking-tight text-white">
                {persona.title}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar ring */}
        <AnimatePresence>
          {buildPhase >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="mb-5 flex items-center gap-3"
            >
              <div className="relative w-10 h-10">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary/40"
                  animate={
                    buildPhase < 5
                      ? { borderColor: ["rgba(139,92,246,0.2)", "rgba(139,92,246,0.6)", "rgba(139,92,246,0.2)"] }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div className="absolute inset-1 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xs font-bold font-mono text-primary">
                    {persona.role}
                  </span>
                </div>
              </div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/20 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pain points */}
        <AnimatePresence>
          {buildPhase >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5"
            >
              <span className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest block mb-2">
                Pain Points
              </span>
              {persona.painPoints.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.3 }}
                  className="flex items-start gap-2 mb-1.5"
                >
                  <span className="text-red-400/40 mt-0.5 text-[10px]">--</span>
                  <span className="text-sm text-muted-foreground">{point}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals */}
        <AnimatePresence>
          {buildPhase >= 4 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[10px] font-mono text-secondary/60 uppercase tracking-widest block mb-2">
                Goals
              </span>
              {persona.goals.map((goal, i) => (
                <motion.div
                  key={goal}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.3 }}
                  className="flex items-start gap-2 mb-1.5"
                >
                  <span className="text-secondary/40 mt-0.5 text-[10px]">→</span>
                  <span className="text-sm text-muted-foreground">{goal}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {buildPhase === 0 && (
          <div className="flex items-center justify-center h-full min-h-[280px]">
            <span className="text-muted-foreground/20 font-mono text-xs uppercase tracking-widest">
              Awaiting agent output...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main orchestrator ──────────────────────────────────────────────

export function PersonaAgent() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const [personaIndex, setPersonaIndex] = useState(0);
  const [terminalPhase, setTerminalPhase] = useState<"idle" | "typing" | "processing" | "done">("idle");
  const [stepIndex, setStepIndex] = useState(-1);
  const [buildPhase, setBuildPhase] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const persona = personas[personaIndex];

  const runCycle = useCallback(() => {
    // Reset
    setTerminalPhase("idle");
    setStepIndex(-1);
    setBuildPhase(0);

    // Timeline for one persona cycle (~5s total)
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 0ms: start typing command
    timers.push(setTimeout(() => setTerminalPhase("typing"), 100));

    // ~800ms: command done, start processing
    timers.push(setTimeout(() => {
      setTerminalPhase("processing");
      setStepIndex(0);
    }, 900));

    // 1200ms: step 1 + start building card
    timers.push(setTimeout(() => {
      setStepIndex(1);
      setBuildPhase(1); // title
    }, 1400));

    // 1700ms: avatar
    timers.push(setTimeout(() => setBuildPhase(2), 1800));

    // 2200ms: step 2 done + pain points
    timers.push(setTimeout(() => {
      setStepIndex(2);
      setBuildPhase(3);
    }, 2400));

    // 3000ms: goals
    timers.push(setTimeout(() => setBuildPhase(4), 3200));

    // 3700ms: complete
    timers.push(setTimeout(() => {
      setTerminalPhase("done");
      setBuildPhase(5);
    }, 3800));

    // 5000ms: next persona
    timers.push(setTimeout(() => {
      setPersonaIndex((prev) => (prev + 1) % personas.length);
    }, 5200));

    return () => timers.forEach(clearTimeout);
  }, []);

  // Start first cycle when in view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  // Run cycle whenever personaIndex changes (after first start)
  useEffect(() => {
    if (!hasStarted) return;
    const cleanup = runCycle();
    return cleanup;
  }, [personaIndex, hasStarted, runCycle]);

  // Persona counter dots
  const dots = personas.map((_, i) => (
    <motion.div
      key={i}
      className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
        i === personaIndex ? "bg-primary" : "bg-white/10"
      }`}
    />
  ));

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      {/* Left: Mini terminal */}
      <div className="space-y-3">
        <MiniTerminal
          persona={persona}
          phase={terminalPhase}
          stepIndex={stepIndex}
        />
        {/* Persona dots */}
        <div className="flex items-center justify-center gap-2">
          {dots}
        </div>
      </div>

      {/* Right: Persona card */}
      <PersonaCard persona={persona} buildPhase={buildPhase} />
    </div>
  );
}
