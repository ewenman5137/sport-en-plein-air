🌐 Présentation générale

Le projet est une application web sportive découpée en deux grandes parties :

    Backend : API REST développée en Python (Flask).

    Frontend : Interface utilisateur développée en React (TypeScript) avec Vite.

    Déploiement : Conteneurisation avec Docker et orchestration avec docker-compose, couplé à un serveur Nginx.


🏗️ Organisation du projet

/backend
    /app
        /models         # Définition des modèles de données (ORM)
        /routes         # Définition des routes API (authentification, activités, membres, etc.)
        /services       # Fonctions utilitaires (ex: gestion des mots de passe)
    __pycache__         # Dossiers Python générés automatiquement
/frontend
    /src
        /assets         # Fichiers statiques (images, logos, etc.)
        /component      # Composants réutilisables (Navbar, Footer, Panels...)
        /pages          # Pages principales de l'application (Login, Home, Admin, etc.)
    Dockerfile          # Fichier de création de l'image Docker pour le frontend
/docker-compose.yml     # Définition et orchestration des services backend/frontend/nginx
/nginx
    default.conf        # Configuration du serveur Nginx


/frontend
    /src
        /assets         # Fichiers statiques (ex: images, logos)
        /component      # Composants réutilisables dans plusieurs pages (Navbar, Footer, Panel...)
        /pages          # Pages principales de l'application (Accueil, Connexion, Gestion Admin, etc.)
        App.tsx         # Composant racine de l'application React
        main.tsx        # Point d'entrée principal pour l'initialisation de React
        index.css       # Fichier CSS global pour l'application
    Dockerfile          # Fichier Docker pour builder et servir l'application frontend
    index.html          # Template HTML principal injecté par Vite
    package.json        # Dépendances et scripts du projet React
/eslint.config.js       # Configuration des règles de linting pour assurer un code propre



🐳 Déploiement - Docker & Nginx

    Docker :

        Chaque partie (backend et frontend) a son propre Dockerfile.

        Le fichier docker-compose.yml orchestre les conteneurs (API + UI + Nginx).

    Nginx :

        Sert de reverse proxy.

        Dirige les requêtes /api/ vers le backend Flask.

        Sert directement le build du frontend.

