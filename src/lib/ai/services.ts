import { openai, AI_MODEL, AI_TEMPERATURE } from './client';
import {
    SKILL_GENERATOR_PROMPT,
    QUESTION_GENERATOR_PROMPT,
    GUIDE_VALIDATOR_PROMPT,
    QUESTION_EVALUATOR_PROMPT,
    INTERVIEW_SUMMARY_PROMPT,
    TRANSCRIPT_SEGMENTER_PROMPT,
} from './prompts';

// Types
export interface Skill {
    name: string;
    description: string;
}

export interface ScoringGuide {
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    score: number;
    description: string;
}

export interface Question {
    text: string;
    traits: string[];
    scoringGuide: ScoringGuide[];
}

export interface GuideValidation {
    isValid: boolean;
    skillCoverage: {
        score: number;
        feedback: string;
    };
    redundancy: {
        score: number;
        issues: string[];
    };
    missingCompetencies: string[];
    recommendations: string[];
}

export interface QuestionEvaluation {
    traitEvaluation: 'STRONG' | 'MODERATE' | 'WEAK';
    overallScore: number;
    evidenceMapping: Array<{
        quote: string;
        timestamp: string;
        significance: string;
    }>;
    summary: string[];
}

export interface InterviewSummary {
    strengths: string[];
    developmentAreas: string[];
    competencySummary: string;
    hiringRecommendation: 'STRONG_HIRE' | 'HIRE' | 'LEAN_HIRE' | 'LEAN_NO_HIRE' | 'NO_HIRE';
    justification: string;
}

export interface TranscriptSegment {
    questionId: string;
    startTime: number;
    endTime: number;
    segments: Array<{
        speaker: 'INTERVIEWER' | 'CANDIDATE';
        text: string;
        timestamp: number;
    }>;
}

// Helper function to parse JSON from AI response
function parseAIResponse<T>(response: string): T {
    try {
        // Remove markdown code blocks if present
        const cleaned = response
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
        return JSON.parse(cleaned);
    } catch (error) {
        console.error('Failed to parse AI response:', response);
        throw new Error('Invalid AI response format');
    }
}

// AI Service: Skill Generator
export async function generateSkills(input: {
    jobFamily?: string;
    role?: string;
    level?: string;
    jobDescription?: string;
}): Promise<Skill[]> {
    const userMessage = `
Job Family: ${input.jobFamily || 'Not specified'}
Role: ${input.role || 'Not specified'}
Level: ${input.level || 'Not specified'}
Job Description: ${input.jobDescription || 'Not provided'}

Generate 6-10 relevant skills for this role.
  `.trim();

    const completion = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        messages: [
            { role: 'system', content: SKILL_GENERATOR_PROMPT },
            { role: 'user', content: userMessage },
        ],
    });

    const response = completion.choices[0]?.message?.content || '[]';
    return parseAIResponse<Skill[]>(response);
}

// AI Service: Question Generator
export async function generateQuestions(skill: {
    name: string;
    description?: string;
}): Promise<Question[]> {
    const userMessage = `
Skill: ${skill.name}
Description: ${skill.description || 'Not provided'}

Generate 2-4 behavioral interview questions for this skill.
  `.trim();

    const completion = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        messages: [
            { role: 'system', content: QUESTION_GENERATOR_PROMPT },
            { role: 'user', content: userMessage },
        ],
    });

    const response = completion.choices[0]?.message?.content || '[]';
    return parseAIResponse<Question[]>(response);
}

// AI Service: Guide Validator
export async function validateGuide(guide: {
    skills: Array<{ name: string; description?: string }>;
    questions: Array<{ text: string; traits: string[]; skillName: string }>;
}): Promise<GuideValidation> {
    const userMessage = `
Interview Guide:

Skills:
${guide.skills.map((s, i) => `${i + 1}. ${s.name}: ${s.description || 'No description'}`).join('\n')}

Questions:
${guide.questions.map((q, i) => `${i + 1}. [${q.skillName}] ${q.text}\n   Traits: ${q.traits.join(', ')}`).join('\n\n')}

Validate this interview guide.
  `.trim();

    const completion = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        messages: [
            { role: 'system', content: GUIDE_VALIDATOR_PROMPT },
            { role: 'user', content: userMessage },
        ],
    });

    const response = completion.choices[0]?.message?.content || '{}';
    return parseAIResponse<GuideValidation>(response);
}

// AI Service: Question Evaluator
export async function evaluateQuestion(input: {
    question: string;
    skill: string;
    traits: string[];
    transcript: string;
}): Promise<QuestionEvaluation> {
    const userMessage = `
Question: ${input.question}
Skill: ${input.skill}
Traits: ${input.traits.join(', ')}

Candidate Response Transcript:
${input.transcript}

Evaluate the candidate's response.
  `.trim();

    const completion = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        messages: [
            { role: 'system', content: QUESTION_EVALUATOR_PROMPT },
            { role: 'user', content: userMessage },
        ],
    });

    const response = completion.choices[0]?.message?.content || '{}';
    return parseAIResponse<QuestionEvaluation>(response);
}

// AI Service: Interview Summary Generator
export async function generateInterviewSummary(
    evaluations: Array<{
        question: string;
        skill: string;
        traitEvaluation: string;
        overallScore: number;
        summary: string[];
    }>
): Promise<InterviewSummary> {
    const userMessage = `
Question Evaluations:

${evaluations
            .map(
                (e, i) => `
${i + 1}. Question: ${e.question}
   Skill: ${e.skill}
   Trait Evaluation: ${e.traitEvaluation}
   Score: ${e.overallScore}/5
   Summary:
   ${e.summary.map((s) => `   - ${s}`).join('\n')}
`
            )
            .join('\n')}

Generate a comprehensive interview summary with hiring recommendation.
  `.trim();

    const completion = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        messages: [
            { role: 'system', content: INTERVIEW_SUMMARY_PROMPT },
            { role: 'user', content: userMessage },
        ],
    });

    const response = completion.choices[0]?.message?.content || '{}';
    return parseAIResponse<InterviewSummary>(response);
}

// AI Service: Transcript Segmenter
export async function segmentTranscript(
    transcript: string,
    questions: Array<{ id: string; text: string }>
): Promise<TranscriptSegment[]> {
    const userMessage = `
Questions:
${questions.map((q, i) => `${i + 1}. [ID: ${q.id}] ${q.text}`).join('\n')}

Full Transcript:
${transcript}

Segment this transcript by question boundaries.
  `.trim();

    const completion = await openai.chat.completions.create({
        model: AI_MODEL,
        temperature: AI_TEMPERATURE,
        messages: [
            { role: 'system', content: TRANSCRIPT_SEGMENTER_PROMPT },
            { role: 'user', content: userMessage },
        ],
    });

    const response = completion.choices[0]?.message?.content || '[]';
    return parseAIResponse<TranscriptSegment[]>(response);
}
