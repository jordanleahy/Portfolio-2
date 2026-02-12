"use client";

import { motion } from "framer-motion";
import { Link2, ExternalLink, Bot } from "lucide-react";

interface Citation {
    source: string;
    title: string;
    url: string;
    year: string;
}

export function BlogCitations({ citations }: { citations: Citation[] }) {
    return (
        <div className="my-16 border border-white/10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        Agent Context Analysis
                    </span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
            </div>

            {/* Content */}
            <div className="p-6 font-mono text-sm">
                <div className="text-muted-foreground mb-4">
                    <span className="text-green-500">➜</span> query_mcp --topic "clinical-ai-augmentation" --limit 3
                </div>

                <div className="space-y-4">
                    {citations.map((cite, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-4 group"
                        >
                            <span className="text-white/30 shrink-0">[{i + 1}]</span>
                            <div className="flex-1">
                                <a href={cite.url} target="_blank" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors flex items-center gap-2">
                                    {cite.title}
                                    <ExternalLink className="w-3 h-3 opacity-50" />
                                </a>
                                <div className="text-white/40 text-xs mt-1">
                                    Source: {cite.source} • {cite.year}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-dashed border-white/10 text-xs text-white/30">
                    [STATUS] Context Verified • 142ms latency
                </div>
            </div>
        </div>
    );
}
