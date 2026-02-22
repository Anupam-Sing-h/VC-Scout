"use client";

import { useState, useRef, useEffect } from 'react';
import { Plus, Check, List as ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLists } from '@/hooks/useLists';

export function SaveToListButton({ companyId }: { companyId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newListOpen, setNewListOpen] = useState(false);
    const [newListName, setNewListName] = useState('');
    const { lists, isLoaded, addCompanyToList, removeCompanyFromList, createList } = useLists();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setNewListOpen(false);
            }
        };
        // Use pointerdown to ensure it triggers before focus events, but don't prevent input interactions
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggleCompany = (listId: string, hasCompany: boolean) => {
        if (hasCompany) {
            removeCompanyFromList(listId, companyId);
        } else {
            addCompanyToList(listId, companyId);
        }
    };

    const handleCreateList = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        createList(newListName.trim(), '', [companyId]);
        setNewListName('');
        setNewListOpen(false);
    };

    if (!isLoaded) return <Button disabled variant="outline"><ListIcon className="h-4 w-4 mr-2" />Save to List</Button>;

    return (
        <div className="relative" ref={dropdownRef}>
            <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
                <ListIcon className="h-4 w-4 mr-2" />
                Save to List
            </Button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-background border rounded-md shadow-lg z-50 p-2 text-sm">
                    <div className="font-medium px-2 py-1.5 border-b mb-1">Your Lists</div>

                    <div className="max-h-[200px] overflow-y-auto">
                        {lists.length === 0 ? (
                            <div className="text-muted-foreground px-2 py-2 text-xs">No lists found.</div>
                        ) : (
                            lists.map((list) => {
                                const hasCompany = list.companyIds.includes(companyId);
                                return (
                                    <div
                                        key={list.id}
                                        className="flex items-center justify-between px-2 py-2 hover:bg-muted rounded-md cursor-pointer"
                                        onClick={() => handleToggleCompany(list.id, hasCompany)}
                                    >
                                        <span>{list.name}</span>
                                        {hasCompany && <Check className="h-4 w-4 text-primary" />}
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <div className="mt-2 pt-2 border-t">
                        {!newListOpen ? (
                            <button
                                className="flex items-center text-primary hover:underline px-2 py-1 w-full text-left"
                                onClick={() => setNewListOpen(true)}
                            >
                                <Plus className="h-3 w-3 mr-1" /> Create new list
                            </button>
                        ) : (
                            <form
                                onSubmit={handleCreateList}
                                className="flex gap-2 isolate"
                                onClick={(e) => e.stopPropagation()} // Prevent bubble up that might close the dropdown
                            >
                                <input
                                    autoFocus
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    // Prevent mousedown from propagating to the document listener
                                    onMouseDown={(e) => e.stopPropagation()}
                                    className="flex-1 border rounded px-2 py-1 text-xs bg-background text-foreground"
                                    placeholder="List name..."
                                />
                                <Button
                                    type="submit"
                                    size="sm"
                                    className="h-[26px] px-2 text-xs"
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    Add
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
