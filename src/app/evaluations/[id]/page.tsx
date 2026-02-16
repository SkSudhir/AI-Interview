'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, TrendingUp, TrendingDown, FileText, Download, CheckCircle2, AlertCircle, Lightbulb, MessageSquare, Clock } from 'lucide-react';

const evaluationData = {
    candidateName: 'John Doe',
    position: 'Senior Software Engineer - Backend',
    interviewDate: '2026-02-13',
    duration: '45 minutes',
    questions: [
        {
            id: 1,
            skill: 'System Design & Architecture',
            text: 'Tell me about a time when you had to design a system to handle significant scale.',
            startTime: '00:15',
            endTime: '08:42',
            score: 9,
            rating: 'high',
            // Question Skill Match - Evidence with candidate quotes
            skillMatch: {
                evidence: [
                    {
                        criteria: 'Describes complex system with clear scalability strategy',
                        quote: '"We migrated from a monolithic architecture to microservices. The main challenge was our database couldn\'t scale horizontally, so we implemented event-driven architecture with Kafka for async processing."',
                        timestamp: '02:15'
                    },
                    {
                        criteria: 'Discusses trade-offs and technical decisions',
                        quote: '"The trade-off was increased operational complexity. We went from managing one app to multiple services, which required better monitoring and orchestration with Kubernetes."',
                        timestamp: '05:30'
                    },
                    {
                        criteria: 'Provides measurable outcomes',
                        quote: '"After the migration, we handled 10x traffic during Black Friday with 99.9% uptime. Response times improved from 800ms to 120ms average."',
                        timestamp: '07:45'
                    }
                ]
            },
            // Question Summary from transcript
            summary: 'Candidate demonstrated exceptional understanding of distributed systems architecture. Described a complete migration from monolithic to microservices, clearly articulating the technical challenges (database bottlenecks, horizontal scaling), solutions implemented (Kafka, Redis, Kubernetes), and measurable business outcomes (10x traffic capacity, 85% latency reduction). Strong evidence of STAR methodology with specific technologies and metrics.',
            strengths: [
                'Clear articulation of technical decisions',
                'Strong understanding of distributed systems',
                'Data-driven approach with measurable outcomes',
            ],
            improvements: [
                'Could have discussed disaster recovery strategies in more detail',
            ],
        },
        {
            id: 2,
            skill: 'System Design & Architecture',
            text: 'Describe a situation where you had to refactor or redesign an existing system.',
            startTime: '09:15',
            endTime: '15:30',
            score: 7,
            rating: 'medium',
            skillMatch: {
                evidence: [
                    {
                        criteria: 'Incremental approach with risk mitigation',
                        quote: '"I used feature flags to gradually roll out the refactored code. We started with 5% of traffic, monitored for a week, then increased to 25%, 50%, and finally 100%."',
                        timestamp: '11:20'
                    },
                    {
                        criteria: 'Team collaboration and code review',
                        quote: '"I worked closely with the team, doing pair programming sessions and thorough code reviews. We documented the new patterns in our engineering wiki."',
                        timestamp: '13:45'
                    }
                ]
            },
            summary: 'Good response showing systematic approach to refactoring with emphasis on risk mitigation through feature flags and gradual rollout. Demonstrated collaboration skills and knowledge sharing. However, limited discussion of automated testing strategy and specific performance metrics post-refactoring.',
            strengths: [
                'Risk-aware approach with incremental changes',
                'Good collaboration with team members',
            ],
            improvements: [
                'Limited discussion of automated testing strategy',
                'Could have provided more specific metrics on improvement',
            ],
        },
        {
            id: 3,
            skill: 'Technical Leadership',
            text: 'Tell me about a time when you had to influence a technical decision without direct authority.',
            startTime: '16:00',
            endTime: '22:15',
            score: 8,
            rating: 'high',
            skillMatch: {
                evidence: [
                    {
                        criteria: 'Data-driven influence approach',
                        quote: '"I built a proof-of-concept over the weekend showing the new approach could reduce API latency by 40%. I presented the data to the team with benchmarks and load test results."',
                        timestamp: '18:30'
                    },
                    {
                        criteria: 'Respect for others\' perspectives',
                        quote: '"The senior engineers had valid concerns about migration complexity. I listened to their feedback and incorporated their suggestions into the rollout plan, which made them advocates for the change."',
                        timestamp: '20:45'
                    },
                    {
                        criteria: 'Measurable positive outcome',
                        quote: '"The team adopted the approach and we saw 30% performance improvement in production. More importantly, it became the standard pattern for new services."',
                        timestamp: '21:50'
                    }
                ]
            },
            summary: 'Strong demonstration of technical leadership and influence skills. Built consensus through data and prototyping rather than authority. Showed respect for senior engineers\' concerns and incorporated feedback. Clear evidence of measurable impact and lasting change in team practices.',
            strengths: [
                'Data-driven influence approach',
                'Respect for others\' perspectives',
                'Measurable positive outcome',
            ],
            improvements: [],
        },
    ],
    // Full transcript with timestamps
    transcript: [
        { speaker: 'Interviewer', text: 'Tell me about a time when you had to design a system to handle significant scale.', time: '00:15', questionId: 1 },
        { speaker: 'Candidate', text: 'Sure, great question. At my previous company, we had to completely redesign our payment processing system to handle Black Friday traffic.', time: '00:22', questionId: 1 },
        { speaker: 'Candidate', text: 'We migrated from a monolithic architecture to microservices. The main challenge was our database couldn\'t scale horizontally, so we implemented event-driven architecture with Kafka for async processing.', time: '02:15', questionId: 1 },
        { speaker: 'Interviewer', text: 'What were some of the trade-offs you had to consider?', time: '04:50', questionId: 1 },
        { speaker: 'Candidate', text: 'The trade-off was increased operational complexity. We went from managing one app to multiple services, which required better monitoring and orchestration with Kubernetes.', time: '05:30', questionId: 1 },
        { speaker: 'Candidate', text: 'We also had to invest in observability tools like Datadog and implement distributed tracing to debug issues across services.', time: '06:45', questionId: 1 },
        { speaker: 'Candidate', text: 'After the migration, we handled 10x traffic during Black Friday with 99.9% uptime. Response times improved from 800ms to 120ms average.', time: '07:45', questionId: 1 },
        { speaker: 'Interviewer', text: 'Excellent. Now, describe a situation where you had to refactor or redesign an existing system.', time: '09:15', questionId: 2 },
        { speaker: 'Candidate', text: 'I led a refactoring of our authentication service which had become a bottleneck. The code was tightly coupled and hard to test.', time: '09:30', questionId: 2 },
        { speaker: 'Candidate', text: 'I used feature flags to gradually roll out the refactored code. We started with 5% of traffic, monitored for a week, then increased to 25%, 50%, and finally 100%.', time: '11:20', questionId: 2 },
        { speaker: 'Interviewer', text: 'How did you work with the team on this?', time: '13:10', questionId: 2 },
        { speaker: 'Candidate', text: 'I worked closely with the team, doing pair programming sessions and thorough code reviews. We documented the new patterns in our engineering wiki.', time: '13:45', questionId: 2 },
        { speaker: 'Interviewer', text: 'Great. Let\'s move to leadership. Tell me about a time when you had to influence a technical decision without direct authority.', time: '16:00', questionId: 3 },
        { speaker: 'Candidate', text: 'I wanted to introduce GraphQL for our mobile API, but the team was skeptical about adding a new technology.', time: '16:20', questionId: 3 },
        { speaker: 'Candidate', text: 'I built a proof-of-concept over the weekend showing the new approach could reduce API latency by 40%. I presented the data to the team with benchmarks and load test results.', time: '18:30', questionId: 3 },
        { speaker: 'Interviewer', text: 'How did the senior engineers respond?', time: '20:15', questionId: 3 },
        { speaker: 'Candidate', text: 'The senior engineers had valid concerns about migration complexity. I listened to their feedback and incorporated their suggestions into the rollout plan, which made them advocates for the change.', time: '20:45', questionId: 3 },
        { speaker: 'Candidate', text: 'The team adopted the approach and we saw 30% performance improvement in production. More importantly, it became the standard pattern for new services.', time: '21:50', questionId: 3 },
    ]
};

