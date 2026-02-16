import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
    try {
        // Average question score per skill
        const skillScores = await prisma.questionEvaluation.groupBy({
            by: ['skillId'],
            _avg: {
                overallScore: true,
            },
            _count: {
                id: true,
            },
        });

        const skillScoresWithNames = await Promise.all(
            skillScores.map(async (score) => {
                const skill = await prisma.skill.findUnique({
                    where: { id: score.skillId },
                    select: { name: true },
                });
                return {
                    skillName: skill?.name || 'Unknown',
                    averageScore: score._avg.overallScore || 0,
                    evaluationCount: score._count.id,
                };
            })
        );

        // Hiring recommendation distribution
        const recommendationDistribution = await prisma.interviewSummary.groupBy({
            by: ['hiringRecommendation'],
            _count: {
                id: true,
            },
        });

        // Interviewer scoring variance
        const interviewerVariance = await prisma.$queryRaw`
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(DISTINCT i.id) as interview_count,
        AVG(qe.overall_score) as avg_score,
        STDDEV(qe.overall_score) as score_variance
      FROM users u
      JOIN interview_participants ip ON u.id = ip.user_id
      JOIN interviews i ON ip.interview_id = i.id
      LEFT JOIN question_evaluations qe ON i.id = qe.interview_id
      WHERE ip.role = 'INTERVIEWER'
      GROUP BY u.id, u.name, u.email
      HAVING COUNT(DISTINCT i.id) > 0
    `;

        // Total interviews by status
        const interviewsByStatus = await prisma.interview.groupBy({
            by: ['status'],
            _count: {
                id: true,
            },
        });

        // Recent interviews
        const recentInterviews = await prisma.interview.findMany({
            take: 10,
            orderBy: {
                scheduledAt: 'desc',
            },
            include: {
                guide: {
                    select: {
                        title: true,
                    },
                },
                summary: {
                    select: {
                        hiringRecommendation: true,
                    },
                },
            },
        });

        return NextResponse.json({
            skillScores: skillScoresWithNames,
            recommendationDistribution,
            interviewerVariance,
            interviewsByStatus,
            recentInterviews,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { error: 'Failed to fetch analytics' },
            { status: 500 }
        );
    }
}
