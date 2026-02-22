'use client';

import { useState, useCallback, useEffect } from 'react';
import { EnrichmentResult, EnrichmentStatus } from '@/types/enrichment';
import { Company } from '@/lib/data/mock-companies';

const CACHE_KEY = 'vc-enrichment-cache';

// Module-level in-memory cache (survives re-renders, lost on page refresh)
const memoryCache = new Map<string, EnrichmentResult>();

// Hydrate memory cache from localStorage on first import
if (typeof window !== 'undefined') {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
            const stored: Record<string, EnrichmentResult> = JSON.parse(raw);
            Object.entries(stored).forEach(([id, result]) => memoryCache.set(id, result));
        }
    } catch {
        // Ignore parse errors
    }
}

function persistToStorage(cache: Map<string, EnrichmentResult>) {
    try {
        const obj: Record<string, EnrichmentResult> = {};
        cache.forEach((v, k) => { obj[k] = v; });
        localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
    } catch {
        // Ignore storage quota errors
    }
}

export function useEnrichment() {
    const [data, setData] = useState<EnrichmentResult | null>(null);
    const [status, setStatus] = useState<EnrichmentStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [isFromCache, setIsFromCache] = useState(false);

    // Restore from memory cache on mount (handles back-navigation)
    const restoreCache = useCallback((companyId: string) => {
        const cached = memoryCache.get(companyId);
        if (cached) {
            setData(cached);
            setStatus('success');
            setIsFromCache(true);
            return true;
        }
        return false;
    }, []);

    const enrich = useCallback(async (company: Company) => {
        if (!company.website) {
            setError('No website URL is available for this company.');
            setStatus('error');
            return;
        }

        // Cache hit → return instantly
        const cached = memoryCache.get(company.id);
        if (cached) {
            setData(cached);
            setStatus('success');
            setIsFromCache(true);
            return;
        }

        // Cache miss → call the secure server-side API
        setStatus('loading');
        setError(null);
        setIsFromCache(false);

        try {
            const res = await fetch('/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: company.website, companyId: company.id }),
            });

            const json = await res.json();

            if (!res.ok) {
                throw new Error(json.error ?? `Server error ${res.status}`);
            }

            const result: EnrichmentResult = json;

            // Store in both caches
            memoryCache.set(company.id, result);
            persistToStorage(memoryCache);

            setData(result);
            setStatus('success');
            setIsFromCache(false);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(message);
            setStatus('error');
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setStatus('idle');
        setError(null);
        setIsFromCache(false);
    }, []);

    return { data, status, error, isFromCache, enrich, restoreCache, reset };
}
