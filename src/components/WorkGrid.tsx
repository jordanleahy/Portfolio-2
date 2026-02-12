"use client";

import { SITE_DATA } from "@/lib/data";
import { motion } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function WorkGrid() {
    return (
        <section className="py-24 px-6 md:px-20" id="work">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                        Selected Work
                    </h2>
                    <span className="hidden md:block font-mono text-muted-foreground">
                        (2023 - 2025)
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {SITE_DATA.caseStudies.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`group relative ${index % 2 === 1 ? "md:translate-y-24" : "md:translate-y-0"}`}
                        >
                            <Link href={`/work/${project.slug}`} className="block">
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted mb-6 border border-white/5 group-hover:border-primary/50 transition-colors duration-500">
                                    {/* Image Placeholder or Real Image */}
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-muted-foreground">
                                            No Image
                                        </div>
                                    )}

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                                    {/* Locked Badge */}
                                    {project.locked && (
                                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                                            <Lock className="w-3 h-3 text-yellow-400" />
                                            <span className="text-xs font-mono font-medium uppercase text-white/90">Locked Case</span>
                                        </div>
                                    )}

                                    {/* Hover Action */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20">
                                            <ArrowUpRight className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl md:text-3xl font-bold font-sans group-hover:text-primary transition-colors">
                                            {project.subtitle}
                                        </h3>
                                        <span className="font-mono text-xs text-muted-foreground border border-white/10 px-2 py-1 rounded">
                                            CASE 0{index + 1}
                                        </span>
                                    </div>
                                    <p className="text-lg text-muted-foreground line-clamp-2 max-w-md">
                                        {project.title}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.tags.map((tag, i) => (
                                            <span key={`${tag}-${i}`} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
