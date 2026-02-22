"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Building2,
    ListFilter,
    Bookmark,
    Settings,
    Target,
    X
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ className, isOpen, onClose, ...props }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        { name: "Companies", href: "/companies", icon: Building2 },
        { name: "Lists", href: "/lists", icon: ListFilter },
        { name: "Saved Searches", href: "/saved", icon: Bookmark },
    ];

    return (
        <div
            className={cn(
                "flex flex-col bg-sidebar text-foreground h-full overflow-y-auto transition-transform duration-300 ease-in-out",
                "fixed inset-y-0 left-0 z-50 w-64 md:relative md:translate-x-0",
                isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
                className
            )}
            {...props}
        >
            <div className="h-14 flex items-center justify-between px-6 border-b border-border bg-muted/20">
                <Link href="/" className="flex items-center group/logo hover:opacity-80 transition-opacity">
                    <Target className="h-6 w-6 text-primary mr-2 group-hover/logo:scale-110 transition-transform" />
                    <span className="font-semibold tracking-tight text-lg">Scout.ai</span>
                </Link>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 -mr-2 text-muted-foreground hover:bg-muted rounded-md transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Workspace Switcher Mockup */}
            <div className="px-4 py-4">
                <div className="flex items-center gap-3 px-3 py-2 bg-muted/40 rounded-lg border border-border group cursor-pointer hover:bg-muted/60 transition-colors">
                    <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs ring-2 ring-primary/10">
                        AF
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Alpha Fund</div>
                        <div className="text-[10px] text-muted-foreground truncate">Thesis Scout</div>
                    </div>
                </div>
            </div>

            <div className="flex-1 py-2 px-4 flex flex-col min-h-0">
                {/* Intelligence Group */}
                <div className="space-y-1">
                    <div className="px-2 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Intelligence
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5 shrink-0" />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Workspace Group - Pushed to bottom */}
                <div className="space-y-1 mt-auto">
                    <div className="px-2 mb-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        Workspace
                    </div>
                    <Link
                        href="/settings"
                        className={cn(
                            "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                            pathname.startsWith("/settings")
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                    </Link>
                </div>
            </div>

            {/* User Profile Section */}
            <div className="border-t border-border bg-muted/10">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="h-9 w-9 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
                        AS
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">A. Singh</div>
                        <div className="text-[10px] text-muted-foreground truncate leading-none">Senior Associate</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
