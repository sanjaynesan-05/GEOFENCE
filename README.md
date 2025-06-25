# 🛰️ GeoFence NDVI Analyzer 🌿

A web-based **GeoSpatial Intelligence Platform** to draw or walk geofences and analyze **NDVI vegetation** and **building coverage** using **Sentinel-2 satellite data** from **Google Earth Engine**.

Built using modern **HTML/CSS/JS**, **Leaflet.js**, **Turf.js**, and a **Flask + Earth Engine backend**, this tool is tailor-made for smart land-use, agriculture, and urban analysis.

---

## 🌍 Live Features Preview

> (📸 Add your project screenshot or screen recording GIF here)

---

## 💡 What It Does

- 📍 Draw or walk polygonal geofences on the map  
- 🛰️ Analyze NDVI (Normalized Difference Vegetation Index) via **Google Earth Engine**
- 🌱 Auto-calculate:
  - Total land area
  - Green cover area
  - Building-dense area
  - Their percentage breakdown
- 📊 Live analysis shown in a sleek floating glass panel
- 🔐 Secure user login & registration (using bcrypt + SQLite)
- 🎨 Beautiful glassmorphism Material 3 inspired UI with responsive design

---

## 📦 Tech Stack

### 🖥️ Frontend

[![Leaflet.js](https://img.shields.io/badge/Leaflet.js-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com)  
[![Turf.js](https://img.shields.io/badge/Turf.js-007ACC?style=for-the-badge&logo=javascript&logoColor=white)](https://turfjs.org)  
[![HTML5](https://img.shields.io/badge/HTML5-E44D26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)  
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

### ⚙️ Backend

[![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)  
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)  
[![Google Earth Engine](https://img.shields.io/badge/Google%20Earth%20Engine-34A853?style=for-the-badge&logo=google&logoColor=white)](https://earthengine.google.com/)  
[![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/index.html)

---

## 🚀 Getting Started

### 📁 Clone the repo

```bash
git clone https://github.com/sanjaynesan-05/GEOFENCE.git
cd GEOFENCE
### 2\. Backend Setup

bash

CopyEdit

`cd backend python -m venv venv venv\Scripts\activate   # or source venv/bin/activate on macOS/Linux pip install -r requirements.txt python app.py`

🔑 _Make sure you're authenticated with **Google Earth Engine** (via `earthengine authenticate`) and update your project ID in `app.py`._

### 3\. Frontend Setup

No frameworks required.

Simply open:

bash

CopyEdit

`frontend/index.html`

✅ Or use **Live Server** in VS Code for better development flow.

* * *

## 📂 Folder Structure

pgsql

CopyEdit

`GEOFENCE/ ├── backend/ │   ├── app.py                 → Flask + Earth Engine backend │   ├── users.db               → SQLite DB storing user credentials │   ├── requirements.txt       → Python dependencies │ ├── frontend/ │   ├── index.html             → Main map UI │   ├── login.html             → Login screen │   ├── register.html          → Registration screen │   ├── style.css              → UI styles (glassmorphism) │   ├── script.js              → Leaflet map + NDVI fetch logic │   └── assets/ │       ├── EARTH.jpg          → Background image │       └── leaflet/ │           ├── leaflet.css │           └── leaflet.js └── README.md`

* * *

## 🔐 Authentication Flow

*   ✅ Register user → stores `bcrypt`\-hashed password in `users.db`
    
*   🔓 Login with correct credentials → sets `localStorage.loggedIn = true`
    
*   🔁 Redirect to `index.html` if authenticated
    
*   🚪 Logout clears session and returns to login screen
    

* * *

## 🛠️ Future Scope

*   📤 Export NDVI reports to **PDF/CSV**
    
*   📈 Add NDVI **timeseries visualizations**
    
*   👥 Support **Admin vs User** role access
    
*   📲 Convert to **PWA** (installable offline app)
    
*   💾 Save multiple geofences and compare changes
    

* * *

## 🤝 Contribution

Pull requests are welcome!  
For major updates, open an issue first to discuss your proposal.

* * *

## 📄 License

MIT © [Sanjay Nesan J](https://github.com/sanjaynesan-05)

* * *

## 💬 Community

Let’s build open-source geospatial tools together 🌍  
Star ⭐ the repo, fork it, and share your feedback!

markdown

CopyEdit

``Let me know if you'd like me to include:  - A preview GIF or screenshot of the map view - GitHub Pages setup for the frontend   - `dashboard.png` badge for visuals   - Shields.io build/tech badges at the top  Just ask and I’ll customize it further.``
