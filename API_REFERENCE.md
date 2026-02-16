# API Reference - Structured AI Interview Platform

## Base URL
```
http://localhost:3000/api
```

## Authentication
All API routes should be protected with NextAuth.js middleware (to be implemented).

---

## 📋 Interview Guides

### List All Guides
```http
GET /api/guides
```

**Query Parameters**:
- `status` (optional): Filter by status (`DRAFT` or `PUBLISHED`)

**Response**:
```json
[
  {
    "id": "clx...",
    "title": "Senior Software Engineer Interview",
    "jobFamily": "engineering",
    "role": "Software Engineer",
    "level": "professional",
    "status": "PUBLISHED",
    "createdBy": {
      "id": "clx...",
      "name": "Jane Recruiter",
      "email": "recruiter@example.com"
    },
    "skills": [...],
    "_count": {
      "interviews": 5
    }
  }
]
```

### Create Guide
```http
POST /api/guides
```

**Request Body**:
```json
{
  "title": "Senior Software Engineer Interview",
  "jobFamily": "engineering",
  "role": "Software Engineer",
  "level": "professional",
  "jobDescription": "We are looking for...",
  "createdById": "clx..."
}
```

**Response**:
```json
{
  "guide": {
    "id": "clx...",
    "title": "Senior Software Engineer Interview",
    ...
  },
  "skills": [
    {
      "id": "clx...",
      "name": "Problem Solving",
      "description": "Ability to analyze complex problems..."
    }
  ]
}
```

### Get Guide by ID
```http
GET /api/guides/{id}
```

**Response**: Complete guide with skills and questions

### Update Guide
```http
PATCH /api/guides/{id}
```

**Request Body**:
```json
{
  "title": "Updated Title",
  "status": "PUBLISHED"
}
```

### Delete Guide
```http
DELETE /api/guides/{id}
```

### Validate Guide
```http
POST /api/guides/{id}/validate
```

**Response**:
```json
{
  "isValid": true,
  "skillCoverage": {
    "score": 85,
    "feedback": "Good coverage of core competencies"
  },
  "redundancy": {
    "score": 90,
    "issues": []
  },
  "missingCompetencies": ["Leadership", "Strategic Thinking"],
  "recommendations": [
    "Consider adding questions about team leadership",
    "Add more questions on system design"
  ]
}
```

---

## 🎯 Skills & Questions

### Generate Questions for Skill
```http
POST /api/skills/{id}/questions/generate
```

**Response**:
```json
[
  {
    "id": "clx...",
    "text": "Tell me about a time when...",
    "traits": ["Analytical Thinking", "Problem Solving"],
    "scoringGuides": [
      {
        "level": "HIGH",
        "score": 5,
        "description": "Demonstrates systematic approach..."
      }
    ]
  }
]
```

### Create Custom Question
```http
POST /api/questions
```

**Request Body**:
```json
{
  "skillId": "clx...",
  "text": "Describe a situation where...",
  "traits": ["Communication", "Collaboration"],
  "scoringGuide": [
    {
      "level": "HIGH",
      "score": 5,
      "description": "Clear articulation..."
    },
    {
      "level": "MEDIUM",
      "score": 3,
      "description": "Adequate explanation..."
    },
    {
      "level": "LOW",
      "score": 1,
      "description": "Unclear or incomplete..."
    }
  ]
}
```

### Update Question
```http
PATCH /api/questions/{id}
```

### Delete Question
```http
DELETE /api/questions/{id}
```

---

## 📅 Interviews

### List All Interviews
```http
GET /api/interviews
```

**Query Parameters**:
- `status` (optional): Filter by status

**Response**:
```json
[
  {
    "id": "clx...",
    "candidateName": "Alice Candidate",
    "candidateEmail": "alice@example.com",
    "scheduledAt": "2024-02-15T10:00:00Z",
    "status": "SCHEDULED",
    "uniqueLink": "abc123...",
    "guide": {
      "id": "clx...",
      "title": "Senior Software Engineer Interview"
    },
    "participants": [...],
    "summary": null
  }
]
```

### Schedule Interview
```http
POST /api/interviews
```

**Request Body**:
```json
{
  "guideId": "clx...",
  "candidateName": "Alice Candidate",
  "candidateEmail": "alice@example.com",
  "interviewerId": "clx...",
  "scheduledAt": "2024-02-15T10:00:00Z",
  "createdById": "clx..."
}
```

**Response**: Complete interview with unique link

### Get Interview by ID
```http
GET /api/interviews/{id}
```

**Response**: Complete interview with guide, questions, transcripts, evaluations

### Update Interview
```http
PATCH /api/interviews/{id}
```

**Request Body**:
```json
{
  "status": "IN_PROGRESS",
  "consentGiven": true
}
```

### Log Consent
```http
POST /api/interviews/{id}/consent
```

