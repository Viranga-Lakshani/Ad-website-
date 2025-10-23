# Make Human: Full Humanize Ad Platform

A simple full-stack ad placing website where users can post and view human-centric ads.

## Structure

```
human-ads-platform/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── README.md
├── README.md
```

## How to Run

1. **Backend**
    - Install dependencies: `npm install`
    - Start MongoDB locally (`mongod`)
    - Run backend: `npm start` (API at `http://localhost:5000`)

2. **Frontend**
    - Install dependencies: `npm install`
    - Run frontend: `npm start` (App at `http://localhost:3000`)

3. **Usage**
    - Visit `http://localhost:3000`
    - Place ads, view humanized ads

## Features

- Post ads with human details (name, email, location, image)
- Browse ads, see details
- Minimal, clean, human-focused UI

---

Feel free to expand with authentication, moderation, categories, etc!
