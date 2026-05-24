# 🕯 D Candle House — Portfolio Website

A clean, SEO-optimized product portfolio website for **D Candle House** by D Singhal, Sri Ganganagar.

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
