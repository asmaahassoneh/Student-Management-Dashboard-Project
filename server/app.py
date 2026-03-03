from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from extensions import db, migrate
from routes.auth_routes import auth_bp
from routes.students_routes import students_bp
from werkzeug.security import generate_password_hash
from models import User

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)
    migrate.init_app(app, db)

    @app.get("/")
    def home():
        return jsonify({"ok": True, "message": "Flask API is running"})

    app.register_blueprint(auth_bp)
    app.register_blueprint(students_bp)
    return app

app = create_app()


with app.app_context():
    db.create_all()

    if not User.query.filter_by(email="admin@gmail.com").first():
        admin = User(
            username="Admin",
            email="admin@gmail.com",
            password_hash=generate_password_hash("123456"),
            role="admin",
        )
        db.session.add(admin)
        db.session.commit()
        print("✅ Admin auto-created")    

if __name__ == "__main__":
    app.run(port=5000, debug=True)