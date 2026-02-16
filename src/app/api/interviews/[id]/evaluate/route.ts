import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { evaluateQuestion, generateInterviewSummary } from '@/lib/ai/services';

// POST /api/interviews/[id]/evaluate - Generate AI evaluations for all questions
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const interview = await prisma.interview.findUnique({
            where: { id },
            include: {
                guide: {
                    include: {
                        skills: {
                            include: {
                                questions: {
                                    include: {
                                        transcripts: {
                                            where: {
                                                interviewId: id,
                                            },
                                            orderBy: {
                                                timestamp: 'asc',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!interview) {
            return NextResponse.json(
                { error: 'Interview not found' },
                { status: 404 }
            );
        }

        const evaluations = [];

        // Evaluate each question
        for (const skill of interview.guide.skills) {
            for (const question of skill.questions) {
                // Get transcript for this question
                const questionTranscripts = question.transcripts
                    .filter((t) => t.speaker === 'CANDIDATE')
                    .map((t) => t.text)
                    .join('\n');

                if (!questionTranscripts) continue;

                // Generate AI evaluation
                const aiEvaluation = await evaluateQuestion({
                    question: question.text,
                    skill: skill.name,
                    traits: question.traits,
                    transcript: questionTranscripts,
                });

                // Save evaluation
                const evaluation = await prisma.questionEvaluation.upsert({
                    where: {
                        interviewId_questionId: {
                            interviewId: id,
                            questionId: question.id,
                        },
                    },
                    create: {
                        interviewId: id,
                        questionId: question.id,
                        skillId: skill.id,
                        traitEvaluation: aiEvaluation.traitEvaluation,
                        overallScore: aiEvaluation.overallScore,
                        evidenceMapping: JSON.stringify(aiEvaluation.evidenceMapping),
                        summary: aiEvaluation.summary.join('\n'),
                    },
                    update: {
                        traitEvaluation: aiEvaluation.traitEvaluation,
                        overallScore: aiEvaluation.overallScore,
                        evidenceMapping: JSON.stringify(aiEvaluation.evidenceMapping),
                        summary: aiEvaluation.summary.join('\n'),
                    },
                });

                evaluations.push(evaluation);
            }
        }

        // Generate interview summary
        const evaluationData = evaluations.map((e) => ({
            question: interview.guide.skills
                .flatMap((s) => s.questions)
                .find((q) => q.id === e.questionId)?.text || '',
            skill: interview.guide.skills.find((s) => s.id === e.skillId)?.name || '',
            traitEvaluation: e.traitEvaluation || 'MODERATE',
            overallScore: e.overallScore || 3,
            summary: e.summary?.split('\n') || [],
        }));

        const aiSummary = await generateInterviewSummary(evaluationData);

        // Save summary
        const summary = await prisma.interviewSummary.upsert({
            where: {
                interviewId: id,
            },
            create: {
                interviewId: id,
                strengths: aiSummary.strengths,
                developmentAreas: aiSummary.developmentAreas,
                competencySummary: aiSummary.competencySummary,
                hiringRecommendation: aiSummary.hiringRecommendation,
                justification: aiSummary.justification,
            },
            update: {
                strengths: aiSummary.strengths,
                developmentAreas: aiSummary.developmentAreas,
                competencySummary: aiSummary.competencySummary,
                hiringRecommendation: aiSummary.hiringRecommendation,
                justification: aiSummary.justification,
            },
        });

        return NextResponse.json({
            evaluations,
            summary,
        });
    } catch (error) {
        console.error('Error evaluating interview:', error);
        return NextResponse.json(
            { error: 'Failed to evaluate interview' },
            { status: 500 }
        );
    }
}
