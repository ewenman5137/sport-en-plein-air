from flask import Blueprint, request, jsonify, session
from app.models.models import db, Activity
from datetime import datetime
import os
from flask import current_app

routes_activites = Blueprint('routes_activites', __name__)
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))  # Racine projet
PUBLIC_FOLDER = os.path.join(PROJECT_ROOT, "frontend", "public", "activites")


@routes_activites.route('/', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    activities_data = [
        {
            'id': activity.id,
            'image_path': activity.image_path,
            'title': activity.title,
            'description': activity.description,
            'plan': activity.plan,
            'date': activity.date.isoformat()
        } for activity in activities
    ]
    return jsonify(activities_data)


@routes_activites.route('/<int:activity_id>', methods=['GET'])
def get_activity(activity_id):
    activity = Activity.query.get_or_404(activity_id)
    activity_data = {
        'id': activity.id,
        'image_path': activity.image_path,
        'title': activity.title,
        'description': activity.description,
        'plan': activity.plan,
        'date': activity.date.isoformat()
    }
    return jsonify(activity_data)


# ✅ Mettre à jour une activité
@routes_activites.route('/<int:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    try:
        activity = Activity.query.get_or_404(activity_id)

        # Champs textes
        activity.title = request.form.get('title', activity.title)
        activity.description = request.form.get('description', activity.description)
        activity.plan = request.form.get('plan', activity.plan)
        if request.form.get('date'):
            activity.date = datetime.fromisoformat(request.form.get('date')).date()

        # Image si modifiée
        image = request.files.get('image')
        if image:
            filename = f"{activity.id}.png"
            image_folder = os.path.join(current_app.root_path, "public", "activites")
            os.makedirs(image_folder, exist_ok=True)
            image_path = os.path.join(image_folder, filename)
            image.save(image_path)
            activity.image_path = f"/public/activites/{filename}"

        db.session.commit()
        return jsonify({'message': 'Activité mise à jour avec succès !'})

    except Exception as e:
        return jsonify({'error': str(e)}), 400



# ✅ Supprimer une activité
@routes_activites.route('/<int:activity_id>', methods=['DELETE'])
def delete_activity(activity_id):
    activity = Activity.query.get_or_404(activity_id)
    try:
        db.session.delete(activity)
        db.session.commit()
        return jsonify({'message': 'Activité supprimée avec succès !'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@routes_activites.route('/', methods=['POST'])
def create_activity():
    try:
        image = request.files.get('image')
        title = request.form.get('title')
        description = request.form.get('description', '')
        plan = request.form.get('plan', '')
        date_str = request.form.get('date')
        date = datetime.fromisoformat(date_str).date()

        new_activity = Activity(
            image_path="",
            title=title,
            description=description,
            plan=plan,
            date=date
        )
        db.session.add(new_activity)
        db.session.commit()

        if image:
            filename = f"{new_activity.id}.png"

            # ✅ Création du vrai chemin vers frontend/public/activites
            PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))
            PUBLIC_FOLDER = os.path.join(PROJECT_ROOT, "frontend", "public", "activites")

            os.makedirs(PUBLIC_FOLDER, exist_ok=True)

            image_path = os.path.join(PUBLIC_FOLDER, filename)
            image.save(image_path)

            # Pour que React puisse y accéder
            new_activity.image_path = f"/activites/{filename}"
            db.session.commit()

        return jsonify({'message': 'Activité créée avec succès !'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

