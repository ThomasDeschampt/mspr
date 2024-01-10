# Utilisez une image Flutter officielle
FROM ubuntu:20.04

# Installez les dépendances nécessaires pour Flutter
RUN apt update && apt install -y \
    curl \
    git \
    unzip \
    xz-utils

# Téléchargez et installez Flutter
RUN git clone https://github.com/flutter/flutter.git /flutter
ENV PATH="/flutter/bin:${PATH}"

# Définissez le répertoire de travail
WORKDIR /app

# Copiez le reste du code source
COPY . .

# Exécutez la commande de construction de Flutter
RUN flutter pub get
RUN flutter build web

# Exposez le port sur lequel votre application Flutter sera accessible
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["flutter", "run", "-d", "web-server"]
