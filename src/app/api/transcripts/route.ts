import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// POST /api/transcripts - Add transcript entry
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { interviewId, questionId, speaker, text, startTime, endTime } = body;

        const transcript = await prisma.transcript.create({
            data: {
                interviewId,
                questionId,
                speaker,
                text,
                startTime,
                endTime,
            },
        });

        return NextResponse.json(transcript);
    } catch (error) {
        console.error('Error creating transcript:', error);
        return NextResponse.json(
            { error: 'Failed to create transcript' },
            { status: 500 }
        );
    }
}

// GET /api/transcripts?interviewId=xxx - Get transcripts for interview
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const interviewId = searchParams.get('interviewId');

        if (!interviewId) {
            return NextResponse.json(
                { error: 'interviewId is required' },
                { status: 400 }
            );
        }

        const transcripts = await prisma.transcript.findMany({
            where: { interviewId },
            include: {
                question: {
                    select: {
                        id: true,
                        text: true,
                    },
                },
            },
            orderBy: {
                timestamp: 'asc',
            },
        });

        return NextResponse.json(transcripts);
    } catch (error) {
        console.error('Error fetching transcripts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch transcripts' },
            { status: 500 }
        );
    }
}
