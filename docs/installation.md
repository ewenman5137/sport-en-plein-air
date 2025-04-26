📋 Prérequis

    Avant de commencer, assurez-vous d'avoir installé :

        Docker

        Docker Compose
        (Docker Desktop l'inclut automatiquement)

⚙️ Étapes d'installation

    1. Cloner le projet

    git clone <repository-url>
    cd <nom-du-dossier>


    2. Lancer toute l'application

    Lors du build Docker ou d'une installation manuelle, il suffira de faire :

    pip install -r requirements.txt


    3. Lancer toute l'application

    Depuis la racine du projet (là où est docker-compose.yml) :

    docker-compose up --build

    Cette commande va :

        - Construire les images du frontend, du backend et de nginx.

        - Lancer automatiquement les trois services connectés entre eux.
