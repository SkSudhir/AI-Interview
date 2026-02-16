import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// PATCH /api/questions/[id] - Update question
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { text, traits, scoringGuide } = body;

        const question = await prisma.question.update({
            where: { id },
            data: {
                text,
                traits,
            },
        });

        // Update scoring guides if provided
        if (scoringGuide && Array.isArray(scoringGuide)) {
            // Delete existing scoring guides
            await prisma.scoringGuide.deleteMany({
                where: { questionId: id },
            });

            // Create new scoring guides
            await Promise.all(
                scoringGuide.map((sg: any) =>
                    prisma.scoringGuide.create({
                        data: {
                            questionId: id,
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
            where: { id },
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
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.question.delete({
            where: { id },
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
