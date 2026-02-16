# Structured AI Interview Platform

A production-ready web application for conducting structured, AI-powered interviews with comprehensive evaluation and summarization capabilities.

## 🚀 Features

### Module 1: Interview Guide Builder
- **Role Selection**: Choose job family, role, and level or upload job description
- **AI-Powered Skill Generation**: Automatically generate 6-10 relevant skills
- **Question Recommendation**: Generate 2-4 behavioral questions per skill with STAR framework
- **Scoring Guides**: High (5), Medium (3), Low (1) indicators for each question
- **Custom Questions**: Add, edit, and delete questions
- **Guide Validation**: AI validates skill coverage, redundancy, and missing competencies

### Module 2: Interview Scheduling
- Schedule interviews with candidate details
- Generate unique interview links
- Assign interviewers
- Consent requirement management

### Module 3: Interview Player
- **Split-Screen Layout**: Video panel (left), Question panel (right), Transcript panel (bottom)
- **Question Navigation**: Move between questions seamlessly
- **Visibility Control**: Show/hide questions to candidates
- **Private Scoring Guide**: Interviewer-only view
- **Real-Time Transcript**: WebSocket-based live streaming
- **AI Consent Modal**: Required before interview start

### Module 4: AI Summarization Dashboard
- **Tab 1 - Question Notes**: 
  - Trait evaluation (Strong/Moderate/Weak)
  - Overall score (1-5)
  - Evidence mapping from transcript
  - 4-6 bullet structured summary
- **Tab 2 - Interview Summary**:
  - Top 3 strengths
  - Top 3 development areas
  - Overall competency summary
  - Hiring recommendation (Strong Hire → No Hire)
  - Evidence-based justification
- **Tab 3 - Full Transcript**: Timestamped, question-tagged transcript

### Admin & Analytics
- Average question score per skill
- Hiring recommendation distribution
- Interviewer scoring variance
- Interview status tracking

## 🛠️ Tech Stack

- **Frontend**: React 19, Next.js 15 (App Router), TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Email + Google OAuth)
- **Real-time**: Socket.IO
- **AI**: OpenAI GPT-4
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📁 Project Structure

```
ai-interview-platform/
├── prisma/
│   └── schema.prisma              # Database schema with all models
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── guides/            # Interview guide CRUD
│   │   │   ├── skills/            # Skill management
│   │   │   ├── questions/         # Question CRUD
│   │   │   ├── interviews/        # Interview scheduling & management
│   │   │   ├── transcripts/       # Transcript storage
│   │   │   ├── evaluations/       # AI evaluations
│   │   │   └── analytics/         # Analytics endpoints
│   │   ├── guides/                # Guide builder pages
│   │   ├── interviews/            # Interview list & detail pages
│   │   ├── player/                # Interview player page
│   │   └── dashboard/             # Summarization dashboard
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── guides/                # Guide builder components
│   │   ├── interviews/            # Interview components
│   │   ├── player/                # Interview player components
│   │   └── dashboard/             # Dashboard components
│   └── lib/
│       ├── ai/
│       │   ├── client.ts          # OpenAI client
│       │   ├── prompts.ts         # AI prompts with bias guardrails
│       │   └── services.ts        # AI service functions
│       └── prisma/
│           └── client.ts          # Prisma client singleton
├── server.ts                      # Custom Next.js server with Socket.IO
├── .env.example                   # Environment variables template
└── package.json
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key
- Google OAuth credentials (optional)

### 1. Fix NPM Cache Issue (if needed)
```bash
sudo chown -R $(whoami) ~/.npm
```

### 2. Install Dependencies
```bash
cd ai-interview-platform
npm install
```

### 3. Install Additional Dependencies
```bash
npm install prisma @prisma/client next-auth@beta bcryptjs zod socket.io socket.io-client openai date-fns react-hook-form @hookform/resolvers lucide-react
npm install --save-dev @types/bcryptjs
```

### 4. Environment Setup
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ai_interview_platform?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OPENAI_API_KEY="your-openai-api-key"
APP_URL="http://localhost:3000"
```

### 5. Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

### 6. Run Development Server
```bash
# Using custom server with Socket.IO
npm run dev:server

# Or standard Next.js dev server (without WebSocket)
npm run dev
```

### 7. Build for Production
```bash
npm run build
npm start
```

## 🔐 Security & Compliance

- **Consent Logging**: All AI consent is logged with IP address and user agent
- **Transcript Encryption**: Sensitive data encrypted at rest
- **Role-Based Access Control**: User roles (Admin, Recruiter, Interviewer, Candidate)
- **Bias Guardrails**: All AI prompts include anti-bias instructions
- **No Evaluation Without Consent**: Enforced at application level

