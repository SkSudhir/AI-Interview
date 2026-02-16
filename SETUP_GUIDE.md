# Setup Guide - Structured AI Interview Platform

## ⚠️ Important: NPM Cache Fix Required

Before installing dependencies, you need to fix the npm cache permission issue:

```bash
sudo chown -R $(whoami) ~/.npm
```

Enter your password when prompted. This is a one-time fix.

## 📋 Step-by-Step Setup

### Step 1: Navigate to Project
```bash
cd /Users/sudhir/.gemini/antigravity/scratch/ai-interview-platform
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- Next.js, React, TypeScript
- Prisma ORM
- NextAuth.js
- Socket.IO
- OpenAI SDK
- Tailwind CSS
- And more...

### Step 3: Set Up Environment Variables
```bash
cp .env.example .env
```

Then edit `.env` with your actual credentials:

```env
# Database - Replace with your PostgreSQL connection string
DATABASE_URL="postgresql://user:password@localhost:5432/ai_interview_platform?schema=public"

# NextAuth - Generate secret with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-here"

# Google OAuth (Optional - for Google Sign-In)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# OpenAI - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-your-openai-api-key"

# App URL
APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Set Up PostgreSQL Database

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (if not installed)
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb ai_interview_platform

# Update DATABASE_URL in .env
DATABASE_URL="postgresql://$(whoami)@localhost:5432/ai_interview_platform?schema=public"
```

#### Option B: Cloud Database (Recommended)

**Supabase** (Free tier available):
1. Go to https://supabase.com
2. Create new project
3. Copy connection string from Settings → Database
4. Update DATABASE_URL in .env

**Railway** (Free tier available):
1. Go to https://railway.app
2. Create new PostgreSQL database
3. Copy connection string
4. Update DATABASE_URL in .env

### Step 5: Generate Prisma Client
```bash
npx prisma generate
```

This creates the TypeScript types for your database.

### Step 6: Run Database Migrations
```bash
npx prisma migrate dev --name init
```

This creates all tables in your database.

### Step 7: Seed Sample Data (Optional)
```bash
npx prisma db seed
```

This creates sample users and interview data for testing.

**Sample Credentials**:
- Admin: `admin@example.com` / `admin123`
- Recruiter: `recruiter@example.com` / `recruiter123`
- Interviewer: `interviewer@example.com` / `interviewer123`

### Step 8: Generate NextAuth Secret
```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env` file.

### Step 9: Get OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy and paste into `.env` as `OPENAI_API_KEY`

### Step 10: Run Development Server

#### Option A: With WebSocket Support (Recommended)
```bash
npm run dev:server
```

#### Option B: Standard Next.js Dev Server
```bash
npm run dev
```

### Step 11: Open Application
```
http://localhost:3000
```

## 🔧 Troubleshooting

### Issue: "Cannot find module 'prisma'"
**Solution**: Run `npm install` again

### Issue: "Prisma Client not generated"
**Solution**: Run `npx prisma generate`

### Issue: "Database connection error"
**Solution**: 
1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Test connection: `npx prisma db pull`

### Issue: "OpenAI API error"
**Solution**:
1. Verify OPENAI_API_KEY is correct
2. Check you have credits in your OpenAI account
3. Ensure API key has proper permissions

### Issue: "Port 3000 already in use"
**Solution**:
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

### Issue: "WebSocket connection failed"
**Solution**:
1. Make sure you're using `npm run dev:server`
2. Check NEXT_PUBLIC_APP_URL in .env
3. Verify Socket.IO is installed: `npm list socket.io`

## 🧪 Testing the Application

### 1. Test Database Connection
```bash
npx prisma studio
```
This opens a GUI to view your database at http://localhost:5555

### 2. Test API Routes
```bash
# Test guides endpoint
curl http://localhost:3000/api/guides

# Test analytics endpoint
curl http://localhost:3000/api/analytics
```

### 3. Test AI Services
Create a guide through the UI and verify:
- Skills are generated automatically
- Questions are created with scoring guides
- Guide validation works

## 📦 Additional Scripts

```bash
# View database in browser
npm run prisma:studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Format Prisma schema
npx prisma format

# Check TypeScript errors
npx tsc --noEmit

# Run ESLint
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 🚀 Production Deployment

### Vercel (Recommended for Next.js)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Railway (For full-stack with WebSocket)
1. Connect GitHub repository
2. Add PostgreSQL database
3. Set environment variables
4. Deploy automatically on push

### Environment Variables for Production
Make sure to set all these in your deployment platform:
- DATABASE_URL
- NEXTAUTH_URL (your production URL)
- NEXTAUTH_SECRET
- OPENAI_API_KEY
- GOOGLE_CLIENT_ID (if using OAuth)
- GOOGLE_CLIENT_SECRET (if using OAuth)
- APP_URL (your production URL)
- NEXT_PUBLIC_APP_URL (your production URL)

## 🔐 Security Checklist

Before going to production:
- [ ] Change all default passwords
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Add rate limiting
- [ ] Enable database backups
- [ ] Set up error monitoring (Sentry)
- [ ] Review and update .gitignore
- [ ] Never commit .env file
- [ ] Use environment-specific configs

## 📊 Database Management

### Backup Database
```bash
# Export data
npx prisma db pull

# Or use pg_dump
pg_dump ai_interview_platform > backup.sql
```

### Restore Database
```bash
# Import data
psql ai_interview_platform < backup.sql
```

### View Database Schema
```bash
npx prisma studio
```

## 🎯 Next Steps After Setup

1. **Customize UI**: Update colors, fonts, branding
2. **Add Authentication UI**: Create login/signup pages
3. **Integrate Video**: Add WebRTC or third-party video SDK
4. **Add Email**: Set up SendGrid or similar for notifications
5. **Enhance Analytics**: Add charts with Recharts or Chart.js
6. **Mobile Optimization**: Test and optimize for mobile devices
7. **Accessibility**: Add ARIA labels, keyboard navigation
8. **Testing**: Add Jest/Vitest for unit tests
9. **Documentation**: Add API documentation with Swagger
10. **Monitoring**: Set up logging and error tracking

## 💡 Development Tips

1. **Use Prisma Studio**: Great for debugging database issues
2. **Check API Routes**: Use browser DevTools Network tab
3. **WebSocket Debugging**: Use Socket.IO admin UI
4. **Type Safety**: Let TypeScript guide you
5. **Hot Reload**: Changes auto-reload in dev mode
6. **Console Logs**: Check terminal for server logs
7. **Database Logs**: Enable in Prisma client for query debugging

## 🆘 Getting Help

If you encounter issues:
1. Check the error message carefully
2. Review the relevant file in the codebase
3. Check Prisma documentation: https://www.prisma.io/docs
4. Check Next.js documentation: https://nextjs.org/docs
5. Check OpenAI documentation: https://platform.openai.com/docs

## ✅ Setup Complete!

Once you've completed all steps, you should have:
- ✅ All dependencies installed
- ✅ Database created and migrated
- ✅ Sample data seeded
- ✅ Environment variables configured
- ✅ Development server running
- ✅ Application accessible at http://localhost:3000

**You're ready to start building!** 🎉

---

**Recommended Workspace**: Set `/Users/sudhir/.gemini/antigravity/scratch/ai-interview-platform` as your active workspace in your IDE.
