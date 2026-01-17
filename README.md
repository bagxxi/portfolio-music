# 🎵 GaloDev Portfolio

Portfolio personal de desarrollador Full Stack con integración de música de Jamendo API. Diseñado con una estética inspirada en Tokyo Night y una interfaz similar a Spotify.

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Características

- 🎨 **Diseño Tokyo Night**: Paleta de colores oscura y vibrante inspirada en el tema Tokyo Night
- 🎵 **Integración con Jamendo**: Reproductor de música con acceso a millones de canciones libres de derechos
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- ⚡ **Rendimiento optimizado**: Construido con Astro para máxima velocidad
- 🔍 **SEO friendly**: Meta tags y estructura semántica optimizada
- 🎭 **Transiciones suaves**: Animaciones y efectos visuales pulidos
- 🔗 **Redirecciones inteligentes**: URLs cortas y profesionales (ej: `/linkedin`)

## 🚀 Stack Tecnológico

- **Framework**: [Astro](https://astro.build) - Framework web moderno para sitios rápidos
- **UI Library**: [React](https://react.dev) - Para componentes interactivos
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Framework CSS utility-first
- **Language**: [TypeScript](https://www.typescriptlang.org) - JavaScript con tipos
- **Music API**: [Jamendo](https://developer.jamendo.com) - Música libre de derechos
- **Fonts**: Google Fonts (Space Grotesk, IBM Plex Sans, JetBrains Mono)

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
│   ├── avatar.jpg      # Foto de perfil
│   ├── logo.png        # Logo del sitio
│   └── music/          # Archivos de audio locales
├── src/
│   ├── components/     # Componentes reutilizables
│   │   ├── Player.jsx          # Reproductor de música
│   │   ├── MusicSearch.tsx     # Búsqueda de canciones
│   │   ├── JamendoPlaylist.tsx # Playlist de Jamendo
│   │   └── ...
│   ├── icons/          # Iconos SVG
│   ├── layouts/        # Layouts de página
│   │   └── Layout.astro
│   ├── lib/            # Utilidades y datos
│   │   ├── portfolio.ts    # Información personal y proyectos
│   │   ├── jamendo.ts      # Cliente API de Jamendo
│   │   ├── data.ts         # Datos de playlists locales
│   │   └── colors.ts       # Paleta de colores
│   └── pages/          # Páginas del sitio
│       ├── index.astro         # Inicio
│       ├── about.astro         # Sobre mí
│       ├── projects.astro      # Proyectos
│       ├── skills.astro        # Habilidades
│       ├── contact.astro       # Contacto
│       ├── music.astro         # Música
│       ├── linkedin.astro      # Redirección a LinkedIn
│       └── playlist/[id].astro # Detalle de playlist
└── package.json
```

## 🛠️ Instalación y Uso

### Prerrequisitos

- Node.js 18+ 
- npm o pnpm

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/bagxxi/portfolio-music.git
cd portfolio-music
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Obtén tu API key de Jamendo:
   - Regístrate en [Jamendo Developer](https://developer.jamendo.com/)
   - Crea una aplicación
   - Copia tu `client_id` en el archivo `.env`

### Comandos Disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Inicia el servidor de desarrollo en `localhost:4321` |
| `npm run build` | Construye el sitio para producción en `./dist/` |
| `npm run preview` | Previsualiza la build de producción localmente |
| `npm run astro ...` | Ejecuta comandos CLI de Astro |

## 🎨 Personalización

### Información Personal

Edita `src/lib/portfolio.ts` para actualizar:
- Información personal (nombre, bio, ubicación)
- Proyectos destacados
- Habilidades técnicas
- Enlaces sociales

### Colores y Tema

Los colores del tema Tokyo Night están definidos en:
- `src/lib/colors.ts` - Paleta de colores
- `src/layouts/Layout.astro` - Variables CSS globales

### Música Local

Para agregar playlists locales, edita `src/lib/data.ts` y coloca los archivos de audio en `public/music/`.

## 🌐 Despliegue

Este proyecto genera un sitio **100% estático** que puede desplegarse en cualquier hosting:

- **Hostinger** (recomendado para este proyecto)
- **Netlify**
- **Vercel**
- **GitHub Pages**
- Cualquier hosting que soporte sitios estáticos

### Despliegue en Hostinger

#### Opción 1: Deployment Automático con GitHub Actions (Recomendado)

Este proyecto incluye un workflow de GitHub Actions que automatiza el deployment a Hostinger.

1. Configura los secrets en tu repositorio de GitHub:
   - `FTP_SERVER`: Servidor FTP de Hostinger
   - `FTP_USERNAME`: Usuario FTP
   - `FTP_PASSWORD`: Contraseña FTP
   - `PUBLIC_JAMENDO_CLIENT_ID`: Tu API key de Jamendo

2. Cada push a la rama `main` desplegará automáticamente los cambios

Ver más detalles en [`.github/workflows/README.md`](.github/workflows/README.md)

#### Opción 2: Deployment Manual

1. Construye el proyecto localmente:
```bash
npm run build
```

2. El contenido estático se generará en la carpeta `dist/`

3. Sube el contenido de la carpeta `dist/` a tu hosting de Hostinger mediante:
   - FTP/SFTP
   - File Manager del panel de control
   - Git deployment (si está disponible)

4. Configura las variables de entorno en el panel de Hostinger si es necesario

#### ⚠️ Importante: Evitar Errores de Compilación en Hostinger

Si Hostinger intenta compilar el proyecto automáticamente y falla:

**Opción A: Usar solo archivos estáticos (Recomendado)**
1. Sube **SOLO** el contenido de la carpeta `dist/` (no el proyecto completo)
2. No subas `package.json`, `node_modules`, ni archivos de código fuente
3. Hostinger servirá los archivos HTML/CSS/JS directamente

**Opción B: Desactivar Git Deployment en Hostinger**
1. Ve al panel de Hostinger → **Git**
2. Desconecta el repositorio o desactiva el auto-deployment
3. Usa FTP para subir solo la carpeta `dist/`

**Opción C: Configurar correctamente el directorio**
1. En Hostinger, configura el **Document Root** para que apunte a donde subiste los archivos
2. Generalmente debe ser `public_html/` o `public_html/dist/`
3. Asegúrate de que el archivo `index.html` esté en la raíz del Document Root

### Despliegue en Netlify

1. Conecta tu repositorio a Netlify
2. Configura las variables de entorno (`PUBLIC_JAMENDO_CLIENT_ID`)
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👤 Autor

**Gabriel (GaloDev)**

- Website: [elgalo.me](https://elgalo.me)
- GitHub: [@bagxxi](https://github.com/bagxxi)
- LinkedIn: [gabrielbalbontin](https://linkedin.com/in/gabrielbalbontin)

## 🙏 Agradecimientos

- [Astro](https://astro.build) por el increíble framework
- [Jamendo](https://jamendo.com) por la API de música gratuita
- [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme) por la inspiración del tema

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
