"use client";

import { Button } from "@/components/ui/button";
import {
    Building2,
    Search,
    Zap,
    ArrowRight,
    ChevronRight,
    Stars,
    Globe,
    Database,
    BarChart4,
    Layers,
    Layout,
    ListFilter,
    Bookmark,
    Settings,
    MousePointer2,
    Mail,
    Linkedin,
    Github
} from "lucide-react";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LandingPage() {
    const [activeTab, setActiveTab] = useState('shell');

    const platformModules = [
        {
            id: 'shell',
            name: 'Unified App Shell',
            path: 'Global UI',
            icon: Layout,
            color: 'text-primary',
            description: 'The persistent command center of the platform. Features a viewport-locked sidebar for rapid navigation and a global search header with reactive keyboard shortcuts for instant company access.',
            bullets: ['Fixed Sidebar & Header', 'Cmd+K / "/" Search Focus', 'Mobile Drawer System']
        },
        {
            id: 'companies',
            name: 'Discovery Engine',
            path: '/companies',
            icon: Building2,
            color: 'text-blue-400',
            description: 'The central hub for scouting. Filter thousands of companies using your fund\'s unique AI-driven thesis score and faceted search parameters.',
            bullets: ['Faceted Filtering', 'AI-Driven Thesis Scoring', 'Real-time Search']
        },
        {
            id: 'lists',
            name: 'Intelligence Lists',
            path: '/lists',
            icon: ListFilter,
            color: 'text-purple-400',
            description: 'Strategic curation made simple. Organize high-signal companies into custom collections for deep review, team collaboration, and structured data exporting.',
            bullets: ['Custom Colections', 'CSV/JSON Export', 'Collaborative Curation']
        },
        {
            id: 'saved',
            name: 'Saved Intelligence',
            path: '/saved',
            icon: Bookmark,
            color: 'text-amber-400',
            description: 'Always-on monitoring. Save complex search queries and market segments to re-run them with a single click as new companies emerge.',
            bullets: ['Query Persistence', 'One-click Re-run', 'Market Monitoring']
        },
        {
            id: 'settings',
            name: 'Thesis Workspace(Future Scope)',
            path: '/settings',
            icon: Settings,
            color: 'text-emerald-400',
            description: 'The brain of your scout. Configure investment stages, focus geographies, and tech pillars to guide the AI\'s scoring logic across the entire platform. (Functional Mock)',
            bullets: ['Thesis Configuration', 'Scout Depth Settings', 'AI Behavior Control']
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 scroll-smooth">
            {/* Background Hero Asset */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
                <img
                    src="/C:/Users/anupa/.gemini/antigravity/brain/f3aba2b6-14c5-4179-822a-e2bfea27bdf7/landing_page_hero_background_1771776589803.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover scale-110 animate-pulse duration-[10000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
            </div>

            <div className="relative z-10 w-full">
                {/* Navigation */}
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center bg-transparent">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Zap className="h-5 w-5 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">Scout.ai</span>
                    </Link>
                    <Link href="/companies">
                        <Button variant="ghost" size="sm" className="text-xs font-medium hover:bg-white/10 uppercase tracking-widest">
                            Workspace <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </Link>
                </nav>

                {/* Unified Command Center (Hero + Explorer) */}
                <main className="container mx-auto px-6 h-[calc(100vh-64px)] min-h-[750px] flex flex-col justify-center">
                    {/* Compact Hero */}
                    <header className="text-center mb-10 mt-[-20px]">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-primary mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700 uppercase tracking-widest">
                            <Stars className="h-3 w-3" />
                            <span>Precision Intelligence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
                            Intelligence For The <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary/80">
                                Modern Fund
                            </span>
                        </h1>
                        <div className="flex flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                            <Link href="/companies">
                                <Button size="sm" className="h-10 px-6 text-sm font-bold rounded-xl bg-primary text-primary-foreground hover:scale-105 transition-transform">
                                    Enter Workspace <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="sm" className="h-10 px-6 text-sm font-bold rounded-xl border border-white/10 hover:bg-white/5">
                                Watch Demo
                            </Button>
                        </div>

                        <p className="text-primary flex justify-center items-center mx-auto px-6 py-4 bg-transparent text-center">
                            Workflow: Discover Companies &rarr; Open Profile &rarr; Enrich &rarr; Take action.
                        </p>
                    </header>

                    {/* Platform Explorer Section - Now integrated high-up */}
                    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-400">
                        {/* Navigation Tabs */}
                        <div className="lg:col-span-4 flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                            {platformModules.map((module) => (
                                <button
                                    key={module.id}
                                    onClick={() => setActiveTab(module.id)}
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left min-w-[180px] lg:min-w-0 border duration-200 group",
                                        activeTab === module.id
                                            ? "bg-white/10 border-white/10 shadow-lg text-white"
                                            : "bg-transparent border-transparent text-muted-foreground hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <module.icon className={cn(
                                        "h-4 w-4 transition-transform group-hover:scale-110",
                                        activeTab === module.id ? module.color : "text-muted-foreground"
                                    )} />
                                    <div className="flex-1">
                                        <div className="text-xs font-bold leading-none mb-0.5">{module.name}</div>
                                        <div className="text-[9px] opacity-70 font-mono tracking-wider leading-none">{module.path}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Content Display */}
                        <div className="lg:col-span-8 h-full min-h-[300px] p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group flex flex-col justify-center">
                            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                {(() => {
                                    const Icon = platformModules.find(m => m.id === activeTab)?.icon || Layout;
                                    return <Icon className="h-40 w-40 text-white" />;
                                })()}
                            </div>

                            {platformModules.map((module) => (
                                activeTab === module.id && (
                                    <div key={module.id} className="relative z-10 animate-in fade-in zoom-in-95 duration-500">
                                        <div className={cn("inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest mb-4", module.color)}>
                                            <module.icon className="h-3 w-3" />
                                            {module.name}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3">{module.name}</h3>
                                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-lg">
                                            {module.description}
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                                            {module.bullets.map((bullet, i) => (
                                                <div key={i} className="flex items-center gap-2 text-[11px] text-white/70 uppercase tracking-tight font-medium">
                                                    <div className={cn("h-1 w-1 rounded-full shrink-0", module.id === activeTab ? platformModules.find(m => m.id === activeTab)?.color.replace('text-', 'bg-') : 'bg-primary')} />
                                                    {bullet}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </main>

                {/* The Discovery Lifecycle - Pushed to Second Fold */}
                <section className="container mx-auto px-6 py-16 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">The Discovery Lifecycle</h2>
                        <p className="text-muted-foreground">Precision scouting in three coordinated phases.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group">
                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Database className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">1. Set Your Thesis</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Define your ideal stage, technology pillars, and geography in Workspace Settings.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group text-sm">
                            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-blue-400">
                                <Search className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">2. Discover Signal</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                Browse our directory with faceted filters. Every company is scored against your unique fund thesis.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group text-sm">
                            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-emerald-400">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">3. AI Enrichment</h3>
                            <p className="text-muted-foreground leading-relaxed text-sm">
                                One click to perform deep-web scraping. Surface summaries, capabilities, and hiring signals instantly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Future Scope Section */}
                <section className="container mx-auto px-6 py-24 bg-white/5 rounded-[40px] mb-24 border border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Future Vision</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                We're building the infrastructure for the next generation of data-driven funds.
                                Our roadmap extends beyond search into the entire investment lifecycle.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-6 w-6 rounded flex items-center justify-center bg-primary/20 text-primary">
                                        <BarChart4 className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-white/90">Portfolio Health & Signal Monitoring</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-6 w-6 rounded flex items-center justify-center bg-blue-500/20 text-blue-400">
                                        <Globe className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-white/90">Semantic Market Mapping</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-6 w-6 rounded flex items-center justify-center bg-emerald-500/20 text-emerald-400">
                                        <Layers className="h-4 w-4" />
                                    </div>
                                    <span className="font-medium text-white/90">Deep CRM & Portfolio Stack Sync</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative p-12 rounded-3xl bg-black border border-white/10 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="space-y-4 relative z-10">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[80%] bg-primary animate-pulse" />
                                </div>
                                <div className="h-2 w-[60%] bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[40%] bg-blue-500 animate-pulse delay-75" />
                                </div>
                                <div className="h-2 w-[90%] bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[70%] bg-emerald-500 animate-pulse delay-150" />
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Always Syncing Intelligence</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}

                <footer className="container mx-auto px-6 py-12 border-t border-white/5 text-center text-muted-foreground text-sm">
                    <p>
                        © 2026 Scout.ai. All rights reserved. Developed By:{" "}
                        <span className="font-semibold text-white">Anupam Singh</span>
                    </p>
                    <div className="flex justify-center gap-6 mt-4">
                        <a
                            href="anupamsingh584210@gmail.com"
                            className="hover:text-white transition-colors flex items-center gap-2"
                            aria-label="Email"
                        >
                            <Mail size={18} /> <span>Email</span>
                        </a>
                        <a
                            href="www.linkedin.com/in/anupam-singh-04619024b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center gap-2"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={18} /> <span>LinkedIn</span>
                        </a>
                        <a
                            href="https://github.com/Anupam-Sing-h"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center gap-2"
                            aria-label="GitHub"
                        >
                            <Github size={18} /> <span>GitHub</span>
                        </a>
                    </div>
                </footer>

            </div>
        </div>
    );
}
