# 💍 Wedding Invitation — Layla & Karim

A luxury, animated wedding invitation website built with pure HTML, CSS & JS. No frameworks, no build tools — just open the files and it works.

---

## 📁 File Structure

```
wedding-invitation/
├── index.html       ← Main page (edit names, dates, venues here)
├── style.css        ← All styles
├── script.js        ← Countdown, envelope animation, RSVP, petals
├── music.mp3        ← (Optional) Background music — add your own
├── README.md        ← This file
└── .gitignore
```

---

## ✏️ How to Personalise

Open `index.html` in any text editor (VS Code recommended) and search for these placeholders:

| Placeholder | What to change |
|---|---|
| `Layla` / `Karim` | Bride & groom names |
| `September 14, 2025` | Wedding date |
| `7:00 PM` | Ceremony / reception time |
| `Grand Palace Hall` | Venue name |
| `123 Wedding Boulevard` | Venue address |
| `456 Reception Avenue` | Reception address |
| `August 1, 2025` | RSVP deadline |
| `YOUR_FORM_ID` in `script.js` | Formspree form ID (see RSVP below) |

To update the **countdown target**, edit line in `script.js`:
```js
const target = new Date('2025-09-14T19:00:00');
```
Use ISO format: `YYYY-MM-DDTHH:MM:SS`

### Adding Photos
Replace the placeholder `<div class="gph">` blocks in the gallery section with real `<img>` tags:
```html
<div class="gi gi-tall reveal">
  <img src="photo1.jpg" alt="Engagement photo">
</div>
```

### Adding Background Music
Drop an MP3 named `music.mp3` in the project folder. The music button (top-right) will work automatically.

---

## 📬 RSVP Setup (Free via Formspree)

1. Go to [formspree.io](https://formspree.io) and sign up (free tier = 50 submissions/month)
2. Create a new form → copy your form ID (looks like `xrgpkqzj`)
3. In `script.js`, replace:
   ```js
   const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID';
   ```
   with:
   ```js
   const FORMSPREE_URL = 'https://formspree.io/f/xrgpkqzj';
   ```
4. Done — responses arrive to your email inbox.

---

## 🚀 Deploying to GitHub Pages + Namecheap Domain

### Step 1 — Push to GitHub

```bash
# In your project folder
git init
git add .
git commit -m "Initial wedding invitation"

# Create a new repo on github.com named e.g. wedding
# Then:
git remote add origin https://github.com/YOUR_USERNAME/wedding.git
git branch -M main
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Branch: `main` / folder: `/ (root)`
5. Click **Save**

Your site will be live at `https://YOUR_USERNAME.github.io/wedding` within a minute.

### Step 3 — Connect your Namecheap Domain

#### In GitHub (repo Settings → Pages → Custom Domain):
- Enter your domain e.g. `www.yourdomain.com`
- Click **Save**
- GitHub creates a `CNAME` file automatically

#### In Namecheap (Dashboard → Domain → Manage → Advanced DNS):

Add these records:

| Type | Host | Value | TTL |
|---|---|---|---|
| `A` | `@` | `185.199.108.153` | Automatic |
| `A` | `@` | `185.199.109.153` | Automatic |
| `A` | `@` | `185.199.110.153` | Automatic |
| `A` | `@` | `185.199.111.153` | Automatic |
| `CNAME` | `www` | `YOUR_USERNAME.github.io` | Automatic |

> **Tip**: If you want the apex domain (`yourdomain.com` without www) to work, set the **Custom Domain** in GitHub Pages to `yourdomain.com` (not www). GitHub handles the www redirect automatically.

#### Enable HTTPS:
Back in GitHub → Settings → Pages → check **Enforce HTTPS** (available after DNS propagates, usually 1–24 hours).

---

## 🎨 Quick Style Customisation

All colors live in `style.css` at the top under `:root {}`:

```css
:root {
  --ivory:   #f6f0e6;   /* Page background */
  --green:   #1b3827;   /* Primary dark color */
  --gold:    #c8a040;   /* Accent color */
}
```

Change `--green` and `--gold` to match your wedding palette.

---

## 📱 Browser Support

Works on all modern browsers: Chrome, Safari, Firefox, Edge, and mobile equivalents.
No JavaScript frameworks or build steps required.

---

Made with ♡ for a special day.
