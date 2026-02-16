import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: adminPassword,
            role: 'ADMIN',
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create recruiter user
    const recruiterPassword = await bcrypt.hash('recruiter123', 10);
    const recruiter = await prisma.user.upsert({
        where: { email: 'recruiter@example.com' },
        update: {},
        create: {
            email: 'recruiter@example.com',
            name: 'Jane Recruiter',
            password: recruiterPassword,
            role: 'RECRUITER',
        },
    });
    console.log('✅ Created recruiter user:', recruiter.email);

    // Create interviewer user
    const interviewerPassword = await bcrypt.hash('interviewer123', 10);
    const interviewer = await prisma.user.upsert({
        where: { email: 'interviewer@example.com' },
        update: {},
        create: {
            email: 'interviewer@example.com',
            name: 'John Interviewer',
            password: interviewerPassword,
            role: 'INTERVIEWER',
        },
    });
    console.log('✅ Created interviewer user:', interviewer.email);

    // Create sample interview guide
    const guide = await prisma.interviewGuide.create({
        data: {
            title: 'Senior Software Engineer Interview',
            jobFamily: 'engineering',
            role: 'Software Engineer',
            level: 'professional',
            jobDescription: 'We are looking for a Senior Software Engineer with 5+ years of experience in full-stack development.',
            status: 'PUBLISHED',
            createdById: recruiter.id,
        },
    });
    console.log('✅ Created interview guide:', guide.title);

    // Create skills
    const skills = await Promise.all([
        prisma.skill.create({
            data: {
                name: 'Problem Solving',
                description: 'Ability to analyze complex problems and develop effective solutions',
                interviewGuideId: guide.id,
            },
        }),
        prisma.skill.create({
            data: {
                name: 'Technical Communication',
                description: 'Ability to explain technical concepts clearly to various audiences',
                interviewGuideId: guide.id,
            },
        }),
        prisma.skill.create({
            data: {
                name: 'Collaboration',
                description: 'Working effectively with cross-functional teams',
                interviewGuideId: guide.id,
            },
        }),
    ]);
    console.log('✅ Created skills:', skills.map(s => s.name).join(', '));

    // Create questions for first skill
    const question1 = await prisma.question.create({
        data: {
            skillId: skills[0].id,
            text: 'Tell me about a time when you faced a complex technical problem. How did you approach it?',
            traits: ['Analytical Thinking', 'Problem Decomposition', 'Solution Design'],
            order: 1,
            isCustom: false,
        },
    });

    // Create scoring guides for question 1
    await Promise.all([
        prisma.scoringGuide.create({
            data: {
                questionId: question1.id,
                level: 'HIGH',
                score: 5,
                description: 'Demonstrates systematic approach, considers multiple solutions, evaluates trade-offs, and validates solution effectiveness',
            },
        }),
        prisma.scoringGuide.create({
            data: {
                questionId: question1.id,
                level: 'MEDIUM',
                score: 3,
                description: 'Shows logical thinking and arrives at a solution, but may miss some considerations or alternative approaches',
            },
        }),
        prisma.scoringGuide.create({
            data: {
                questionId: question1.id,
                level: 'LOW',
                score: 1,
                description: 'Struggles to articulate approach, solution lacks depth, or shows limited problem-solving methodology',
            },
        }),
    ]);
    console.log('✅ Created question with scoring guides');

    // Create a sample scheduled interview
    const interview = await prisma.interview.create({
        data: {
            guideId: guide.id,
            candidateName: 'Alice Candidate',
            candidateEmail: 'alice@example.com',
            scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
            uniqueLink: 'sample-interview-link-123',
            status: 'SCHEDULED',
            createdById: recruiter.id,
        },
    });
    console.log('✅ Created sample interview');

    // Add interviewer as participant
    await prisma.interviewParticipant.create({
        data: {
            interviewId: interview.id,
            userId: interviewer.id,
            role: 'INTERVIEWER',
        },
    });
    console.log('✅ Added interviewer participant');

    console.log('🎉 Database seed completed successfully!');
    console.log('\n📝 Sample Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Recruiter: recruiter@example.com / recruiter123');
    console.log('Interviewer: interviewer@example.com / interviewer123');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
