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


| Couche     | Technologies                                                             |
|------------|---------------------------------------------------------------------------|
| **Front**  | React • TypeScript • Vite • React Router DOM • CSS personnalisé          |
| **Back**   | Flask (Python) • Flask-Mail • Flask-CORS • SQLAlchemy • bcrypt • dotenv  |
| **DB**     | SQLite                                                                    |
| **Infra**  | Docker • docker-compose • Nginx   


🏗️ Architecture du projet

/
├── frontend
│ ├── src
│ │ ├── assets/ # Styles, images, etc.
│ │ ├── components/ # Composants réutilisables
│ │ └── pages/ # Pages publiques & admin
│ └── Dockerfile # Construction de l’image frontend
│
├── backend
│ ├── app/
│ │ ├── models/ # Modèles SQLAlchemy
│ │ ├── routes/ # Endpoints Flask
│ │ └── services/ # Logique métier & utilitaires
│ ├── Dockerfile # Construction de l’image backend
│ └── run.py # Point d’entrée de l’API
│
├── docker-compose.yml # Orchestration des conteneurs
└── nginx/
└── default.conf # Configuration du reverse-proxy

