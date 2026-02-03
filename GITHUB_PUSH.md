# GitHub par Push karne ke liye Login

**Important:** Abhi Windows par **daniyalemeriosoft** se GitHub login hai. Repo **Mdaniyal977/fyp** par push karne ke liye **Mdaniyal977** account se login karna hoga.

## Step 1: Purane GitHub credentials hatao (Windows)

1. **Control Panel** open karo → **User Accounts** → **Credential Manager** → **Windows Credentials**.
2. List mein **git:https://github.com** ya **github.com** dhoondo → click karo → **Remove**.
3. Ya PowerShell (Run as Administrator) mein ye chalao:
   ```powershell
   cmdkey /delete:git:https://github.com
   ```

## Step 2: Phir push karo (Mdaniyal977 se login hoga)

PowerShell/CMD mein:
```bash
cd C:\Users\daniyal\Desktop\DANIYAL\fyp-main
git push -u origin main
```
- Username: **Mdaniyal977**
- Password: **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens se banao, scope **repo**)

Agar repo pe pehle se code hai aur aap purana replace karke ye project rakhna chahte ho:
```bash
git push -u origin main --force
```

---

## Option 1: GitHub Desktop (sabse aasaan)

### Option 1: GitHub Desktop (sabse aasaan)
1. [GitHub Desktop](https://desktop.github.com/) download karo aur install karo.
2. Open karo → **File → Add Local Repository** → folder select karo: `fyp-main`.
3. **Sign in to GitHub.com** pe click karo → browser mein login karo.
4. Upper **Publish repository** ya **Push origin** use karke push karo.

---

### Option 2: Command line se (HTTPS)
1. **Personal Access Token (PAT) banao:**
   - GitHub.com → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
   - **Generate new token (classic)**.
   - Note: "fyp push" (ya kuch bhi).
   - Expiration: 90 days ya No expiration.
   - Scope: **repo** tick karo.
   - **Generate token** → token copy karke safe jagah save karo (sirf ek baar dikhega).

2. **Terminal se push karo:**
   ```bash
   cd C:\Users\daniyal\Desktop\DANIYAL\fyp-main
   git push -u origin main
   ```
   - Username: **Mdaniyal977**
   - Password: yahan **token paste karo** (password mat dalna).

Agar pehle se repo par koi code hai to force push (sirf tab use karo jab purana code replace karna ho):
```bash
git push -u origin main --force
```

---

### Option 3: GitHub CLI (gh)
1. [GitHub CLI](https://cli.github.com/) install karo.
2. Run karo:
   ```bash
   gh auth login
   ```
   - GitHub.com choose karo → HTTPS → Login with browser.
3. Phir:
   ```bash
   cd C:\Users\daniyal\Desktop\DANIYAL\fyp-main
   git push -u origin main
   ```

---

**Note:** `.env` files already `.gitignore` mein hain, isliye push par API keys/secret push nahi honge.
