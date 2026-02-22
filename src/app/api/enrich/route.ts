import { NextRequest, NextResponse } from 'next/server';
import { EnrichmentResult, EnrichmentSignal, EnrichmentSource } from '@/types/enrichment';

const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1/scrape';

// ── Firecrawl helper ──────────────────────────────────────────────────────────
async function scrapeUrl(url: string, apiKey: string): Promise<{ markdown: string; sourceUrl: string; title?: string; description?: string } | null> {
    try {
        const res = await fetch(FIRECRAWL_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                url,
                formats: ['markdown'],
                onlyMainContent: true,
                timeout: 20000,
            }),
        });

        if (!res.ok) return null;

        const json = await res.json();
        if (!json.success) return null;

        return {
            markdown: json.data?.markdown ?? '',
            sourceUrl: json.data?.metadata?.sourceURL ?? url,
            title: json.data?.metadata?.title,
            description: json.data?.metadata?.description,
        };
    } catch {
        return null;
    }
}

// ── Text parsing helpers ──────────────────────────────────────────────────────
function extractSummary(mainPage: { description?: string; markdown: string }): string {
    // Prefer the meta description if present and meaningful
    if (mainPage.description && mainPage.description.length > 30) {
        const desc = mainPage.description.replace(/\s+/g, ' ').trim();
        // Return first 2 sentences max
        const sentences = desc.match(/[^.!?]+[.!?]+/g) ?? [];
        return sentences.slice(0, 2).join(' ').trim() || desc.substring(0, 200);
    }

    // Fall back to first substantial paragraph in markdown
    const lines = mainPage.markdown.split('\n').filter(l => l.trim().length > 40 && !l.startsWith('#'));
    const para = lines[0]?.trim() ?? '';
    const sentences = para.match(/[^.!?]+[.!?]+/g) ?? [];
    return sentences.slice(0, 2).join(' ').trim() || para.substring(0, 200) || 'No summary available.';
}

function extractBullets(markdown: string): string[] {
    const bullets: string[] = [];

    // Extract existing markdown list items
    const listItems = markdown.match(/^[-*•]\s+(.+)$/gm) ?? [];
    for (const item of listItems) {
        const clean = item.replace(/^[-*•]\s+/, '').trim();
        if (clean.length > 10 && clean.length < 200) bullets.push(clean);
        if (bullets.length >= 6) break;
    }

    // If not enough, extract meaningful sentences
    if (bullets.length < 3) {
        const lines = markdown
            .split('\n')
            .filter(l => l.trim().length > 30 && !l.startsWith('#') && !l.startsWith('!'))
            .map(l => l.trim());

        for (const line of lines) {
            if (!bullets.some(b => b === line)) {
                bullets.push(line.substring(0, 150));
                if (bullets.length >= 6) break;
            }
        }
    }

    return bullets.slice(0, 6);
}

function extractKeywords(text: string, title?: string): string[] {
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
        'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
        'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
        'should', 'may', 'might', 'that', 'this', 'these', 'those', 'it', 'its',
        'we', 'our', 'you', 'your', 'they', 'their', 'not', 'no', 'more',
        'can', 'all', 'use', 'get',
    ]);

    const combined = [title ?? '', text.substring(0, 3000)].join(' ');
    const wordFreq: Record<string, number> = {};

    const words = combined
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3 && !stopWords.has(w));

    for (const word of words) {
        wordFreq[word] = (wordFreq[word] ?? 0) + 1;
    }

    // Sort by frequency, pick top 10 meaningful keywords
    return Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
}

