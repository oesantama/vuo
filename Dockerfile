# Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner
WORKDIR /app

# No forzamos NODE_ENV production aquí para permitir que npm run dev funcione si es necesario
ENV PORT 3000

# Añadir herramientas fundamentales
RUN apk add --no-cache git bash

# Copiar el build y assets para el modo standalone
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copiar el resto del código para permitir el modo desarrollo (previsualizador) en el puerto 3001
COPY --from=builder /app ./

EXPOSE 3000
EXPOSE 3001

# Script de inicio dual robusto
# Lanzamos el servidor de producción (3000) y el de desarrollo (3001) para el vibe coding
RUN echo -e '#!/bin/sh\nnpm run dev -- -p 3001 & \nnode server.js' > start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]
