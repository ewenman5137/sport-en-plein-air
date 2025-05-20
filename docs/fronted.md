🌐 Présentation générale

Le frontend de ce projet est une application React développée en TypeScript.
Elle propose :

    Un site public pour la présentation des activités, des membres, des valeurs.

    Un espace d'administration sécurisé pour gérer les contenus dynamiquement (activités, membres, partenaires, images d’accueil).

    Un formulaire de contact relié au backend pour envoyer des emails.

L'application est optimisée pour la performance avec Vite comme bundler.


## 🛠️ Technologies utilisées

| Technologie         | Usage                                          |
|---------------------|------------------------------------------------|
| **React**           | Développement de l’interface                   |
| **TypeScript**      | Typage statique du projet                      |
| **React Router DOM**| Gestion du routage entre pages                 |
| **Vite**            | Build ultra-rapide pour React                  |
| **Docker**          | Conteneurisation de l’application              |
| **CSS personnalisé**| Styling maison (incl. Google Fonts)            |


## 🏗️ Organisation du projet

- **frontend/**
  - **src/**
    - **assets/**
      - `navBar.css`, `footer.css`, `panel.css`, `activites.css`, etc.  
        : Fichiers CSS personnalisés  
    - **component/**
      - `NavBar.tsx`            : Barre de navigation du site  
      - `Footer.tsx`            : Pied de page commun  
      - `Panel.tsx`             : Menu d’administration latéral  
    - **pages/**
      - `Home.tsx`              : Page d’accueil (landing page)  
      - `Activites.tsx`         : Liste des activités  
      - `Article.tsx`           : Détail d’une activité  
      - `NotreEquipe.tsx`       : Présentation de l’équipe  
      - `Login.tsx`             : Page de connexion admin  
      - `AdminActivites.tsx`    : Interface d’administration des activités  
      - `AdminEquipe.tsx`       : Interface d’administration des membres  
      - `AdminPartenaire.tsx`   : Interface d’administration des partenaires  
      - `AdminImageAccueil.tsx` : Interface d’administration des images d’accueil  
    - `App.tsx`                 : Définition de toutes les routes  
    - `main.tsx`                : Point d’entrée principal de React  
    - `index.css`               : Styles globaux et polices  

  - `Dockerfile`                : Fichier Docker pour builder l’application  
  - `index.html`                : Template HTML principal utilisé par Vite  


## 📄 Principales fonctionnalités

| Fonctionnalité                             | Fichiers concernés           | Description                                            |
|-------------------------------------------|------------------------------|--------------------------------------------------------|
| **Accueil du site**                        | `Home.tsx`                   | Présentation générale, activités récentes, contact     |
| **Liste des activités**                    | `Activites.tsx`              | Liste complète avec affichage dynamique                |
| **Détail d’une activité**                  | `Article.tsx`                | Page individuelle pour chaque activité                 |
| **Présentation de l’équipe**               | `NotreEquipe.tsx`            | Liste des membres et liens vers leurs réseaux          |
| **Connexion admin**                        | `Login.tsx`                  | Authentification sécurisée (token stocké en session)   |
| **Administration des activités**           | `AdminActivites.tsx`         | Ajout, édition, suppression d’activités               |
| **Administration des membres**             | `AdminEquipe.tsx`            | Gestion de l’équipe (membres et réseaux sociaux)       |
| **Administration des partenaires**         | `AdminPartenaire.tsx`        | Gestion des partenaires                                |
| **Administration des images d’accueil**    | `AdminImageAccueil.tsx`      | Mise à jour des images en page d’accueil               |



🛡️ Sécurité et gestion des accès

    Espace Admin :

        Protégé par un système de token stocké dans sessionStorage.

        Les pages /admin, /admin-equipe, /admin-partenaire, /admin-image-accueil vérifient l'authentification avant affichage.

    Formulaire de Contact :

        Le formulaire Home envoie un email via l'API /api/send-email.

        Validation basique du formulaire avant envoi.


⚙️ Configuration et build

Scripts principaux (package.json)

    dev : Lancer l'application en mode développement

    build : Construire l'application pour la production

    preview : Voir un build localement

Dockerisation

Le Dockerfile présent permet de :

    Construire l'application avec Vite

    Servir l'application construite (dist/) à l'aide d'un serveur léger (ex : nginx ou autre).


📚 Routage de l'application

Chemin URL	Composant rendu

- **`/`**                       : `Home`  
- **`/notre-equipe`**           : `NotreEquipe`  
- **`/nos-activites`**          : `Activites`  
- **`/activites/:id`**          : `Article`  
- **`/admin`**                  : `AdminActivites`  
- **`/admin-equipe`**           : `AdminEquipe`  
- **`/admin-partenaire`**       : `AdminPartenaire`  
- **`/admin-image-accueil`**    : `AdminImageAccueil`  
- **`/login`**                  : `Login`  


🖌️ Styling

    Le style est entièrement personnalisé avec des fichiers CSS dans /assets.

    Utilisation des polices :

        Anton pour les titres

        Glacial Indifference pour le corps de texte (importée localement).
