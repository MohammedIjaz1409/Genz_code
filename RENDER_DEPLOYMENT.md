# Deploying to Render

Follow these step-by-step instructions to deploy this Flask application on Render.

## 1. Push your code to GitHub / GitLab
Render connects directly to your git repository. Make sure all your code changes (including `requirements.txt` update) are committed and pushed to GitHub:
```bash
git add requirements.txt
git commit -m "Configure dependencies for Render hosting"
git push origin main
```

## 2. Create a Web Service on Render
1. Go to the [Render Dashboard](https://dashboard.render.com/) and click **New** -> **Web Service**.
2. Connect your Git repository.
3. Configure the Web Service settings:
   - **Name**: `genz-code-creator-manager` (or any custom name)
   - **Region**: Select a region closest to you
   - **Branch**: `main` (or whichever branch you push to)
   - **Language/Runtime**: `Python 3` (or `Python`)
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```bash
     gunicorn app:app
     ```
   - **Instance Type**: Select **Free** (or any tier)

## 3. Configure Environment Variables
1. Scroll down to the **Environment Variables** section.
2. Click **Add Environment Variable** and configure:
   - **Key**: `OPENROUTER_API_KEY`
   - **Value**: *Your OpenRouter API Key* (e.g. `sk-or-...`)
3. Click **Deploy Web Service** at the bottom of the page.

Your service will build and start. Once completed, Render will give you a public URL (e.g. `https://your-service-name.onrender.com`) to access your application!
