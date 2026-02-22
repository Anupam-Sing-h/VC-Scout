import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase, FileText, TrendingUp } from 'lucide-react';

const MOCK_SIGNALS = [
    { id: 1, title: 'New Career Page Detected', date: '2 days ago', icon: Briefcase, type: 'hiring' },
    { id: 2, title: 'Published Blog Post: "Scaling our Infrastructure"', date: '1 week ago', icon: FileText, type: 'content' },
    { id: 3, title: 'Traffic surged by 45%', date: '3 weeks ago', icon: TrendingUp, type: 'growth' },
];

export function SignalsTimeline() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Recent Signals</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {MOCK_SIGNALS.map((signal, idx) => (
                        <div key={signal.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <signal.icon className="h-4 w-4" />
                                </div>
                                {idx !== MOCK_SIGNALS.length - 1 && (
                                    <div className="h-8 w-px bg-border my-2" />
                                )}
                            </div>
                            <div className="pb-4">
                                <p className="text-sm font-medium">{signal.title}</p>
                                <p className="text-xs text-muted-foreground mt-1">{signal.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
