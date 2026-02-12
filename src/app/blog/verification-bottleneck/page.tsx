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
                            The Verification Bottleneck: Why AI Needs Human Velocity
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                            <span>Jan 30, 2026</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>Product Design</span>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span>4 min read</span>
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
                        src="/blog/smarterdx-dashboard.png"
                        alt="SmarterDx Interface Dashboard"
                        fill
                        className="object-cover"
                    />
                </motion.div>

                {/* Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="lead text-2xl text-white/90 font-light mb-8">
                        In the world of Clinical AI, there is a dangerous misconception: that the hard part is building the model. It isn't. The hard part is building the trust.
                    </p>

                    <p>
                        At SmarterDx, I worked on an LLM product that could read patient charts (EMRs) and identify missed diagnoses—revenue that hospitals were leaving on the table. The AI was brilliant. It could find a missing "Sepsis" diagnosis buried in a nursing note from day 3 of a 14-day stay.
                    </p>
                    <p>
                        But when the first version of the review interface shipped, it failed. Not because the AI was wrong, but because the <strong>UX was asking the wrong question</strong>.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">1. The Signal (Detection is Cheap)</h2>
                    <p>
                        The model operated on 100% of discharges. For every 10,000 patients, it might flag 1,000 potential opportunities. That's a massive amount of signal.
                    </p>
                    <p>
                        From an engineering perspective, this was a triumph. The team created a "Super-Reviewer" that never sleeps. But for the Clinical Documentation Integrity (CDI) nurses who had to review these findings, it was a nightmare. The interface essentially dumped a haystack on their desk and said, "There are needles in here. Good luck."
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">2. The Noise (Search vs. Review)</h2>
                    <p>
                        The initial UI design followed a traditional "Search" paradigm. It showed a list of patients and a tag: <code>Potential Sepsis</code>.
                    </p>
                    <p>
                        When a user clicked, the app opened the patient chart. The user then had to do exactly what they did before AI: read. They had to scroll through days of progress notes, lab results, and vitals to find the evidence that triggered the algorithm.
                    </p>
                    <p>
                        <strong>This was the failure.</strong> I realized the tool wasn't saving them time; it was just shifting their attention. The time-to-validate (TTV) was still hovering around 8-12 minutes per chart. In a pre-bill environment, where every hour counts before the claim goes out, this friction was fatal.
                    </p>

                    <h2 className="text-3xl font-bold mt-16 mb-6">3. The Bottleneck (Velocity is Trust)</h2>
                    <p>
                        I identified that the bottleneck wasn't the AI's detection capability—it was the speed of human verification. To scale, we didn't need better AI; we needed a faster human loop.
                    </p>
                    <p>
                        I led a redesign that shifted the paradigm from <strong>"Search"</strong> to <strong>"Verification"</strong>.
                    </p>
                    <p>
                        Instead of just flagging "Sepsis", my new "Synthesis Engine" UI extracted the exact snippets of evidence that triggered the flag:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground my-8">
                        <li><span className="text-white">White Blood Cell Count:</span> 14.5 (High) @ 02:00 AM</li>
                        <li><span className="text-white">Vitals:</span> Fever 101.3°F @ 02:15 AM</li>
                        <li><span className="text-white">Doctor's Note:</span> "Suspect infection, starting Vanc..."</li>
                    </ul>
                    <p>
                        I designed the card to present these 3 datapoints front-and-center. The user didn't have to open the chart. They just had to look at the card and click "Agree" or "Disagree".
                    </p>

                    <div className="bg-neutral-900 border border-white/5 p-8 rounded-xl my-12">
                        <h3 className="text-xl font-bold mb-4 text-green-400">The Result</h3>
                        <p className="mb-0">
                            Review time dropped from <strong>12 minutes</strong> to <strong>45 seconds</strong>.
                            <br /><br />
                            By respecting the user's attention and doing the "pre-reading" for them, my design turned a specialized forensic task into a high-velocity verification workflow. I helped transform the product from a "Scanner" into a "Revenue Engine."
                        </p>
                    </div>

                    <p>
                        As Product Design Engineers effectively leveraging AI, our job isn't just to expose the model's output. It's to design the <strong>interface of trust</strong> that allows humans to accept that output at speed.
                    </p>
                </div>
            </article>

            <Footer />
        </main>
    );
}
