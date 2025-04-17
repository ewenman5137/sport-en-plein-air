# app/routes/route_image_accueil.py
import os
from flask import Blueprint, request, jsonify, send_from_directory
from app.models.models import db
from app.models.imageAccueil import ImageAccueil

route_image_accueil = Blueprint("route_image_accueil", __name__)
IMAGE_ACCUEIL_FOLDER = os.path.join(os.getcwd(), "images", "imageAccueil")


# 📸 Route pour servir une image d’un membre
@route_image_accueil.route("/image/<filename>")
def serve_member_image(filename):
    return send_from_directory(IMAGE_ACCUEIL_FOLDER, filename)


@route_image_accueil.route("/image-accueil/<int:image_id>", methods=["PUT"])
def update_image_accueil(image_id):
    image = ImageAccueil.query.get_or_404(image_id)
    new_file = request.files.get("image")
    if new_file:
        filename = f"{image.id}.png"
        os.makedirs(IMAGE_ACCUEIL_FOLDER, exist_ok=True)
        path = os.path.join(IMAGE_ACCUEIL_FOLDER, filename)
        new_file.save(path)
        image.image_path = f"/images/imageAccueil/{filename}"
        db.session.commit()
        return jsonify({"message": "Image mise à jour"}), 200
    return jsonify({"error": "Aucune image transmise"}), 400

@route_image_accueil.route("/", methods=["GET"])
def get_all_image_accueil():
    images = ImageAccueil.query.all()
    return jsonify([image.to_dict() for image in images])