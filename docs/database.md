🧩 Vue d'ensemble

La base de données utilisée est SQLite pour un déploiement simple et léger.
Elle est manipulée via l'ORM SQLAlchemy (Python).

La base stocke :

    Les activités sportives

    Les membres de l'association

    Les partenaires

    Les images de la page d'accueil

    Les comptes administrateurs (authentification)

## 🛠️ Modèles principaux

Voici la liste des modèles définis dans **`/app/models/`** :

| Modèle       | Table SQL associée | Description                                                      |
|--------------|--------------------|------------------------------------------------------------------|
| **Activity** | `activity`         | Représente une activité sportive (titre, description, plan, date, image) |
| **Member**   | `member`           | Représente un membre de l’équipe (nom, rôle, description, image) |
| **SocialLink** | `social_link`    | Liens vers les réseaux sociaux d’un membre                       |
| **Partenaire** | `partenaire`     | Entreprises partenaires de l’association                         |
| **ImageAccueil** | `image_accueil`| Images affichées sur la page d’accueil                           |
| **Admin**    | `admin`            | Administrateurs autorisés à se connecter                         |



## 🧱 Détail des schémas de tables

### 1. Table `activity`

| Colonne       | Type           | Contraintes                   |
|---------------|----------------|-------------------------------|
| `id`          | Integer        | Primary Key, AutoIncrement    |
| `image_path`  | String(255)    | Non nul                       |
| `title`       | String(100)    | Non nul                       |
| `description` | Text           | Nullable                      |
| `plan`        | Text           | Nullable                      |
| `date`        | Date           | Non nul                       |

---

### 2. Table `member`

| Colonne       | Type           | Contraintes                   |
|---------------|----------------|-------------------------------|
| `id`          | Integer        | Primary Key, AutoIncrement    |
| `image_path`  | String(255)    | Non nul                       |
| `name`        | String(100)    | Non nul                       |
| `role`        | String(100)    | Non nul                       |
| `description` | Text           | Nullable                      |

---

### 3. Table `social_link`

| Colonne        | Type        | Contraintes                     |
|----------------|-------------|---------------------------------|
| `id`           | Integer     | Primary Key, AutoIncrement      |
| `member_id`    | Integer     | Foreign Key (`member.id`)       |
| `network_name` | String(50)  | Non nul                         |
| `url`          | String(255) | Non nul                         |

> **Relation**  
> Un membre peut avoir plusieurs liens vers ses réseaux sociaux.

---

### 4. Table `partenaire`

| Colonne      | Type           | Contraintes                   |
|--------------|----------------|-------------------------------|
| `id`         | Integer        | Primary Key, AutoIncrement    |
| `image_path` | String(255)    | Non nul                       |
| `name`       | String(100)    | Non nul                       |
| `liens`      | Text           | Nullable                      |

---

### 5. Table `image_accueil`

| Colonne      | Type           | Contraintes                   |
|--------------|----------------|-------------------------------|
| `id`         | Integer        | Primary Key, AutoIncrement    |
| `image_path` | String(255)    | Non nul                       |

---

### 6. Table `admin`

| Colonne     | Type         | Contraintes                         |
|-------------|--------------|-------------------------------------|
| `id`        | Integer      | Primary Key, AutoIncrement          |
| `email`     | String(100)  | Non nul                             |
| `mdp`       | String(64)   | Mot de passe hashé bcrypt           |


⚙️ Initialisation automatique

Lors du premier lancement (via run.py), la base de données est automatiquement :

    Créée (db.create_all())

    Peuplée avec des données par défaut (activités, membres, partenaires, images).

Important :
Les méthodes insert_default_content() de chaque modèle permettent d'insérer automatiquement des exemples au besoin.
