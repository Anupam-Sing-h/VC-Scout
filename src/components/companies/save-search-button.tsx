"use client";

import { useState } from 'react';
import { useSavedSearches } from '@/hooks/useSavedSearches';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Check } from 'lucide-react';

export function SaveSearchButton({ query, industry }: { query: string, industry: string }) {
    const { saveSearch, isLoaded } = useSavedSearches();
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        const name = (query || industry)
            ? `${industry ? industry + ' ' : ''}${query ? '"' + query + '" ' : ''}Search`
            : 'All Companies';

        saveSearch(name.trim(), query, industry);
        setSaved(true);
        setIsSaving(false);
        setTimeout(() => setSaved(false), 2000); // Reset after 2s
    };

    if (!isLoaded || (!query && !industry)) return null;

    if (saved) {
        return (
            <Button variant="outline" size="sm" disabled className="text-green-600 border-green-200 bg-green-50">
                <Check className="h-4 w-4 mr-2" /> Saved
            </Button>
        );
    }

    return (
        <Button variant="outline" size="sm" onClick={handleSave} disabled={isSaving}>
            <BookmarkPlus className="h-4 w-4 mr-2" /> Save Search
        </Button>
    );
}
