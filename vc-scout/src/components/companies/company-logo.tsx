'use client';

import { useState } from 'react';

interface CompanyLogoProps {
    name: string;
    website?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const SIZE_MAP = {
    sm: { container: 'h-8 w-8', text: 'text-xs', px: 32 },
    md: { container: 'h-10 w-10', text: 'text-sm', px: 40 },
    lg: { container: 'h-14 w-14', text: 'text-xl', px: 56 },
};

/** Derive a consistent HSL hue from a company name for consistent fallback colours. */
function nameToHue(name: string): number {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
}

/** Extract the bare domain (no www) from a website URL. */
function getDomain(website?: string): string | null {
    if (!website) return null;
    try {
        return new URL(website).hostname.replace(/^www\./, '');
    } catch {
        return null;
    }
}

/**
 * Multi-source logo URL list for a given domain.
 * Tried in order; next is used on error of the previous.
 *   1. Google S2 Favicon API (highly reliable, returns actual brand icons at various sizes)
 *   2. DuckDuckGo icon service (public, no key required)
 */
function getLogoUrls(domain: string, px: number): string[] {
    return [
        `https://www.google.com/s2/favicons?domain=${domain}&sz=${px}`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    ];
}

export function CompanyLogo({ name, website, size = 'md', className = '' }: CompanyLogoProps) {
    const { container, text, px } = SIZE_MAP[size];
    const domain = getDomain(website);
    const urls = domain ? getLogoUrls(domain, px) : [];

    // Track which URL index we're on; when all fail, show letter avatar.
    const [urlIndex, setUrlIndex] = useState(0);

    const hue = nameToHue(name);
    const bgColor = `hsl(${hue}, 62%, 92%)`;
    const textColor = `hsl(${hue}, 55%, 35%)`;
    const initial = name.charAt(0).toUpperCase();

    const currentUrl = urls[urlIndex] ?? null;
    const showImg = currentUrl !== null;

    const handleError = () => {
        if (urlIndex < urls.length - 1) {
            setUrlIndex(i => i + 1);
        } else {
            setUrlIndex(urls.length); // exhausted all sources → letter avatar
        }
    };

    return (
        <div
            className={`${container} rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center ring-1 ring-inset ring-black/10 bg-white shadow-sm ${className}`}
            title={name}
        >
            {showImg ? (
                <img
                    key={currentUrl}
                    src={currentUrl}
                    alt={`${name} logo`}
                    width={px}
                    height={px}
                    className="object-contain w-full h-full p-1"
                    onError={handleError}
                />
            ) : (
                <span
                    className={`${text} font-bold select-none leading-none`}
                    style={{
                        color: textColor,
                        backgroundColor: bgColor,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {initial}
                </span>
            )}
        </div>
    );
}
