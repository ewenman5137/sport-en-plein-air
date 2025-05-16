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

@partenaire_bp.route("/", methods=["POST"])
def create_partenaire():
    try:
        image = request.files.get("image")
        name = request.form.get("name")
        liens = request.form.get("liens", "")

        if not name:
            return jsonify({"error": "Le nom est requis"}), 400

        new_partenaire = Partenaire(
            image_path="",
            name=name,
            liens=liens,
        )
        db.session.add(new_partenaire)
        db.session.commit()

        # Sauvegarde de l'image
        if image:
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            filename = f"{new_partenaire.id}.png"
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            new_partenaire.image_path = f"/partenaires/image/{filename}"
            db.session.commit()

        return jsonify({
            "id": new_partenaire.id,
            "name": new_partenaire.name,
            "liens": new_partenaire.liens,
            "image_path": new_partenaire.image_path
        }), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


@partenaire_bp.route("/<int:id>", methods=["DELETE"])
def delete_partenaire(id):
    try:
        partenaire = Partenaire.query.get_or_404(id)

        # Supprimer l’image si elle existe
        if partenaire.image_path:
            filename = partenaire.image_path.split("/")[-1]
            image_path = os.path.join(MEMBER_FOLDER, filename)
            if os.path.exists(image_path):
                os.remove(image_path)

        db.session.delete(partenaire)
        db.session.commit()
        return jsonify({"message": "Partenaire supprimé"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400
