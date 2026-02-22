'use client';

import { EnrichmentResult, EnrichmentStatus } from '@/types/enrichment';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Sparkles,
    Lightbulb,
    Tag,
    Radio,
    Link2,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
} from 'lucide-react';

interface EnrichmentPanelProps {
    status: EnrichmentStatus;
    data: EnrichmentResult | null;
    error: string | null;
    onRetry: () => void;
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function EnrichmentSkeleton() {
    return (
        <Card className="w-full border-indigo-200 bg-white animate-pulse">
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-indigo-200" />
                    <div className="h-5 w-40 rounded bg-indigo-200" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="h-3 w-full rounded bg-slate-200" />
                    <div className="h-3 w-4/5 rounded bg-slate-200" />
                </div>
                <div className="space-y-2">
                    <div className="h-4 w-28 rounded bg-slate-200" />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-slate-200 shrink-0" />
                            <div className="h-3 rounded bg-slate-200" style={{ width: `${60 + i * 10}%` }} />
                        </div>
                    ))}
                </div>
                <div className="flex gap-2 flex-wrap">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="h-6 w-16 rounded-full bg-slate-200" />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// ── Error State ───────────────────────────────────────────────────────────────
function EnrichmentError({ message, onRetry }: { message: string; onRetry: () => void }) {
    return (
        <Card className="w-full border-red-300 bg-red-50">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-3 text-center py-4">
                    <XCircle className="h-10 w-10 text-red-500" />
                    <div>
                        <p className="font-semibold text-red-800">Enrichment failed</p>
                        <p className="text-sm text-red-700 mt-1 max-w-sm">{message}</p>
                    </div>
                    <button
                        onClick={onRetry}
                        className="mt-2 px-4 py-2 text-sm font-medium rounded-md border border-red-400 text-red-800 hover:bg-red-100 transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}

// ── Main Success Panel ────────────────────────────────────────────────────────
export function EnrichmentPanel({ status, data, error, onRetry }: EnrichmentPanelProps) {
    if (status === 'idle') return null;
    if (status === 'loading') return <EnrichmentSkeleton />;
    if (status === 'error') return <EnrichmentError message={error ?? 'Unknown error'} onRetry={onRetry} />;
    if (!data) return null;

    return (
        <Card className="w-full border-indigo-300 bg-white shadow-md">
            <CardHeader className="pb-4 border-b border-indigo-200 bg-indigo-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg text-indigo-800 font-bold">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-200">
                            <Sparkles className="h-4 w-4 text-indigo-700" />
                        </div>
                        AI Enrichment
                    </CardTitle>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(data.cachedAt).toLocaleString()}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-5 space-y-6 bg-white rounded-b-xl">
                {/* Summary */}
                <section>
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        <Lightbulb className="h-3.5 w-3.5 text-indigo-500" />
                        Summary
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-800 italic border-l-3 border-indigo-400 pl-3 border-l-2">
                        {data.summary}
                    </p>
                </section>

                {/* What They Do */}
                {(data.bullets?.length ?? 0) > 0 && (
                    <section>
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            <Radio className="h-3.5 w-3.5 text-indigo-500" />
                            What They Do
                        </h4>
                        <ul className="space-y-2">
                            {(data.bullets ?? []).map((bullet, i) => (
                                <li key={i} className="flex gap-2.5 text-sm">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold shrink-0 mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span className="text-slate-800 leading-snug">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Keywords */}
                {(data.keywords?.length ?? 0) > 0 && (
                    <section>
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            <Tag className="h-3.5 w-3.5 text-indigo-500" />
                            Keywords
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                            {(data.keywords ?? []).map((kw, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="font-semibold text-xs bg-indigo-100 text-indigo-800 border border-indigo-300 hover:bg-indigo-200 cursor-default"
                                >
                                    {kw}
                                </Badge>
                            ))}
                        </div>
                    </section>
                )}

                {/* Derived Signals */}
                {(data.signals?.length ?? 0) > 0 && (
                    <section>
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                            Derived Signals
                        </h4>
                        <div className="space-y-2.5">
                            {(data.signals ?? []).map((signal, i) => (
                                <div key={i} className="flex items-start gap-2.5">
                                    {signal.detected ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                                    )}
                                    <div>
                                        <span className={`text-sm font-semibold ${signal.detected ? 'text-emerald-800' : 'text-slate-400'}`}>
                                            {signal.label}
                                        </span>
                                        {signal.description && (
                                            <p className={`text-xs mt-0.5 ${signal.detected ? 'text-slate-600' : 'text-slate-400'}`}>
                                                {signal.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Sources */}
                {(data.sources?.length ?? 0) > 0 && (
                    <section className="border-t border-indigo-100 pt-4">
                        <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                            <Link2 className="h-3.5 w-3.5 text-indigo-500" />
                            Sources Scraped
                        </h4>
                        <div className="space-y-1.5">
                            {(data.sources ?? []).map((src, i) => (
                                <div key={i} className="flex items-center justify-between gap-2 text-xs">
                                    <a
                                        href={src.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-900 hover:underline flex items-center gap-1 truncate font-medium"
                                    >
                                        <ExternalLink className="h-3 w-3 shrink-0" />
                                        <span className="truncate">{src.url}</span>
                                    </a>
                                    <span className="text-slate-500 whitespace-nowrap font-mono">
                                        {new Date(src.scrapedAt).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </CardContent>
        </Card>
    );
}
