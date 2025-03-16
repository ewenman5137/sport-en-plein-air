import bcrypt

# Mot de passe en clair
password = "EDPOZKE?dkepdz02393dezdd202"

# Générer un hash sécurisé avec bcrypt
hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

# Convertir en format lisible pour l'enregistrement dans l'environnement
print(hashed_password.decode())  # À copier dans ton fichier `.env`
