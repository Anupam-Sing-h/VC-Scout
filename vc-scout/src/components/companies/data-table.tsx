import { ChevronDown, ChevronUp, ChevronsUpDown, ExternalLink } from "lucide-react";
import { Company } from "@/lib/data/mock-companies";
import { CompanyLogo } from "./company-logo";

export type SortColumn = "name" | "industry" | "score" | "foundedYear";
export type SortDirection = "asc" | "desc";

interface DataTableProps {
    data: Company[];
    sortColumn: SortColumn;
    sortDirection: SortDirection;
    onSort: (column: SortColumn) => void;
    onRowClick?: (id: string) => void;
}

export function DataTable({ data, sortColumn, sortDirection, onSort, onRowClick }: DataTableProps) {

    const renderSortIcon = (column: SortColumn) => {
        if (sortColumn !== column) return <ChevronsUpDown className="ml-1 h-3 w-3 text-muted-foreground" />;
        return sortDirection === "asc" ? (
            <ChevronUp className="ml-1 h-3 w-3 text-foreground" />
        ) : (
            <ChevronDown className="ml-1 h-3 w-3 text-foreground" />
        );
    };

    const handleHeaderClick = (column: SortColumn) => {
        onSort(column);
    };

    if (data.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg bg-muted/20">
                <p className="text-muted-foreground">No companies found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border overflow-hidden bg-background">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground border-b">
                        <tr>
                            <th
                                className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/80 transition-colors"
                                onClick={() => handleHeaderClick("name")}
                            >
                                <div className="flex items-center">
                                    Company
                                    {renderSortIcon("name")}
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/80 transition-colors"
                                onClick={() => handleHeaderClick("industry")}
                            >
                                <div className="flex items-center">
                                    Industry
                                    {renderSortIcon("industry")}
                                </div>
                            </th>
                            <th className="px-4 py-3 font-medium">Description</th>
                            <th
                                className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/80 transition-colors"
                                onClick={() => handleHeaderClick("foundedYear")}
                            >
                                <div className="flex items-center">
                                    Founded
                                    {renderSortIcon("foundedYear")}
                                </div>
                            </th>
                            <th
                                className="px-4 py-3 font-medium cursor-pointer hover:bg-muted/80 transition-colors text-right"
                                onClick={() => handleHeaderClick("score")}
                            >
                                <div className="flex items-center justify-end">
                                    Score
                                    {renderSortIcon("score")}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((company) => (
                            <tr key={company.id} className="hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => onRowClick ? onRowClick(company.id) : window.location.href = `/companies/${company.id}`}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <CompanyLogo name={company.name} website={company.website} size="sm" />
                                        <div>
                                            <div className="font-medium text-foreground flex items-center gap-2">
                                                {company.name}
                                                {company.website && (
                                                    <a
                                                        href={company.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                                                        title="Visit website"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink className="h-3 w-3" />
                                                    </a>
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-0.5">{company.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary text-secondary-foreground border">
                                        {company.industry}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground max-w-xs truncate" title={company.description}>
                                    {company.description}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {company.foundedYear}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="inline-flex items-center justify-center font-semibold text-primary">
                                        {company.score}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
