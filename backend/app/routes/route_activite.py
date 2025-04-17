from flask import Blueprint, request, jsonify, send_from_directory, current_app
from app.models.models import db, Activity
from datetime import datetime
import os

routes_activites = Blueprint('routes_activites', __name__)


# Dossier où les images sont stockées
MEMBER_FOLDER = os.path.join(os.getcwd(), "images", "activites")


# 📸 Route pour servir une image d’un membre
@routes_activites.route("/image/<filename>")
def serve_member_image(filename):
    return send_from_directory(MEMBER_FOLDER, filename)


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


@routes_activites.route('/<int:activity_id>', methods=['PUT'])
def update_activity(activity_id):
    try:
        activity = Activity.query.get_or_404(activity_id)
        activity.title = request.form.get('title', activity.title)
        activity.description = request.form.get('description', activity.description)
        activity.plan = request.form.get('plan', activity.plan)

        if request.form.get('date'):
            activity.date = datetime.fromisoformat(request.form.get('date')).date()

        image = request.files.get('image')
        if image:
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            filename = f"{activity.id}.png"
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            activity.image_path = f"/activites/image/{filename}"

        db.session.commit()
        return jsonify({'message': 'Activité mise à jour avec succès !'})

    except Exception as e:
        print("Erreur update_activity:", e)
        return jsonify({'error': str(e)}), 400


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
            os.makedirs(MEMBER_FOLDER, exist_ok=True)
            filename = f"{new_activity.id}.png"
            image_path = os.path.join(MEMBER_FOLDER, filename)
            image.save(image_path)
            new_activity.image_path = f"/activites/image/{filename}"
            db.session.commit()

        return jsonify({'message': 'Activité créée avec succès !'}), 201

    except Exception as e:
        print("Erreur create_activity:", e)
        return jsonify({'error': str(e)}), 400