import os
import bcrypt
from dotenv import load_dotenv

# Charger les variables d'environnement du fichier .env
load_dotenv(dotenv_path='../../.env')

# Le mot de passe que tu veux tester
mot_de_passe_en_clair = "EDPOZKE?dkepdz02393dezdd202"

# Récupérer le hash depuis l'environnement
hash_env = os.getenv("ADMIN_PASSWORD")

if not hash_env:
    print("❌ ADMIN_PASSWORD non trouvé dans le .env")
else:
    try:
        # Comparer le mot de passe avec le hash
        if bcrypt.checkpw(mot_de_passe_en_clair.encode(), hash_env.encode()):
            print("✅ Le mot de passe est correct !")
        else:
            print("❌ Le mot de passe est incorrect.")
    except ValueError as e:
        print("❌ Erreur lors de la vérification :", e)
