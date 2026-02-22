import { Search } from "lucide-react";
import { INDUSTRIES } from "@/lib/data/mock-companies";
import { SaveSearchButton } from "./save-search-button";

interface CompanyFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedIndustry: string;
    onIndustryChange: (industry: string) => void;
}

export function CompanyFilters({
    searchQuery,
    onSearchChange,
    selectedIndustry,
    onIndustryChange
}: CompanyFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search companies by name..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all"
                    />
                </div>
                <div className="hidden sm:flex self-center">
                    <SaveSearchButton query={searchQuery} industry={selectedIndustry} />
                </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                <button
                    onClick={() => onIndustryChange("")}
                    className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${selectedIndustry === ""
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        }`}
                >
                    All Industries
                </button>
                {INDUSTRIES.map(industry => (
                    <button
                        key={industry}
                        onClick={() => onIndustryChange(industry)}
                        className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors border ${selectedIndustry === industry
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background hover:bg-muted text-foreground border-border"
                            }`}
                    >
                        {industry}
                    </button>
                ))}
            </div>
            <div className="flex sm:hidden">
                <SaveSearchButton query={searchQuery} industry={selectedIndustry} />
            </div>
        </div>
    );
}
