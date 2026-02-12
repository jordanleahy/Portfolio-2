"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const TOOL_ICONS: Record<string, React.ReactNode> = {
    "Figma": (
        <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
            <path d="M19 28.5C19 25.874 21.127 23.75 23.75 23.75H28.5V28.5C28.5 31.124 26.376 33.25 23.75 33.25C21.127 33.25 19 31.124 19 28.5Z" fill="#0ACF83" />
            <path d="M0 47.5C0 42.253 4.253 38 9.5 38H19V47.5C19 52.747 14.747 57 9.5 57C4.253 57 0 52.747 0 47.5Z" fill="#0ACF83" />
            <path d="M19 0H28.5C33.747 0 38 4.253 38 9.5C38 14.747 33.747 19 28.5 19H19V0Z" fill="#FF7262" />
            <path d="M0 9.5C0 14.747 4.253 19 9.5 19H19V0H9.5C4.253 0 0 4.253 0 9.5Z" fill="#F24E1E" />
            <path d="M0 28.5C0 33.747 4.253 38 9.5 38H19V19H9.5C4.253 19 0 23.253 0 28.5Z" fill="#A259FF" />
        </svg>
    ),
    "FigJam": (
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
            <path d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0Z" fill="#FF7262" />
            <path d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0Z" fill="url(#paint0_linear_figjam)" />
            <path d="M24 37.5C30.9036 37.5 36.5 31.9036 36.5 25V24C36.5 17.0964 30.9036 11.5 24 11.5C17.0964 11.5 11.5 17.0964 11.5 24V25C11.5 31.9036 17.0964 37.5 24 37.5Z" fill="white" />
            <path d="M28.5 21C28.5 21.8284 27.8284 22.5 27 22.5C26.1716 22.5 25.5 21.8284 25.5 21C25.5 20.1716 26.1716 19.5 27 19.5C27.8284 19.5 28.5 20.1716 28.5 21Z" fill="#1E1E1E" />
            <path d="M22.5 21C22.5 21.8284 21.8284 22.5 21 22.5C20.1716 22.5 19.5 21.8284 19.5 21C19.5 20.1716 20.1716 19.5 21 19.5C21.8284 19.5 22.5 20.1716 22.5 21Z" fill="#1E1E1E" />
            <defs>
                <linearGradient id="paint0_linear_figjam" x1="24" y1="0" x2="24" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EB4C5F" />
                    <stop offset="1" stopColor="#F89D86" />
                </linearGradient>
            </defs>
        </svg>
    ),
    "Jira": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
            <path d="M11.505 21.9893L12.001 22.4833L12.495 21.9893C11.505 21.9893 11.505 21.9893 11.505 21.9893Z" fill="#2684FF" />
            <path d="M11.967 2.01074L6.99304 6.98474L12.001 11.9927L17.007 6.98474L12.033 2.01074C12.015 1.99274 11.985 1.99274 11.967 2.01074Z" fill="#2684FF" />
            <path d="M12.001 12.57L6.99201 17.579L12.001 22.587L17.007 17.579L12.001 12.57Z" fill="#2684FF" />
            <path d="M11.967 2L2 11.967L12.001 21.967L12.033 2L11.967 2Z" fill="url(#paint0_linear_jira)" />
            <defs>
                <linearGradient id="paint0_linear_jira" x1="12" y1="2" x2="12" y2="21.967" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0052CC" />
                    <stop offset="1" stopColor="#2684FF" />
                </linearGradient>
            </defs>
            <path d="M11.967 2C11.985 1.982 12.015 1.982 12.033 2L21.984 11.951L22 11.967L12.001 21.966L11.967 2Z" fill="#0052CC" />
        </svg>
    ),
    "Product Discovery": (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-orange-400">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    ),
    "VS Code": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
            <path d="M17.6875 3.03369L5.3225 12.0673L17.5323 21.1009L17.6875 3.03369Z" fill="#007ACC" />
            <path d="M17.6875 3.03369L11.025 8.01602L17.5323 21.1009L17.6875 3.03369Z" fill="#007ACC" fillOpacity="0.8" />
        </svg>
    ),
    "Linear": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="#5E6AD2" />
            <path d="M14.9961 8.00586C14.9961 8.00586 10.6055 12.3965 9.00391 13.998C8.50266 14.4993 7.50027 15.5017 9.00391 14.998C10.5076 14.4944 14.9961 10.0059 14.9961 10.0059" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    "React": (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#20232A" />
            <ellipse cx="12" cy="12" rx="3.5" ry="8.5" transform="rotate(27 12 12)" stroke="#61DAFB" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="3.5" ry="8.5" transform="rotate(-27 12 12)" stroke="#61DAFB" strokeWidth="1" />
            <ellipse cx="12" cy="12" rx="3.5" ry="8.5" transform="rotate(90 12 12)" stroke="#61DAFB" strokeWidth="1" />
            <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
        </svg>
    )
};

