# ⛅ Weather Intelligence Dashboard

A production-ready weather dashboard built with **React (Vite)** + **Tailwind CSS**, powered by the WeatherAI API. Features a stunning glassmorphism UI with AI-powered weather insights, hourly/daily forecasts, and smooth animations.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Current Weather** | Temperature, feels like, humidity, wind speed & direction |
| **Hourly Forecast** | Up to 24h with smooth horizontal scroll, precipitation % |
| **7-Day Forecast** | Min/max temps with visual range bars, sunrise/sunset |
| **AI Weather Insight** | AI-generated summary (gracefully hidden when unavailable) |
| **Glassmorphism UI** | Deep navy palette, glowing accents, animated background orbs |
| **Responsive** | Mobile-first, works across all screen sizes |
| **Loading Skeletons** | Shimmer skeletons for all sections during fetch |
| **Error Handling** | Contextual error messages (auth, network, server) |
| **Geolocation** | Auto-detects location; falls back gracefully if denied |

---

## 🗂 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx   # Dynamic weather-themed background
│   │   ├── AiInsightSection.jsx     # AI summary panel
│   │   ├── CurrentWeatherPanel.jsx  # Main weather card
│   │   ├── DailyForecastSection.jsx # 7-day forecast with temp bars
│   │   ├── ErrorPanel.jsx           # Error states with retry
│   │   ├── Header.jsx               # App header with refresh button
│   │   ├── HourlyForecastSection.jsx# Horizontal scroll hourly cards
│   │   ├── Skeletons.jsx            # Loading skeleton components
│   │   └── WeatherIcon.jsx          # Icon renderer with emoji fallback
│   ├── hooks/
│   │   └── useWeather.js            # Data fetching + geolocation hook
│   ├── services/
│   │   └── weatherApi.js            # API layer (fetch + error handling)
│   ├── utils/
│   │   └── helpers.js               # Time formatting, wind direction, etc.
│   ├── App.jsx                      # Root component, layout orchestration
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles + Tailwind directives
├── .env.example                     # Environment variable template
├── .gitignore
├── index.html
├── netlify.toml                     # Netlify deployment config
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── vercel.json                      # Vercel deployment config
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd weather-dashboard
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
VITE_WEATHER_AI_KEY=your_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for Production

```bash
npm run build
npm run preview  # preview the build locally
```

---

## 🔑 API Integration

### Endpoint

```
GET https://api.weather-ai.co/v1/weather?lat={lat}&lon={lon}&units=metric&ai=true
Authorization: Bearer YOUR_API_KEY
```

### API Response Shape Used

```js
{
  location: { lat, lon, timezone, country },
  current: {
    time, temperature, feels_like, wind_speed,
    wind_direction, humidity, condition_code, icon
  },
  hourly: [{
    time, temperature, precipitation_probability,
    wind_speed, humidity, feels_like, uv_index,
    condition_code, icon
  }],
  daily: [{
    date, temp_min, temp_max, precipitation_sum,
    precipitation_probability, sunrise, sunset,
    wind_max, condition_code, icon
  }],
  ai_summary: "string | null",
  client_geo: { country, ip_hash }  // optional
}
```

> **Note:** Only fields documented in the API spec are used. No fields are invented or assumed.

---

## 🌐 Deployment

### Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `VITE_WEATHER_AI_KEY` in Project Settings → Environment Variables
4. Deploy ✓

### Netlify

1. Push to GitHub
2. Connect repo in [Netlify](https://netlify.com)
3. Add `VITE_WEATHER_AI_KEY` in Site Settings → Environment Variables
4. Deploy ✓

Both platforms use the included config files (`vercel.json` / `netlify.toml`).

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background deep | `#020b18` |
| Background dark | `#041424` |
| Card background | `rgba(7, 30, 56, 0.60)` |
| Border subtle | `rgba(255,255,255, 0.08)` |
| Accent blue | `#2b72d4` |
| Accent gold | `#fbbf24` |
| Font display | Playfair Display |
| Font body | DM Sans |
| Font mono | JetBrains Mono |

---

## 📦 Tech Stack

- **React 18** — Functional components, hooks
- **Vite 4** — Lightning-fast dev & build
- **Tailwind CSS 3** — Utility-first styling
- **Google Fonts** — Playfair Display, DM Sans, JetBrains Mono
- **Browser Geolocation API** — Auto location detection

---

## 🔧 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `VITE_WEATHER_AI_KEY` | Yes | WeatherAI API Bearer token |

---

## 📄 License

MIT — free to use and modify.
