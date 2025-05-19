from flask import Blueprint, jsonify, request
from app.models.textAccueil import TextAccueil
from app.models.models import db

text_accueil = Blueprint('text_accueil', __name__)


@text_accueil.route("/", methods=["GET"])
def get_text_accueil():
    text = TextAccueil.query.first()
    if not text:
        return jsonify({"error": "Aucun texte d'accueil trouvé"}), 404

    data = {
        "id": text.id,

        # Header
        "header_title": text.header_title,
        "header_description": text.header_description,
        "button_activities": text.button_activities,
        "button_contact": text.button_contact,
        "button_instagram": text.button_instagram,

        # Nos Activités
        "activites_title": text.activites_title,
        "activites_description": text.activites_description,
        "activites_button": text.activites_button,

        # Nos Partenaires
        "partenaires_title": text.partenaires_title,

        # Nos Valeurs
        "valeurs_title": text.valeurs_title,
        "valeurs_description": text.valeurs_description,
        "valeur1_title": text.valeur1_title,
        "valeur1_text": text.valeur1_text,
        "valeur2_title": text.valeur2_title,
        "valeur2_text": text.valeur2_text,
        "valeur3_title": text.valeur3_title,
        "valeur3_text": text.valeur3_text,

        # Notre équipe
        "equipe_section_title": text.equipe_section_title,
        "equipe_title": text.equipe_title,
        "equipe_description": text.equipe_description,
        "equipe_button": text.equipe_button,

        # Qui sommes-nous ?
        "qui_section_title": text.qui_section_title,
        "qui_title": text.qui_title,
        "qui_description": text.qui_description,

        # Nous contacter
        "contact_title": text.contact_title,
        "contact_description": text.contact_description,
        "contact_form_email": text.contact_form_email,
        "contact_form_entreprise": text.contact_form_entreprise,
        "contact_form_message": text.contact_form_message,
        "contact_form_objet": text.contact_form_objet,
        "contact_form_submit": text.contact_form_submit,
        "contact_reseaux": text.contact_reseaux,

        # Transition
        "transition_title": text.transition_title
    }

    return jsonify(data)


@text_accueil.route('/', methods=['POST', 'PUT'])
def update_text_accueil():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Aucune donnée reçue"}), 400

        texte = TextAccueil.query.first()
        if not texte:
            texte = TextAccueil()

        # Met à jour uniquement les champs fournis dans la requête
        for key, value in data.items():
            if hasattr(texte, key):
                setattr(texte, key, value)

        db.session.add(texte)
        db.session.commit()

        return jsonify({"message": "Contenu mis à jour avec succès"}), 200
    except Exception as e:
        print("Erreur lors de la mise à jour :", e)
        return jsonify({"error": "Erreur serveur"}), 500
