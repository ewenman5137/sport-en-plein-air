from flask import Flask
from flask_cors import CORS
from app.models.models import db
from app.models.membre import Member
from app.models.membre import SocialLink
from app.models.activite import Activity
from app.models.partenaire import Partenaire
from app.models.imageAccueil import ImageAccueil
from app.models.textAccueil import TextAccueil
from app.routes.route_membre import routes_membres
from app.routes.route_activite import routes_activites
from app.routes.route_partenaire import partenaire_bp
from app.routes.route_auth import auth_bp
from app.routes.route_image_accueil import route_image_accueil
from app.routes.route_text import text_accueil
from flask_mail import Mail
from app.routes.contact import contact_bp, mail
from app.routes import base
import os
from dotenv import load_dotenv



# Charger les variables .env
load_dotenv()

# Initialisation de l'application Flask
app = Flask(__name__)
CORS(app) 

# Config Outlook à partir de l'environnement
app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')
mail.init_app(app)

# Configuration de la base de données
app.config.from_object('config')  # Assure-toi que config.py existe avec tes paramètres
db.init_app(app)

# Enregistrement des routes (blueprints)
app.register_blueprint(base, url_prefix="/api")
app.register_blueprint(routes_membres, url_prefix="/api/membres")
app.register_blueprint(routes_activites, url_prefix="/api/activites")
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(partenaire_bp, url_prefix="/api/partenaires")
app.register_blueprint(route_image_accueil, url_prefix="/api/image-accueil")
app.register_blueprint(text_accueil, url_prefix="/api/text_accueil")

# Initialisation de la base de données
with app.app_context():
    db.create_all()  # Crée toutes les tables
    Member.insert_default_content()
    Activity.insert_default_content()
    SocialLink.insert_default_content()
    Partenaire.insert_default_content()
    ImageAccueil.insert_default_content()
    TextAccueil.insert_default_content()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=True)
