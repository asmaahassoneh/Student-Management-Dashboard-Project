import time
import jwt
from flask import current_app, request
from models import User

def create_jwt(user):
    payload = {
        "sub": str(user.id),
        "role": user.role,
        "exp": int(time.time()) + current_app.config["JWT_EXPIRES_SECONDS"],
    }
    return jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")

def decode_jwt(token: str):
    return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])

def require_auth():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return None

    token = auth.replace("Bearer ", "").strip()
    try:
        payload = decode_jwt(token)
        return User.query.get(int(payload["sub"]))
    except Exception:
        return None

def require_admin():
    user = require_auth()
    if not user:
        return None
    if user.role != "admin":
        return None
    return user