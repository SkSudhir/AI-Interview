'use client';

import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';

interface Question {
    id: string;
    text: string;
    traits: string[];
    scoringGuides: Array<{
        level: string;
        score: number;
        description: string;
    }>;
}

interface TranscriptEntry {
    speaker: 'INTERVIEWER' | 'CANDIDATE';
    text: string;
    timestamp: number;
}

interface InterviewPlayerProps {
    interviewId: string;
    questions: Question[];
}

export function InterviewPlayer({ interviewId, questions }: InterviewPlayerProps) {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionVisible, setQuestionVisible] = useState(false);
    const [transcripts, setTranscripts] = useState<TranscriptEntry[]>([]);

    useEffect(() => {
        // Initialize Socket.IO connection
        const newSocket = io(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
        setSocket(newSocket);

        newSocket.emit('join-interview', interviewId);

        // Listen for transcript updates
        newSocket.on('transcript-update', (data: TranscriptEntry) => {
            setTranscripts((prev) => [...prev, data]);
        });

        // Listen for question changes from other participants
        newSocket.on('question-changed', (data: { questionId: string }) => {
            const index = questions.findIndex((q) => q.id === data.questionId);
            if (index !== -1) {
                setCurrentQuestionIndex(index);
            }
        });

        // Listen for question visibility changes
        newSocket.on('question-visibility-changed', (data: { visible: boolean }) => {
            setQuestionVisible(data.visible);
        });

        return () => {
            newSocket.emit('leave-interview', interviewId);
            newSocket.close();
        };
    }, [interviewId, questions]);

    const currentQuestion = questions[currentQuestionIndex];

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            const newIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(newIndex);
            socket?.emit('question-change', {
                interviewId,
                questionId: questions[newIndex].id,
            });
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const newIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(newIndex);
            socket?.emit('question-change', {
                interviewId,
                questionId: questions[newIndex].id,
            });
        }
    };

    const toggleQuestionVisibility = () => {
        const newVisibility = !questionVisible;
        setQuestionVisible(newVisibility);
        socket?.emit('question-visibility', {
            interviewId,
            questionId: currentQuestion.id,
            visible: newVisibility,
        });
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Interview Session</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handlePreviousQuestion}
                                disabled={currentQuestionIndex === 0}
                            >
                                <ChevronLeft size={16} />
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                <ChevronRight size={16} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left: Video Panel */}
                <div className="w-1/2 p-4">
                    <Card className="h-full">
                        <CardContent className="h-full flex items-center justify-center bg-gray-900 text-white rounded-lg">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📹</div>
                                <p className="text-lg">Video Feed</p>
                                <p className="text-sm text-gray-400 mt-2">
                                    Integrate with your video conferencing solution
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Question Panel */}
                <div className="w-1/2 p-4 flex flex-col gap-4">
                    {/* Question Card */}
                    <Card className="flex-1 overflow-auto">
                        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Current Question</h2>
                                <Button
                                    size="sm"
                                    variant={questionVisible ? 'secondary' : 'outline'}
                                    onClick={toggleQuestionVisibility}
                                    className="flex items-center gap-2"
                                >
                                    {questionVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    {questionVisible ? 'Hide from Candidate' : 'Show to Candidate'}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Question Text */}
                            <div>
                                <p className="text-lg font-medium text-gray-900">{currentQuestion?.text}</p>
                            </div>

                            {/* Traits */}
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Traits Assessed:</p>
                                <div className="flex flex-wrap gap-2">
                                    {currentQuestion?.traits.map((trait, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                                        >
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Scoring Guide */}
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Scoring Guide (Private):</p>
                                <div className="space-y-2">
                                    {currentQuestion?.scoringGuides.map((guide, i) => (
                                        <div
                                            key={i}
                                            className={`p-3 rounded-lg border ${guide.level === 'HIGH'
                                                    ? 'bg-green-50 border-green-200'
                                                    : guide.level === 'MEDIUM'
                                                        ? 'bg-yellow-50 border-yellow-200'
                                                        : 'bg-red-50 border-red-200'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold text-sm">{guide.level}</span>
                                                <span className="text-sm font-bold">Score: {guide.score}</span>
                                            </div>
                                            <p className="text-sm text-gray-700">{guide.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom: Transcript Panel */}
            <div className="h-64 bg-white border-t border-gray-200 p-4">
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900">Live Transcript</h3>
                        <span className="text-xs text-gray-500">Real-time streaming</span>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-2">
                        {transcripts.length === 0 ? (
                            <p className="text-gray-400 text-sm">Transcript will appear here...</p>
                        ) : (
                            transcripts.map((entry, i) => (
                                <div key={i} className="flex gap-3">
                                    <span
                                        className={`text-xs font-semibold ${entry.speaker === 'INTERVIEWER' ? 'text-blue-600' : 'text-green-600'
                                            }`}
                                    >
                                        {entry.speaker}:
                                    </span>
                                    <span className="text-sm text-gray-800 flex-1">{entry.text}</span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(entry.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
