
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "contacts.db")


# Create database and table
def init_db():
    conn = sqlite3.connect(DB_PATH)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "success",
        "message": "Krishanth Portfolio Backend is Running!"
    })


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()

    if not data:
        return jsonify({
            "status": "error",
            "message": "Invalid request"
        }), 400

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({
            "status": "error",
            "message": "All fields are required"
        }), 400

    try:
        conn = sqlite3.connect(DB_PATH)

        conn.execute("""
            INSERT INTO contacts (name, email, message, created_at)
            VALUES (?, ?, ?, ?)
        """, (
            name,
            email,
            message,
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "status": "success",
            "message": "Message saved successfully!"
        })

    except sqlite3.Error:
        return jsonify({
            "status": "error",
            "message": "Unable to save message"
        }), 500


if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)
