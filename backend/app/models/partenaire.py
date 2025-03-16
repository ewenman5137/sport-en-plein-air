from app.models.models import db

class Partenaire(db.Model):
    __tablename__ = 'Partenaire'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_path = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    liens = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"<Partenaire {self.name}>"

    @staticmethod
    def insert_default_content():
        """ Ajoute des names par défaut si la table est vide """
        partenaire_data = [
            {"image_path": "/partenaires/decathlon.png", "name": "Decathlon", "liens": "https://decathlon.com"},
            {"image_path": "/partenaires/uqac.png", "name": "Uqac", "liens": "https://uqac.com"},
            {"image_path": "/partenaires/sportsExperts.png", "name": "sports Experts", "liens": "https://sportsExperts.com"}
        ]

        if not Partenaire.query.first():  # Vérifie si la table est vide
            print("données inserer")
            for partenaire in partenaire_data:
                new_partenaire = Partenaire(image_path=partenaire["image_path"], name=partenaire["name"], liens=partenaire["liens"])
                db.session.add(new_partenaire)
            db.session.commit()
            print("✅ names insérées avec succès !")
        else:
            print("⚠️ La table partenaire contient déjà des données, aucune insertion nécessaire.")


