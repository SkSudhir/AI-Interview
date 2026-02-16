import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { generateQuestions } from '@/lib/ai/services';

// POST /api/skills/[id]/questions/generate - Generate questions for a skill
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const skill = await prisma.skill.findUnique({
            where: { id },
        });

        if (!skill) {
            return NextResponse.json(
                { error: 'Skill not found' },
                { status: 404 }
            );
        }

        // Generate questions using AI
        const questions = await generateQuestions({
            name: skill.name,
            description: skill.description || undefined,
        });

        // Get current max order for this skill
        const maxOrderQuestion = await prisma.question.findFirst({
            where: { skillId: skill.id },
            orderBy: { order: 'desc' },
        });

        const startOrder = (maxOrderQuestion?.order || 0) + 1;

        // Save generated questions
        const createdQuestions = await Promise.all(
            questions.map(async (q, index) => {
                const question = await prisma.question.create({
                    data: {
                        skillId: skill.id,
                        text: q.text,
                        traits: q.traits,
                        order: startOrder + index,
                        isCustom: false,
                    },
                });

                // Create scoring guides
                await Promise.all(
                    q.scoringGuide.map((sg) =>
                        prisma.scoringGuide.create({
                            data: {
                                questionId: question.id,
                                level: sg.level,
                                score: sg.score,
                                description: sg.description,
                            },
                        })
                    )
                );

                return question;
            })
        );

        // Fetch complete questions with scoring guides
        const completeQuestions = await prisma.question.findMany({
            where: {
                id: {
                    in: createdQuestions.map((q) => q.id),
                },
            },
            include: {
                scoringGuides: true,
            },
        });

        return NextResponse.json(completeQuestions);
    } catch (error) {
        console.error('Error generating questions:', error);
        return NextResponse.json(
            { error: 'Failed to generate questions' },
            { status: 500 }
        );
    }
}
