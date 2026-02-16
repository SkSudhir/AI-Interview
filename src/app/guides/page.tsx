import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function GuidesPage() {
    // Redirect to dashboard since guides list is there
    if (typeof window !== 'undefined') {
        window.location.href = '/dashboard';
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">AI Interview Platform</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-20 text-center">
                <h1 className="mb-4 text-3xl font-bold text-white">Redirecting to Dashboard...</h1>
                <p className="mb-8 text-slate-400">Your interview guides are on the dashboard</p>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white"
                >
                    Go to Dashboard
                </Link>
            </main>
        </div>
    );
}
