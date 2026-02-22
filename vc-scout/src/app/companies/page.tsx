"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CompanyFilters } from "@/components/companies/company-filters";
import { DataTable, SortColumn, SortDirection } from "@/components/companies/data-table";
import { TablePagination } from "@/components/companies/table-pagination";
import { MOCK_COMPANIES } from "@/lib/data/mock-companies";

const ITEMS_PER_PAGE = 10;

function CompaniesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // ── URL is the single source of truth for filters ──────────────────────────
    // Read directly from URL params on every render — no separate state needed.
    const searchQuery = searchParams.get("q") ?? "";
    const selectedIndustry = searchParams.get("industry") ?? "";

    const [sortColumn, setSortColumn] = useState<SortColumn>("score");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [currentPage, setCurrentPage] = useState(1);

    // ── Helper: push updated filters to URL ─────────────────────────────────────
    const pushFilters = useCallback(
        (q: string, industry: string) => {
            const params = new URLSearchParams();
            if (q) params.set("q", q);
            if (industry) params.set("industry", industry);
            const queryString = params.toString();
            router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`);
        },
        [router, pathname]
    );

    // Reset to page 1 whenever params change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedIndustry]);

    // ── Derived state: Filter → Sort → Paginate ─────────────────────────────────
    const filteredAndSortedData = useMemo(() => {
        let result = MOCK_COMPANIES;

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q) ||
                    c.industry.toLowerCase().includes(q)
            );
        }

        if (selectedIndustry) {
            result = result.filter((c) => c.industry === selectedIndustry);
        }

        result = [...result].sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
            if (typeof valueA === "string" && typeof valueB === "string") {
                const cmp = valueA.localeCompare(valueB);
                return sortDirection === "asc" ? cmp : -cmp;
            }
            if (typeof valueA === "number" && typeof valueB === "number") {
                return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
            }
            return 0;
        });

        return result;
    }, [searchQuery, selectedIndustry, sortColumn, sortDirection]);

    const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredAndSortedData, currentPage]);

    // ── Handlers ────────────────────────────────────────────────────────────────
    const handleSort = (column: SortColumn) => {
        if (column === sortColumn) {
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortDirection(column === "score" || column === "foundedYear" ? "desc" : "asc");
        }
        setCurrentPage(1);
    };

    // Both filter handlers push changes to the URL immediately
    const handleSearchChange = (query: string) => {
        pushFilters(query, selectedIndustry);
    };

    const handleIndustryChange = (industry: string) => {
        pushFilters(searchQuery, industry);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
                <p className="text-muted-foreground mt-2">
                    Discover and filter high-signal companies based on your thesis.
                </p>
            </div>

            <CompanyFilters
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                selectedIndustry={selectedIndustry}
                onIndustryChange={handleIndustryChange}
            />

            <div className="flex flex-col gap-4">
                <DataTable
                    data={paginatedData}
                    sortColumn={sortColumn}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                    onRowClick={(id) => router.push(`/companies/${id}`)}
                />

                <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
                    <div>
                        Showing{" "}
                        {paginatedData.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedData.length)} of{" "}
                        {filteredAndSortedData.length} companies
                        {searchQuery && (
                            <span className="ml-2 text-primary font-medium">
                                for &ldquo;{searchQuery}&rdquo;
                            </span>
                        )}
                    </div>
                    {(searchQuery || selectedIndustry) && (
                        <button
                            onClick={() => pushFilters("", "")}
                            className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default function CompaniesPage() {
    return (
        <Suspense fallback={
            <div className="space-y-6 animate-pulse">
                <div className="h-20 bg-muted rounded-lg w-1/3" />
                <div className="h-12 bg-muted rounded-lg" />
                <div className="h-[400px] bg-muted rounded-lg" />
            </div>
        }>
            <CompaniesContent />
        </Suspense>
    );
}
