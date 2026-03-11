"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── Data: real MCP tools from Clinical Terminal ────────────────────

const toolGroups = [
  {
    label: "Companies / Vendors",
    tools: [
      { name: "search_companies", desc: "Filter by name, domain, company_type, rcmSegments, status." },
      { name: "get_company", desc: "Full profile by terminalId or slug" },
      { name: "get_company_executives", desc: "People linked via WORKS_AT with title_classification filter" },
      { name: "get_company_signals", desc: "Recent signals/articles mentioning this company" },
    ],
  },
  {
    label: "People / Executives",
    tools: [
      { name: "search_people", desc: "Filter by name, title_classification, person_type" },
      { name: "get_person_dossier", desc: "LinkedIn enrichment: career timeline, skills, certifications" },
    ],
  },
  {
    label: "Graph / Relationships",
    tools: [
      { name: "query_graph", desc: "Natural-language-ish graph queries translated to Cypher" },
      { name: "get_entity_network", desc: "N-degree connections from any entity — returns nodes + edges" },
    ],
  },
];

// ─── Typing effect hook ─────────────────────────────────────────────

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

// ─── Blinking cursor ────────────────────────────────────────────────

function Cursor({ color = "bg-green-400/70" }: { color?: string }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className={`inline-block w-[6px] h-[14px] ${color} ml-[1px] align-middle`}
    />
  );
}

// ─── Single tool row with typing ────────────────────────────────────

function ToolRow({
  name,
  desc,
  delay,
  parentInView,
  onComplete,
}: {
  name: string;
  desc: string;
  delay: number;
  parentInView: boolean;
  onComplete?: () => void;
}) {
  const [showRow, setShowRow] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    if (!parentInView) return;
    const t1 = setTimeout(() => setShowRow(true), delay);
    const t2 = setTimeout(() => setShowDesc(true), delay + 150);
    const t3 = setTimeout(() => onComplete?.(), delay + 150 + desc.length * 15 + 100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [parentInView, delay, desc.length, onComplete]);

  const typedDesc = useTypingText(desc, showDesc, 15);
  const isTyping = typedDesc.length < desc.length && showDesc;

  if (!showRow) return null;

  return (
    <motion.tr
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <td className="py-2 pr-4 whitespace-nowrap align-top border-b border-green-500/5">
        <span className="text-secondary font-bold">{name}</span>
      </td>
      <td className="py-2 pr-4 text-green-400/70 align-top border-b border-green-500/5">
        {typedDesc}
        {isTyping && <Cursor />}
      </td>
      <td className="py-2 text-right align-top border-b border-green-500/5">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-green-500 text-xs"
        >
          Yes
        </motion.span>
      </td>
    </motion.tr>
  );
}

// ─── Group header with typing ───────────────────────────────────────

function GroupHeader({
  label,
  delay,
  parentInView,
}: {
  label: string;
  delay: number;
  parentInView: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!parentInView) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [parentInView, delay]);

  const typed = useTypingText(label, show, 25);
  const isTyping = typed.length < label.length && show;

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="mt-5 first:mt-0 mb-2"
    >
      <span className="text-green-400 font-bold text-sm">{typed}</span>
      {isTyping && <Cursor color="bg-green-400" />}
    </motion.div>
  );
}

// ─── Table header row ───────────────────────────────────────────────

function TableHeader({
  delay,
  parentInView,
}: {
  delay: number;
  parentInView: boolean;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!parentInView) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [parentInView, delay]);

  if (!show) return null;

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="text-green-500/30 border-b border-green-500/10"
    >
      <th className="text-left py-1.5 pr-4 font-normal text-[10px] uppercase tracking-wider">
        Tool
      </th>
      <th className="text-left py-1.5 pr-4 font-normal text-[10px] uppercase tracking-wider">
        Description
      </th>
      <th className="text-right py-1.5 font-normal text-[10px] uppercase tracking-wider">
        Read-only?
      </th>
    </motion.tr>
  );
}

// ─── Main terminal component ────────────────────────────────────────

