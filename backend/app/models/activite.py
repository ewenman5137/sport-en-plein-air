from app.models.models import db
from datetime import date

class Activity(db.Model):
    __tablename__ = 'activity'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_path = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    plan = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False)

    def __repr__(self):
        return f"<Activity {self.title}>"
    

    @staticmethod
    def insert_default_content():
        """ Ajoute des names par défaut si la table est vide """
        activite_data = [
            {"image_path": "/activites/image/1.png", "title": "Ski au mont-valin", "description": "Viens profiter d'une journée inoubliable sur les pistes du Mont Valin ! Entre descentes enneigées, panoramas à couper le souffle et ambiance conviviale, cette sortie est l'occasion parfaite de glisser, s'amuser et se dépasser.", "plan": "Accueil, ski, repas, détente, clôture","date":date(2020, 5, 20)},
            {"image_path": "/activites/image/2.png", "title": "Escalade de glace", "description": "Viens repousser tes limites et découvrir les sensations uniques de l'escalade de glace sur les parois gelées du Saguenay ! Encadré par des passionnés, tu apprendras à manier piolets et crampons pour grimper en toute sécurité.", "plan": "Accueil, ski, repas, détente, clôture","date":date(2020, 5, 20)},
            {"image_path": "/activites/image/3.png", "title": "Ski au mont-Francis", "description": "La montagne Mont-Francis, beau et gentil au premier abord, peut vous proposer des pistes à la fois ludiques et techniques, parfaites pour y passer une journée après une semaine de cours.", "plan": "Accueil, ski, repas, détente, clôture","date":date(2020, 5, 20)},
        ]

        if not Activity.query.first():  # Vérifie si la table est vide
            print("données inserer")
            for activite in activite_data:
                new_activite = Activity(image_path=activite["image_path"], title=activite["title"], description=activite["description"], plan=activite["plan"], date=activite["date"])
                db.session.add(new_activite)
            db.session.commit()
            print("✅ names insérées avec succès !")
        else:
            print("⚠️ La table activite contient déjà des données, aucune insertion nécessaire.")
