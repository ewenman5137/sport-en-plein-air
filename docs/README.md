🏔️ UQAC Sport en Plein Air — Projet Web

Bienvenue sur le dépôt du projet Sport en Plein Air de l'Université du Québec à Chicoutimi (UQAC) !
Ce projet a pour but de promouvoir des activités sportives en plein air à travers une plateforme web moderne et intuitive.


🌟 Présentation du projet

L'application est composée de deux grandes parties :

    Frontend : Site vitrine développé en React (avec TypeScript et Vite), incluant un espace administrateur.

    Backend : API REST développée en Flask (Python), connectée à une base de données SQLite.

    Déploiement : Conteneurisation complète avec Docker et orchestration via docker-compose, couplée à un serveur Nginx.

Elle permet :

    Aux utilisateurs de consulter les activités, l'équipe, les partenaires et de contacter l'association.

    Aux administrateurs de gérer les activités, les membres, les partenaires et les images de la page d'accueil via un espace dédié.

🛠️ Technologies utilisées


Frontend	Backend	Autres
React + TypeScript	Flask (Python)	Docker
Vite	Flask-Mail	Nginx
React Router DOM	Flask-CORS	SQLite
CSS personnalisé	SQLAlchemy (ORM)	dotenv (variables d'environnement)
	bcrypt (authentification)	


🏗️ Architecture du projet

/frontend
    /src
        /assets        # Fichiers CSS
        /component     # Composants réutilisables
        /pages         # Pages publiques et admin
    Dockerfile         # Dockerisation du frontend

/backend
    /app
        /models        # Modèles SQLAlchemy
        /routes        # Routes API Flask
        /services      # Fonctions utilitaires
    Dockerfile         # Dockerisation du backend

/docker-compose.yml    # Orchestration des services
/nginx/default.conf    # Configuration Nginx

