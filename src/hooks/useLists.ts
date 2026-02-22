import { useLocalStorage } from './useLocalStorage';

export type List = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    companyIds: string[];
};

export function useLists() {
    const [lists, setLists, isLoaded] = useLocalStorage<List[]>('vc-scout-lists', []);

    const createList = (name: string, description: string = '', initialCompanyIds: string[] = []) => {
        const id = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : Math.random().toString(36).substring(2, 11);

        const newList: List = {
            id,
            name,
            description,
            createdAt: new Date().toISOString(),
            companyIds: initialCompanyIds,
        };
        setLists((prev) => [...prev, newList]);
        return newList;
    };

    const deleteList = (id: string) => {
        setLists((prev) => prev.filter((list) => list.id !== id));
    };

    const addCompanyToList = (listId: string, companyId: string) => {
        setLists((prev) => prev.map((list) => {
            if (list.id === listId && !list.companyIds.includes(companyId)) {
                return { ...list, companyIds: [...list.companyIds, companyId] };
            }
            return list;
        }));
    };

    const removeCompanyFromList = (listId: string, companyId: string) => {
        setLists((prev) => prev.map((list) => {
            if (list.id === listId) {
                return { ...list, companyIds: list.companyIds.filter(id => id !== companyId) };
            }
            return list;
        }));
    };

    const exportListCsv = (listId: string, companiesData: any[]) => {
        const list = lists.find((l) => l.id === listId);
        if (!list) return;

        const listCompanies = companiesData.filter(c => list.companyIds.includes(c.id));
        if (listCompanies.length === 0) return;

        // Simple CSV generation
        const headers = ['Name', 'Industry', 'Location', 'Founded', 'Score', 'Website', 'Description'];
        const csvRows = [headers.join(',')];

        for (const company of listCompanies) {
            const values = [
                `"${company.name}"`,
                `"${company.industry}"`,
                `"${company.location}"`,
                company.foundedYear,
                company.score,
                `"${company.website || ''}"`,
                `"${company.description.replace(/"/g, '""')}"`
            ];
            csvRows.push(values.join(','));
        }

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${list.name.replace(/\s+/g, '_')}_export.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const exportListJson = (listId: string, companiesData: any[]) => {
        const list = lists.find((l) => l.id === listId);
        if (!list) return;

        const listCompanies = companiesData.filter(c => list.companyIds.includes(c.id));

        const blob = new Blob([JSON.stringify(listCompanies, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${list.name.replace(/\s+/g, '_')}_export.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return {
        lists,
        isLoaded,
        createList,
        deleteList,
        addCompanyToList,
        removeCompanyFromList,
        exportListCsv,
        exportListJson,
    };
}
