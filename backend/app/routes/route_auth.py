from flask import Blueprint, request, jsonify, session
from config import ADMIN_USERNAME, verify_password

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    """ Vérifie les identifiants de l'admin """
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and verify_password(password):
        session["is_authenticated"] = True
        return jsonify({"message": "Connexion réussie", "token": "admin_token"}), 200
    else:
        return jsonify({"error": "Identifiants incorrects"}), 401