const scoreConfig = {
    high: { color: 'green', label: 'High Performance', bgColor: 'bg-green-500/10', textColor: 'text-green-400', borderColor: 'border-green-500/20' },
    medium: { color: 'yellow', label: 'Medium Performance', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400', borderColor: 'border-yellow-500/20' },
    low: { color: 'red', label: 'Low Performance', bgColor: 'bg-red-500/10', textColor: 'text-red-400', borderColor: 'border-red-500/20' },
};

export default function EvaluationPage() {
    const [decision, setDecision] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [activeTab, setActiveTab] = useState<'questions' | 'insights' | 'transcript'>('questions');
    const avgScore = evaluationData.questions.reduce((acc, q) => acc + q.score, 0) / evaluationData.questions.length;

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

            <main className="mx-auto max-w-6xl px-6 py-8">
                {/* Back Button */}
                <Link
                    href="/dashboard"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Dashboard
                </Link>

                {/* Evaluation Header */}
                <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-start justify-between">
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-white">{evaluationData.candidateName}</h1>
                            <p className="mb-4 text-lg text-slate-300">{evaluationData.position}</p>
                            <div className="flex items-center gap-6 text-sm text-slate-400">
                                <span>{evaluationData.interviewDate}</span>
                                <span>•</span>
                                <span>{evaluationData.duration}</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10">
                            <Download className="h-4 w-4" />
                            Export Report
                        </button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="mb-2 text-sm text-slate-400">AI-Calculated Average Score</div>
                            <div className="mb-1 text-4xl font-bold text-white">{avgScore.toFixed(1)}</div>
                            <div className="text-sm text-purple-400">Based on {evaluationData.questions.length} questions</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="mb-2 text-sm text-slate-400">Skills Assessed</div>
                            <div className="mb-1 text-4xl font-bold text-white">{new Set(evaluationData.questions.map(q => q.skill)).size}</div>
                            <div className="text-sm text-slate-400">Across {evaluationData.questions.length} behavioral questions</div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-400 w-fit">
                        <Sparkles className="h-4 w-4" />
                        AI Analysis - Evidence-Based Insights
                    </div>
                </div>

                {/* Tabbed Interface */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {/* Tab Headers */}
                    <div className="flex border-b border-white/10 bg-black/20">
                        <button
                            onClick={() => setActiveTab('questions')}
                            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${activeTab === 'questions'
                                ? 'border-b-2 border-purple-500 bg-purple-500/10 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <FileText className="h-4 w-4" />
                                Question Notes
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('insights')}
                            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${activeTab === 'insights'
                                ? 'border-b-2 border-purple-500 bg-purple-500/10 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <Lightbulb className="h-4 w-4" />
                                Interview Insights
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab('transcript')}
                            className={`flex-1 px-6 py-4 text-sm font-semibold transition-all ${activeTab === 'transcript'
                                ? 'border-b-2 border-purple-500 bg-purple-500/10 text-white'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Transcript
                            </div>
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {/* Question Notes Tab */}
                        {activeTab === 'questions' && (
                            <div className="space-y-6">
                                {evaluationData.questions.map((question, index) => {
                                    const config = scoreConfig[question.rating as keyof typeof scoreConfig];
                                    return (
                                        <div
                                            key={question.id}
                                            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
                                        >
                                            {/* Question Header */}
                                            <div className={`border-b border-white/10 p-6 ${config.bgColor}`}>
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <div className="inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-400">
                                                                {question.skill}
                                                            </div>
                                                            <div className="text-xs text-slate-400">
                                                                {question.startTime} - {question.endTime}
                                                            </div>
                                                        </div>
                                                        <p className="text-lg font-medium text-white">{question.text}</p>
                                                    </div>
                                                    <div className="ml-4 text-right">
                                                        <div className="mb-1 text-3xl font-bold text-white">{question.score}</div>
                                                        <div className={`text-sm font-medium ${config.textColor}`}>{config.label}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-6">
                                                {/* Question Skill Match - Evidence with Candidate Quotes */}
                                                <div>
                                                    <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
                                                        <FileText className="h-5 w-5 text-purple-400" />
                                                        Question Skill Match
                                                    </h3>
                                                    <div className="space-y-3">
                                                        {question.skillMatch.evidence.map((item: any, i: number) => (
                                                            <div key={i} className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
                                                                {/* Matched Trait Section */}
                                                                <div className="mb-4">
                                                                    <div className="mb-1.5 flex items-center gap-2">
                                                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20">
                                                                            <CheckCircle2 className="h-3 w-3 text-green-400" />
                                                                        </div>
                                                                        <span className="text-xs font-bold uppercase tracking-wider text-green-400">Matched Trait</span>
                                                                    </div>
                                                                    <p className="pl-7 text-sm font-medium text-white">{item.criteria}</p>
                                                                </div>

                                                                {/* Evidence Section */}
                                                                <div className="pl-7">
                                                                    <div className="relative rounded-lg bg-black/20 p-3 pt-2 border border-white/5">
                                                                        <div className="mb-2 flex items-center justify-between border-b border-white/5 pb-2">
                                                                            <div className="flex items-center gap-2">
                                                                                <MessageSquare className="h-3 w-3 text-purple-400" />
                                                                                <span className="text-xs font-medium text-purple-300">Transcript Evidence</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1 rounded list-none bg-white/5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                                                                                <Clock className="h-2.5 w-2.5" />
                                                                                {item.timestamp}
                                                                            </div>
                                                                        </div>
                                                                        <p className="text-sm italic text-slate-300 leading-relaxed">{item.quote}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Question Summary */}
                                                <div>
                                                    <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                                                        <Sparkles className="h-5 w-5 text-purple-400" />
                                                        Question Summary
                                                    </h3>
                                                    <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                                        <p className="text-sm leading-relaxed text-slate-300">{question.summary}</p>
                                                    </div>
                                                </div>

                                                {/* Strengths & Improvements */}
                                                <div className="grid gap-6 md:grid-cols-2">
                                                    <div>
                                                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-400">
                                                            <TrendingUp className="h-4 w-4" />
                                                            Strengths Observed
                                                        </h3>
                                                        <div className="space-y-2">
                                                            {question.strengths.map((item: string, i: number) => (
                                                                <div key={i} className="flex items-start gap-2">
                                                                    <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-green-400"></div>
                                                                    <p className="text-sm text-slate-300">{item}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {question.improvements.length > 0 && (
                                                        <div>
                                                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-yellow-400">
                                                                <TrendingDown className="h-4 w-4" />
                                                                Areas to Probe Further
                                                            </h3>
                                                            <div className="space-y-2">
                                                                {question.improvements.map((item: string, i: number) => (
                                                                    <div key={i} className="flex items-start gap-2">
                                                                        <div className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-yellow-400"></div>
                                                                        <p className="text-sm text-slate-300">{item}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Interview Insights Tab */}
                        {activeTab === 'insights' && (
                            <div className="space-y-6">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-green-400">
                                            <CheckCircle2 className="h-5 w-5" />
                                            Key Strengths Identified
                                        </h3>
                                        <ul className="space-y-2 text-slate-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>Exceptional system design and scalability knowledge</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>Strong technical leadership and influence skills</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>Data-driven decision making with measurable outcomes</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-green-400">•</span>
                                                <span>Excellent communication and articulation of complex concepts</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="mb-3 flex items-center gap-2 font-semibold text-yellow-400">
                                            <AlertCircle className="h-5 w-5" />
                                            Considerations for Discussion
                                        </h3>
                                        <ul className="space-y-2 text-slate-300">
                                            <li className="flex items-start gap-2">
                                                <span className="text-yellow-400">•</span>
                                                <span>Testing and quality assurance practices could be explored further</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-yellow-400">•</span>
                                                <span>Disaster recovery and operational resilience experience</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-yellow-400">•</span>
                                                <span>Consider follow-up questions on specific technical depth areas</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                                    <p className="text-sm text-slate-300">
                                        <strong className="text-white">AI Analysis:</strong> The candidate demonstrated strong technical depth across system design and leadership competencies.
                                        Responses were backed by concrete examples with measurable outcomes. The evidence from the transcript shows clear STAR methodology
                                        (Situation, Task, Action, Result) and alignment with senior-level expectations.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Transcript Tab */}
                        {activeTab === 'transcript' && (
                            <div className="space-y-3">
                                {evaluationData.transcript.map((entry: any, index: number) => {
                                    // Find if this is the start of a question
                                    const question = evaluationData.questions.find((q: any) => q.id === entry.questionId);
                                    const isQuestionStart = index === 0 || evaluationData.transcript[index - 1].questionId !== entry.questionId;

                                    return (
                                        <div key={index}>
                                            {/* Question Marker */}
                                            {isQuestionStart && question && (
                                                <div className="mb-3 mt-6 first:mt-0 flex items-center gap-3 rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
                                                    <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                                                        <Clock className="h-3 w-3" />
                                                        {question.startTime} - {question.endTime}
                                                    </div>
                                                    <div className="h-4 w-px bg-purple-500/30"></div>
                                                    <div className="flex-1 text-sm font-medium text-purple-300">
                                                        Question {question.id}: {question.skill}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Transcript Entry */}
                                            <div className={`flex gap-4 rounded-lg p-3 ${entry.speaker === 'Interviewer'
                                                ? 'bg-slate-800/30'
                                                : 'bg-blue-500/5 border border-blue-500/10'
                                                }`}>
                                                <div className="flex items-start gap-2 min-w-[100px]">
                                                    <span className="text-xs font-mono text-slate-500">{entry.time}</span>
                                                    <span className={`text-xs font-semibold ${entry.speaker === 'Interviewer' ? 'text-slate-400' : 'text-blue-400'
                                                        }`}>
                                                        {entry.speaker}:
                                                    </span>
                                                </div>
                                                <p className="flex-1 text-sm text-slate-300">{entry.text}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Your Decision Section */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                    <div className="mb-6 flex items-center gap-2">
                        <MessageSquare className="h-6 w-6 text-white" />
                        <h2 className="text-2xl font-bold text-white">Your Hiring Decision</h2>
                    </div>

                    <p className="mb-6 text-slate-300">
                        Based on the AI analysis and evidence above, make your final hiring decision for this candidate.
                    </p>

                    <div className="space-y-6">
                        {/* Decision Buttons */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-white">Select Your Decision:</label>
                            <div className="grid gap-3 md:grid-cols-4">
                                <button
                                    onClick={() => setDecision('strong_hire')}
                                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${decision === 'strong_hire'
                                        ? 'border-green-500 bg-green-500/20 text-green-400'
                                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                                        }`}
                                >
                                    Strong Hire
                                </button>
                                <button
                                    onClick={() => setDecision('hire')}
                                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${decision === 'hire'
                                        ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                                        }`}
                                >
                                    Hire
                                </button>
                                <button
                                    onClick={() => setDecision('no_hire')}
                                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${decision === 'no_hire'
                                        ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400'
                                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                                        }`}
                                >
                                    No Hire
                                </button>
                                <button
                                    onClick={() => setDecision('strong_no_hire')}
                                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${decision === 'strong_no_hire'
                                        ? 'border-red-500 bg-red-500/20 text-red-400'
                                        : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                                        }`}
                                >
                                    Strong No Hire
                                </button>
                            </div>
                        </div>

                        {/* Decision Notes */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-white">
                                Your Notes & Justification:
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={6}
                                placeholder="Add your reasoning, additional observations, or any concerns that influenced your decision..."
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 backdrop-blur-sm focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                        </div>

                        {/* Submit Decision */}
                        <div className="flex gap-3">
                            <button
                                disabled={!decision}
                                className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Decision
                            </button>
                            <button className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                                Save as Draft
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
