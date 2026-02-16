'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Edit2, Trash2, Plus, ChevronDown, ChevronUp, X } from 'lucide-react';

const guideData = {
    id: 1,
    title: 'Senior Software Engineer - Backend',
    role: 'Software Engineer',
    level: 'Senior',
    jobFamily: 'Engineering',
    status: 'active',
    createdAt: '2026-02-10',
    skills: [
        {
            id: 1,
            name: 'System Design & Architecture',
            description: 'Ability to design scalable, maintainable systems and make sound architectural decisions',
            questions: [
                {
                    id: 1,
                    text: 'Tell me about a time when you had to design a system to handle significant scale. What were the key challenges and how did you address them?',
                    scoringGuide: {
                        high: 'Describes complex system with clear scalability strategy, discusses trade-offs, mentions specific technologies and patterns, shows understanding of distributed systems',
                        medium: 'Describes system design with some scalability considerations, mentions technologies used, shows basic understanding of scaling challenges',
                        low: 'Vague description of system, limited discussion of scalability, minimal technical depth',
                    },
                },
                {
                    id: 2,
                    text: 'Describe a situation where you had to refactor or redesign an existing system. What was your approach and what was the outcome?',
                    scoringGuide: {
                        high: 'Clear methodology for refactoring, discusses impact analysis, incremental approach, testing strategy, measurable improvements',
                        medium: 'Describes refactoring process, mentions some planning and testing, shows awareness of risks',
                        low: 'Limited planning described, minimal discussion of testing or risk mitigation',
                    },
                },
                {
                    id: 3,
                    text: 'Give me an example of a technical decision you made that you later regretted. What did you learn from it?',
                    scoringGuide: {
                        high: 'Shows self-awareness, clearly articulates what went wrong and why, demonstrates learning and changed approach in future situations',
                        medium: 'Acknowledges mistake, provides some analysis of what went wrong, mentions lessons learned',
                        low: 'Defensive or vague about mistake, limited reflection on lessons learned',
                    },
                },
            ],
        },
        {
            id: 2,
            name: 'Technical Leadership',
            description: 'Ability to guide technical direction, mentor others, and drive engineering excellence',
            questions: [
                {
                    id: 4,
                    text: 'Tell me about a time when you had to influence a technical decision without having direct authority over the team.',
                    scoringGuide: {
                        high: 'Demonstrates strong influence skills, uses data and reasoning, builds consensus, shows respect for others\' perspectives',
                        medium: 'Shows some influence tactics, mentions collaboration, provides reasonable outcome',
                        low: 'Relies on authority or force, limited collaboration, unclear outcome',
                    },
                },
                {
                    id: 5,
                    text: 'Describe a situation where you mentored a junior engineer. What was your approach and what was the result?',
                    scoringGuide: {
                        high: 'Structured mentoring approach, adapts to individual needs, provides specific examples of growth, shows patience and investment',
                        medium: 'Provides mentoring support, shows willingness to help, mentions some positive outcomes',
                        low: 'Limited mentoring structure, minimal investment in others\' growth',
                    },
                },
                {
                    id: 6,
                    text: 'Give me an example of how you\'ve driven engineering best practices or quality improvements in your team.',
                    scoringGuide: {
                        high: 'Identifies specific quality issues, implements systematic improvements, measures impact, gains team buy-in',
                        medium: 'Implements some improvements, shows awareness of quality issues, mentions team involvement',
                        low: 'Vague improvements, limited systematic approach, unclear impact',
                    },
                },
            ],
        },
    ],
};