export function TerminalMcp() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [showPrompt, setShowPrompt] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const promptText = "mcp list-tools --category all";
  const typedPrompt = useTypingText(promptText, showPrompt, 30);
  const promptDone = typedPrompt.length >= promptText.length;

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowPrompt(true), 300);
      return () => clearTimeout(t);
    }
  }, [isInView]);

  useEffect(() => {
    if (promptDone) {
      const t = setTimeout(() => setShowHeader(true), 400);
      return () => clearTimeout(t);
    }
  }, [promptDone]);

  // Calculate delays — all relative to prompt finishing
  const baseDelay = 300 + promptText.length * 30 + 800; // prompt typing + pause
  let globalDelay = baseDelay;

  const groupsWithDelays = toolGroups.map((group) => {
    const groupDelay = globalDelay;
    globalDelay += 400; // time for group header typing

    const tableHeaderDelay = globalDelay;
    globalDelay += 200;

    const toolsWithDelays = group.tools.map((tool) => {
      const toolDelay = globalDelay;
      globalDelay += 300 + tool.desc.length * 15;
      return { ...tool, delay: toolDelay };
    });

    globalDelay += 300; // gap between groups
    return { ...group, delay: groupDelay, tableHeaderDelay, tools: toolsWithDelays };
  });

  const totalDuration = globalDelay;

  useEffect(() => {
    if (isInView) {
      const t = setTimeout(() => setShowDone(true), totalDuration + 200);
      return () => clearTimeout(t);
    }
  }, [isInView, totalDuration]);

  return (
    <div ref={ref} className="relative">
      {/* The terminal — starts small, grows with content */}
      <motion.div
        className="relative bg-[#0a0a0a] border border-green-500/20 rounded-xl overflow-hidden font-mono text-xs shadow-[0_0_40px_rgba(34,197,94,0.05)]"
        initial={{ height: 44 }}
        animate={{ height: "auto" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Terminal title bar */}
        <motion.div
          className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-green-500/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-green-500/40 text-[10px] ml-2">
            clinical-terminal-mcp — Proposed Tools
          </span>
          {/* Active indicator */}
          <div className="ml-auto flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-green-500/30 text-[9px]">LIVE</span>
          </div>
        </motion.div>

        {/* Scanning line */}
        {isInView && (
          <motion.div
            className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent z-10 pointer-events-none"
            initial={{ top: "10%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Terminal body — grows as content appears */}
        <div className="p-4 md:p-5 relative">
          {/* Command prompt with typing */}
          <AnimatePresence>
            {showPrompt && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-500/60 mb-4"
              >
                <span className="text-green-400">$</span>{" "}
                <span className="text-green-300">{typedPrompt}</span>
                {!promptDone && <Cursor color="bg-green-300" />}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tool count header — appears after prompt finishes */}
          <AnimatePresence>
            {showHeader && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mb-4 pb-3 border-b border-green-500/10"
              >
                <span className="text-green-400 font-bold">
                  Proposed Tools ({toolGroups.reduce((sum, g) => sum + g.tools.length, 0)} tools, {toolGroups.length} categories)
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tool groups — each expands in as it types */}
          {groupsWithDelays.map((group) => (
            <div key={group.label}>
              <GroupHeader
                label={group.label}
                delay={group.delay}
                parentInView={isInView}
              />
              <table className="w-full mb-1">
                <thead>
                  <TableHeader
                    delay={group.tableHeaderDelay}
                    parentInView={isInView}
                  />
                </thead>
                <tbody>
                  {group.tools.map((tool) => (
                    <ToolRow
                      key={tool.name}
                      name={tool.name}
                      desc={tool.desc}
                      delay={tool.delay}
                      parentInView={isInView}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ))}

          {/* Final prompt — appears after all content */}
          <AnimatePresence>
            {showDone && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-5 pt-3 border-t border-green-500/10 text-green-500/60"
              >
                <span className="text-green-400">$</span>{" "}
                <Cursor color="bg-green-400/70" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