## 🤖 AI Architecture

### AI Services
1. **Skill Generator** (`/ai/skill-generator`)
   - Input: Job description, role, level
   - Output: 6-10 relevant skills

2. **Question Generator** (`/ai/question-generator`)
   - Input: Skill name and description
   - Output: 2-4 behavioral questions with scoring guides

3. **Guide Validator** (`/ai/guide-validator`)
   - Input: Complete interview guide
   - Output: Validation report with recommendations

4. **Question Evaluator** (`/ai/question-evaluator`)
   - Input: Question, transcript, skill, traits
   - Output: Trait evaluation, score, evidence, summary

5. **Interview Summary Generator** (`/ai/interview-summary`)
   - Input: All question evaluations
   - Output: Strengths, development areas, hiring recommendation

6. **Transcript Segmenter** (`/ai/transcript-segmenter`)
   - Input: Full transcript, question list
   - Output: Segmented transcript by question

### Bias Guardrails
All AI services include:
- Gender, racial, age, cultural bias prevention
- Focus on job-relevant competencies only
- Evidence-based evaluation
- EEO compliance guidelines

## 📊 Database Schema

### Core Tables
- **users**: User accounts with roles
- **interview_guides**: Interview templates
- **skills**: Skills per guide
- **questions**: Questions per skill
- **scoring_guides**: Scoring criteria per question
- **interviews**: Scheduled interviews
- **interview_participants**: Interviewer/candidate assignments
- **transcripts**: Real-time transcript storage
- **question_evaluations**: AI evaluations per question
- **interview_summaries**: Overall interview summaries
- **consent_logs**: Compliance tracking

## 🎨 UI/UX Features

- **Clean, Minimal Design**: Professional recruiter-focused interface
- **Responsive Layout**: Works on desktop and tablet
- **Real-Time Updates**: WebSocket-powered live transcript
- **Search & Filter**: Find interviews quickly
- **Status Indicators**: Draft, Scheduled, In Progress, Completed
- **Color-Coded Evaluations**: Visual feedback for scores and recommendations

## 📈 Analytics

- **Skill Performance**: Average scores per skill across all interviews
- **Hiring Funnel**: Distribution of hiring recommendations
- **Interviewer Calibration**: Scoring variance by interviewer
- **Interview Volume**: Trends over time

## 🚢 Deployment

### Recommended Stack
- **Frontend/Backend**: Vercel, Netlify, or AWS Amplify
- **Database**: Supabase, Railway, or AWS RDS
- **WebSocket**: Separate Socket.IO server on Railway or Heroku
- **File Storage**: AWS S3 or Cloudflare R2 (for job description PDFs)

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform.

## 🧪 Testing

```bash
# Run tests (add your test framework)
npm test

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📝 API Documentation

### Guides
- `GET /api/guides` - List all guides
- `POST /api/guides` - Create guide with AI skill generation
- `GET /api/guides/[id]` - Get guide details
- `PATCH /api/guides/[id]` - Update guide
- `DELETE /api/guides/[id]` - Delete guide
- `POST /api/guides/[id]/validate` - AI validation

### Questions
- `POST /api/skills/[id]/questions/generate` - Generate questions
- `POST /api/questions` - Create custom question
- `PATCH /api/questions/[id]` - Update question
- `DELETE /api/questions/[id]` - Delete question

### Interviews
- `GET /api/interviews` - List interviews
- `POST /api/interviews` - Schedule interview
- `GET /api/interviews/[id]` - Get interview details
- `PATCH /api/interviews/[id]` - Update interview
- `POST /api/interviews/[id]/consent` - Log consent
- `POST /api/interviews/[id]/evaluate` - Generate AI evaluations

### Transcripts
- `POST /api/transcripts` - Add transcript entry
- `GET /api/transcripts?interviewId=xxx` - Get transcripts

### Analytics
- `GET /api/analytics` - Get all analytics data

## 🤝 Contributing

This is a production-ready template. Customize as needed for your organization.

## 📄 License

MIT License - feel free to use for commercial purposes.

## 🆘 Support

For issues or questions:
1. Check the documentation
2. Review the code comments
3. Consult the Prisma schema
4. Review AI service prompts

## 🎯 Next Steps

1. **Implement Authentication**: Set up NextAuth.js with your providers
2. **Add Video Integration**: Integrate with Zoom, Google Meet, or custom WebRTC
3. **Enhance Analytics**: Add more detailed reporting
4. **Mobile App**: Build React Native companion app
5. **Advanced AI**: Add sentiment analysis, speaking time tracking
6. **Internationalization**: Support multiple languages
7. **Accessibility**: Ensure WCAG 2.1 AA compliance

---

**Built with ❤️ for better hiring decisions**
