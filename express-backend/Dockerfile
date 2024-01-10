# Utilisez une image Node.js
FROM node:14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez le fichier package.json et package-lock.json
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste du code source
COPY . .

# Exposez le port sur lequel votre serveur ExpressJS écoutera
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]
