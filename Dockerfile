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

# No forzamos NODE_ENV a production aquí para permitir el servidor de desarrollo
ENV PORT 3000

# Añadir herramientas necesarias
RUN apk add --no-cache git bash

# Copiar todo el código y dependencias para permitir modo desarrollo
COPY --from=builder /app ./

EXPOSE 3000
EXPOSE 3001

# Script de inicio dual
RUN echo -e '#!/bin/sh\nnpm run dev -- -p 3001 & \nnode .next/standalone/server.js' > start.sh
RUN chmod +x start.sh

CMD ["./start.sh"]
