# Use an official Flutter runtime as a parent image
FROM cirrusci/flutter:2.8.0 AS build

# Set the working directory
WORKDIR /app

# Copy the pubspec.yaml and pubspec.lock files to the working directory
COPY flutter-frontend/pubspec.yaml flutter-frontend/pubspec.lock ./

# Get dependencies
RUN flutter pub get

# Copy the entire application
COPY flutter-frontend/ .

# Build the Flutter app
RUN flutter build web

# Use Nginx as the final image
FROM nginx:alpine

# Copy the built app to the nginx public directory
COPY --from=build /app/build/web /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run the service
CMD ["nginx", "-g", "daemon off;"]
