Le backend de ce projet est une API REST développée en Python avec le framework Flask.
Elle gère :

    Les activités sportives

    Les membres de l'équipe

    Les partenaires

    Les images de la page d'accueil

    L'authentification d'un administrateur

    L'envoi d'un formulaire de contact par email


🛠️ Technologies utilisées


- Technologie	Usage
- Python (Flask)	Développement de l'API
- Flask-Mail	Envoi d'emails de contact
- SQLAlchemy	ORM pour la base de données SQLite
- Flask-CORS	Autorisation des requêtes cross-origin
- Docker	Conteneurisation du backend
- dotenv	Gestion des variables d'environnement


## 🏗️ Organisation du projet

- **backend/**
  - **app/**
    - **models/**
      - `activite.py`         : Modèle pour les activités  
      - `admin.py`            : Modèle pour les administrateurs  
      - `imageAccueil.py`     : Modèle pour les images d’accueil  
      - `membre.py`           : Modèle pour les membres et réseaux sociaux  
      - `partenaire.py`       : Modèle pour les partenaires  
      - `models.py`           : Initialisation et importation des modèles  
    - **routes/**
      - `route_activite.py`       : Routes API pour les activités  
      - `route_auth.py`           : Route pour l’authentification admin  
      - `route_image_accueil.py`  : Routes API pour les images d’accueil  
      - `route_membre.py`         : Routes API pour les membres  
      - `route_partenaire.py`     : Routes API pour les partenaires  
      - `contact.py`              : Route API pour le formulaire de contact (email)  
    - **services/**
      - `mdp.py`                  : Service de vérification du mot de passe (bcrypt)  
    - `__init__.py`               : Route de test initiale  

  - `config.py`                    : Paramètres de configuration Flask  
  - `run.py`                       : Point d’entrée principal de l’application  
  - `Dockerfile`                   : Image Docker pour le backend  
  - `.env`                         : Variables d’environnement (non versionnées)  



## 📄 Principales fonctionnalités API

| Fonctionnalité                   | Route API                             | Description                                               |
|----------------------------------|---------------------------------------|-----------------------------------------------------------|
| **Connexion admin**              | `POST /auth/login`                    | Authentifie l’administrateur avec mot de passe hashé      |
| **CRUD Activités**               | `GET /activites`                      | Récupération de la liste des activités                    |
|                                  | `POST /activites`                     | Création d’une nouvelle activité                          |
|                                  | `PUT /activites/:id`                  | Mise à jour d’une activité existante                      |
|                                  | `DELETE /activites/:id`               | Suppression d’une activité                                |
| **CRUD Membres**                 | `GET /membres`                        | Récupération de la liste des membres                      |
|                                  | `POST /membres`                       | Création d’un nouveau membre                              |
|                                  | `PUT /membres/:id`                    | Mise à jour d’un membre existant                          |
|                                  | `DELETE /membres/:id`                 | Suppression d’un membre                                   |
| **Récupération Images accueil**  | `GET /image-accueil`                  | Récupère les images affichées sur la page d’accueil       |
|                                  | `PUT /image-accueil`                  | Met à jour les images de la page d’accueil                |
| **CRUD Partenaires**             | `GET /partenaires`                    | Récupération de la liste des partenaires                  |
|                                  | `POST /partenaires`                   | Création d’un nouveau partenaire                          |
|                                  | `PUT /partenaires/:id`                | Mise à jour d’un partenaire existant                      |
|                                  | `DELETE /partenaires/:id`             | Suppression d’un partenaire                               |
| **Formulaire de contact**        | `POST /api/send-email`                | Envoi d’un email via le formulaire de contact              |



🔒 Sécurité

    Mot de passe admin : stocké sous forme de hash bcrypt dans .env.

    Authentification :

        À la connexion, le serveur compare l'identifiant et le mot de passe hashé (/auth/login).

        Un token simple (admin_token) est retourné en cas de succès (à sécuriser davantage en production).

    CORS activé pour autoriser les appels frontend → backend.

✉️ Envoi d'emails

Le serveur utilise Flask-Mail pour envoyer les emails depuis le formulaire de contact :

    SMTP utilisé : smtp.office365.com (Outlook)

    Les identifiants et le destinataire (MAIL_USERNAME, MAIL_PASSWORD, MAIL_RECIPIENT) sont stockés dans le fichier .env.

🐳 Dockerisation

Un fichier Dockerfile est présent :

    Utilise une image python:3.x

    Installe les dépendances depuis requirements.txt

    Lance l'application avec python run.py

L'orchestration globale est faite par docker-compose.yml pour connecter :

    Frontend

    Backend

    Serveur Nginx
