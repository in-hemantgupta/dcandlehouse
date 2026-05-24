# 🕯 D Candle House — Portfolio Website

A clean, SEO-optimized product portfolio website for **D Candle House** by D Singhal, Sri Ganganagar.

**Live URL:** https://dcandlehouse.github.io/

---

## 🚀 Quick Setup (GitHub Pages)

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click **"New Repository"**
3. Name it exactly: `dcandlehouse` (or your preferred name)
4. Set it to **Public**
5. Click **"Create repository"**

### Step 2: Upload the Website Files
**Option A — GitHub Web Upload (Easiest):**
1. Open your new repository
2. Click **"uploading an existing file"**
3. Drag ALL files/folders from this project into the upload area
4. Click **"Commit changes"**

**Option B — Git Command Line:**
```bash
cd dcandlehouse
git init
git add .
git commit -m "Initial website launch"
git remote add origin https://github.com/YOUR_USERNAME/dcandlehouse.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your repository, go to **Settings → Pages**
2. Under **"Source"**, select **"GitHub Actions"**
3. The site will auto-deploy in ~2 minutes
4. Your URL: `https://YOUR_USERNAME.github.io/dcandlehouse/`

> **Tip:** If you want the URL to be `https://dcandlehouse.github.io/`, name the repo `dcandlehouse.github.io`

---

## ➕ Adding New Products

Open `js/products.js` and add a new product block inside `window.PRODUCTS = [...]`:

```js
,{
  id: 20,                          // ← unique number
  name: "Your Product Name",
  category: "candles",             // candles | resin-clock | resin-tray | candle-jar | other
  categoryLabel: "Category Label",
  price: "₹299",
  priceUnit: "/Piece",
  image: "https://your-image-url.jpg",
  badge: "New",                    // optional
  specs: {
    "Material": "Soy Wax",
    "Scent": "Lavender"
  },
  desc: "Product description here.",
  indiamart: "https://www.indiamart.com/proddetail/your-product-url"
}
```

Save and push — the site updates automatically!

---

## 📊 Analytics Setup

### GoatCounter (Free, Privacy-Friendly)
1. Go to [goatcounter.com](https://www.goatcounter.com)
2. Create a free account
3. Choose site code: `dcandlehouse`
4. Your dashboard: `https://dcandlehouse.goatcounter.com`
5. The tracking code is already in `index.html` — just update the account name if different

### Google Analytics (Optional)
Add inside `<head>` in `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 📬 Contact Form Setup (Formspree)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form → copy your Form ID (e.g. `xyzabc12`)
3. In `index.html`, find:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Replace `YOUR_FORM_ID` with your actual ID

---

## 🏪 Google Business Profile (Free)

1. Go to [business.google.com](https://business.google.com)
2. Click **"Manage now"** → search for "D Candle House"
3. If not listed, click **"Add your business"**
4. Fill in:
   - Business name: `D Candle House`
   - Category: `Home goods store` / `Candle store`
   - Address: Sri Ganganagar, Rajasthan
   - Phone: +91 80438 83382
   - Website: `https://dcandlehouse.github.io/`
   - Instagram: `https://www.instagram.com/d_candle_house/`
5. Verify via postcard or phone

---

## 🔗 Custom Domain (Optional)

To use `www.dcandlehouse.com` instead of the GitHub URL:
1. Buy domain from [GoDaddy](https://godaddy.com) or [Namecheap](https://namecheap.com) (~₹800/year)
2. In GitHub Pages settings → "Custom domain" → enter your domain
3. Add DNS records as shown by GitHub
4. Update `sitemap.xml` and `index.html` canonical URLs

---

## 📁 File Structure

```
dcandlehouse/
├── index.html          ← Main website
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── products.js     ← ← ← EDIT THIS to add/remove products
│   └── main.js         ← Interactions, filtering, modals
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← Search engine crawl rules
├── .github/
│   └── workflows/
│       └── deploy.yml  ← Auto-deploy to GitHub Pages
└── README.md           ← This file
```

---

## 🎨 Brand Colors

| Color | Hex |
|-------|-----|
| Deep Espresso | `#1A0A00` |
| Rich Amber | `#B5651D` |
| Warm Gold | `#D4A843` |
| Pale Gold | `#F0D080` |
| Cream | `#FAF6F0` |

---

Made with ❤️ for D Candle House · Sri Ganganagar, Rajasthan
