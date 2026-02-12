"use client";

import { useState } from "react";
import { PasswordGate } from "./PasswordGate";
import { ScrollyTellingLayout } from "./ScrollyTellingLayout";
import { SITE_DATA } from "@/lib/data";
import { notFound } from "next/navigation";

// Utility to find project
function getProject(slug: string) {
    return SITE_DATA.caseStudies.find(p => p.slug === slug);
}

export default function CaseStudyWrapper({ slug }: { slug: string }) {
    const project = getProject(slug);

    // 1. Handle Not Found
    if (!project) {
        return notFound();
    }

    // 2. Handle Password State
    const [isLocked, setIsLocked] = useState(project.locked);

    if (isLocked) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
                {/* Blurry background of the actual project to tease content */}
                <div className="absolute inset-0 z-0 opacity-20 blur-xl pointer-events-none scale-110">
                    {project.image && <img src={project.image} className="w-full h-full object-cover" alt="" />}
                </div>

                <PasswordGate
                    correctPassword={project.password}
                    onUnlock={() => setIsLocked(false)}
                />
            </div>
        );
    }

    // 3. Render Content
    return <ScrollyTellingLayout project={project} />;
}
