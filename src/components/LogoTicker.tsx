"use client";

import { SITE_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export function LogoTicker() {
    return (
        <section className="py-12 border-y border-white/5 bg-black overflow-hidden relative z-10">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
                <p className="text-sm font-mono uppercase text-secondary/50 tracking-[0.2em] flex items-center justify-center md:justify-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                    Trusted by Innovative Healthcare Teams
                </p>
            </div>

            <div className="flex overflow-hidden relative mask-image-linear-to-r">
                <div className="flex gap-20 items-center flex-nowrap min-w-full">
                    <motion.div
                        className="flex gap-20 items-center flex-shrink-0"
                        animate={{ x: "-100%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...SITE_DATA.experience, ...SITE_DATA.experience, ...SITE_DATA.experience].map((logo, i) => (
                            <div key={i} className="text-3xl font-bold font-display text-white/20 whitespace-nowrap hover:text-white/80 transition-all duration-500 cursor-default uppercase tracking-tighter">
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex gap-20 items-center flex-shrink-0"
                        animate={{ x: "-100%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...SITE_DATA.experience, ...SITE_DATA.experience, ...SITE_DATA.experience].map((logo, i) => (
                            <div key={i + 'clone'} className="text-3xl font-bold font-display text-white/20 whitespace-nowrap hover:text-white/80 transition-all duration-500 cursor-default uppercase tracking-tighter">
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
            </div>
        </section>
    );
}
