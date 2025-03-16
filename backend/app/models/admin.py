from app.models.models import db

class admin(db.Model):
    __tablename__ = 'admin'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(100))
    mdp = db.Column(db.String(64))
