import { useLocalStorage } from './useLocalStorage';

export type Note = {
    content: string;
    lastUpdated: string;
};

export function useNotes() {
    const [notes, setNotes, isLoaded] = useLocalStorage<Record<string, Note>>('vc-scout-notes', {});

    const saveNote = (companyId: string, content: string) => {
        setNotes((prev) => ({
            ...prev,
            [companyId]: {
                content,
                lastUpdated: new Date().toISOString(),
            }
        }));
    };

    const getNote = (companyId: string) => {
        return notes[companyId] || { content: '', lastUpdated: '' };
    };

    return {
        notes,
        isLoaded,
        saveNote,
        getNote,
    };
}
