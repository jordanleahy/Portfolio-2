"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { SITE_DATA } from "@/lib/data";
import { Button } from "./ui/Button";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "Work", href: "/#work" },
        { name: "LinkedIn", href: "https://www.linkedin.com/in/jordanleahy/", external: true },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 bg-black/50 backdrop-blur-lg border-b border-white/5" : "py-6 bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold font-display uppercase tracking-wider z-50 relative">
                        Jordan Leahy
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="text-sm font-mono tracking-widest text-muted-foreground hover:text-white transition-colors uppercase"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-mono text-green-500 uppercase">Open to Work</span>
                        </div>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Interaction Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-black flex flex-col justify-center px-6"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                >
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-4xl font-display font-medium text-white hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <Button size="lg" className="w-full text-lg py-8" onClick={() => window.location.href = `mailto:${SITE_DATA.hero.email}`}>
                                    Let's Talk <ArrowRight className="ml-2" />
                                </Button>
                            </motion.div>
                        </div>

                        {/* Mobile Footer Deco */}
                        <div className="absolute bottom-10 left-6 right-6 flex justify-between text-muted-foreground text-xs font-mono uppercase">
                            <span>Brooklyn, NY</span>
                            <span>{new Date().getFullYear()}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
