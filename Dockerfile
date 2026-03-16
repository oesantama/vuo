# Dockerfile de Alto Rendimiento para VUO
FROM node:20-alpine
WORKDIR /app

# Instalar dependencias necesarias para Git y el sistema
RUN apk add --no-cache git bash

# Copiar configuración de dependencias
COPY package*.json ./
RUN npm install

# Copiar todo el código fuente
COPY . .

# Deshabilitamos standalone para evitar problemas de rutas en Coolify
# Y realizamos el build completo
RUN npm run build

# Exponemos el puerto de producción y el de desarrollo (vibe coding)
EXPOSE 3000
EXPOSE 3001

# Script de inicio dual:
# 1. Servidor de previsualización (dev mode) en puerto 3001
# 2. Servidor de producción (next start) en puerto 3000 (servido por Coolify)
CMD ["sh", "-c", "npm run dev -- -p 3001 & npm run start"]
