from flask_sqlalchemy import SQLAlchemy

# Initialisation de l'objet SQLAlchemy
db = SQLAlchemy()

from .activite import Activity
from .membre import Member 
from .membre import SocialLink
