from flask import Blueprint, jsonify
from app.models.models import db
from app.models.partenaire import Partenaire

partenaire_bp = Blueprint("partenaire_bp", __name__)

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
