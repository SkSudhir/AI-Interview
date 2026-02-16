# Deploying the AI Interview Platform

You have two main options for demoing the platform:

## Option 1: Quick Temporary Demo (Recommended for right now)
This exposes your local machine to the internet. Best for a quick 10-minute demo.

### Using ngrok (Most reliable)
1.  **Install ngrok**: If not installed, download from [ngrok.com](https://ngrok.com).
2.  **Start your app locally**:
    ```bash
    npm run dev:server
    ```
3.  **In a separate terminal**:
    ```bash
    ngrok http 3000
    ```
4.  Copy the `https://....ngrok-free.app` URL and share it.

### Using localtunnel (No signup required)
1.  **Start your app locally**:
    ```bash
    npm run dev:server
    ```
2.  **In a separate terminal**:
    ```bash
    npx localtunnel --port 3000
    ```
3.  Copy the URL provided.

---

## Option 2: Permanent Cloud Deployment (Best for long-term)
We recommend **Railway** because it supports the custom WebSocket server and Database out of the box.

### Prerequisites
- GitHub account
- Railway account (free trial available)

### Steps
1.  **Push to GitHub**:
    Create a repository and push this code.
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    # Add your remote
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

2.  **Deploy on Railway**:
    - Go to [Railway.app](https://railway.app)
    - Click "New Project" -> "Deploy from GitHub repo"
    - Select your repository.
    - **Important**: Add a PostgreSQL Database service.
    
3.  **Configure Variables**:
    In Railway, go to "Variables" and set:
    - `DATABASE_URL`: (Railway provides this automatically if you added Postgres)
    - `NEXTAUTH_SECRET`: Generate one (`openssl rand -base64 32`)
    - `NEXTAUTH_URL`: Your Railway URL (e.g. `https://your-app.up.railway.app`)
    - `OPENAI_API_KEY`: Your key
    - `APP_URL`: Same as `NEXTAUTH_URL`

4.  **Deployment**:
    Railway will automatically detect the `Dockerfile` we created and build it.
    
    *Note: The build might take 3-5 minutes.*

### Troubleshooting Railway
- If the build fails on `prisma generate`, make sure `DATABASE_URL` is set during build (or add `ARG DATABASE_URL` in Dockerfile, but usually Railway handles this).
- If WebSockets fail, ensure your client connects to the correct `APP_URL`.

## Other Platforms
- **Render**: Select "Web Service", choose "Docker", and it should work similarly.
- **Fly.io**: Use `fly launch` and it acts similarly.
