"use client";

import { useState } from 'react';
import { useLists } from '@/hooks/useLists';
import { MOCK_COMPANIES } from '@/lib/data/mock-companies';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Download, FileJson, Plus } from 'lucide-react';
import { DataTable, SortColumn, SortDirection } from '@/components/companies/data-table';

export default function ListsPage() {
    const { lists, isLoaded, deleteList, createList, exportListCsv, exportListJson } = useLists();
    const [selectedListId, setSelectedListId] = useState<string | null>(null);
    const [newListName, setNewListName] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [sortColumn, setSortColumn] = useState<SortColumn>("score");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

    if (!isLoaded) {
        return <div className="animate-pulse flex space-y-4 flex-col opacity-50"><div className="h-10 w-48 bg-muted rounded"></div><div className="h-64 w-full bg-muted rounded"></div></div>;
    }

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        const newList = createList(newListName.trim());
        setNewListName('');
        setIsCreating(false);
        setSelectedListId(newList.id); // auto-select newly created list
    };

    const handleSort = (column: SortColumn) => {
        if (column === sortColumn) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection(column === "score" || column === "foundedYear" ? "desc" : "asc");
        }
    };

    const selectedList = lists.find(l => l.id === selectedListId) || lists[0];
    const hasLists = lists.length > 0;

    const selectedCompanies = selectedList
        ? MOCK_COMPANIES.filter(c => selectedList.companyIds.includes(c.id))
        : [];

    const sortedCompanies = [...selectedCompanies].sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (typeof valueA === "string" && typeof valueB === "string") {
            const comparison = valueA.localeCompare(valueB);
            return sortDirection === "asc" ? comparison : -comparison;
        }
        if (typeof valueA === "number" && typeof valueB === "number") {
            return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Lists</h1>
                    <p className="text-muted-foreground mt-1">Manage and export your saved company collections.</p>
                </div>
                {!isCreating ? (
                    <Button onClick={() => setIsCreating(true)}>
                        <Plus className="h-4 w-4 mr-2" /> New List
                    </Button>
                ) : (
                    <form onSubmit={handleCreateList} className="flex gap-2 isolate">
                        <input
                            autoFocus
                            value={newListName}
                            onChange={e => setNewListName(e.target.value)}
                            placeholder="List name..."
                            className="border rounded-md px-3 py-2 text-sm bg-background"
                        />
                        <Button type="submit">Create</Button>
                        <Button type="button" variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                    </form>
                )}
            </div>

            {!hasLists ? (
                <Card className="py-12 text-center">
                    <CardContent>
                        <p className="text-muted-foreground mb-4 pt-6">You haven't created any lists yet.</p>
                        <Button onClick={() => setIsCreating(true)}>Create your first list</Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-1 space-y-2 sticky top-4">
                        <h3 className="font-semibold px-2 mb-3">All Lists</h3>
                        <div className="flex flex-col gap-1">
                            {lists.map(list => (
                                <button
                                    key={list.id}
                                    onClick={() => setSelectedListId(list.id)}
                                    className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedList?.id === list.id
                                            ? 'bg-primary/10 text-primary font-medium border border-primary/20'
                                            : 'hover:bg-muted text-muted-foreground border border-transparent'
                                        }`}
                                >
                                    <div className="truncate">{list.name}</div>
                                    <div className="text-xs opacity-70 mt-0.5">{list.companyIds.length} companies</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        {selectedList ? (
                            <Card className="h-full">
                                <CardHeader className="flex flex-row items-start sm:items-center justify-between gap-4 pb-4">
                                    <div>
                                        <CardTitle>{selectedList.name}</CardTitle>
                                        <CardDescription className="mt-1">Created {new Date(selectedList.createdAt).toLocaleDateString()}</CardDescription>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Button variant="outline" size="sm" onClick={() => exportListCsv(selectedList.id, MOCK_COMPANIES)} disabled={selectedCompanies.length === 0}>
                                            <Download className="h-4 w-4 mr-2" /> CSV
                                        </Button>
                                        <Button variant="outline" size="sm" onClick={() => exportListJson(selectedList.id, MOCK_COMPANIES)} disabled={selectedCompanies.length === 0}>
                                            <FileJson className="h-4 w-4 mr-2" /> JSON
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteList(selectedList.id)} title="Delete list" className="ml-0 sm:ml-2">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="overflow-x-auto">
                                    {selectedCompanies.length === 0 ? (
                                        <div className="text-center py-12 border border-dashed rounded-md">
                                            <p className="text-muted-foreground">This list is empty.</p>
                                            <p className="text-sm text-muted-foreground mt-1">Browse companies to add them here.</p>
                                        </div>
                                    ) : (
                                        <DataTable
                                            data={sortedCompanies}
                                            sortColumn={sortColumn}
                                            sortDirection={sortDirection}
                                            onSort={handleSort}
                                        />
                                    )}
                                </CardContent>
                            </Card>
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    );
}
