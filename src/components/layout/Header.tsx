"use client";

import { Search, CornerDownLeft, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    // Clear input when leaving /companies
    useEffect(() => {
        if (!pathname.startsWith("/companies")) {
            setSearchValue("");
        }
    }, [pathname]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        router.push(trimmed ? `/companies?q=${encodeURIComponent(trimmed)}` : "/companies");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const tag = (e.target as HTMLElement).tagName.toLowerCase();
            if (e.key === "/" && tag !== "input" && tag !== "textarea") {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === "Escape") {
                inputRef.current?.blur();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <header className="h-14 border-b border-border bg-background px-4 flex items-center gap-4 shrink-0">
            <button
                type="button"
                className="md:hidden p-2 -ml-2 text-zinc-500 hover:bg-zinc-100 rounded-md transition-colors"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* ── Global Search ─────────────────────────────────────────── */}
            <form onSubmit={handleSearch} className="flex-1 max-w-lg relative">
                {/* Search icon */}
                <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors pointer-events-none ${isFocused ? "text-zinc-800" : "text-zinc-400"
                        }`}
                />

                {/* Input — explicit light-mode colours, no bg-transparent, no CSS vars */}
                <input
                    ref={inputRef}
                    id="global-search"
                    type="text"
                    autoComplete="off"
                    placeholder="Search companies... By Name, Industry, or Description"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full h-9 pl-9 pr-28 rounded-lg text-sm
                        outline-none transition-all duration-150
                        text-zinc-900 placeholder:text-zinc-400
                        ${isFocused
                            ? "bg-white border border-zinc-300 ring-2 ring-zinc-900/10 shadow-sm"
                            : "bg-zinc-100 border border-zinc-200 hover:bg-zinc-50"
                        }
                    `}
                />

                {/* Right-side shortcut hints */}
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none select-none">
                    {isFocused ? (
                        /* When focused: show "Enter to search" hint */
                        <span className="flex items-center gap-1">
                            <kbd className="inline-flex items-center gap-0.5 rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 leading-none">
                                <CornerDownLeft className="h-2.5 w-2.5" />
                                <span>search</span>
                            </kbd>
                        </span>
                    ) : (
                        /* When idle: show keyboard shortcuts */
                        <span className="flex items-center gap-1">
                            <kbd className="inline-flex items-center rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 leading-none shadow-sm">
                                ⌘K
                            </kbd>
                            <span className="text-zinc-300 text-[10px] font-medium">or</span>
                            <kbd className="inline-flex items-center rounded border border-zinc-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-zinc-500 leading-none shadow-sm">
                                /
                            </kbd>
                        </span>
                    )}
                </div>
            </form>

            {/* ── Right side ───────────────────────────────────────────── */}
            <div className="flex items-center gap-3 ml-auto shrink-0">
                <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-semibold text-white select-none">
                    VC
                </div>
            </div>
        </header>
    );
}
