from flask import Blueprint, request, jsonify
from flask_mail import Mail, Message
import os

contact_bp = Blueprint('contact', __name__)
mail = Mail()

@contact_bp.route('/api/send-email', methods=['POST'])
def send_email():
    data = request.get_json()

    entreprise = data.get('entreprise')
    email = data.get('email')
    objet = data.get('objet')
    message = data.get('message')

    if not all([entreprise, email, objet, message]):
        return jsonify({'error': 'Tous les champs sont requis.'}), 400

    try:
        msg = Message(
            subject=f"📬 Nouveau message - {objet}",
            recipients=[os.getenv('MAIL_RECIPIENT')],
            body=f"""Vous avez reçu un nouveau message depuis le site :

🔹 Entreprise : {entreprise}
🔹 Email : {email}
🔹 Objet : {objet}
📝 Message :
{message}
"""
        )
        mail.send(msg)
        return jsonify({'message': 'Email envoyé avec succès.'}), 200
    except Exception as e:
        print("Erreur d’envoi de mail :", e)
        return jsonify({'error': 'Échec de l’envoi de l’email.'}), 500
