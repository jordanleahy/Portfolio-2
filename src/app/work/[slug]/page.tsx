import type { Metadata } from "next";
import CaseStudyWrapper from "@/components/case-study/CaseStudyWrapper";
import { SITE_DATA } from "@/lib/data";

export async function generateStaticParams() {
    return SITE_DATA.caseStudies.map(p => ({
        slug: p.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = (await params).slug;
    const study = SITE_DATA.caseStudies.find((cs) => cs.slug === slug);
    if (!study) return {};
    return {
        title: `${study.subtitle} — ${study.title}`,
        description: study.description,
        openGraph: {
            title: `${study.subtitle} — ${study.title}`,
            description: study.description,
            images: study.image ? [study.image] : undefined,
        },
    };
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug;
    return <CaseStudyWrapper slug={slug} />;
}
