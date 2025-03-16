from flask import Blueprint, request, jsonify, session
from app.models.models import Member, Activity

routes_membres = Blueprint('routes_membres', __name__)

@routes_membres.route('/', methods=['GET'])
def get_members():
    members = Member.query.all()
    members_data = [
        {
            'id': member.id,
            'image_path': member.image_path,
            'name': member.name,
            'role': member.role,
            'description': member.description,
            'social_links': [
                {'network_name': link.network_name, 'url': link.url}
                for link in member.social_links
            ]
        } for member in members
    ]
    return jsonify(members_data)

