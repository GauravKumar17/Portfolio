# Gaurav Kumar — Portfolio

Pure frontend: **React + Vite + Tailwind CSS**. No backend, no server.

---

## Quick Start

```bash
npm install
npm run dev        # → http://localhost:3000
npm run build      # → dist/
npm run preview    # preview the production build locally
```

---

## Add Your Photo

Drop `photo.jpg` into the `public/` folder, then in `src/components/Hero.jsx`
find the two placeholder `<div>` blocks and replace each with:

```jsx
<img src="/photo.jpg" alt="Gaurav Kumar" className="w-full h-full object-cover object-top" />
```

---

## Add Your CV / Resume

Drop `Gaurav_Kumar_Resume.pdf` into the `public/` folder.
The **Download CV** button in the Resume section points to `/Gaurav_Kumar_Resume.pdf` automatically.

---

## Enable the Chatbot

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Paste your Anthropic API key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxx
   ```
   Get a key at https://console.anthropic.com

3. Restart the dev server — done.

---

## Enable Contact Form (optional)

By default the contact form opens the user's email client with the message pre-filled.

For a proper form submission without a backend, use **Formspree** (free):

1. Go to https://formspree.io → create a free account → **New Form**
2. Copy your endpoint, e.g. `https://formspree.io/f/xabc1234`
3. Open `src/components/Contact.jsx` and paste it here:
   ```js
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xabc1234'
   ```

---

## Deploy (one command)

### Netlify (recommended — free)
```bash
npm run build
# Drag the dist/ folder to app.netlify.com/drop
```
Or connect your GitHub repo and Netlify auto-deploys on every push.
Set `VITE_ANTHROPIC_API_KEY` under **Site settings → Environment variables**.

### Vercel
```bash
npx vercel
```
Set `VITE_ANTHROPIC_API_KEY` in the Vercel dashboard under **Settings → Environment Variables**.

### GitHub Pages
```bash
npm run build
# Push the dist/ folder contents to the gh-pages branch
```

---

## Project Structure

```
gk-portfolio/
├── public/
│   ├── photo.jpg                  ← add your photo here
│   └── Gaurav_Kumar_Resume.pdf    ← add your CV here
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Marquee.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── About.jsx
│   │   ├── Resume.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Chatbot.jsx
│   ├── hooks/
│   │   └── useReveal.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```
