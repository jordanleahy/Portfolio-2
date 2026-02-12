"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { BlogCitations } from "@/components/BlogCitations";

export default function BlogPost() {
    return (
        <main className="min-h-screen bg-background text-foreground pt-32">
            <article className="max-w-3xl mx-auto px-6 mb-20">
                {/* Header */}
                <div className="mb-12">
                    <Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Intelligence
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            The "Good Enough" Trap: Why 98% Accuracy is Bankrupting Hospitals
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                            <span>Feb 5, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>Market Intel</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>7 min read</span>
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
                        src="/blog/blog_intel_forensics.png"
                        alt="Competitive Intelligence Analysis"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-2xl text-white/90 font-light mb-8">
                        Our intelligence agents flagged a disturbing trend in Q1 2026: "Generic AI" vendors are claiming 98% code capture rates. Yet, hospital denial rates are rising 15%. What is happening?
                    </p>

                    <p>
                        I deployed our <code>competitor-intel</code> MCP to analyze the discrepancy between Vendor Claimed Accuracy and Actual Net Revenue. The results highlight a critical flaw in how the industry defines "accuracy."
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">The "Low Hanging Fruit" Fallacy</h2>
                    <p>
                        The data shows that generic LLMs (Vendor A, Vendor B) are excellent at capturing obvious codes: The hypertension, the diabetes, the fractured arm. These are the "98%."
                    </p>
                    <p>
                        But in hospital billing, the <strong>Pareto Principle</strong> is inverted:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-8">
                        <li><strong>98% of codes</strong> account for <strong>20% of revenue variance</strong>.</li>
                        <li><strong>2% of codes</strong> (the complex, nuanced cases) account for <strong>80% of revenue variance</strong>.</li>
                    </ul>
                    <p>
                        When a vendor misses that subtle "Encephalopathy" because the doctor only wrote "Status change: confused," they didn't just miss a word. They missed a Comorbidity (CC) that could shift the DRG weight by $4,000.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">Design Implication: The "Missing" Tab</h2>
                    <p>
                        This intel drives my UI strategy. I don't design for the 98%. I design for the 2%.
                    </p>
                    <p>
                        In the new SmarterDx "Clinical Synthesis" view, I built a specific module called "The Missing Tab." It isolates the discrepancy between the EMR's auto-generated list and our AI's findings.
                    </p>

                    <div className="bg-neutral-900 border border-white/5 p-8 rounded-xl my-12">
                        <h3 className="text-xl font-bold mb-4 text-red-400">Intelligence Brief: Vendor A vs. SmarterDx</h3>
                        <p className="mb-0">
                            <strong>Vendor A (Generic):</strong> "Patient has Pneumonia." (DRG 195)<br />
                            <strong>SmarterDx (Nuance):</strong> "Patient has Pneumonia AND Gram-negative bacteria in culture -&gt; Gram-negative Pneumonia." (DRG 193)<br />
                            <br />
                            <strong>Impact:</strong> +$2,800 Reimbursement.
                        </p>
                    </div>

                    <p>
                        This is why we frame our product not as "Automation," but as "Revenue Integrity." The goal isn't to speed up the easy stuff. It's to catch the expensive stuff.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">Conclusion</h2>
                    <p>
                        If your AI strategy is focused on high-volume automation, you are solving the wrong problem. The money is in the nuance. And nuance requires a system designed to look for what isn't obvious.
                    </p>

                    <BlogCitations citations={[
                        {
                            title: "Competitor Analysis: Generic AI Vendor Capabiltiies",
                            source: "Internal Intelligence Report #402",
                            url: "#",
                            year: "2026"
                        },
                        {
                            title: "Q1 2026 Denial Rate Trends Report",
                            source: "HFMA / SmarterDx Data Lake",
                            url: "#",
                            year: "2026"
                        },
                        {
                            title: "The Financial Impact of Clinical Nuance",
                            source: "Advisory Board",
                            url: "#",
                            year: "2025"
                        }
                    ]} />
                </div>
            </article>

            <Footer />
        </main>
    );
}
