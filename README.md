# ⛅ Weather Intelligence Dashboard

A production-ready weather dashboard built with **React (Vite)** + **Tailwind CSS**, powered by the WeatherAI API.

Features a stunning glassmorphism UI with AI-powered weather insights, hourly/daily forecasts, smooth animations, and secure serverless API handling using Vercel Functions.

---

# ✨ Features

| Feature                | Details                                                                    |
| ---------------------- | -------------------------------------------------------------------------- |
| **Current Weather**    | Temperature, feels like, humidity, wind speed & direction                  |
| **Hourly Forecast**    | Up to 24h with smooth horizontal scroll, precipitation %                   |
| **7-Day Forecast**     | Min/max temps with visual range bars, sunrise/sunset                       |
| **AI Weather Insight** | AI-generated summary (gracefully hidden when unavailable)                  |
| **Glassmorphism UI**   | Deep navy palette, glowing accents, animated background orbs               |
| **Responsive**         | Mobile-first, works across all screen sizes                                |
| **Loading Skeletons**  | Shimmer skeletons for all sections during fetch                            |
| **Error Handling**     | Contextual error messages (auth, network, server)                          |
| **Geolocation**        | Auto-detects location; falls back gracefully if denied                     |
| **Secure API Proxy**   | WeatherAI API requests routed securely through Vercel serverless functions |

---

# 🗂 Project Structure

```bash
weather-dashboard/
├── api/
│   └── weather.js                # Vercel serverless proxy API
│
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx
│   │   ├── AiInsightSection.jsx
│   │   ├── CurrentWeatherPanel.jsx
│   │   ├── DailyForecastSection.jsx
│   │   ├── ErrorPanel.jsx
│   │   ├── Header.jsx
│   │   ├── HourlyForecastSection.jsx
│   │   ├── Skeletons.jsx
│   │   └── WeatherIcon.jsx
│   │
│   ├── hooks/
│   │   └── useWeather.js
│   │
│   ├── services/
│   │   └── weatherApi.js
│   │
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

# 🚀 Getting Started

## 1. Clone & Install

```bash
git clone <your-repo-url>
cd weather-dashboard
npm install
```

---

## 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
WEATHER_AI_KEY=your_api_key_here
```

Get your API key from:

https://weather-ai.co

---

## 3. Run Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:5173
```

---

## 4. Build for Production

```bash
npm run build
npm run preview
```

---

# 🔑 Secure API Architecture

To avoid exposing the WeatherAI API key in the browser and to prevent CORS issues, the app uses a Vercel serverless proxy route.

Frontend requests are sent to:

```bash
/api/weather
```

The serverless function (`api/weather.js`) securely forwards requests to:

```bash
https://api.weather-ai.co/v1/weather
```

with the private API key attached server-side.

This architecture:

* prevents API key exposure
* avoids browser CORS restrictions
* provides cleaner production deployment
* improves application security

---

# 🌦 API Response Shape Used

```js
{
  location: {
    lat,
    lon,
    timezone,
    country
  },

  current: {
    time,
    temperature,
    feels_like,
    wind_speed,
    wind_direction,
    humidity,
    condition_code,
    icon
  },

  hourly: [{
    time,
    temperature,
    precipitation_probability,
    wind_speed,
    humidity,
    feels_like,
    uv_index,
    condition_code,
    icon
  }],

  daily: [{
    date,
    temp_min,
    temp_max,
    precipitation_sum,
    precipitation_probability,
    sunrise,
    sunset,
    wind_max,
    condition_code,
    icon
  }],

  ai_summary: "string | null",

  client_geo: {
    country,
    ip_hash
  }
}
```

> Only documented API fields are used. No undocumented fields are assumed or fabricated.

---

# 🌐 Deployment

## Vercel Deployment

1. Push project to GitHub
2. Import repository into Vercel
3. Add environment variable:

```env
WEATHER_AI_KEY=your_api_key
```

4. Deploy

---

# 🛡 Security Notes

* API keys are never exposed to the browser
* All WeatherAI requests are proxied through a secure serverless function
* Environment variables are handled server-side via Vercel
* Frontend communicates only with internal API routes

---

# 🎨 Design System

| Token           | Value                     |
| --------------- | ------------------------- |
| Background deep | `#020b18`                 |
| Background dark | `#041424`                 |
| Card background | `rgba(7, 30, 56, 0.60)`   |
| Border subtle   | `rgba(255,255,255, 0.08)` |
| Accent blue     | `#2b72d4`                 |
| Accent gold     | `#fbbf24`                 |
| Font display    | Playfair Display          |
| Font body       | DM Sans                   |
| Font mono       | JetBrains Mono            |

---

# 📦 Tech Stack

* React 18
* Vite 4
* Tailwind CSS 3
* Vercel Serverless Functions
* Browser Geolocation API
* Google Fonts

---

# 🔧 Environment Variables

| Variable         | Required | Description               |
| ---------------- | -------- | ------------------------- |
| `WEATHER_AI_KEY` | Yes      | WeatherAI private API key |

---

# 📄 License

MIT — free to use and modify.
