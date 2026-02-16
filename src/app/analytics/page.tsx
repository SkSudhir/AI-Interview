import Link from 'next/link';
import { Sparkles, TrendingUp, Users, Clock, Award, BarChart3, Calendar } from 'lucide-react';

const stats = [
    { label: 'Total Interviews', value: '156', change: '+12%', trend: 'up', icon: Users },
    { label: 'Avg. Interview Score', value: '7.8', change: '+0.4', trend: 'up', icon: Award },
    { label: 'Avg. Duration', value: '42m', change: '-3m', trend: 'down', icon: Clock },
    { label: 'Completion Rate', value: '94%', change: '+2%', trend: 'up', icon: TrendingUp },
];

const topSkills = [
    { name: 'System Design & Architecture', avgScore: 8.2, interviews: 45 },
    { name: 'Technical Leadership', avgScore: 7.9, interviews: 42 },
    { name: 'Problem Solving', avgScore: 7.6, interviews: 38 },
    { name: 'Communication', avgScore: 8.4, interviews: 41 },
    { name: 'Collaboration', avgScore: 7.8, interviews: 39 },
];

const recentInterviews = [
    { candidate: 'John Doe', position: 'Senior Software Engineer', score: 8.5, date: '2026-02-13', recommendation: 'Strong Hire' },
    { candidate: 'Jane Smith', position: 'Product Manager', score: 7.2, date: '2026-02-12', recommendation: 'Hire' },
    { candidate: 'Mike Johnson', position: 'UX Designer', score: 6.8, date: '2026-02-11', recommendation: 'Maybe' },
    { candidate: 'Sarah Williams', position: 'Senior Software Engineer', score: 8.9, date: '2026-02-10', recommendation: 'Strong Hire' },
];

const recommendationColors = {
    'Strong Hire': 'bg-green-500/10 text-green-400 border-green-500/20',
    'Hire': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Maybe': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    'No Hire': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function AnalyticsPage() {
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
                            <Link href="/dashboard" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Dashboard
                            </Link>
                            <Link href="/guides" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Guides
                            </Link>
                            <Link href="/analytics" className="text-sm font-medium text-white transition-colors hover:text-white">
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-6 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-white">Analytics Dashboard</h1>
                    <p className="text-slate-400">Track interview performance and insights</p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid gap-6 md:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        const trendColor = stat.trend === 'up' ? 'text-green-400' : 'text-yellow-400';
                        return (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                                        <Icon className="h-6 w-6 text-white" />
                                    </div>
                                    <span className={`text-sm font-medium ${trendColor}`}>{stat.change}</span>
                                </div>
                                <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Top Skills Performance */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Top Skills Performance</h2>
                            <BarChart3 className="h-5 w-5 text-purple-400" />
                        </div>

                        <div className="space-y-4">
                            {topSkills.map((skill, index) => (
                                <div key={skill.name}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-white">{skill.name}</span>
                                        <span className="text-sm font-bold text-purple-400">{skill.avgScore}</span>
                                    </div>
                                    <div className="mb-1 h-2 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                                            style={{ width: `${(skill.avgScore / 10) * 100}%` }}
                                        />
                                    </div>
                                    <div className="text-xs text-slate-400">{skill.interviews} interviews</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Interviews */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Recent Interviews</h2>
                            <Calendar className="h-5 w-5 text-purple-400" />
                        </div>

                        <div className="space-y-4">
                            {recentInterviews.map((interview, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-white/10 bg-white/5 p-4"
                                >
                                    <div className="mb-2 flex items-start justify-between">
                                        <div>
                                            <div className="font-semibold text-white">{interview.candidate}</div>
                                            <div className="text-sm text-slate-400">{interview.position}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-white">{interview.score}</div>
                                            <div className="text-xs text-slate-400">{interview.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${recommendationColors[interview.recommendation as keyof typeof recommendationColors]}`}>
                                            {interview.recommendation}
                                        </span>
                                        <Link
                                            href={`/evaluations/${index + 1}`}
                                            className="text-xs font-medium text-purple-400 hover:text-purple-300"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Insights */}
                <div className="mt-8 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 backdrop-blur-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-400" />
                        <h3 className="font-semibold text-white">AI Insights</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div>
                            <div className="mb-1 text-sm text-slate-400">Top Performing Skill</div>
                            <div className="font-semibold text-white">Communication (8.4 avg)</div>
                        </div>
                        <div>
                            <div className="mb-1 text-sm text-slate-400">Most Assessed Skill</div>
                            <div className="font-semibold text-white">System Design (45 interviews)</div>
                        </div>
                        <div>
                            <div className="mb-1 text-sm text-slate-400">Hiring Success Rate</div>
                            <div className="font-semibold text-white">68% (Strong Hire + Hire)</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
