let map = L.map("map", {
  center: [11.0168, 76.9558],
  zoom: 18,
  minZoom: 3,
  maxZoom: 18,
  zoomControl: true
});

let baseLayers = {
  osm: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "© OpenStreetMap"
  }),
  satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 18,
    attribution: "© ESRI Satellite"
  }),
  night: L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
    maxZoom: 18,
    attribution: "© Stadia Maps"
  })
};

baseLayers.osm.addTo(map);

document.getElementById("mapStyle").addEventListener("change", e => {
  const sel = e.target.value;
  Object.values(baseLayers).forEach(l => map.removeLayer(l));
  baseLayers[sel].addTo(map);
});

const zoomLabel = L.control({ position: "bottomleft" });
zoomLabel.onAdd = () => {
  const div = L.DomUtil.create("div", "zoom-label");
  div.innerHTML = `🔍 Zoom: ${map.getZoom()}`;
  map.on("zoomend", () => {
    div.innerHTML = `🔍 Zoom: ${map.getZoom()}`;
  });
  return div;
};
zoomLabel.addTo(map);

const drawnItems = new L.FeatureGroup().addTo(map);
const markBtn = document.getElementById("markBtn");
const createBtn = document.getElementById("createBtn");
const resultContent = document.getElementById("resultContent");

let walkPoints = [];
let geoFencePolygon = null;
let userMarker = null;
let currentLat = null;
let currentLng = null;

// GPS Tracking
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    pos => {
      currentLat = pos.coords.latitude;
      currentLng = pos.coords.longitude;
      if (!userMarker) {
        userMarker = L.marker([currentLat, currentLng], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [30, 30]
          })
        }).addTo(map).bindPopup("📍 You");
      } else {
        userMarker.setLatLng([currentLat, currentLng]);
      }
    },
    err => alert("📡 GPS Error: " + err.message),
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
  );
}

markBtn.onclick = () => {
  if (!currentLat || !currentLng) return alert("🚫 GPS not ready");
  const pt = [currentLat, currentLng];
  walkPoints.push(pt);
  L.circleMarker(pt, {
    radius: 6,
    color: "green",
    fillColor: "lime",
    fillOpacity: 0.8
  }).addTo(map)
    .bindPopup(`📍 Point ${walkPoints.length}`)
    .openPopup();

  if (walkPoints.length >= 3) createBtn.disabled = false;
};

createBtn.onclick = () => {
  if (geoFencePolygon) drawnItems.removeLayer(geoFencePolygon);
  geoFencePolygon = L.polygon(walkPoints, {
    color: "#ff9800",
    fillColor: "#ffe0b2",
    fillOpacity: 0.5
  }).addTo(drawnItems);

  analyzeFence(walkPoints);
  walkPoints = [];
  createBtn.disabled = true;
};

function analyzeFence(points) {
  const coords = [...points.map(p => [p[1], p[0]]), [points[0][1], points[0][0]]];

  fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coordinates: [coords] })
  })
    .then(res => {
      if (!res.ok) throw new Error("⚠️ Server not responding");
      return res.json();
    })
    .then(data => {
      if (data.error) {
        resultContent.innerHTML = `⚠️ Error: ${data.error}`;
        return;
      }

      resultContent.innerHTML = `
        📍 <b>Fence Summary</b><br/>
        📐 Total Area: <b>${data.total_area_m2 ?? "0"} m²</b><br/>
        🌿 Green Area: <b>${data.green_area_m2 ?? "0"} m²</b><br/>
        🟩 Green Cover: <b>${data.green_percent ?? "0"}%</b><br/>
        🏠 Building Area: <b>${data.building_area_m2 ?? "0"} m²</b><br/>
        🏢 Building Cover: <b>${data.building_percent ?? "0"}%</b>
      `;
    })
    .catch(err => {
      resultContent.innerHTML = `❌ Server unreachable. Please ensure backend is running.<br/><small>${err.message}</small>`;
    });
}