function deriveSignals(
    homepageMarkdown: string,
    careersMarkdown: string | null,
    blogMarkdown: string | null
): EnrichmentSignal[] {
    const signals: EnrichmentSignal[] = [];

    // Signal 1: Careers page
    const hasCareers =
        careersMarkdown !== null ||
        /\b(careers?|jobs?|hiring|open\s+roles?|join\s+(us|our\s+team))\b/i.test(homepageMarkdown);
    signals.push({
        label: 'Careers page detected',
        detected: hasCareers,
        description: hasCareers
            ? 'Company appears to be actively hiring.'
            : 'No careers page or hiring mentions found.',
    });

    // Signal 2: Active blog
    const hasBlog =
        blogMarkdown !== null ||
        /\b(blog|articles?|insights?|news|updates?|posts?)\b/i.test(homepageMarkdown);
    signals.push({
        label: 'Active blog / content',
        detected: hasBlog,
        description: hasBlog
            ? 'Company publishes regular content or has a blog.'
            : 'No blog or recent content detected.',
    });

    // Signal 3: Product / pricing page
    const hasPricing = /\b(pricing|plans?|subscription|enterprise|free\s+trial|get\s+started)\b/i.test(homepageMarkdown);
    signals.push({
        label: 'Pricing or product page',
        detected: hasPricing,
        description: hasPricing
            ? 'Company has public pricing or a product page — likely revenue-generating.'
            : 'No pricing page detected.',
    });

    // Signal 4: API / developer focus
    const hasAPI = /\b(api|sdk|developer|documentation|docs|open[\s-]?source|github|integration)\b/i.test(homepageMarkdown);
    signals.push({
        label: 'Developer / API offering',
        detected: hasAPI,
        description: hasAPI
            ? 'Company has developer tooling, API, or open-source presence.'
            : 'No developer-facing API or tooling detected.',
    });

    return signals;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
    const apiKey = process.env.FIRECRAWL_API_KEY;

    if (!apiKey || apiKey === 'your_key_here') {
        return NextResponse.json(
            { error: 'FIRECRAWL_API_KEY is not configured. Add it to your .env file.' },
            { status: 500 }
        );
    }

    let body: { url?: string; companyId?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const { url, companyId } = body;

    if (!url || !companyId) {
        return NextResponse.json({ error: 'Missing required fields: url, companyId.' }, { status: 400 });
    }

    // Basic URL validation
    let parsedUrl: URL;
    try {
        parsedUrl = new URL(url);
    } catch {
        return NextResponse.json({ error: 'Invalid URL provided.' }, { status: 400 });
    }

    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`;
    const timestamp = new Date().toISOString();

    // Scrape homepage (required) + careers + blog in parallel
    const [homePage, careersPage, blogPage] = await Promise.all([
        scrapeUrl(baseUrl, apiKey),
        scrapeUrl(`${baseUrl}/careers`, apiKey),
        scrapeUrl(`${baseUrl}/blog`, apiKey),
    ]);

    if (!homePage) {
        return NextResponse.json(
            { error: `Could not scrape ${baseUrl}. The site may be blocking scrapers or the URL is unreachable.` },
            { status: 502 }
        );
    }

    // Build sources list — only include successfully scraped URLs
    const sources: EnrichmentSource[] = [
        { url: homePage.sourceUrl, scrapedAt: timestamp },
        ...(careersPage ? [{ url: careersPage.sourceUrl, scrapedAt: timestamp }] : []),
        ...(blogPage ? [{ url: blogPage.sourceUrl, scrapedAt: timestamp }] : []),
    ];

    const combinedMarkdown = [
        homePage.markdown,
        careersPage?.markdown ?? '',
        blogPage?.markdown ?? '',
    ].join('\n\n');

    const result: EnrichmentResult = {
        companyId,
        summary: extractSummary({ description: homePage.description, markdown: homePage.markdown }),
        bullets: extractBullets(homePage.markdown),
        keywords: extractKeywords(combinedMarkdown, homePage.title),
        signals: deriveSignals(
            homePage.markdown,
            careersPage?.markdown ?? null,
            blogPage?.markdown ?? null
        ),
        sources,
        cachedAt: timestamp,
    };

    return NextResponse.json(result);
}
