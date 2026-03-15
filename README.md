# Vuo - Sistema de Gestión y Sincronización AI

Vuo es una aplicación full-stack construida con Next.js, diseñada para la gestión de proyectos asistida por IA y la sincronización automática con repositorios Git. Utiliza el modelo Gemini de Google para proporcionar capacidades inteligentes y se integra profundamente con GitHub.

## 🚀 Características Principales

- **IA Integrada**: Conexión nativa con Google Gemini AI.
- **Sincronización Git**: Gestión automatizada de repositorios y commits.
- **Arquitectura Moderna**: Construido con Next.js 15, React 19 y Tailwind CSS.
- **Listo para Docker**: Configuración completa para despliegue en contenedores.
- **Despliegue Simple**: Optimizado para ser desplegado en servidores como Coolify.

## 📋 Requisitos Previos

- [Node.js](https://nodejs.org/) (v20 o superior)
- [Docker](https://www.docker.com/) y Docker Compose (opcional para desarrollo local)
- Clave de API de [Google AI Studio (Gemini)](https://aistudio.google.com/app/apikey)
- [GitHub Personal Access Token](https://github.com/settings/tokens) (con permisos de `repo`)

## 🛠️ Instalación y Configuración Local

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/oesantama/vuo.git
    cd vuo
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Copia el archivo `.env.example` a `.env.local` y rellena tus claves:

    ```bash
    cp .env.example .env.local
    ```

4.  **Iniciar entorno de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

## 🐳 Despliegue con Docker

### Usando Docker Compose

```bash
docker-compose up -d
```

El servicio estará disponible en `http://localhost:3005` (mapeado al puerto 3000 del contenedor).

### Despliegue en Coolify

1. Crea una nueva aplicación desde Git usando la URL del repo.
2. Selecciona la rama `master`.
3. Configura el **Build Pack** como `Docker Compose`.
4. Añade las variables de entorno `GEMINI_API_KEY` y `GITHUB_TOKEN`.
5. Asegúrate de mapear el volumen `/app/projects` si deseas persistencia.

## 📂 Estructura del Proyecto

- `src/app`: Rutas y lógica de la interfaz.
- `src/lib`: Utilidades de Git y sincronización.
- `public`: Archivos estáticos y manifest.
- `docker-compose.yml`: Orquestación de contenedores.
- `Dockerfile`: Configuración de imagen de producción.

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
