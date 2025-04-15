import os
from flask import Blueprint, request, jsonify, send_from_directory
from app.models.membre import Member
from app.models.models import db

routes_membres = Blueprint("routes_membres", __name__)

# Dossier où les images sont stockées
MEMBER_FOLDER = os.path.join(os.getcwd(), "app", "images", "membres")


# 📸 Route pour servir une image d’un membre
@routes_membres.route("/image/<filename>")
def serve_member_image(filename):
    return send_from_directory(MEMBER_FOLDER, filename)


# ✅ POST : Créer un membre
@routes_membres.route("/", methods=["POST"])
def create_member():
    try:
        image = request.files.get("image")
        name = request.form.get("name")
        role = request.form.get("role")
        description = request.form.get("description", "")
        social_links = request.form.get("social_links", "[]")

        new_member = Member(
            image_path="",
            name=name,
            role=role,
            description=description,
            social_links=social_links,
        )
        db.session.add(new_member)
        db.session.commit()

        if image:
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            filename = f"{new_member.id}.png"
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            new_member.image_path = f"/membres/image/{filename}"
            db.session.commit()

        return jsonify({"message": "Membre ajouté avec succès"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ✅ PUT : Modifier un membre
@routes_membres.route("/<int:member_id>", methods=["PUT"])
def update_member(member_id):
    try:
        member = Member.query.get_or_404(member_id)

        member.name = request.form.get("name", member.name)
        member.role = request.form.get("role", member.role)
        member.description = request.form.get("description", member.description)
        member.social_links = request.form.get("social_links", member.social_links)

        image = request.files.get("image")
        if image:
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            filename = f"{member.id}.png"
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            member.image_path = f"/membres/image/{filename}"

        db.session.commit()
        return jsonify({"message": "Membre mis à jour avec succès"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ✅ DELETE : Supprimer un membre
@routes_membres.route("/<int:member_id>", methods=["DELETE"])
def delete_member(member_id):
    try:
        member = Member.query.get_or_404(member_id)

        if member.image_path:
            image_file = os.path.join(MEMBER_FOLDER, os.path.basename(member.image_path))
            if os.path.exists(image_file):
                os.remove(image_file)

        db.session.delete(member)
        db.session.commit()
        return jsonify({"message": "Membre supprimé avec succès"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ✅ GET : Récupérer tous les membres
@routes_membres.route("", methods=["GET"])
def get_all_members():
    try:
        membres = Member.query.all()
        result = [m.to_dict() for m in membres]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
