# Backend FREE deploy – Vercel frontend ke saath

Backend **bilkul free** host karne ke 2 simple options. Dono mein **Render.com** par Node backend chalega.

---

## Option 1: Render + RemoteMySQL (100% free, no card)

### Step 1: Free MySQL database banao

1. **https://remotemysql.com** open karo (ya **https://www.freemysqlhosting.net**).
2. Sign up karo (free).
3. New database banao → **host**, **username**, **password**, **database name** note karo.
   - Example: Host `remotemysql.com`, User `abc123`, Password `xyz`, Database `abc123_voicecv`.

### Step 2: Tables create karo

1. Wahi site pe **phpMyAdmin** / **SQL** tab open karo.
2. Apna database select karo.
3. **server/database/schema-cloud.sql** ka saara SQL copy karke wahan paste karo aur **Run** karo.
   - Agar "FOREIGN KEY not supported" aaye to `FOREIGN KEY ... REFERENCES` wali line hata do, phir dubara run karo.

### Step 3: Backend Render par deploy karo

1. **https://render.com** → Sign up (GitHub se).
2. **New +** → **Web Service**.
3. Repo connect karo: **Mdaniyal977/fyp**.
4. Settings:
   - **Name:** `voice-cv-api` (ya kuch bhi).
   - **Root Directory:** `server`.
   - **Runtime:** Node.
   - **Build Command:** `npm install`.
   - **Start Command:** `npm start`.
5. **Environment Variables** add karo (Add Environment Variable):

   | Key | Value |
   |-----|--------|
   | `NODE_ENV` | production |
   | `DB_HOST` | (RemoteMySQL ka host, e.g. remotemysql.com) |
   | `DB_USER` | (RemoteMySQL username) |
   | `DB_PASSWORD` | (RemoteMySQL password) |
   | `DB_NAME` | (RemoteMySQL database name) |
   | `JWT_SECRET` | koi 20–30 character strong random string |
   | `OPENAI_API_KEY` | (optional) apna OpenAI key |

6. **Create Web Service** click karo. Deploy hone do (~2–3 min).
7. Jo URL mile (e.g. `https://voice-cv-api.onrender.com`) copy karo.

### Step 4: Vercel par API URL set karo

1. **https://vercel.com** → apna project (fyp) → **Settings** → **Environment Variables**.
2. Add:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://voice-cv-api.onrender.com/api` (apna Render URL + `/api`)
3. **Save** → **Deployments** → **Redeploy** (latest deployment).

Ab Vercel site se login/register backend se connect ho jayega.

---

## Option 2: Render + PlanetScale (free tier agar available ho)

1. **https://planetscale.com** → Sign up → **Create database** (free Hobby plan agar ho).
2. **Connect** → **Connect with: General** → **Node.js** → host, user, password, database name copy karo.
3. **Console** tab → **SQL** → `server/database/schema-cloud.sql` ka SQL run karo (agar FK error aaye to FOREIGN KEY line hata do).
4. PlanetScale **SSL** use karta hai → Render par env var add karo: **`DB_SSL`** = **`true`**.
5. Baaki same: Render pe Web Service banao (root dir **server**), env vars mein PlanetScale ka **DB_HOST**, **DB_USER**, **DB_PASSWORD**, **DB_NAME** + **JWT_SECRET** + **OPENAI_API_KEY** (optional) daalo.
6. Render URL copy karo → Vercel pe **REACT_APP_API_URL** = `https://your-app.onrender.com/api` set karo → Redeploy.

---

## Important notes (free tier)

- **Render free:** Service 15 min idle ke baad so jati hai; pehla request 30–60 sec slow ho sakta hai (wake up). Baaki sab free.
- **Vercel:** Frontend already free; sirf **REACT_APP_API_URL** sahi set karna hai.
- **Database:** RemoteMySQL / FreeMySQLHosting / PlanetScale (agar free ho) sab free options hain.

---

## Short checklist

| Step | Kahan | Kya karna hai |
|------|--------|----------------|
| 1 | RemoteMySQL / PlanetScale | Free DB banao, schema-cloud.sql run karo |
| 2 | Render | Web Service banao, root = `server`, env vars daalo |
| 3 | Vercel | REACT_APP_API_URL = Render URL + `/api`, Redeploy |

---

## Option 3: Railway (free $5 credit / month)

1. **https://railway.app** → Login with GitHub.
2. **New Project** → **Deploy from GitHub** → repo **Mdaniyal977/fyp**.
3. Service add karo → **Settings** → **Root Directory** = `server`, **Start Command** = `npm start`.
4. **Variables** mein `DB_*`, `JWT_SECRET`, `OPENAI_API_KEY` daalo.
5. **MySQL** add karne ke liye: **New** → **Database** → **MySQL** (credit use hoga; free $5 se chal jata hai).
6. Railway backend ka URL copy karo → Vercel pe **REACT_APP_API_URL** = `https://xxx.up.railway.app/api` set karo → Redeploy.

---

Iske baad backend free (ya minimal cost) mein deploy ho jayega aur Vercel par backend wala issue resolve ho jayega.
