from app.models.models import db

class Member(db.Model):
    __tablename__ = 'member'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_path = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)

    # Relation pour stocker plusieurs liens vers les réseaux sociaux
    social_links = db.relationship('SocialLink', backref='member', cascade='all, delete-orphan', lazy=True)

    def __repr__(self):
        return f"<Member {self.name}>"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "description": self.description,
            "image_path": self.image_path,
            "social_links": [link.to_dict() for link in self.social_links]
        }

    @staticmethod
    def insert_default_content():
        """ Ajoute des membres par défaut si la table est vide """
        membre_data = [
            {"image_path": "/membres/image/1.png", "name": "Ahmad Chamouni", "role": "Président", "description": "Salut les futurs aventuriers ! Adopté par le plein air, j'ai troqué mon appart contre une tente et je veux vous donner les moyens de te faire tripper par la nature à travers l'aventure."},
            {"image_path": "/membres/image/2.png", "name": "Francis Gauthier", "role": "Vice-président", "description": "YOOOO, salut tout le monde! Originaire de Montréal, je viens d'arriver au Saguenay cet été pour commencer le BAC en intervention plein air."},
            {"image_path": "/membres/image/3.png", "name": "Emeric Douvier", "role": "Responsable de la communication", "description": "Étudiant en administration, je suis celui qui va inonder vos réseaux de nos aventures, de nos défis et nos chutes spectaculaires qui deviendront légendaires."}
        ]

        if not Member.query.first():
            print("📥 Insertion des membres...")
            for membre in membre_data:
                new_membre = Member(
                    image_path=membre["image_path"],
                    name=membre["name"],
                    role=membre["role"],
                    description=membre["description"]
                )
                db.session.add(new_membre)
            db.session.commit()
            print("✅ Membres insérés avec succès !")
        else:
            print("⚠️ La table membre contient déjà des données, aucune insertion nécessaire.")


class SocialLink(db.Model):
    __tablename__ = 'social_link'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    member_id = db.Column(db.Integer, db.ForeignKey('member.id'), nullable=False)
    network_name = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<SocialLink {self.network_name} for Member ID {self.member_id}>"

    def to_dict(self):
        return {
            "network_name": self.network_name,
            "url": self.url
        }

    @staticmethod
    def insert_default_content():
        """ Ajoute des réseaux sociaux par défaut si la table est vide """
        social_links = [
            {"membre_id": 1, "network_name": "Meta", "url": "https://meta.com"},
            {"membre_id": 1, "network_name": "Instagram", "url": "https://instagram.com"},
            {"membre_id": 1, "network_name": "WhatsApp", "url": "https://whatsapp.com"},
            {"membre_id": 2, "network_name": "Meta", "url": "https://meta.com"},
            {"membre_id": 2, "network_name": "Instagram", "url": "https://instagram.com"},
            {"membre_id": 3, "network_name": "WhatsApp", "url": "https://whatsapp.com"},
            {"membre_id": 3, "network_name": "Instagram", "url": "https://instagram.com"},
            {"membre_id": 3, "network_name": "Facebook", "url": "https://facebook.com"}
        ]

        if not SocialLink.query.first():
            print("📥 Insertion des réseaux sociaux...")
            for link in social_links:
                new_link = SocialLink(
                    member_id=link["membre_id"],
                    network_name=link["network_name"],
                    url=link["url"]
                )
                db.session.add(new_link)
            db.session.commit()
            print("✅ Réseaux insérés avec succès !")
        else:
            print("⚠️ La table social_link contient déjà des données, aucune insertion nécessaire.")
