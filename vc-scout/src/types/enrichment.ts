export type EnrichmentSignal = {
    label: string;
    detected: boolean;
    description: string;
};

export type EnrichmentSource = {
    url: string;
    scrapedAt: string; // ISO 8601
};

export type EnrichmentResult = {
    companyId: string;
    summary: string;
    bullets: string[];
    keywords: string[];
    signals: EnrichmentSignal[];
    sources: EnrichmentSource[];
    cachedAt: string; // ISO 8601
};

export type EnrichmentStatus = 'idle' | 'loading' | 'success' | 'error';
