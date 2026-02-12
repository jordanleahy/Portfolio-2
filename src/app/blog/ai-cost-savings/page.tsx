"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32">
            <article className="max-w-3xl mx-auto px-6 mb-20">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Thoughts
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            The $360 Billion Opportunity: Why Clinical AI is Finally Paying Off
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                            <span>Jan 31, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>Industry Intelligence</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>5 min read</span>
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative aspect-[16/9] mb-16 rounded-2xl overflow-hidden border border-white/10"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop"
                        alt="Financial analytics dashboard in medical setting"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-2xl text-white/90 font-light mb-8">
                        The narrative around AI in healthcare often swings between "it will replace doctors" and "it's all hype." But if you follow the money, a different story emerges: AI isn't just a cool tech demo—it's the financial life raft hospitals desperately need.
                    </p>

                    <p>
                        Recent intelligence reports from 2024 and 2025 paint a staggering picture of the economic impact of clinical AI. As a Product Design Engineer building these tools, I see the gap between "potential savings" and "realized value" every day. Here is what the data says.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">The $360 Billion Number</h2>
                    <p>
                        According to <a href="https://www.mckinsey.com" target="_blank" className="text-primary hover:underline">McKinsey</a>, the wider adoption of AI and automation could reduce annual US healthcare spending by <strong>$200 billion to $360 billion</strong>.
                    </p>
                    <p>
                        Where is this money coming from? It's not about firing nurses. It's about automating the administrative sludge that drowns them.
                    </p>
                    <ul className="list-disc pl-6 space-y-4 text-muted-foreground my-8">
                        <li><strong>Revenue Cycle Management (RCM):</strong> Automating coding and billing can save billions in denied claims.</li>
                        <li><strong>Supply Chain:</strong> Morgan Stanley reports that AI tools can drive <strong>10-20% cost savings</strong> in supply chain and staffing efficiencies.</li>
                        <li><strong>Clinical Operations:</strong> Reducing length-of-stay (LOS) by even 20% via AI-assisted surgery and recovery planning translates to <strong>$40 billion</strong> annually.</li>
                    </ul>

                    <div className="bg-neutral-900 border border-white/5 p-8 rounded-xl my-12">
                        <h3 className="text-xl font-bold mb-4 text-green-400">Real-World Case: Ambient Documentation</h3>
                        <p className="mb-0">
                            The most tangible win right now is "Ambient AI"—tools that listen to patient visits and write the notes automatically.
                            <br /><br />
                            <strong>Valley Children's Hospital</strong> reported a <strong>93% reduction</strong> in charting time (from 15 minutes down to &lt; 1 minute). This doesn't just save money; it stops burnout.
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold mt-16 mb-6">The Design Challenge</h2>
                    <p>
                        So if the savings are so clear, why isn't everyone rich?
                    </p>
                    <p>
                        Because <strong>integration is hard</strong>. An algorithm that predicts Sepsis with 99% accuracy is worthless if it pings a nurse 50 times an hour with false alarms. This is where Product Design comes in.
                    </p>
                    <p>
                        My work focuses on the "Last Mile" of AI value—the interface.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">The Future is "Actionable"</h2>
                    <p>
                        The hospitals that realize these billions in savings won't be the ones with the best models. They will be the ones with the best <strong>workflows</strong>.
                    </p>
                    <p>
                        We are leaving the era of "Predictive AI" (telling you what might happen) and entering the era of "Actionable AI" (teeing up the solution for one-click approval). That is where the $360 billion lives.
                    </p>
                </div>
            </article>

            <Footer />
        </main>
    );
}
