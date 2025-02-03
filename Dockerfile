FROM node:23-alpine AS build

# setting up MatchAnalyzer
ARG environment
RUN echo "environment: $environment"
RUN apk add --no-cache g++ make python3
# set work directory on Docker
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Construye el proyecto
RUN npm run ${environment}

# Al final, solo necesitamos los archivos estáticos de Vue.js
# Estos se copiarán al directorio de trabajo que Caddy usará más tarde
FROM nginx:alpine

# Copiar el archivo de configuración de Nginx
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80
