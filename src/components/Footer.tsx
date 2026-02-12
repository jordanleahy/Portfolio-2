import Link from "next/link";
import { SITE_DATA } from "@/lib/data";

export function Footer() {
    return (
        <footer className="py-20 px-6 md:px-20 border-t border-white/5 bg-black">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div>
                    <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2 text-white/90">Let's Create Impact</h2>
                    <Link
                        href={`mailto:${SITE_DATA.footer.email}`}
                        className="text-xl text-muted-foreground hover:text-primary transition-colors border-b border-white/10 hover:border-primary pb-1"
                    >
                        {SITE_DATA.footer.email}
                    </Link>
                </div>

                <div className="flex gap-8 text-sm font-mono text-muted-foreground">
                    <Link href={SITE_DATA.footer.linkedin} className="hover:text-secondary transition-colors uppercase tracking-wider">LinkedIn</Link>
                    <Link href="#" className="hover:text-secondary transition-colors uppercase tracking-wider">Twitter</Link>
                    <span className="opacity-50">© {new Date().getFullYear()} Jordan Leahy</span>
                </div>
            </div>
        </footer>
    );
}