export default function GuideDetailsPage() {
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

    const handleAddQuestion = (skillId: number) => {
        setSelectedSkillId(skillId);
        setShowAddQuestionModal(true);
    };
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
                            <Link href="/guides" className="text-sm font-medium text-white transition-colors hover:text-white">
                                Guides
                            </Link>
                            <Link href="/analytics" className="text-sm font-medium text-white/70 transition-colors hover:text-white">
                                Analytics
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-8">
                {/* Back Button */}
                <Link
                    href="/dashboard"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                {/* Guide Header */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="mb-4 flex items-start justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-white">{guideData.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                <span>{guideData.jobFamily}</span>
                                <span>•</span>
                                <span>{guideData.level}</span>
                                <span>•</span>
                                <span>Created {guideData.createdAt}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                                <Edit2 className="h-4 w-4" />
                                Edit
                            </button>
                            <Link
                                href={`/interviews/new?guideId=${guideData.id}`}
                                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/50"
                            >
                                Start Interview
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 w-fit">
                        <Sparkles className="h-4 w-4" />
                        AI-Generated • {guideData.skills.length} Skills • {guideData.skills.reduce((acc, skill) => acc + skill.questions.length, 0)} Questions
                    </div>
                </div>

                {/* Skills & Questions */}
                <div className="space-y-6">
                    {guideData.skills.map((skill, skillIndex) => (
                        <div
                            key={skill.id}
                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
                        >
                            {/* Skill Header */}
                            <div className="border-b border-white/10 bg-white/5 p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
                                                {skillIndex + 1}
                                            </div>
                                            <h2 className="text-xl font-bold text-white">{skill.name}</h2>
                                        </div>
                                        <p className="text-slate-400">{skill.description}</p>
                                    </div>
                                    <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10">
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Questions */}
                            <div className="divide-y divide-white/10">
                                {skill.questions.map((question, questionIndex) => (
                                    <div key={question.id} className="p-6">
                                        <div className="mb-4 flex items-start gap-4">
                                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-400">
                                                {questionIndex + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-lg font-medium text-white">{question.text}</p>
                                            </div>
                                            <button className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10">
                                                <Edit2 className="h-3 w-3" />
                                            </button>
                                        </div>

                                        {/* Scoring Guide */}
                                        <div className="ml-10 space-y-3">
                                            <div className="text-sm font-semibold text-slate-300">Scoring Guide:</div>

                                            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                                    <span className="text-sm font-semibold text-green-400">High Performance</span>
                                                </div>
                                                <p className="text-sm text-slate-300">{question.scoringGuide.high}</p>
                                            </div>

                                            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-4">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                                                    <span className="text-sm font-semibold text-yellow-400">Medium Performance</span>
                                                </div>
                                                <p className="text-sm text-slate-300">{question.scoringGuide.medium}</p>
                                            </div>

                                            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <div className="h-2 w-2 rounded-full bg-red-400"></div>
                                                    <span className="text-sm font-semibold text-red-400">Low Performance</span>
                                                </div>
                                                <p className="text-sm text-slate-300">{question.scoringGuide.low}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Question Button */}
                            <div className="border-t border-white/10 bg-white/5 p-4">
                                <button
                                    onClick={() => handleAddQuestion(skill.id)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 py-3 text-sm font-medium text-slate-400 transition-colors hover:border-purple-500/50 hover:text-purple-400"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Question to this Skill
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Skill Button */}
                <div className="mt-6">
                    <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 py-6 text-sm font-medium text-slate-400 backdrop-blur-sm transition-colors hover:border-purple-500/50 hover:text-purple-400">
                        <Plus className="h-5 w-5" />
                        Add New Skill
                    </button>
                </div>
            </main>

            {/* Add Question Modal */}
            {showAddQuestionModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Add New Question</h2>
                            <button
                                onClick={() => setShowAddQuestionModal(false)}
                                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form className="space-y-6">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Question Text *
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="e.g., Tell me about a time when..."
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="text-sm font-semibold text-white">Scoring Guide:</div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-green-400">
                                        High Performance Criteria
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="What does a high-quality answer look like?"
                                        className="w-full rounded-xl border border-green-500/20 bg-green-500/5 px-4 py-3 text-white placeholder-slate-500 focus:border-green-500/50 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-yellow-400">
                                        Medium Performance Criteria
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="What does an acceptable answer look like?"
                                        className="w-full rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 text-white placeholder-slate-500 focus:border-yellow-500/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/20"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-red-400">
                                        Low Performance Criteria
                                    </label>
                                    <textarea
                                        rows={2}
                                        placeholder="What indicates a weak answer?"
                                        className="w-full rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-white placeholder-slate-500 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddQuestionModal(false)}
                                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60"
                                >
                                    Add Question
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
