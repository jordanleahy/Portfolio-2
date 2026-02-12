"use client";

import { motion } from "framer-motion";
import { SITE_DATA } from "@/lib/data";
import { Button } from "./ui/Button";
import { ArrowDown } from "lucide-react";
import { McpVisual } from "./McpVisual";
import { NeuralMesh } from "./NeuralMesh";

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-20 py-20 overflow-hidden">
            {/* Neural Network Mesh Background */}
            <NeuralMesh />

            {/* Ambient Glows for Depth */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">

                {/* Left: Text Content */}
                <div className="flex flex-col items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-2 mb-8 px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20"
                    >
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        <span className="font-mono text-sm text-secondary tracking-widest uppercase">
                            System Operational
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-8"
                    >
                        Designing with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary animate-pulse-slow">
                            Agents & Clinical Intelligence
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
                    >
                        I architect workflows, not just screens. Leveraging
                        <span className="text-white font-semibold"> Custom MCPs</span>,
                        <span className="text-white font-semibold"> Cursor, Claude or Antigravity</span>, and
                        <span className="text-white font-semibold"> Figma</span> to aggregate intelligence and build high-velocity clinical applications.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <Button
                            size="lg"
                            className="rounded-full px-8 py-6 text-base bg-primary text-white hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7)] transition-all duration-300"
                            variant="default"
                        >
                            {SITE_DATA.hero.cta}
                        </Button>
                    </motion.div>
                </div>

                {/* Right: Visual System */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="relative w-full"
                >
                    <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl blur-2xl -z-10" />
                    <McpVisual />
                </motion.div>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/30"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </motion.div>
        </section>
    );
}
