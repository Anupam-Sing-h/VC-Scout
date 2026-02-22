import { useLocalStorage } from './useLocalStorage';

export type SavedSearch = {
    id: string;
    name: string;
    query: string;
    industry: string;
    createdAt: string;
};

export function useSavedSearches() {
    const [savedSearches, setSavedSearches, isLoaded] = useLocalStorage<SavedSearch[]>('vc-scout-saved-searches', []);

    const saveSearch = (name: string, query: string, industry: string) => {
        const id = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 11);

        const newSearch: SavedSearch = {
            id,
            name,
            query,
            industry,
            createdAt: new Date().toISOString(),
        };
        setSavedSearches((prev) => [newSearch, ...prev]);
        return newSearch;
    };

    const deleteSearch = (id: string) => {
        setSavedSearches((prev) => prev.filter((search) => search.id !== id));
    };

    return {
        savedSearches,
        isLoaded,
        saveSearch,
        deleteSearch,
    };
}
