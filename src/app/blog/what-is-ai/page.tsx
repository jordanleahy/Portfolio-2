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
                        <ArrowLeft className="w-4 h-4" /> Back to Thoughts
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                            AI is Not a Doctor. It is a Detective.
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                            <span>Feb 2, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>Philosophy</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>6 min read</span>
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
                        src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop"
                        alt="AI analysis abstract visualization"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-2xl text-white/90 font-light mb-8">
                        Ask a layman what AI in healthcare does, and they imagine a robot surgeon. Ask a SmarterDx engineer, and they see something far more practical: <strong>The world's most relentless detective</strong>.
                    </p>

                    <p>
                        We founded SmarterDx on a premise that seems contradictory to the "AI Hype" cycle: AI shouldn't make the diagnosis. It's not there to replace the physician's judgment. It's there to ensure that judgment is <strong>capture, documented, and paid for</strong>.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">The "Clinical Nuance" Gap</h2>
                    <p>
                        Healthcare data is messy. A patient isn't a row in a database; they are 14 days of progress notes, messy labs, and fragmented nursing shifts.
                    </p>
                    <p>
                        Generic LLMs struggle here. They see keywords. But clinical reality is nuance:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-8">
                        <li><strong>The Keyword:</strong> "Heart Failure"</li>
                        <li><strong>The Nuance:</strong> Is it acute? Chronic? Systolic? Diastolic? Or is it just "Fluid Overload" from too much IV saline?</li>
                    </ul>
                    <p>
                        The difference between those words isn't semantics. It's thousands of dollars in reimbursement and a completely different care plan.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">Augmentation is the Strategy</h2>
                    <p>
                        My design philosophy at SmarterDx wasn't about "Automating" the Clinical Documentation Integrity (CDI) nurse. It was about <strong>Super-Powering</strong> them.
                    </p>
                    <p>
                        We built the AI to read 30,000 data points per chart. It connects dots that a human, tired at the end of a shift, might miss.
                    </p>

                    <div className="bg-neutral-900 border border-white/5 p-8 rounded-xl my-12">
                        <h3 className="text-xl font-bold mb-4 text-blue-400">The Feedback Loop</h3>
                        <p className="mb-0">
                            The AI says: <em>"I see a pattern of rising Creatinine and a Doctor's note about Lasix. Is this Acute Kidney Injury?"</em>
                            <br /><br />
                            The Human says: <em>"Yes. Good catch."</em> OR <em>"No, that's baseline for this patient."</em>
                        </p>
                    </div>

                    <p>
                        This is the "Second-Level Review." The AI is the detective that combs the scene. The clinician is the judge who issues the verdict.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">Conclusion</h2>
                    <p>
                        When we stop trying to make AI a "Doctor" and start treating it as a "Revenue Integrity Engine," the conversation shifts. We stop worrying about it "hallucinating" a diagnosis and start using it to "hallucinate" opportunities for humans to verify.
                    </p>
                    <p>
                        That is the difference between a tech demo and a product that generates $2.5M in net impact per hospital.
                    </p>

                    <BlogCitations citations={[
                        {
                            title: "AI in Health Care: The Hope, The Hype, The Promise, The Peril",
                            source: "National Academy of Medicine",
                            url: "#",
                            year: "2025"
                        },
                        {
                            title: "Generative AI in Healthcare: Emerging value propositions",
                            source: "McKinsey & Company",
                            url: "#",
                            year: "2024"
                        },
                        {
                            title: "Augmented Intelligence in Medicine",
                            source: "AMA Journal of Ethics",
                            url: "#",
                            year: "2023"
                        }
                    ]} />
                </div>
            </article>

            <Footer />
        </main>
    );
}
