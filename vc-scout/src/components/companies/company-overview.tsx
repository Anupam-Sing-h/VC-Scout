'use client';

import { useEffect } from 'react';
import { Company } from '@/lib/data/mock-companies';
import { ExternalLink, MapPin, Calendar, Activity, Sparkles, Loader2, CheckCheck, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SaveToListButton } from './save-to-list-button';
import { EnrichmentPanel } from './enrichment-panel';
import { useEnrichment } from '@/hooks/useEnrichment';
import { CompanyLogo } from './company-logo';

interface CompanyOverviewProps {
    company: Company;
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
    const { data, status, error, isFromCache, enrich, restoreCache, reset } = useEnrichment();

    // Restore cached enrichment silently on mount (e.g. back-navigation)
    useEffect(() => {
        restoreCache(company.id);
    }, [company.id, restoreCache]);

    const handleEnrich = () => {
        if (status === 'loading') return;
        // If we got an error, reset before retrying
        if (status === 'error') reset();
        enrich(company);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enriching…
                    </>
                );
            case 'success':
                return isFromCache ? (
                    <>
                        <CheckCheck className="h-4 w-4 text-emerald-600" />
                        <span>Cached</span>
                    </>
                ) : (
                    <>
                        <Sparkles className="h-4 w-4 text-indigo-600" />
                        Re-enrich
                    </>
                );
            case 'error':
                return (
                    <>
                        <RotateCcw className="h-4 w-4" />
                        Retry Enrich
                    </>
                );
            default:
                return (
                    <>
                        <Sparkles className="h-4 w-4" />
                        Enrich
                    </>
                );
        }
    };

    const buttonVariant = status === 'success' && isFromCache ? 'outline' : status === 'error' ? 'outline' : 'default';
    const buttonClass =
        status === 'success' && isFromCache
            ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
            : status === 'error'
                ? 'border-red-300 text-red-700 hover:bg-red-50'
                : status === 'success'
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : '';

    return (
        <div className="space-y-4">
            <Card className="w-full">
                <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <CompanyLogo name={company.name} website={company.website} size="lg" />
                        <div>
                            <div className="flex items-center gap-3">
                                <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
                                <Badge variant="secondary">{company.industry}</Badge>
                            </div>
                            <CardDescription className="mt-2 text-base text-muted-foreground flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {company.location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" /> Founded {company.foundedYear}
                                </span>
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <SaveToListButton companyId={company.id} />
                        <Button
                            variant={buttonVariant}
                            className={`flex items-center gap-2 transition-all ${buttonClass}`}
                            onClick={handleEnrich}
                            disabled={status === 'loading' || !company.website}
                            title={!company.website ? 'No website URL available for this company' : undefined}
                        >
                            {getButtonContent()}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                        <p className="text-sm leading-relaxed">{company.description}</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">Company Score</h3>
                            <div className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                <span className="text-2xl font-semibold text-primary">{company.score}</span>
                            </div>
                        </div>

                        {company.website && (
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-1">Website</h3>
                                <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                                >
                                    {new URL(company.website).hostname.replace('www.', '')}
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        )}

                        {!company.website && (
                            <p className="text-xs text-muted-foreground italic">
                                No website on file — enrichment unavailable.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Enrichment panel renders below the overview card */}
            <EnrichmentPanel
                status={status}
                data={data}
                error={error}
                onRetry={handleEnrich}
            />
        </div>
    );
}
