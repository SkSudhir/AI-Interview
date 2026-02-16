import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// GET /api/interviews/[id] - Get specific interview
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const interview = await prisma.interview.findUnique({
            where: { id: params.id },
            include: {
                guide: {
                    include: {
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
                },
                participants: {
                    include: {
                        interviewer: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                transcripts: {
                    orderBy: {
                        timestamp: 'asc',
                    },
                },
                evaluations: {
                    include: {
                        question: true,
                        skill: true,
                    },
                },
                summary: true,
            },
        });

        if (!interview) {
            return NextResponse.json(
                { error: 'Interview not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(interview);
    } catch (error) {
        console.error('Error fetching interview:', error);
        return NextResponse.json(
            { error: 'Failed to fetch interview' },
            { status: 500 }
        );
    }
}

// PATCH /api/interviews/[id] - Update interview
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { status, consentGiven } = body;

        const updateData: any = {};
        if (status) updateData.status = status;
        if (consentGiven !== undefined) {
            updateData.consentGiven = consentGiven;
            if (consentGiven) {
                updateData.consentGivenAt = new Date();
            }
        }

        const interview = await prisma.interview.update({
            where: { id: params.id },
            data: updateData,
        });

        return NextResponse.json(interview);
    } catch (error) {
        console.error('Error updating interview:', error);
        return NextResponse.json(
            { error: 'Failed to update interview' },
            { status: 500 }
        );
    }
}
