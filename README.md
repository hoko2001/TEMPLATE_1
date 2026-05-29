# Sarah & James — Wedding Invitation

A luxury, cinematic wedding invitation page with ambient lighting, particle effects, and smooth animations.

## Deploy to GitHub Pages (free domain like `yourname.github.io`)

1. Create a new GitHub repository (e.g. `wedding`)
2. Upload `index.html` to the root of the repo
3. Go to **Settings → Pages → Source → Deploy from branch → `main` → `/root`**
4. Your site will be live at `https://yourusername.github.io/wedding`

## Deploy to a custom cheap domain (e.g. Namecheap / Porkbun)

1. Buy a domain (e.g. `sarahandjames2025.com`) from Namecheap (~$10/year)
2. In your GitHub Pages settings, add your custom domain
3. In your domain registrar's DNS settings, add these records:
   ```
   A     @   185.199.108.153
   A     @   185.199.109.153
   A     @   185.199.110.153
   A     @   185.199.111.153
   CNAME www  yourusername.github.io
   ```
4. Check "Enforce HTTPS" in GitHub Pages settings
5. Done — free hosting + SSL, just pay for the domain

## Customise

Open `index.html` and change:
- **Names**: replace `Sarah` and `James` throughout
- **Date**: change `September`, `27`, `Two Thousand & Twenty-Five`
- **Venue**: update venue name and address
- **RSVP email**: replace `rsvp@sarahandjames.com`
- **Timeline**: edit the event times and names
- **Colors**: tweak `--gold`, `--cream` etc. in `:root`
