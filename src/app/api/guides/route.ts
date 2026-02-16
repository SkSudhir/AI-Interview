import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { generateSkills } from '@/lib/ai/services';

// GET /api/guides - List all interview guides
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const status = searchParams.get('status');

        const guides = await prisma.interviewGuide.findMany({
            where: status ? { status: status as any } : undefined,
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
                        questions: true,
                    },
                },
                _count: {
                    select: {
                        interviews: true,
                    },
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return NextResponse.json(guides);
    } catch (error) {
        console.error('Error fetching guides:', error);
        return NextResponse.json(
            { error: 'Failed to fetch guides' },
            { status: 500 }
        );
    }
}

// POST /api/guides - Create new interview guide
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, jobFamily, role, level, jobDescription, createdById } = body;

        // Create the guide
        const guide = await prisma.interviewGuide.create({
            data: {
                title,
                jobFamily,
                role,
                level,
                jobDescription,
                createdById,
                status: 'DRAFT',
            },
        });

        // Generate skills using AI
        const skills = await generateSkills({
            jobFamily,
            role,
            level,
            jobDescription,
        });

        // Save generated skills
        const createdSkills = await Promise.all(
            skills.map((skill) =>
                prisma.skill.create({
                    data: {
                        name: skill.name,
                        description: skill.description,
                        interviewGuideId: guide.id,
                    },
                })
            )
        );

        return NextResponse.json({
            guide,
            skills: createdSkills,
        });
    } catch (error) {
        console.error('Error creating guide:', error);
        return NextResponse.json(
            { error: 'Failed to create guide' },
            { status: 500 }
        );
    }
}
