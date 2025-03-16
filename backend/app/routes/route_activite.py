from flask import Blueprint, request, jsonify, session
from app.models.models import Member, Activity

routes_activites = Blueprint('routes_activites', __name__)

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