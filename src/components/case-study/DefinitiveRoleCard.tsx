"use client";

import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { delay, duration: 0.4 },
});

export function DefinitiveRoleCard() {
  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-3 gap-6">
        {/* Column 1: My Role */}
        <motion.div
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors"
          {...fadeUp(0)}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg font-bold font-mono">
              1
            </div>
            <h3 className="text-sm font-mono text-purple-400 uppercase tracking-widest">
              My Role
            </h3>
          </div>
          <p className="text-white text-lg font-bold mb-4">Lead Product Designer</p>
          <div className="space-y-3">
            {[
              "User research & workflow analysis",
              "Information architecture & wireframing",
              "Prototype development & testing",
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2"
                {...fadeUp(0.2 + i * 0.1)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span className="text-sm text-gray-400">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Column 2: Stakeholders */}
        <motion.div
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors"
          {...fadeUp(0.3)}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg font-bold font-mono">
              2
            </div>
            <h3 className="text-sm font-mono text-purple-400 uppercase tracking-widest">
              Stakeholders
            </h3>
          </div>
          <div className="space-y-3">
            {[
              { role: "Customer Service User", count: "1" },
              { role: "Software Engineers", count: "3" },
              { role: "Product Manager", count: "1" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3"
                {...fadeUp(0.5 + i * 0.1)}
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-purple-300">
                  {item.count}
                </div>
                <span className="text-sm text-gray-400">{item.role}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Column 3: Scope */}
        <motion.div
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors"
          {...fadeUp(0.6)}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 text-lg font-bold font-mono">
              3
            </div>
            <h3 className="text-sm font-mono text-purple-400 uppercase tracking-widest">
              Scope
            </h3>
          </div>
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-bold text-white">6</span>
            <span className="text-sm text-gray-500 font-mono">months</span>
          </div>
          <div className="space-y-3">
            {[
              "End-to-end Hospital Profile redesign",
              "Information Architecture restructuring",
              "Design system for 500+ metrics",
              "Search & Filtering system",
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2"
                {...fadeUp(0.8 + i * 0.1)}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                <span className="text-sm text-gray-400">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
