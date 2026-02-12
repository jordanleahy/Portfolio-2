"use client";

import { SITE_DATA } from "@/lib/data";
import { Quote } from "lucide-react";

export function Testimonials() {
    return (
        <section className="py-24 px-6 md:px-20 bg-neutral-900/20">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-16 text-center">
                What People Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {SITE_DATA.testimonials.map((t, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-8 rounded-2xl relative">
                        <Quote className="w-10 h-10 text-primary/20 absolute top-6 left-6 -z-10" />
                        <p className="text-lg md:text-xl font-light italic text-gray-300 mb-8 leading-relaxed">
                            "{t.quote}"
                        </p>
                        <div className="flex items-center gap-4 mt-auto">
                            {t.image ? (
                                <img
                                    src={t.image}
                                    alt={t.author}
                                    className="w-12 h-12 rounded-full object-cover border border-white/10 flex-shrink-0"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
                            )}
                            <div>
                                <p className="font-bold text-white">{t.author}</p>
                                <p className="text-sm text-muted-foreground">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
