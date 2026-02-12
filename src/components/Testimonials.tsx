"use client";

import { SITE_DATA } from "@/lib/data";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export function Testimonials() {
    return (
        <section className="py-32 px-6 md:px-20 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-24 text-center relative z-10">
                <span className="text-muted-foreground mr-4 text-2xl align-top font-mono tracking-widest block md:inline mb-2 md:mb-0">
                    // VALIDATION
                </span>
                What People Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
                {SITE_DATA.testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl relative group hover:border-primary/30 transition-colors duration-500"
                    >
                        <Quote className="w-10 h-10 text-primary/10 absolute top-6 left-6 -z-10 group-hover:text-primary/20 transition-colors" />
                        <p className="text-lg md:text-xl font-light italic text-gray-400 mb-8 leading-relaxed group-hover:text-white transition-colors duration-300">
                            "{t.quote}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                            {t.image ? (
                                <img
                                    src={t.image}
                                    alt={t.author}
                                    className="w-12 h-12 rounded-full object-cover border border-white/10 flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300 ring-2 ring-transparent group-hover:ring-secondary/50"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
                            )}
                            <div>
                                <p className="font-bold text-white font-display uppercase tracking-wider text-sm">{t.author}</p>
                                <p className="text-xs font-mono text-muted-foreground pt-1">{t.role}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
