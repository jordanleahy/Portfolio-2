"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE_DATA } from "@/lib/data";

export function BlogSection() {
    return (
        <section className="py-24 px-6 md:px-20 bg-background border-t border-white/5" id="blog">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Thoughts</h2>
                        <p className="text-muted-foreground max-w-xl">
                            Notes on design engineering, AI workflows, and the future of product development.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SITE_DATA.blogPosts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={post.link} className="group block h-full">
                                <article className="flex flex-col h-full bg-neutral-900/50 hover:bg-neutral-900 border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-300">
                                    <div className="relative aspect-[16/9] overflow-hidden">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-4">
                                            <span>{post.date}</span>
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors flex items-start gap-2">
                                            {post.title}
                                            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-1" />
                                        </h3>

                                        <p className="text-muted-foreground text-sm line-clamp-3 mb-6">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-white/5">
                                            <span className="text-sm font-medium text-primary flex items-center gap-2">
                                                Read Article
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
