# 🚂 Deploying to Railway (Flawless Setup)

Since you chose Railway, here is the exact checklist to ensure everything works perfectly on the first try.

## 1. Prepare GitHub Repository
Ensure your latest code is pushed to GitHub:
```bash
git add .
git commit -m "Optimize for Railway deployment"
git push origin main
```

## 2. Create Railway Project
1.  Go to **[Railway.app](https://railway.app)**.
2.  Click **New Project** → **Deploy from GitHub repo**.
3.  Select your `ai-interview-platform` repository.
4.  **Important**: Click **"Add a Database"** (Select PostgreSQL) when asked, or add it from the dashboard immediately after.

## 3. Configure Environment Variables (Crucial!)
Go to your project settings in Railway, click on the "Variables" tab, and add these EXACT variables:

| Variable Name | Value / Instruction |
|:--- |:--- |
| `DATABASE_URL` | **Automatically set** by Railway if you added Postgres. (Verify it exists). |
| `NEXTAUTH_SECRET` | Run `openssl rand -base64 32` in your terminal and paste the result. |
| `OPENAI_API_KEY` | Your actual OpenAI API Key (`sk-...`). |
| `NEXTAUTH_URL` | The **Public Domain** provided by Railway (e.g., `https://ai-interview-production.up.railway.app`). <br> *Note: You find this in Settings → Networking → Public Networking after deployment.* |
| `APP_URL` | **Same as NEXTAUTH_URL**. (Used for WebSocket CORS). |
| `NODE_ENV` | `production` (Usually default, but good to be explicit). |

### ⚠️ Common Pitfall: The URL Loop
The deployment might start *before* you have the public domain (NEXTAUTH_URL). 
1.  Let the first build fail or finish.
2.  Go to **Settings** → **Networking** → **Generate Domain**.
3.  Copy that domain (e.g., `https://xxx.up.railway.app`).
4.  Go to **Variables** and paste it into `NEXTAUTH_URL` and `APP_URL`.
5.  **Redeploy** (Click the "Redeploy" button or push a commit).

## 4. Verify Deployment
Once active:
-   **Database**: My update explicitly runs `prisma migrate deploy` on startup, so your tables will be created automatically!
-   **WebSockets**: Test the interview room. If it connects, your `APP_URL` is correct.

## 5. Troubleshooting
-   **"Prisma Client not found"**: I fixed this in the Dockerfile by generating it during build.
-   **"Connection Refused"**: Check if `DATABASE_URL` is correct.
-   **"WebSocket Error"**: Ensure `APP_URL` matches the browser URL exactly (https vs http).

You are ready for liftoff! 🚀
