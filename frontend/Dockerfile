FROM node:20.12.2

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances (avec résolution souple)
RUN npm install --legacy-peer-deps

# Copier le reste du code source
COPY . .

# Exposer le port Vite (pas 3000 mais 5173 par défaut)
EXPOSE 5173

# Commande pour lancer le serveur Vite avec --host (nécessaire dans Docker)
CMD ["npm", "run", "dev", "--", "--host"]
