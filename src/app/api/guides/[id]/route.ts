import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { validateGuide } from '@/lib/ai/services';

// GET /api/guides/[id] - Get specific guide
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const guide = await prisma.interviewGuide.findUnique({
            where: { id: params.id },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                skills: {
                    include: {
                        questions: {
                            include: {
                                scoringGuides: true,
                            },
                            orderBy: {
                                order: 'asc',
                            },
                        },
                    },
                },
            },
        });

        if (!guide) {
            return NextResponse.json(
                { error: 'Guide not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(guide);
    } catch (error) {
        console.error('Error fetching guide:', error);
        return NextResponse.json(
            { error: 'Failed to fetch guide' },
            { status: 500 }
        );
    }
}

// PATCH /api/guides/[id] - Update guide
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { title, jobFamily, role, level, jobDescription, status } = body;

        const guide = await prisma.interviewGuide.update({
            where: { id: params.id },
            data: {
                title,
                jobFamily,
                role,
                level,
                jobDescription,
                status,
            },
            include: {
                skills: {
                    include: {
                        questions: {
                            include: {
                                scoringGuides: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(guide);
    } catch (error) {
        console.error('Error updating guide:', error);
        return NextResponse.json(
            { error: 'Failed to update guide' },
            { status: 500 }
        );
    }
}

// DELETE /api/guides/[id] - Delete guide
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.interviewGuide.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting guide:', error);
        return NextResponse.json(
            { error: 'Failed to delete guide' },
            { status: 500 }
        );
    }
}
