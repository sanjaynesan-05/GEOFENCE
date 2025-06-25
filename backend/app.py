from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import sqlite3
import ee

# Initialize Earth Engine
try:
    ee.Initialize(project='dark-foundry-278207')
    print("✅ Earth Engine initialized.")
except Exception as e:
    print("🌐 Earth Engine Auth required.")
    raise e

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
DATABASE = 'users.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute("DROP TABLE IF EXISTS users")
    conn.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    try:
        conn = get_db_connection()
        conn.execute(
            "INSERT INTO users (username, password_hash, password) VALUES (?, ?, ?)",
            (username, hashed, password)
        )
        conn.commit()
        return jsonify({"message": "Registration successful"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username already exists"}), 409
    finally:
        conn.close()


@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute(
        "SELECT * FROM users WHERE username = ?", (username,)
    ).fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user['password_hash'], password):
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        coords = request.json.get("coordinates")
        if not coords:
            return jsonify({"error": "No coordinates provided"}), 400

        geometry = ee.Geometry.Polygon(coords)
        image = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED") \
            .filterBounds(geometry) \
            .filterDate("2024-01-01", "2024-12-31") \
            .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 10)) \
            .sort("CLOUDY_PIXEL_PERCENTAGE") \
            .first()

        ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")
        green = ndvi.gt(0.3)
        buildings = ndvi.lt(0.2)
        pixelArea = ee.Image.pixelArea()

        greenArea = green.multiply(pixelArea).reduceRegion(
            reducer=ee.Reducer.sum(), geometry=geometry, scale=10, maxPixels=1e9)
        buildingArea = buildings.multiply(pixelArea).reduceRegion(
            reducer=ee.Reducer.sum(), geometry=geometry, scale=10, maxPixels=1e9)
        totalArea = pixelArea.reduceRegion(
            reducer=ee.Reducer.sum(), geometry=geometry, scale=10, maxPixels=1e9)

        green_m2 = greenArea.get("NDVI").getInfo() or 0
        build_m2 = buildingArea.get("NDVI").getInfo() or 0
        total_m2 = totalArea.get("area").getInfo() or 1

        return jsonify({
            "capture_date": image.date().format("YYYY-MM-dd").getInfo(),
            "green_area_m2": round(green_m2, 2),
            "building_area_m2": round(build_m2, 2),
            "total_area_m2": round(total_m2, 2),
            "green_percent": round((green_m2 / total_m2) * 100, 2),
            "building_percent": round((build_m2 / total_m2) * 100, 2)
        })
    except Exception as e:
        return jsonify({"error": f"Analysis failed: {str(e)}"}), 500

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
