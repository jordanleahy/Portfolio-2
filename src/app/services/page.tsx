import type { Metadata } from "next";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Product design consulting for healthcare and AI companies. From clinical workflow design to AI interface strategy.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
