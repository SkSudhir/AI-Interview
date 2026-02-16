'use client';

import { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Phone, ChevronRight, ChevronLeft, Sparkles, Clock } from 'lucide-react';

const questions = [
    {
        id: 1,
        skill: 'System Design & Architecture',
        text: 'Tell me about a time when you had to design a system to handle significant scale. What were the key challenges and how did you address them?',
        scoringGuide: {
            high: 'Describes complex system with clear scalability strategy, discusses trade-offs',
            medium: 'Describes system design with some scalability considerations',
            low: 'Vague description of system, limited discussion of scalability',
        },
    },
    {
        id: 2,
        skill: 'System Design & Architecture',
        text: 'Describe a situation where you had to refactor or redesign an existing system. What was your approach and what was the outcome?',
        scoringGuide: {
            high: 'Clear methodology for refactoring, discusses impact analysis, incremental approach',
            medium: 'Describes refactoring process, mentions some planning and testing',
            low: 'Limited planning described, minimal discussion of testing',
        },
    },
];

const transcript = [
    { speaker: 'Interviewer', text: 'Tell me about a time when you had to design a system to handle significant scale.', time: '00:15' },
    { speaker: 'Candidate', text: 'Sure, at my previous company, we had to redesign our payment processing system to handle Black Friday traffic...', time: '00:22' },
    { speaker: 'Candidate', text: 'The main challenge was that our monolithic architecture couldn\'t scale horizontally. We were seeing database bottlenecks and timeout issues during peak loads.', time: '00:45' },
    { speaker: 'Candidate', text: 'I proposed moving to a microservices architecture with event-driven communication. We used Kafka for message queuing and Redis for caching frequently accessed data.', time: '01:10' },
    { speaker: 'Interviewer', text: 'What were some of the trade-offs you had to consider?', time: '01:35' },
    { speaker: 'Candidate', text: 'Great question. The main trade-off was increased operational complexity. We went from managing one application to managing multiple services, which required better monitoring and orchestration.', time: '01:42' },
];

export default function InterviewPlayerPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [elapsedTime, setElapsedTime] = useState('12:34');
    const [showEndModal, setShowEndModal] = useState(false);

    const handleEndInterview = () => {
        // Navigate to evaluation page
        window.location.href = '/evaluations/1';
    };

    return (
        <div className="flex h-screen flex-col bg-slate-950">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                        <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-white">Senior Software Engineer Interview</h1>
                        <p className="text-sm text-slate-400">John Doe • System Design & Architecture</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-400">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-sm">{elapsedTime}</span>
                    </div>
                    <button
                        onClick={() => setShowEndModal(true)}
                        className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-purple-500/50"
                    >
                        End Interview
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel - Video */}
                <div className="flex w-1/3 flex-col border-r border-white/10 bg-slate-900/50">
                    {/* Video Feed */}
                    <div className="relative flex-1 bg-gradient-to-br from-slate-800 to-slate-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-3xl font-bold text-white">
                                    JD
                                </div>
                                <p className="text-lg font-medium text-white">John Doe</p>
                                <p className="text-sm text-slate-400">Candidate</p>
                            </div>
                        </div>

                        {/* Video Controls */}
                        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                                    } backdrop-blur-sm`}
                            >
                                {isMuted ? <MicOff className="h-5 w-5 text-white" /> : <Mic className="h-5 w-5 text-white" />}
                            </button>
                            <button
                                onClick={() => setIsVideoOff(!isVideoOff)}
                                className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'
                                    } backdrop-blur-sm`}
                            >
                                {isVideoOff ? <VideoOff className="h-5 w-5 text-white" /> : <Video className="h-5 w-5 text-white" />}
                            </button>
                            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 backdrop-blur-sm transition-colors hover:bg-red-600">
                                <Phone className="h-5 w-5 text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Panel - Questions */}
                <div className="flex w-1/3 flex-col border-r border-white/10 bg-slate-900/30">
                    {/* Question Navigation */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3">
                        <button
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:opacity-30"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-medium text-slate-400">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <button
                            onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                            disabled={currentQuestion === questions.length - 1}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:opacity-30"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Current Question */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="mb-4">
                            <div className="mb-2 inline-block rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                                {questions[currentQuestion].skill}
                            </div>
                            <p className="text-lg font-medium leading-relaxed text-white">
                                {questions[currentQuestion].text}
                            </p>
                        </div>

                        {/* Scoring Guide */}
                        <div className="mt-6 space-y-3">
                            <div className="text-sm font-semibold text-slate-300">Private Scoring Guide:</div>

                            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                                    <span className="text-xs font-semibold text-green-400">High</span>
                                </div>
                                <p className="text-xs text-slate-300">{questions[currentQuestion].scoringGuide.high}</p>
                            </div>

                            <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                                    <span className="text-xs font-semibold text-yellow-400">Medium</span>
                                </div>
                                <p className="text-xs text-slate-300">{questions[currentQuestion].scoringGuide.medium}</p>
                            </div>

                            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                                <div className="mb-1 flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-red-400"></div>
                                    <span className="text-xs font-semibold text-red-400">Low</span>
                                </div>
                                <p className="text-xs text-slate-300">{questions[currentQuestion].scoringGuide.low}</p>
                            </div>
                        </div>

                        {/* Quick Score */}
                        <div className="mt-6">
                            <div className="mb-2 text-sm font-semibold text-slate-300">Quick Score:</div>
                            <div className="flex gap-2">
                                <button className="flex-1 rounded-lg border border-green-500/30 bg-green-500/10 py-2 text-sm font-medium text-green-400 transition-colors hover:bg-green-500/20">
                                    High
                                </button>
                                <button className="flex-1 rounded-lg border border-yellow-500/30 bg-yellow-500/10 py-2 text-sm font-medium text-yellow-400 transition-colors hover:bg-yellow-500/20">
                                    Medium
                                </button>
                                <button className="flex-1 rounded-lg border border-red-500/30 bg-red-500/10 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20">
                                    Low
                                </button>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-semibold text-slate-300">Notes:</label>
                            <textarea
                                placeholder="Add your notes here..."
                                rows={4}
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Live Transcript */}
                <div className="flex w-1/3 flex-col bg-slate-900/20">
                    <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                            <span className="text-sm font-medium text-white">Live Transcript</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-400">
                            <Sparkles className="h-3 w-3" />
                            AI-Powered
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                            {transcript.map((entry, index) => (
                                <div key={index} className="group">
                                    <div className="mb-1 flex items-center gap-2">
                                        <span className={`text-xs font-semibold ${entry.speaker === 'Interviewer' ? 'text-purple-400' : 'text-blue-400'
                                            }`}>
                                            {entry.speaker}
                                        </span>
                                        <span className="text-xs text-slate-500">{entry.time}</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-slate-300">{entry.text}</p>
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            <div className="flex items-center gap-2 text-slate-500">
                                <div className="flex gap-1">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '0ms' }}></div>
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '150ms' }}></div>
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-xs">Transcribing...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* End Interview Modal */}
            {showEndModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
                        <h2 className="mb-4 text-2xl font-bold text-white">End Interview?</h2>
                        <p className="mb-6 text-slate-300">
                            Are you sure you want to end this interview? The AI will analyze the transcript and generate an evaluation report.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowEndModal(false)}
                                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                Continue Interview
                            </button>
                            <button
                                onClick={handleEndInterview}
                                className="flex-1 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/60"
                            >
                                End & Evaluate
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
