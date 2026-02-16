import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// PATCH /api/questions/[id] - Update question
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { text, traits, scoringGuide } = body;

        const question = await prisma.question.update({
            where: { id: params.id },
            data: {
                text,
                traits,
            },
        });

        // Update scoring guides if provided
        if (scoringGuide && Array.isArray(scoringGuide)) {
            // Delete existing scoring guides
            await prisma.scoringGuide.deleteMany({
                where: { questionId: params.id },
            });

            // Create new scoring guides
            await Promise.all(
                scoringGuide.map((sg: any) =>
                    prisma.scoringGuide.create({
                        data: {
                            questionId: params.id,
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
            where: { id: params.id },
            include: {
                scoringGuides: true,
            },
        });

        return NextResponse.json(completeQuestion);
    } catch (error) {
        console.error('Error updating question:', error);
        return NextResponse.json(
            { error: 'Failed to update question' },
            { status: 500 }
        );
    }
}

// DELETE /api/questions/[id] - Delete question
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.question.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting question:', error);
        return NextResponse.json(
            { error: 'Failed to delete question' },
            { status: 500 }
        );
    }
}
