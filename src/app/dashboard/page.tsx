import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Users, Calendar, CheckCircle2, Clock, AlertCircle, Sparkles, TrendingUp, FileText } from 'lucide-react';

const guides = [
    {
        id: 1,
        title: 'Senior Software Engineer - Backend',
        role: 'Software Engineer',
        level: 'Senior',
        jobFamily: 'Engineering',
        status: 'active',
        skillsCount: 8,
        questionsCount: 24,
        interviewsCount: 12,
        createdAt: '2026-02-10',
        lastUsed: '2026-02-13',
    },
    {
        id: 2,
        title: 'Product Manager - Growth',
        role: 'Product Manager',
        level: 'Professional',
        jobFamily: 'Product',
        status: 'active',
        skillsCount: 7,
        questionsCount: 21,
        interviewsCount: 8,
        createdAt: '2026-02-08',
        lastUsed: '2026-02-12',
    },
    {
        id: 3,
        title: 'UX Designer - Enterprise',
        role: 'UX Designer',
        level: 'Professional',
        jobFamily: 'Design',
        status: 'draft',
        skillsCount: 6,
        questionsCount: 18,
        interviewsCount: 0,
        createdAt: '2026-02-13',
        lastUsed: null,
    },
];

const stats = [
    { label: 'Active Guides', value: '12', change: '+3', icon: FileText, color: 'purple' },
    { label: 'Interviews This Week', value: '24', change: '+8', icon: Users, color: 'blue' },
    { label: 'Avg. Score', value: '7.8', change: '+0.4', icon: TrendingUp, color: 'green' },
    { label: 'Completion Rate', value: '94%', change: '+2%', icon: CheckCircle2, color: 'emerald' },
];

const statusConfig = {
    active: { label: 'Active', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    draft: { label: 'Draft', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
    archived: { label: 'Archived', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">AI Interview Platform</span>
                        </div>
                        <nav className="flex items-center gap-6">
                            <Link href="/dashboard" className="text-sm font-medium text-white">
                                Dashboard
                            </Link>
                            <Link href="/guides" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Guides
                            </Link>
                            <Link href="/analytics" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="mb-2 text-3xl font-bold text-white">Interview Guides</h1>
                        <p className="text-slate-400">Manage your AI-powered interview guides</p>
                    </div>
                    <Link
                        href="/guides/new"
                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60"
                    >
                        <Plus className="h-5 w-5" />
                        Create Guide
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600`}>
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-green-400">{stat.change}</span>
                                </div>
                                <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search guides..."
                            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-slate-400 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>
                    <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                        <Filter className="h-5 w-5" />
                        Filter
                    </button>
                </div>

                {/* Guides List */}
                <div className="space-y-4">
                    {guides.map((guide) => (
                        <div
                            key={guide.id}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="mb-3 flex items-center gap-3">
                                        <Link href={`/guides/${guide.id}`} className="text-xl font-bold text-white hover:text-purple-400">
                                            {guide.title}
                                        </Link>
                                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${statusConfig[guide.status as keyof typeof statusConfig].color}`}>
                                            {statusConfig[guide.status as keyof typeof statusConfig].label}
                                        </span>
                                    </div>

                                    <div className="mb-4 flex items-center gap-6 text-sm text-slate-400">
                                        <span>{guide.jobFamily}</span>
                                        <span>•</span>
                                        <span>{guide.level}</span>
                                        <span>•</span>
                                        <span>{guide.skillsCount} skills</span>
                                        <span>•</span>
                                        <span>{guide.questionsCount} questions</span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Users className="h-4 w-4" />
                                            <span>{guide.interviewsCount} interviews</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <Calendar className="h-4 w-4" />
                                            <span>Created {guide.createdAt}</span>
                                        </div>
                                        {guide.lastUsed && (
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <Clock className="h-4 w-4" />
                                                <span>Last used {guide.lastUsed}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/guides/${guide.id}`}
                                        className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        href={`/interviews/new?guideId=${guide.id}`}
                                        className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/50"
                                    >
                                        Start Interview
                                    </Link>
                                    <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10">
                                        <MoreVertical className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State (hidden when guides exist) */}
                {guides.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center backdrop-blur-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/10">
                            <FileText className="h-8 w-8 text-purple-400" />
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-white">No interview guides yet</h3>
                        <p className="mb-6 text-slate-400">Create your first AI-powered interview guide to get started</p>
                        <Link
                            href="/guides/new"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/50"
                        >
                            <Plus className="h-5 w-5" />
                            Create Your First Guide
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