**Request Body**:
```json
{
  "consentText": "I agree to the use of AI for interview evaluation...",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

### Generate AI Evaluations
```http
POST /api/interviews/{id}/evaluate
```

**Response**:
```json
{
  "evaluations": [
    {
      "id": "clx...",
      "questionId": "clx...",
      "skillId": "clx...",
      "traitEvaluation": "STRONG",
      "overallScore": 4,
      "evidenceMapping": "[...]",
      "summary": "Candidate demonstrated..."
    }
  ],
  "summary": {
    "id": "clx...",
    "strengths": [
      "Excellent problem-solving skills",
      "Strong technical communication",
      "Collaborative mindset"
    ],
    "developmentAreas": [
      "Could improve on system design",
      "More experience with distributed systems needed"
    ],
    "competencySummary": "Overall, the candidate shows...",
    "hiringRecommendation": "HIRE",
    "justification": "Based on the interview..."
  }
}
```

---

## 📝 Transcripts

### Add Transcript Entry
```http
POST /api/transcripts
```

**Request Body**:
```json
{
  "interviewId": "clx...",
  "questionId": "clx...",
  "speaker": "CANDIDATE",
  "text": "In my previous role, I...",
  "startTime": 1234567,
  "endTime": 1234890
}
```

### Get Transcripts
```http
GET /api/transcripts?interviewId={id}
```

**Response**:
```json
[
  {
    "id": "clx...",
    "speaker": "INTERVIEWER",
    "text": "Tell me about...",
    "timestamp": "2024-02-15T10:05:00Z",
    "question": {
      "id": "clx...",
      "text": "Tell me about a time..."
    }
  }
]
```

---

## 📊 Analytics

### Get Analytics Data
```http
GET /api/analytics
```

**Response**:
```json
{
  "skillScores": [
    {
      "skillName": "Problem Solving",
      "averageScore": 4.2,
      "evaluationCount": 15
    }
  ],
  "recommendationDistribution": [
    {
      "hiringRecommendation": "HIRE",
      "_count": { "id": 8 }
    },
    {
      "hiringRecommendation": "LEAN_HIRE",
      "_count": { "id": 5 }
    }
  ],
  "interviewerVariance": [
    {
      "id": "clx...",
      "name": "John Interviewer",
      "email": "john@example.com",
      "interview_count": 10,
      "avg_score": 3.8,
      "score_variance": 0.5
    }
  ],
  "interviewsByStatus": [
    {
      "status": "COMPLETED",
      "_count": { "id": 12 }
    },
    {
      "status": "SCHEDULED",
      "_count": { "id": 5 }
    }
  ],
  "recentInterviews": [...]
}
```

---

## 🔌 WebSocket Events

### Connection
```javascript
const socket = io('http://localhost:3000');
```

### Join Interview Room
```javascript
socket.emit('join-interview', interviewId);
```

### Leave Interview Room
```javascript
socket.emit('leave-interview', interviewId);
```

### Send Transcript Chunk
```javascript
socket.emit('transcript-chunk', {
  interviewId: 'clx...',
  questionId: 'clx...',
  speaker: 'CANDIDATE',
  text: 'In my experience...',
  timestamp: Date.now()
});
```

### Listen for Transcript Updates
```javascript
socket.on('transcript-update', (data) => {
  console.log('New transcript:', data);
});
```

### Change Question
```javascript
socket.emit('question-change', {
  interviewId: 'clx...',
  questionId: 'clx...'
});
```

### Listen for Question Changes
```javascript
socket.on('question-changed', (data) => {
  console.log('Question changed to:', data.questionId);
});
```

### Toggle Question Visibility
```javascript
socket.emit('question-visibility', {
  interviewId: 'clx...',
  questionId: 'clx...',
  visible: true
});
```

### Listen for Visibility Changes
```javascript
socket.on('question-visibility-changed', (data) => {
  console.log('Question visibility:', data.visible);
});
```

---

## 🔒 Error Responses

All API routes return consistent error responses:

```json
{
  "error": "Error message here"
}
```

**Common HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing with cURL

### Create a Guide
```bash
curl -X POST http://localhost:3000/api/guides \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Interview",
    "jobFamily": "engineering",
    "role": "Developer",
    "level": "professional",
    "createdById": "clx..."
  }'
```

### Get All Guides
```bash
curl http://localhost:3000/api/guides
```

### Schedule Interview
```bash
curl -X POST http://localhost:3000/api/interviews \
  -H "Content-Type: application/json" \
  -d '{
    "guideId": "clx...",
    "candidateName": "Test Candidate",
    "candidateEmail": "test@example.com",
    "scheduledAt": "2024-02-15T10:00:00Z",
    "createdById": "clx..."
  }'
```

---

## 📚 Data Models Reference

### User Roles
- `ADMIN` - Full system access
- `RECRUITER` - Create guides, schedule interviews
- `INTERVIEWER` - Conduct interviews
- `CANDIDATE` - Participate in interviews

### Interview Status
- `DRAFT` - Being created
- `SCHEDULED` - Scheduled but not started
- `IN_PROGRESS` - Currently ongoing
- `COMPLETED` - Finished
- `CANCELLED` - Cancelled

### Guide Status
- `DRAFT` - Being edited
- `PUBLISHED` - Ready for use

### Hiring Recommendations
- `STRONG_HIRE` - Top 10% candidate
- `HIRE` - Strong fit
- `LEAN_HIRE` - Adequate with reservations
- `LEAN_NO_HIRE` - Significant concerns
- `NO_HIRE` - Not a fit

### Trait Evaluations
- `STRONG` - Exceeds expectations
- `MODERATE` - Meets expectations
- `WEAK` - Below expectations

---

## 🔐 Rate Limiting (To Be Implemented)

Recommended limits:
- AI endpoints: 10 requests/minute
- CRUD endpoints: 100 requests/minute
- WebSocket connections: 5 concurrent per user

---

## 📖 Additional Resources

- [Prisma Schema](../prisma/schema.prisma)
- [AI Services](../src/lib/ai/services.ts)
- [WebSocket Server](../server.ts)
- [Setup Guide](./SETUP_GUIDE.md)

---

**Last Updated**: 2024-02-13
**API Version**: 1.0.0
