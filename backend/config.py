import os

basedir = os.path.abspath(os.path.dirname(__file__))  

SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False
DEBUG = True
SECRET_KEY = os.urandom(24)

import os
import bcrypt
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD_HASH = os.getenv("ADMIN_PASSWORD")  # Le mot de passe chiffré

def verify_password(input_password: str) -> bool:
    """ Vérifie si le mot de passe saisi correspond au hash """
    return bcrypt.checkpw(input_password.encode(), ADMIN_PASSWORD_HASH.encode())
