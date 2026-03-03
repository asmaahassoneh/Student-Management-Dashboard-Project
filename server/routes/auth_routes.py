from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models import User
from services.auth_service import create_jwt, require_auth

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

@auth_bp.post("/register")
def register():
    data = request.get_json(force=True)
    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        username=username,
        email=email,
        password_hash=generate_password_hash(password),
        role="user",
    )
    db.session.add(user)
    db.session.commit()

    token = create_jwt(user)
    return jsonify({"token": token, "user": {"id": user.id, "username": user.username, "email": user.email, "role": user.role}}), 201

@auth_bp.post("/login")
def login():
    data = request.get_json(force=True)
    email = (data.get("email") or "").strip().lower()
    password = (data.get("password") or "").strip()

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_jwt(user)
    return jsonify({"token": token, "user": {"id": user.id, "username": user.username, "email": user.email, "role": user.role}})

@auth_bp.get("/me")
def me():
    user = require_auth()
    if not user:
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"user": {"id": user.id, "username": user.username, "email": user.email, "role": user.role}})