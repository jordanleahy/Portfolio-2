import type { Metadata } from "next";
import { ContactContent } from "@/components/contact/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for full-time roles or consulting. Based in Brooklyn, NY.",
};

export default function ContactPage() {
  return <ContactContent />;
}
