from flask import Blueprint, jsonify

base = Blueprint('base', __name__)

@base.route('/', methods=['GET'])
def products_():
    return jsonify({"message": "Back-end ready"}), 200
