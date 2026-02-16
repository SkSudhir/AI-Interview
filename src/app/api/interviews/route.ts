import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { randomBytes } from 'crypto';

// GET /api/interviews - List all interviews
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');

        const interviews = await prisma.interview.findMany({
            where: status ? { status: status as any } : undefined,
            include: {
                guide: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
                createdBy: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
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
                summary: true,
            },
            orderBy: {
                scheduledAt: 'desc',
            },
        });

        return NextResponse.json(interviews);
    } catch (error) {
        console.error('Error fetching interviews:', error);
        return NextResponse.json(
            { error: 'Failed to fetch interviews' },
            { status: 500 }
        );
    }
}

// POST /api/interviews - Schedule new interview
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            guideId,
            candidateName,
            candidateEmail,
            interviewerId,
            scheduledAt,
            createdById,
        } = body;

        // Generate unique interview link
        const uniqueLink = randomBytes(16).toString('hex');

        const interview = await prisma.interview.create({
            data: {
                guideId,
                candidateName,
                candidateEmail,
                scheduledAt: new Date(scheduledAt),
                uniqueLink,
                createdById,
                status: 'SCHEDULED',
                consentRequired: true,
            },
        });

        // Add interviewer as participant
        if (interviewerId) {
            await prisma.interviewParticipant.create({
                data: {
                    interviewId: interview.id,
                    userId: interviewerId,
                    role: 'INTERVIEWER',
                },
            });
        }

        // Fetch complete interview
        const completeInterview = await prisma.interview.findUnique({
            where: { id: interview.id },
            include: {
                guide: true,
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
            },
        });

        return NextResponse.json(completeInterview);
    } catch (error) {
        console.error('Error creating interview:', error);
        return NextResponse.json(
            { error: 'Failed to create interview' },
            { status: 500 }
        );
    }
}
