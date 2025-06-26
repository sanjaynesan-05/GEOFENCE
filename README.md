# 🛰️ GeoFence NDVI Analyzer 🌿

A real-time **NDVI Analysis & Geofencing** tool built with **Leaflet.js**, **Flask**, and **Google Earth Engine**. Users can draw geofences, perform green area analysis using Sentinel-2 satellite imagery, and log in securely with encrypted credentials.

Perfect for **urban monitoring, smart agriculture**, and **sustainable land analysis**.

---

## 📸 Interface Preview

### 🌐 Login Page  
![Login Page](https://raw.githubusercontent.com/sanjaynesan-05/GEOFENCE/main/LoginPage.png)

### 📝 Register Page  
![Register Page](https://raw.githubusercontent.com/sanjaynesan-05/GEOFENCE/main/RegisterPage.png)

### 🗺️ Map View  
![Map View](https://raw.githubusercontent.com/sanjaynesan-05/GEOFENCE/main/MapView.png)

---

## 📦 Tech Stack

### 🌐 Frontend

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-264de4?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Leaflet.js](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com)
[![Turf.js](https://img.shields.io/badge/Turf.js-5cba47?style=for-the-badge&logo=javascript&logoColor=white)](https://turfjs.org)

### ⚙️ Backend

[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org)
[![Google Earth Engine](https://img.shields.io/badge/Google%20Earth%20Engine-34A853?style=for-the-badge&logo=googleearth&logoColor=white)](https://earthengine.google.com)
[![Bcrypt](https://img.shields.io/badge/Bcrypt-ffcc00?style=for-the-badge&logo=lock&logoColor=black)](https://pypi.org/project/bcrypt)

---

## ✨ Features

- 🖊️ Draw polygon-based geofences using Leaflet Draw
- 📍 Track real-time GPS location and geofence boundaries
- 🛰️ NDVI Analysis with Sentinel-2 satellite imagery via Google Earth Engine
- 🌿 Green, building, and total area calculations in m² and %
- 🌗 Map Themes: OpenStreetMap, Satellite View, Night Mode
- 🧊 Glassmorphism UI (Material Design 3 inspired)
- 🔐 Secure registration and login (hashed with Bcrypt)
- 💾 Local authentication using `localStorage`

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sanjaynesan-05/GEOFENCE.git
cd GEOFENCE
```
### 2. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # or source venv/bin/activate on macOS/Linux
pip install -r requirements.txt
python app.py
```
🔑 Make sure you’re authenticated with Google Earth Engine using:
```bash
earthengine authenticate
```
✅ Update the project ID if necessary in app.py.

### 3. Frontend Setup
No framework required.
Just open this in a browser:
```bash
earthengine authenticate
```
✅ Or right-click → "Open with Live Server" in VS Code for best results.
### 📂 Folder Structure
```bash
GEOFENCE/
├── backend/
│   ├── app.py                 → Flask + Earth Engine backend
│   ├── users.db               → SQLite DB storing user credentials
│   ├── requirements.txt       → Python dependencies
│
├── frontend/
│   ├── index.html             → Main map UI
│   ├── login.html             → Login screen
│   ├── register.html          → Registration screen
│   ├── style.css              → UI styles (glassmorphism)
│   ├── script.js              → Leaflet map + NDVI fetch logic
│   └── assets/
│       ├── EARTH.jpg          → Background image
│       └── leaflet/
│           ├── leaflet.css
│           └── leaflet.js
└── README.md

```
## 🔐 Authentication Flow

- ✅ Register → stores bcrypt-hashed password in users.db
- 🔓 Login → verifies user and sets localStorage.loggedIn = true
- 🔁 Authenticated users are redirected to the map
- 🚪 Logout clears the session and returns to login

## 🛠️ Future Scope

- 📤 Export NDVI reports as PDF or CSV
- 📈 Add NDVI timeseries trend graphs
- 👥 Role-based access: Admin / User
- 📲 Convert to PWA for offline use
- 📌 Multi-fence support + saved analysis history

## 🤝 Contribution
Pull requests are welcome.
For major changes, open an issue first to discuss improvements.

## 📄 License
MIT © [*SANJAY NESAN J*](https://github.com/sanjaynesan-05)
## 💬 Community
Let's build impactful geospatial tools together 🌍
Star ⭐ the repo, fork it, and share your ideas!
