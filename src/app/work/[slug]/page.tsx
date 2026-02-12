import CaseStudyWrapper from "@/components/case-study/CaseStudyWrapper";
import { SITE_DATA } from "@/lib/data";

export async function generateStaticParams() {
    return SITE_DATA.caseStudies.map(p => ({
        slug: p.slug,
    }));
}

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug;
    return <CaseStudyWrapper slug={slug} />;
}
