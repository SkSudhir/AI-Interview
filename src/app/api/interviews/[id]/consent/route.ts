import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// POST /api/interviews/[id]/consent - Log consent
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { consentText, ipAddress, userAgent } = body;

        // Update interview consent status
        await prisma.interview.update({
            where: { id },
            data: {
                consentGiven: true,
                consentGivenAt: new Date(),
            },
        });

        // Log consent
        const consentLog = await prisma.consentLog.create({
            data: {
                interviewId: id,
                consentText,
                ipAddress,
                userAgent,
            },
        });

        return NextResponse.json(consentLog);
    } catch (error) {
        console.error('Error logging consent:', error);
        return NextResponse.json(
            { error: 'Failed to log consent' },
            { status: 500 }
        );
    }
}
