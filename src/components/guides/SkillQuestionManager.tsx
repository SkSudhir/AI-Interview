'use client';

import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Plus, Trash2, Edit } from 'lucide-react';

interface Skill {
    id: string;
    name: string;
    description?: string;
    questions: Question[];
}

interface Question {
    id: string;
    text: string;
    traits: string[];
    scoringGuides: ScoringGuide[];
}

interface ScoringGuide {
    level: string;
    score: number;
    description: string;
}

interface SkillQuestionManagerProps {
    skills: Skill[];
    onGenerateQuestions: (skillId: string) => Promise<void>;
    onAddCustomQuestion: (skillId: string) => void;
    onEditQuestion: (questionId: string) => void;
    onDeleteQuestion: (questionId: string) => void;
}

export function SkillQuestionManager({
    skills,
    onGenerateQuestions,
    onAddCustomQuestion,
    onEditQuestion,
    onDeleteQuestion,
}: SkillQuestionManagerProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Skills & Questions</h2>
            </div>

            {skills.length === 0 ? (
                <Card>
                    <CardContent className="text-center py-12">
                        <p className="text-gray-500">No skills generated yet. Create a guide to get started.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {skills.map((skill) => (
                        <Card key={skill.id}>
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{skill.name}</h3>
                                        {skill.description && (
                                            <p className="text-sm text-gray-600 mt-1">{skill.description}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => onGenerateQuestions(skill.id)}
                                            className="flex items-center gap-1"
                                        >
                                            <Plus size={16} />
                                            Generate Questions
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => onAddCustomQuestion(skill.id)}
                                            className="flex items-center gap-1"
                                        >
                                            <Plus size={16} />
                                            Add Custom
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                {skill.questions.length === 0 ? (
                                    <p className="text-gray-500 text-sm py-4">
                                        No questions yet. Generate or add custom questions.
                                    </p>
                                ) : (
                                    <div className="space-y-4">
                                        {skill.questions.map((question, index) => (
                                            <div
                                                key={question.id}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                                                Q{index + 1}
                                                            </span>
                                                            <div className="flex gap-1">
                                                                {question.traits.map((trait, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                                                                    >
                                                                        {trait}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-900 font-medium">{question.text}</p>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        <button
                                                            onClick={() => onEditQuestion(question.id)}
                                                            className="text-gray-400 hover:text-blue-600 transition-colors"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => onDeleteQuestion(question.id)}
                                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Scoring Guide */}
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <p className="text-xs font-semibold text-gray-700 mb-2">Scoring Guide:</p>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {question.scoringGuides.map((guide, i) => (
                                                            <div
                                                                key={i}
                                                                className={`p-2 rounded text-xs ${guide.level === 'HIGH'
                                                                        ? 'bg-green-50 border border-green-200'
                                                                        : guide.level === 'MEDIUM'
                                                                            ? 'bg-yellow-50 border border-yellow-200'
                                                                            : 'bg-red-50 border border-red-200'
                                                                    }`}
                                                            >
                                                                <div className="font-semibold mb-1">
                                                                    {guide.level} ({guide.score})
                                                                </div>
                                                                <div className="text-gray-600">{guide.description}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
