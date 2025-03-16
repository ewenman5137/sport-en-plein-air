from flask import Flask
from flask_cors import CORS
from app.models.models import db
from app.models.membre import Member
from app.models.membre import SocialLink
from app.models.activite import Activity
from app.models.partenaire import Partenaire
from app.routes.route_membre import routes_membres
from app.routes.route_activite import routes_activites
from app.routes.route_partenaire import partenaire_bp
from app.routes.route_auth import auth_bp
from app.routes import base

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuration de la base de données
app.config.from_object('config')  # Assure-toi que config.py existe avec tes paramètres
db.init_app(app)

# Enregistrement des routes (blueprints)
app.register_blueprint(base)
app.register_blueprint(routes_membres, url_prefix="/membres")
app.register_blueprint(routes_activites, url_prefix="/activites")
app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(partenaire_bp, url_prefix="/partenaires")

# Initialisation de la base de données
with app.app_context():
    db.create_all()  # Crée toutes les tables
    Member.insert_default_content()
    Activity.insert_default_content()
    SocialLink.insert_default_content()
    Partenaire.insert_default_content()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
