import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { validateGuide } from '@/lib/ai/services';

// POST /api/guides/[id]/validate - Validate guide before publishing
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const guide = await prisma.interviewGuide.findUnique({
            where: { id },
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

        if (!guide) {
            return NextResponse.json(
                { error: 'Guide not found' },
                { status: 404 }
            );
        }

        // Prepare data for AI validation
        const skills = guide.skills.map((s) => ({
            name: s.name,
            description: s.description || undefined,
        }));

        const questions = guide.skills.flatMap((skill) =>
            skill.questions.map((q) => ({
                text: q.text,
                traits: q.traits,
                skillName: skill.name,
            }))
        );

        // Validate using AI
        const validation = await validateGuide({ skills, questions });

        return NextResponse.json(validation);
    } catch (error) {
        console.error('Error validating guide:', error);
        return NextResponse.json(
            { error: 'Failed to validate guide' },
            { status: 500 }
        );
    }
}
