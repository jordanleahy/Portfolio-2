"use client";

import { SITE_DATA } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

function ProjectCard({ project, index }: { project: any, index: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Subtle parallax on image
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="group relative w-full mb-32 last:mb-0"
        >
            <Link href={`/work/${project.slug}`} className="block relative">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 aspect-[16/9] md:aspect-[21/9]">
                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                    {/* Image with Parallax */}
                    <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-muted-foreground">
                                No Image
                            </div>
                        )}
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div className="space-y-4 max-w-3xl">
                            <div className="flex items-center gap-4">
                                <span className="font-mono text-sm text-secondary tracking-widest uppercase border border-secondary/20 px-2 py-1 rounded bg-secondary/10">
                                    Case 0{index + 1}
                                </span>
                                {project.locked && (
                                    <div className="bg-yellow-500/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-yellow-500/20">
                                        <Lock className="w-3 h-3 text-yellow-500" />
                                        <span className="text-xs font-mono font-medium uppercase text-yellow-500">Confidential</span>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-4xl md:text-6xl font-bold font-display text-white group-hover:text-primary transition-colors leading-tight">
                                {project.subtitle}
                            </h3>
                            <p className="text-xl text-muted-foreground line-clamp-2">
                                {project.title}
                            </p>
                        </div>

                        {/* Hover Action */}
                        <div className="hidden md:flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                            <span className="text-sm font-mono uppercase tracking-widest text-white">View Case</span>
                            <div className="bg-white text-black p-3 rounded-full">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tags below */}
                <div className="mt-6 flex flex-wrap gap-3">
                    {project.tags.map((tag: string, i: number) => (
                        <span key={`${tag}-${i}`} className="text-xs font-mono text-muted-foreground/60 border border-white/5 px-3 py-1.5 rounded-full hover:border-white/20 transition-colors">
                            {tag}
                        </span>
                    ))}
                </div>
            </Link>
        </motion.div>
    );
}

export function WorkGrid() {
    return (
        <section className="py-32 px-6 md:px-20 bg-black overflow-hidden" id="work">
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4"
                        >
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Intelligence</span>
                        </motion.h2>
                        <div className="h-1 w-24 bg-secondary rounded-full" />
                    </div>
                    <span className="hidden md:block font-mono text-muted-foreground mt-8 md:mt-0">
                        // ARCHITECTING CLINICAL CLARITY
                    </span>
                </div>

                <div className="flex flex-col">
                    {SITE_DATA.caseStudies.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
