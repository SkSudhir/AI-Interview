'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { FileText, TrendingUp, MessageSquare } from 'lucide-react';

interface QuestionEvaluation {
    id: string;
    questionText: string;
    skillName: string;
    traitEvaluation: 'STRONG' | 'MODERATE' | 'WEAK';
    overallScore: number;
    evidenceMapping: Array<{
        quote: string;
        timestamp: string;
        significance: string;
    }>;
    summary: string[];
}

interface InterviewSummary {
    strengths: string[];
    developmentAreas: string[];
    competencySummary: string;
    hiringRecommendation: 'STRONG_HIRE' | 'HIRE' | 'LEAN_HIRE' | 'LEAN_NO_HIRE' | 'NO_HIRE';
    justification: string;
}

interface Transcript {
    speaker: string;
    text: string;
    timestamp: string;
    questionId?: string;
}

interface SummarizationDashboardProps {
    evaluations: QuestionEvaluation[];
    summary: InterviewSummary;
    transcripts: Transcript[];
    onGenerateEvaluations: () => Promise<void>;
}

export function SummarizationDashboard({
    evaluations,
    summary,
    transcripts,
    onGenerateEvaluations,
}: SummarizationDashboardProps) {
    const [activeTab, setActiveTab] = useState<'notes' | 'summary' | 'transcript'>('notes');
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            await onGenerateEvaluations();
        } finally {
            setIsGenerating(false);
        }
    };

    const getRecommendationColor = (recommendation: string) => {
        switch (recommendation) {
            case 'STRONG_HIRE':
                return 'bg-green-600 text-white';
            case 'HIRE':
                return 'bg-green-500 text-white';
            case 'LEAN_HIRE':
                return 'bg-yellow-500 text-white';
            case 'LEAN_NO_HIRE':
                return 'bg-orange-500 text-white';
            case 'NO_HIRE':
                return 'bg-red-600 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getTraitColor = (trait: string) => {
        switch (trait) {
            case 'STRONG':
                return 'text-green-700 bg-green-100';
            case 'MODERATE':
                return 'text-yellow-700 bg-yellow-100';
            case 'WEAK':
                return 'text-red-700 bg-red-100';
            default:
                return 'text-gray-700 bg-gray-100';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">AI Summarization Dashboard</h1>
                {evaluations.length === 0 && (
                    <Button onClick={handleGenerate} disabled={isGenerating}>
                        {isGenerating ? 'Generating Evaluations...' : 'Generate AI Evaluations'}
                    </Button>
                )}
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <nav className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('notes')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'notes'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FileText size={18} />
                            Question Notes
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('summary')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'summary'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <TrendingUp size={18} />
                            Interview Summary
                        </div>
                    </button>
                    <button
                        onClick={() => setActiveTab('transcript')}
                        className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'transcript'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <MessageSquare size={18} />
                            Interview Transcript
                        </div>
                    </button>
                </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'notes' && (
                <div className="space-y-4">
                    {evaluations.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <p className="text-gray-500">
                                    No evaluations yet. Click "Generate AI Evaluations" to analyze the interview.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        evaluations.map((evaluation) => (
                            <Card key={evaluation.id}>
                                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                                                    {evaluation.skillName}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTraitColor(evaluation.traitEvaluation)}`}>
                                                    {evaluation.traitEvaluation}
                                                </span>
                                            </div>
                                            <p className="text-gray-900 font-medium">{evaluation.questionText}</p>
                                        </div>
                                        <div className="ml-4 text-right">
                                            <div className="text-3xl font-bold text-blue-600">{evaluation.overallScore}</div>
                                            <div className="text-xs text-gray-500">/ 5</div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Summary */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Summary:</h4>
                                        <ul className="space-y-1">
                                            {evaluation.summary.map((point, i) => (
                                                <li key={i} className="flex gap-2 text-sm text-gray-700">
                                                    <span className="text-blue-600">•</span>
                                                    <span>{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Evidence Mapping */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Evidence from Transcript:</h4>
                                        <div className="space-y-2">
                                            {evaluation.evidenceMapping.map((evidence, i) => (
                                                <div key={i} className="bg-gray-50 border-l-4 border-blue-500 p-3 rounded">
                                                    <p className="text-sm text-gray-700 italic mb-1">"{evidence.quote}"</p>
                                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                                        <span>{evidence.significance}</span>
                                                        <span>{evidence.timestamp}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {activeTab === 'summary' && (
                <div className="space-y-6">
                    {!summary ? (
                        <Card>
                            <CardContent className="text-center py-12">
                                <p className="text-gray-500">
                                    No summary available. Generate AI evaluations first.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <>
                            {/* Hiring Recommendation */}
                            <Card>
                                <CardHeader>
                                    <h3 className="text-xl font-bold text-gray-900">Hiring Recommendation</h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className={`px-6 py-3 rounded-lg text-lg font-bold ${getRecommendationColor(summary.hiringRecommendation)}`}>
                                            {summary.hiringRecommendation.replace(/_/g, ' ')}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{summary.justification}</p>
                                </CardContent>
                            </Card>

                            {/* Strengths and Development Areas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader className="bg-green-50">
                                        <h3 className="text-lg font-bold text-green-900">Top 3 Strengths</h3>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {summary.strengths.map((strength, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-gray-700">{strength}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="bg-orange-50">
                                        <h3 className="text-lg font-bold text-orange-900">Top 3 Development Areas</h3>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3">
                                            {summary.developmentAreas.map((area, i) => (
                                                <li key={i} className="flex gap-3">
                                                    <span className="flex-shrink-0 w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                                        {i + 1}
                                                    </span>
                                                    <span className="text-gray-700">{area}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Overall Competency Summary */}
                            <Card>
                                <CardHeader>
                                    <h3 className="text-lg font-bold text-gray-900">Overall Competency Summary</h3>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 leading-relaxed">{summary.competencySummary}</p>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>
            )}

            {activeTab === 'transcript' && (
                <Card>
                    <CardHeader>
                        <h3 className="text-xl font-bold text-gray-900">Full Interview Transcript</h3>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                            {transcripts.length === 0 ? (
                                <p className="text-gray-500">No transcript available.</p>
                            ) : (
                                transcripts.map((entry, i) => (
                                    <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className={`font-semibold text-sm ${entry.speaker === 'INTERVIEWER' ? 'text-blue-600' : 'text-green-600'
                                                }`}>
                                                {entry.speaker}
                                            </span>
                                            <span className="text-xs text-gray-500">{entry.timestamp}</span>
                                        </div>
                                        <p className="text-gray-700">{entry.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
