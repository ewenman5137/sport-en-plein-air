# app/models/image_accueil.py
from app.models.models import db

class ImageAccueil(db.Model):
    __tablename__ = "image_accueil"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    image_path = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "image_path": self.image_path
        }
    
    @staticmethod
    def insert_default_content():
        images = [
            {"image_path": "/image-accueil/image/1.png"},
            {"image_path": "/image-accueil/image/2.png"},
            {"image_path": "/image-accueil/image/3.png"},
            {"image_path": "/image-accueil/image/4.png"},
            {"image_path": "/image-accueil/image/5.png"},
            {"image_path": "/image-accueil/image/6.png"},
            {"image_path": "/image-accueil/image/7.png"},
            {"image_path": "/image-accueil/image/8.png"},
        ]

        if not ImageAccueil.query.first():
            print("📥 Insertion des images d’accueil...")
            for image in images:
                new_image = ImageAccueil(image_path=image["image_path"])
                db.session.add(new_image)
            db.session.commit()
            print("✅ Images d’accueil insérées avec succès.")
        else:
            print("⚠️ Les images d’accueil existent déjà.")

