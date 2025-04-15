FROM node:20.12.2

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (avec résolution souple)
RUN npm install --legacy-peer-deps

RUN npm fund

# Copier le reste du code source
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande par défaut pour lancer l'application
CMD ["npm", "run", "dev"]
