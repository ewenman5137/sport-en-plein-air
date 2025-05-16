import os
from flask import Blueprint, request, jsonify, send_from_directory
from app.models.membre import Member
from app.models.models import db

routes_membres = Blueprint("routes_membres", __name__)

# Dossier où les images sont stockées
MEMBER_FOLDER = os.path.join(os.getcwd(), "images", "membres")


# 📸 Route pour servir une image d’un membre
@routes_membres.route("/image/<filename>")
def serve_member_image(filename):
    return send_from_directory(MEMBER_FOLDER, filename)


# ✅ POST : Créer un membre
from ast import literal_eval
from app.models.membre import SocialLink

@routes_membres.route("/", methods=["POST"])
def create_member():
    try:
        image = request.files.get("image")
        name = request.form.get("name")
        role = request.form.get("role")
        description = request.form.get("description", "")
        social_links_raw = request.form.get("social_links", "[]")

        print("🎯 Social_links brut:", social_links_raw)

        if not name or not role:
            return jsonify({"error": "Le nom et le rôle sont requis"}), 400

        # Étape 1 : créer le membre sans lien
        new_member = Member(
            image_path="",
            name=name,
            role=role,
            description=description,
            social_links=[],  # 🔧 vide au départ
        )
        db.session.add(new_member)
        db.session.commit()

        # Étape 2 : traiter les réseaux sociaux
        try:
            links_data = literal_eval(social_links_raw)
            for link in links_data:
                social_link = SocialLink(
                    member_id=new_member.id,
                    network_name=link.get("network_name", ""),
                    url=link.get("url", "")
                )
                db.session.add(social_link)
        except Exception as e:
            print("⚠️ Erreur parsing social_links:", e)

        # Étape 3 : gérer l'image
        if image:
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            filename = f"{new_member.id}.png"
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            new_member.image_path = f"/membres/image/{filename}"

        db.session.commit()
        return jsonify({"message": "Membre ajouté avec succès"}), 201

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 400




from ast import literal_eval  # plus sûr que eval()

@routes_membres.route("/<int:member_id>", methods=["PUT"])
def update_member(member_id):
    try:
        member = Member.query.get_or_404(member_id)

        member.name = request.form.get("name", member.name)
        member.role = request.form.get("role", member.role)
        member.description = request.form.get("description", member.description)

        # 💥 Recréer les social_links
        links_json = request.form.get("social_links", "[]")
        links_data = literal_eval(links_json) if isinstance(links_json, str) else []

        # Supprimer les anciens liens
        from app.models.membre import SocialLink
        for link in member.social_links:
            db.session.delete(link)

        # Ajouter les nouveaux liens
        for link in links_data:
            new_link = SocialLink(
                member_id=member.id,
                network_name=link["network_name"],
                url=link["url"]
            )
            db.session.add(new_link)

        # Gestion image
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
        print("Erreur update_member:", e)
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
@routes_membres.route("/", methods=["GET"])
def get_all_members():
    try:
        membres = Member.query.all()
        result = [m.to_dict() for m in membres]
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
