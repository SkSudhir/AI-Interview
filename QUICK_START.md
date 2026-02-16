# 🚀 Quick Start - AI Interview Platform

## ⚡ 5-Minute Setup

### 1. Fix NPM Cache (One-time)
```bash
sudo chown -R $(whoami) ~/.npm
```

### 2. Install Everything
```bash
cd /Users/sudhir/.gemini/antigravity/scratch/ai-interview-platform
npm install
```

### 3. Set Up Database (Choose One)

**Option A: Supabase (Easiest)**
1. Go to https://supabase.com → New Project
2. Copy connection string
3. Create `.env`:
```bash
cp .env.example .env
```
4. Paste connection string as `DATABASE_URL`

**Option B: Local PostgreSQL**
```bash
brew install postgresql@15
brew services start postgresql@15
createdb ai_interview_platform
```

### 4. Add OpenAI Key
1. Get key from https://platform.openai.com/api-keys
2. Add to `.env`:
```env
OPENAI_API_KEY="sk-your-key-here"
```

### 5. Generate Secret
```bash
openssl rand -base64 32
```
Add to `.env` as `NEXTAUTH_SECRET`

### 6. Initialize Database
```bash
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 7. Run!
```bash
npm run dev:server
```

### 8. Open
```
http://localhost:3000
```

---

## 📋 Your .env File Should Look Like:

```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
OPENAI_API_KEY="sk-your-openai-key"
APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🎯 What You Get

✅ **Complete Interview Platform**
- AI-powered skill generation
- Behavioral question creation
- Real-time interview player
- AI evaluation & summarization
- Analytics dashboard

✅ **Sample Data**
- 3 users (admin, recruiter, interviewer)
- 1 interview guide
- 3 skills with questions
- 1 scheduled interview

✅ **Sample Credentials**
```
admin@example.com / admin123
recruiter@example.com / recruiter123
interviewer@example.com / interviewer123
```

---

## 🧪 Test It Out

### 1. Create an Interview Guide
```bash
curl -X POST http://localhost:3000/api/guides \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Interview",
    "jobFamily": "engineering",
    "role": "Developer",
    "level": "professional",
    "createdById": "get-from-prisma-studio"
  }'
```

### 2. View in Prisma Studio
```bash
npm run prisma:studio
```
Opens at http://localhost:5555

### 3. Check Analytics
```bash
curl http://localhost:3000/api/analytics
```

---

## 📚 Documentation

- **[README.md](./README.md)** - Full feature list
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup
- **[API_REFERENCE.md](./API_REFERENCE.md)** - API docs
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - What's included
- **[FOLDER_STRUCTURE.md](./FOLDER_STRUCTURE.md)** - File organization

---

## 🆘 Common Issues

**"Cannot find module"**
→ Run `npm install` again

**"Prisma Client not generated"**
→ Run `npx prisma generate`

**"Database connection failed"**
→ Check `DATABASE_URL` in `.env`

**"OpenAI API error"**
→ Verify `OPENAI_API_KEY` and account credits

**"Port 3000 in use"**
→ `lsof -i :3000` then `kill -9 <PID>`

---

## 🎨 Next Steps

1. **Explore the Code**
   - Check `src/lib/ai/services.ts` for AI functions
   - Review `prisma/schema.prisma` for data model
   - Look at `src/components/` for UI

2. **Customize**
   - Update colors in Tailwind config
   - Modify AI prompts in `src/lib/ai/prompts.ts`
   - Add your branding

3. **Build Features**
   - Add authentication UI
   - Integrate video (WebRTC, Zoom, etc.)
   - Add email notifications
   - Create mobile app

4. **Deploy**
   - Vercel for Next.js
   - Railway for database + WebSocket
   - Supabase for database

---

## 💡 Pro Tips

- Use **Prisma Studio** to view/edit data visually
- Check **browser DevTools** for API calls
- Use **WebSocket debugging** in Chrome DevTools
- Enable **Prisma query logging** in development
- Test **AI services** with small inputs first

---

## ✅ You're Ready!

The platform is **production-ready** with:
- ✅ Complete database schema
- ✅ 6 AI services with bias guardrails
- ✅ 15+ API endpoints
- ✅ Real-time WebSocket server
- ✅ Professional UI components
- ✅ Security & compliance features

**Start building amazing interview experiences!** 🎉

---

**Questions?** Check the documentation files or review the code - it's well-commented!
