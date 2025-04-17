import os
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from app.models.models import db
from app.models.partenaire import Partenaire

from app.models.partenaire import Partenaire

partenaire_bp = Blueprint("partenaire_bp", __name__)

MEMBER_FOLDER = os.path.join(os.getcwd(), "images", "partenaires")


# 📸 Route pour servir une image d’un membre
@partenaire_bp.route("/image/<filename>")
def serve_member_image(filename):
    return send_from_directory(MEMBER_FOLDER, filename)

@partenaire_bp.route("/", methods=["GET"])
def get_partenaires():
    partenaires = Partenaire.query.all()
    partenaires_list = [
        {
            "id": p.id,
            "image_path": p.image_path,
            "name": p.name,
            "liens": p.liens
        }
        for p in partenaires
    ]
    return jsonify(partenaires_list), 200
