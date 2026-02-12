"use client";

import { SITE_DATA } from "@/lib/data";
import { motion } from "framer-motion";

export function LogoTicker() {
    return (
        <section className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
                <p className="text-sm font-mono uppercase text-muted-foreground tracking-widest">
                    Trusted by Innovative Healthcare Teams
                </p>
            </div>

            <div className="flex overflow-hidden relative">
                <div className="flex gap-16 items-center flex-nowrap min-w-full">
                    <motion.div
                        className="flex gap-16 items-center flex-shrink-0"
                        animate={{ x: "-100%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...SITE_DATA.experience, ...SITE_DATA.experience, ...SITE_DATA.experience].map((logo, i) => (
                            <div key={i} className="text-2xl font-bold font-display text-white/40 whitespace-nowrap hover:text-white transition-colors cursor-default">
                                {/* Text fallback for now since we don't have SVGs */}
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                    <motion.div
                        className="flex gap-16 items-center flex-shrink-0"
                        animate={{ x: "-100%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {[...SITE_DATA.experience, ...SITE_DATA.experience, ...SITE_DATA.experience].map((logo, i) => (
                            <div key={i + 'clone'} className="text-2xl font-bold font-display text-white/40 whitespace-nowrap hover:text-white transition-colors cursor-default">
                                {logo.name}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
            </div>
        </section>
    );
}
