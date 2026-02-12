"use client";

import { motion } from "framer-motion";
import { Terminal, Database, Code, Figma, Cpu } from "lucide-react";
import { useEffect, useState } from "react";

export function McpVisual() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const sequence = [
            "Initializing Antigravity Agent...",
            "> Connecting to Clinical-Intel MCP...",
            "[SUCCESS] Linked to 50+ Medical Journals",
            "> Query: 'Sepsis alert protocols 2025'",
            "[AGENT] Synthesizing data...",
            "> Pushing context to Cursor...",
            "Updating Figma Component Properties...",
            "[READY] Design System Synced."
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < sequence.length) {
                setLogs(prev => [...prev.slice(-4), sequence[i]]); // Keep last 5 lines
                i++;
            } else {
                // simple loop or stop
                i = 0;
                setLogs([]);
            }
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-black/40 rounded-xl border border-white/10 backdrop-blur-md overflow-hidden p-6 font-mono text-xs md:text-sm shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="flex items-center gap-2 text-white/50">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    <span className="ml-2">jordan-dev-environment</span>
                </div>
                <div className="px-2 py-1 bg-primary/10 rounded text-primary text-[10px] uppercase tracking-wider">
                    System Online
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full pb-8">

                {/* Visual Graph Side */}
                <div className="hidden md:flex flex-col items-center justify-center relative">
                    {/* Center Code Node */}
                    <div className="absolute z-10 w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center animate-pulse">
                        <Code className="w-8 h-8 text-blue-400" />
                    </div>

                    {/* Satellites */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-48 h-48 border border-dashed border-white/10 rounded-full absolute"
                    />

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-72 h-72 border border-dashed border-white/5 rounded-full absolute"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-2 rounded-full border border-pink-500/30">
                            <Figma className="w-5 h-5 text-pink-500" />
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black p-2 rounded-full border border-green-500/30">
                            <Database className="w-5 h-5 text-green-500" />
                        </div>
                    </motion.div>


                </div>

                {/* Terminal Side */}
                <div className="flex flex-col gap-2 relative">
                    {logs.map((log, i) => {
                        if (!log) return null;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-start gap-2 text-white/70"
                            >
                                <span className="text-primary mt-1">➜</span>
                                <span className={log.includes("[") ? "text-primary" : "text-white/60"}>
                                    {log}
                                </span>
                            </motion.div>
                        );
                    })}
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="w-2 h-4 bg-primary mt-1"
                    />
                </div>
            </div>

            {/* Decorative Scanlines */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] opacity-20" />
        </div>
    );
}
