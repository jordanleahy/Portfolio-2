import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "Background, design process, and tools. Product Design Engineer with experience at SmarterDx, PrescriberPoint, BCG X, and Definitive Healthcare.",
};

export default function AboutPage() {
  return <AboutContent />;
}
