"use client";

import { useState, useEffect } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function NotesSection({ companyId }: { companyId: string }) {
    const { getNote, saveNote, isLoaded } = useNotes();
    const [content, setContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isLoaded) {
            setContent(getNote(companyId).content);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, companyId]);

    const handleSave = () => {
        setIsSaving(true);
        saveNote(companyId, content);
        setTimeout(() => setIsSaving(false), 500);
    };

    if (!isLoaded) return null;

    const note = getNote(companyId);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Analyst Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add your thesis, meeting notes, or research here..."
                    className="min-h-[150px]"
                />
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        {note.lastUpdated ? `Last updated: ${new Date(note.lastUpdated).toLocaleString()}` : 'No notes saved yet.'}
                    </span>
                    <Button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Notes'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
