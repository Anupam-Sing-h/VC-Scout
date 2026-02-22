"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Fingerprint,
    Globe,
    Zap,
    ShieldCheck,
    SlidersHorizontal,
    Cpu,
    Dna,
    BarChart3
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Workspace Settings</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your fund's investment thesis and scout configuration.
                </p>
            </div>

            {/* Fund Thesis Configuration */}
            <Card className="border-border bg-card/50">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Fingerprint className="h-5 w-5 text-primary" />
                        <CardTitle>Fund Thesis</CardTitle>
                    </div>
                    <CardDescription>
                        Define the criteria the AI Scout uses to score and rank discovered companies.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Stage */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                                <Zap className="h-3 w-3" />
                                Preferred Stages
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-primary text-primary-foreground">Seed</Badge>
                                <Badge variant="secondary" className="bg-primary text-primary-foreground">Series A</Badge>
                                <Badge variant="outline">Series B+</Badge>
                            </div>
                        </div>

                        {/* Geography */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                                <Globe className="h-3 w-3" />
                                Focus Geographies
                            </label>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-primary text-primary-foreground">North America</Badge>
                                <Badge variant="secondary" className="bg-primary text-primary-foreground">Europe</Badge>
                                <Badge variant="outline">APAC</Badge>
                            </div>
                        </div>
                    </div>

                    {/* Tech Pillars */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1.5">
                            <SlidersHorizontal className="h-3 w-3" />
                            Core Technology Pillars
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 rounded-lg border border-border bg-muted/30 flex items-center gap-3">
                                <Cpu className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Applied AI</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-muted/30 flex items-center gap-3">
                                <BarChart3 className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">B2B SaaS</span>
                            </div>
                            <div className="p-3 rounded-lg border border-border bg-muted/30 flex items-center gap-3">
                                <Dna className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">BioTech</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* AI Scout Configuration */}
            <Card className="border-border bg-card/50">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                        <CardTitle>AI Scout & Enrichment</CardTitle>
                    </div>
                    <CardDescription>
                        Configuration for live data scraping and enrichment pipelines.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5">
                        <div className="flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <div>
                                <p className="text-sm font-bold">Firecrawl API Status</p>
                                <p className="text-xs text-muted-foreground">Successfully connected to Firecrawl</p>
                            </div>
                        </div>
                        <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border border-border bg-muted/20">
                            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Enrichment Depth</p>
                            <p className="text-lg font-bold mt-1">Balanced</p>
                            <p className="text-[10px] text-muted-foreground mt-1">Scrapes homepage, blog, and careers.</p>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-muted/20">
                            <p className="text-xs font-bold text-muted-foreground uppercase opacity-70">Caching Tier</p>
                            <p className="text-lg font-bold mt-1">Persistent</p>
                            <p className="text-[10px] text-muted-foreground mt-1">Local & Session storage enabled.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