interface Section {
    id: string;
    title: string;
    text: string;
    image?: string;
    video?: string;
    label?: string;
}

interface Team {
    role: string;
    responsibilities: string[];
    stakeholders: string[];
    duration: string;
    scope: string[];
    tools?: string[];
    image?: string;
}

interface ScrollyTellingLayoutProps {
    project: {
        title: string;
        slug: string;
        subtitle: string;
        tags: string[];
        preTeamSection?: Section;
        sections?: Section[];
        team?: Team;
    };
}

function TeamDetailsBlock({ team, index, setActiveIndex }: { team: Team, index: number, setActiveIndex: (n: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) setActiveIndex(index);
    }, [isInView, index, setActiveIndex]);

    const teamSections = [
        {
            title: "My Role",
            content: (
                <div className="space-y-2">
                    <p className="text-white font-medium text-lg">{team.role}</p>
                    <ul className="space-y-1">
                        {team.responsibilities.map((r, i) => (
                            <li key={i} className="text-base text-muted-foreground flex gap-2">
                                <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span className="leading-relaxed">{r}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            title: "Stakeholders",
            content: (
                <ul className="space-y-2">
                    {team.stakeholders.map((s, i) => (
                        <li key={i} className="text-base text-muted-foreground flex gap-2">
                            <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                            <span className="leading-relaxed">{s}</span>
                        </li>
                    ))}
                </ul>
            )
        },
        {
            title: "Scope",
            content: (
                <div className="space-y-2">
                    <p className="text-white font-medium text-lg">{team.duration}</p>
                    <ul className="space-y-1">
                        {team.scope.map((s, i) => (
                            <li key={i} className="text-base text-muted-foreground flex gap-2">
                                <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <span className="leading-relaxed">{s}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )
        },
        {
            title: "Tools",
            content: (
                <div className="flex flex-wrap gap-2">
                    {team.tools?.map((t, i) => (
                        <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 text-sm text-gray-300 font-mono hover:border-primary/50 hover:text-primary transition-colors">
                            {TOOL_ICONS[t] && (
                                <span className="opacity-90 shrink-0 flex items-center">{TOOL_ICONS[t]}</span>
                            )}
                            <span className="translate-y-[1px]">{t}</span>
                        </span>
                    ))}
                </div>
            )
        }
    ];

    return (
        <div ref={ref} className="min-h-screen flex flex-col justify-center py-20 px-6 md:pl-20 md:pr-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-12">
                    <span className="font-mono text-sm text-primary/80">0{index + 1}</span>
                    <div className="h-px w-12 bg-white/10" />
                    <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">The Team</span>
                </div>

                <div className="space-y-0">
                    {teamSections.map((section, i) => (
                        <div key={i} className={`relative pl-8 border-l pb-12 group transition-colors duration-500 ${i === teamSections.length - 1 ? 'border-transparent' : 'border-white/10 hover:border-primary/50'}`}>
                            <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-black border border-primary text-primary flex items-center justify-center text-xs font-mono shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                {i + 1}
                            </span>
                            <div>
                                <h4 className="text-2xl font-bold text-white mb-4">{section.title}</h4>
                                <div>
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

function TextBlock({ title, label, text, index, setActiveIndex }: { title: string, label: string, text: string, index: number, setActiveIndex: (n: number) => void }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) setActiveIndex(index);
    }, [isInView, index, setActiveIndex]);

    return (
        <div ref={ref} className="min-h-screen flex flex-col justify-center py-20 px-6 md:pl-20 md:pr-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-2">
                    <span className="font-mono text-sm text-primary/80">0{index + 1}</span>
                    <div className="h-px w-12 bg-white/10" />
                    <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
                </div>

                <h3 className="text-4xl md:text-6xl font-bold mb-12 text-white/90">{title}</h3>

                {text.match(/^\d+\./) ? (
                    <div className="space-y-12 mt-8">
                        {text.split(/(?=\d+\.\s)/).map((item, i) => {
                            const [title, ...desc] = item.split(':');
                            const number = item.match(/^\d+/)?.[0];
                            const cleanTitle = title.replace(/^\d+\.\s/, '');
                            const cleanDesc = desc.join(':').trim();

                            return (
                                <div key={i} className="relative pl-6 border-l border-white/10 group hover:border-primary/50 transition-colors duration-500">
                                    <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-black border border-primary text-primary flex items-center justify-center text-xs font-mono shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                                        {number}
                                    </span>
                                    <div>
                                        {cleanDesc ? (
                                            <>
                                                <h4 className="text-2xl font-bold text-white mb-2">{cleanTitle}</h4>
                                                <div className="space-y-2 mt-2">
                                                    {cleanDesc.split('\n').filter(line => line.trim()).map((line, lineIdx) => {
                                                        const isBullet = line.trim().startsWith('•');
                                                        if (isBullet) {
                                                            return (
                                                                <div key={lineIdx} className="flex gap-2">
                                                                    <span className="text-primary mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                                    <span className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                                                                        {line.replace('•', '').trim()}
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <p key={lineIdx} className="text-white font-medium text-lg leading-relaxed max-w-xl">
                                                                {line.trim()}
                                                            </p>
                                                        );
                                                    })}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                {item.replace(/^\d+\.\s/, '')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed whitespace-pre-line font-light">
                        {text}
                    </p>
                )}
            </motion.div>
        </div>
    );
}

export function ScrollyTellingLayout({ project }: ScrollyTellingLayoutProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    // Construct the full list of scrollable items
    // Order: preTeamSection -> team -> sections
    const scrollItems: Array<{ type: 'team' | 'section', data: any, id: string }> = [];

    if (project.preTeamSection) {
        scrollItems.push({ type: 'section', data: project.preTeamSection, id: project.preTeamSection.id });
    }

    if (project.team) {
        scrollItems.push({ type: 'team', data: project.team, id: 'team-section' });
    }

    if (project.sections) {
        project.sections.forEach(s => scrollItems.push({ type: 'section', data: s, id: s.id }));
    }

    return (
        <div className="bg-background min-h-screen text-foreground">
            {/* Navigation */}
            <div className="fixed top-6 left-6 z-40">
                <Link href="/" className="inline-flex items-center gap-2 text-sm font-mono hover:text-primary transition-colors bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back to Work
                </Link>
            </div>

            {/* Intro Hero */}
            <section className={`min-h-[80vh] flex flex-col justify-center px-6 md:px-20 border-b border-white/5 py-20 ${project.slug === 'smarter-dx-iteration' ? 'md:grid md:grid-cols-2 md:gap-12 md:items-center' : ''}`}>
                <div className="flex flex-col justify-center items-start">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-6"
                    >
                        {project.subtitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl"
                    >
                        {project.title}
                    </motion.p>
                    <div className="flex gap-2 mt-8">
                        {project.tags.map(t => (
                            <span key={t} className="text-xs font-mono border border-white/20 px-3 py-1 rounded-full">{t}</span>
                        ))}
                    </div>
                </div>

                {project.slug === 'smarter-dx-iteration' && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="mt-12 md:mt-0 relative"
                    >
                        <div className="relative aspect-[4/3] w-full">
                            <Image
                                src="/case-studies/smarterdx-hero-devices.png"
                                alt={project.subtitle}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={95}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Split Screen Scrollytelling */}
            <div className="relative md:flex">
                {/* Left: Content */}
                <div className="w-full md:w-1/2 relative z-10 bg-background/90 md:bg-background">
                    {scrollItems.map((item, index) => {
                        if (item.type === 'team') {
                            return (
                                <TeamDetailsBlock
                                    key={item.id}
                                    index={index}
                                    setActiveIndex={setActiveIndex}
                                    team={item.data}
                                />
                            );
                        }
                        return (
                            <TextBlock
                                key={item.id}
                                index={index}
                                setActiveIndex={setActiveIndex}
                                title={item.data.title}
                                label={item.data.label || item.data.title}
                                text={item.data.text}
                            />
                        );
                    })}
                    {/* Footer space */}
                    <div className="h-[50vh]" />
                </div>

                {/* Right: Sticky Visuals */}
                <div className="hidden md:block w-1/2 h-screen sticky top-0 right-0 overflow-hidden bg-neutral-900 border-l border-white/5">
                    {scrollItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="absolute inset-0 flex items-center justify-center p-12"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{
                                opacity: activeIndex === index ? 1 : 0,
                                scale: activeIndex === index ? 1 : 0.95,
                                zIndex: activeIndex === index ? 10 : 0
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                            {/* Visual Container */}
                            <div className={`relative w-full bg-neutral-900 shadow-2xl ring-1 ring-white/10 max-h-[80vh] rounded-xl overflow-hidden ${item.type === 'team' ? 'aspect-video' : ''}`}>
                                {item.type === 'team' ? (
                                    <>
                                        {item.data.image ? (
                                            <Image
                                                src={item.data.image}
                                                alt="The Team"
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                quality={95}
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-500">
                                                <span className="text-6xl mb-4">📸</span>
                                                <span className="font-mono text-sm uppercase tracking-wider">Team Visual</span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {item.data.image && (item.data.image.startsWith('http') || item.data.image.startsWith('/')) ? (
                                            <Image
                                                src={item.data.image}
                                                alt={item.data.title}
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                className="w-full h-auto object-contain"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-800 text-neutral-500 aspect-video">
                                                <span>Visual for {item.id}</span>
                                            </div>
                                        )}

                                        {/* Caption Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-20">
                                            <p className="font-mono text-xs text-primary mb-1">Figure 0{index + 1}</p>
                                            <p className="font-medium text-white text-sm">{item.data.title}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
