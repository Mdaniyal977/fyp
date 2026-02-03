# Backend deploy (Vercel frontend ke liye API)

## 1. Render.com par backend deploy

1. **Render.com** pe jao → Sign up/Login → **New** → **Web Service**
2. Repo connect karo: **Mdaniyal977/fyp** (GitHub)
3. Settings:
   - **Name:** voice-cv-api (ya koi bhi)
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Environment Variables** add karo (Add Environment Variable):

   | Key | Value |
   |-----|--------|
   | `NODE_ENV` | production |
   | `JWT_SECRET` | koi strong random string (e.g. 32 chars) |
   | `DB_HOST` | Cloud MySQL host (see below) |
   | `DB_USER` | DB user |
   | `DB_PASSWORD` | DB password |
   | `DB_NAME` | voice_cv_maker |
   | `OPENAI_API_KEY` | apna OpenAI key |

5. **Database:** Render par free PostgreSQL hota hai, lekin app MySQL use karta hai. Options:
   - **PlanetScale** (free MySQL): https://planetscale.com → database banao, connection string mil jayegi. Usme se host, user, password, database name nikaal ke env vars mein daalo.
   - **Railway** MySQL add-on ya **Aiven** free tier.
   - Ya apna **local MySQL** sirf local testing ke liye; production ke liye cloud MySQL zaroori hai.

6. **Create Web Service** → deploy hone do. URL milega jaise: `https://voice-cv-api.onrender.com`

---

## 2. Vercel par API URL set karo

1. **Vercel** → apna project (fyp) → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://voice-cv-api.onrender.com/api` (apne backend ka URL + `/api`)
3. **Save** → **Deployments** → **Redeploy** (latest)

Iske baad Vercel wali site login/register backend se connect ho jayegi.

---

## 3. MySQL schema (cloud DB pe)

Jab naya MySQL (PlanetScale/Railway) use karo, wahan tables banao. Same SQL jo local use kiya:

- Repo mein `server/database/schema.sql` hai — usi ko cloud DB pe run karo (ya `node server/database/setup.js` ko cloud DB credentials se run karke tables create karo).

---

## Short

| Step | Kahan | Kya |
|------|--------|-----|
| 1 | Render | Backend deploy, env vars (DB + JWT + OpenAI) |
| 2 | Vercel | `REACT_APP_API_URL` = backend URL + `/api`, Redeploy |
| 3 | Cloud MySQL | PlanetScale/Railway pe DB banao, schema run karo |
