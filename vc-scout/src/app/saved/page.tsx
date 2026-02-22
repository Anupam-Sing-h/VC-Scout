"use client";

import { useSavedSearches } from '@/hooks/useSavedSearches';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function SavedSearchesPage() {
    const { savedSearches, isLoaded, deleteSearch } = useSavedSearches();

    if (!isLoaded) {
        return <div className="animate-pulse space-y-4"><div className="h-10 w-48 bg-muted rounded"></div><div className="h-64 w-full bg-muted rounded"></div></div>;
    }

    const hasSearches = savedSearches.length > 0;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Saved Searches</h1>
                <p className="text-muted-foreground mt-1">Quickly re-run your frequent discovery queries.</p>
            </div>

            {!hasSearches ? (
                <Card className="py-12 text-center">
                    <CardContent>
                        <p className="text-muted-foreground mb-4 pt-6">You don't have any saved searches.</p>
                        <Link href="/companies">
                            <Button>Go back to Companies</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedSearches.map(search => (
                        <Card key={search.id} className="flex flex-col">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">{search.name}</CardTitle>
                                <CardDescription>Saved {new Date(search.createdAt).toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div className="space-y-2 text-sm bg-muted/50 p-3 rounded-md">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Keyword</span>
                                        <span className="font-medium bg-background px-1.5 rounded text-xs leading-5 border">{search.query || 'Any'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Industry</span>
                                        <span className="font-medium bg-background px-1.5 rounded text-xs leading-5 border">{search.industry || 'All'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-4">
                                    <Link href={`/companies?q=${encodeURIComponent(search.query)}&industry=${encodeURIComponent(search.industry)}`} className="flex-1 block">
                                        <Button className="w-full">
                                            <ExternalLink className="h-4 w-4 mr-2" /> Re-run Search
                                        </Button>
                                    </Link>
                                    <Button variant="destructive" size="icon" onClick={() => deleteSearch(search.id)} title="Delete saved search">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
