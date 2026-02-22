import { MOCK_COMPANIES } from '@/lib/data/mock-companies';
import { notFound } from 'next/navigation';
import { CompanyOverview } from '@/components/companies/company-overview';
import { SignalsTimeline } from '@/components/companies/signals-timeline';
import { NotesSection } from '@/components/companies/notes-section';

interface CompanyProfilePageProps {
    params: {
        id: string;
    };
}

export default function CompanyProfilePage({ params }: CompanyProfilePageProps) {
    const company = MOCK_COMPANIES.find(c => c.id === params.id);

    if (!company) {
        notFound();
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* CompanyOverview is a Client Component — it owns the enrichment state */}
            <CompanyOverview company={company} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <NotesSection companyId={company.id} />
                </div>
                <div className="space-y-6">
                    <SignalsTimeline />
                </div>
            </div>
        </div>
    );
}
