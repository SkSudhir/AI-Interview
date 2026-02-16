import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// POST /api/questions - Create custom question
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { skillId, text, traits, scoringGuide } = body;

        // Get current max order for this skill
        const maxOrderQuestion = await prisma.question.findFirst({
            where: { skillId },
            orderBy: { order: 'desc' },
        });

        const order = (maxOrderQuestion?.order || 0) + 1;

        const question = await prisma.question.create({
            data: {
                skillId,
                text,
                traits,
                order,
                isCustom: true,
            },
        });

        // Create scoring guides if provided
        if (scoringGuide && Array.isArray(scoringGuide)) {
            await Promise.all(
                scoringGuide.map((sg: any) =>
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
        }

        // Fetch complete question with scoring guides
        const completeQuestion = await prisma.question.findUnique({
            where: { id: question.id },
            include: {
                scoringGuides: true,
            },
        });

        return NextResponse.json(completeQuestion);
    } catch (error) {
        console.error('Error creating question:', error);
        return NextResponse.json(
            { error: 'Failed to create question' },
            { status: 500 }
        );
    }
}
