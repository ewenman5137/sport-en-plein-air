import os
from flask import Blueprint, request, jsonify, current_app
from app.models.models import db, Member, SocialLink
from datetime import datetime

routes_membres = Blueprint('routes_membres', __name__)

# 📁 Racine du projet pour sauver les images dans frontend/public
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
MEMBER_FOLDER = os.path.join(PROJECT_ROOT, "frontend", "public", "membres")


# ✅ GET all members
@routes_membres.route("/", methods=["GET"])
def get_members():
    members = Member.query.all()
    members_data = [
        {
            "id": member.id,
            "image_path": member.image_path,
            "name": member.name,
            "role": member.role,
            "description": member.description,
            "social_links": [
                {"network_name": link.network_name, "url": link.url}
                for link in member.social_links
            ],
        }
        for member in members
    ]
    return jsonify(members_data)


# ✅ GET one member
@routes_membres.route("/<int:member_id>", methods=["GET"])
def get_member(member_id):
    member = Member.query.get_or_404(member_id)
    data = {
        "id": member.id,
        "image_path": member.image_path,
        "name": member.name,
        "role": member.role,
        "description": member.description,
        "social_links": [
            {"network_name": link.network_name, "url": link.url}
            for link in member.social_links
        ],
    }
    return jsonify(data)


# ✅ POST create member
@routes_membres.route("/", methods=["POST"])
def create_member():
    try:
        image = request.files.get("image")
        name = request.form.get("name")
        role = request.form.get("role")
        description = request.form.get("description", "")

        new_member = Member(
            image_path="",
            name=name,
            role=role,
            description=description
        )
        db.session.add(new_member)
        db.session.commit()

        if image:
            filename = f"{new_member.id}.png"
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            new_member.image_path = f"/membres/{filename}"
            db.session.commit()

        return jsonify({"message": "Membre ajouté avec succès"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ✅ PUT update member
@routes_membres.route("/<int:member_id>", methods=["PUT"])
def update_member(member_id):
    try:
        member = Member.query.get_or_404(member_id)

        member.name = request.form.get("name", member.name)
        member.role = request.form.get("role", member.role)
        member.description = request.form.get("description", member.description)

        image = request.files.get("image")
        if image:
            filename = f"{member.id}.png"
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            member.image_path = f"/membres/{filename}"

        db.session.commit()
        return jsonify({"message": "Membre mis à jour avec succès"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ✅ DELETE member
@routes_membres.route("/<int:member_id>", methods=["DELETE"])
def delete_member(member_id):
    try:
        member = Member.query.get_or_404(member_id)

        # Supprimer l’image du disque si elle existe
        if member.image_path:
            image_file = os.path.join(MEMBER_FOLDER, os.path.basename(member.image_path))
            if os.path.exists(image_file):
                os.remove(image_file)

        db.session.delete(member)
        db.session.commit()
        return jsonify({"message": "Membre supprimé avec succès"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
