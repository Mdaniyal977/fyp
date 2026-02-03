# Vercel par Deploy (404 fix)

## 404 NOT_FOUND ka reason

- Repo ki **root** par koi static build nahi hoti; app **`client`** folder mein hai.
- Vercel root se build karta hai → build output nahi milti → **404 NOT_FOUND**.

## Fix (jo kiye gaye hain)

1. **`vercel.json`** root par add kiya:
   - **buildCommand:** `client` folder mein `npm install` + `npm run build`
   - **outputDirectory:** `client/build` (Create React App yahi output deta hai)
   - **rewrites:** SPA ke liye sab routes `index.html` par (React Router)

2. **Vercel Dashboard** (optional lekin recommended):
   - Project → **Settings** → **General**
   - **Root Directory:** `client` set karo (agar `vercel.json` se build na chale to)

## Deploy steps

1. [vercel.com](https://vercel.com) → Login → **Add New** → **Project**
2. **Import** your Git repo: `Mdaniyal977/fyp`
3. **Framework Preset:** Create React App (ya leave as detected)
4. **Root Directory:** khali chhor do (humne `vercel.json` mein build command di hai) **ya** `client` set karo
5. **Build Command:** khali chhor do (vercel.json use hoga) **ya** `cd client && npm run build`
6. **Output Directory:** khali **ya** `client/build`
7. **Environment Variables** (zaroori for API):
   - `REACT_APP_API_URL` = apne **backend ka URL** (see below)
8. **Deploy** click karo.

## Backend (API) ka kya karein

Vercel sirf **frontend** host karta hai. **Node/Express backend** (MySQL, auth, CV save) Vercel par run nahi hota.

**Options:**

1. **Backend alag deploy karo** (recommended):
   - [Render](https://render.com) (free tier) – Web Service → repo connect → root: `server`, start: `node index.js`
   - [Railway](https://railway.app) – same idea
   - Wahan MySQL ke liye env vars set karo: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `OPENAI_API_KEY`
   - Jo URL mile (e.g. `https://your-app.onrender.com`) woh **API base** hai.

2. **Frontend mein API URL set karo:**
   - Vercel Project → **Settings** → **Environment Variables**
   - `REACT_APP_API_URL` = `https://your-backend.onrender.com/api` (trailing slash mat rakho agar backend routes `/api` use karte hain)

Phir **Redeploy** karo taaki nayi env variable build mein aa jaye.

## Summary

| Problem              | Cause                          | Fix                                      |
|----------------------|---------------------------------|------------------------------------------|
| 404 NOT_FOUND        | Root se build, output nahi      | `vercel.json` → build from `client`, output `client/build` |
| API / login fail     | Backend Vercel par nahi chalta  | Backend Render/Railway par deploy, `REACT_APP_API_URL` set karo |

Ab Git push karo (vercel.json already repo mein hai), phir Vercel se redeploy karo. 404 fix ho jana chahiye.
