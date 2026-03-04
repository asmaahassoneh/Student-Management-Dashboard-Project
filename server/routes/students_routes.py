from flask import Blueprint, request, jsonify
from extensions import db
from models import Student
from services.auth_service import require_admin

students_bp = Blueprint("students", __name__, url_prefix="/students")

@students_bp.get("/")
def get_students():
    if not require_admin():
        return jsonify({"error": "Forbidden"}), 403
    rows = Student.query.all()
    return jsonify([{"id": s.id, "name": s.name, "email": s.email, "major": s.major, "gpa": s.gpa} for s in rows])

@students_bp.post("/")
def create_student():
    if not require_admin():
        return jsonify({"error": "Forbidden"}), 403

    data = request.get_json(force=True)
    s = Student(
        name=(data.get("name") or "").strip(),
        email=(data.get("email") or "").strip().lower(),
        major=(data.get("major") or "").strip(),
        gpa=float(data.get("gpa")),
    )
    db.session.add(s)
    db.session.commit()
    return jsonify({"id": s.id, "name": s.name, "email": s.email, "major": s.major, "gpa": s.gpa}), 201

@students_bp.put("/<int:sid>")
def update_student(sid):
    if not require_admin():
        return jsonify({"error": "Forbidden"}), 403

    s = Student.query.get(sid)
    if not s:
        return jsonify({"error": "Not found"}), 404

    data = request.get_json(force=True)
    s.name = data.get("name", s.name)
    s.email = (data.get("email", s.email) or "").strip().lower()
    s.major = data.get("major", s.major)
    if "gpa" in data:
        s.gpa = float(data["gpa"])

    db.session.commit()
    return jsonify({"id": s.id, "name": s.name, "email": s.email, "major": s.major, "gpa": s.gpa})

@students_bp.delete("/<int:sid>")
def delete_student(sid):
    if not require_admin():
        return jsonify({"error": "Forbidden"}), 403

    s = Student.query.get(sid)
    if not s:
        return jsonify({"error": "Not found"}), 404

    db.session.delete(s)
    db.session.commit()
    return jsonify({"ok": True})