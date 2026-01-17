# Guía Rápida: Deployment en Hostinger

## ⚠️ Problema Común: Error de Compilación

Si ves el error "La compilación falló" en Hostinger, es porque Hostinger está intentando compilar el proyecto Node.js directamente en su servidor. **Este proyecto ya está pre-compilado** por GitHub Actions.

## ✅ Solución Recomendada

### Opción 1: Usar GitHub Actions (Automático)

1. **Desconecta Git Deployment en Hostinger**:
   - Panel de Hostinger → Git → Desconectar repositorio

2. **Configura GitHub Actions**:
   - Ve a tu repositorio en GitHub
   - Settings → Secrets and variables → Actions
   - Agrega los secrets FTP (ver `.github/workflows/README.md`)

3. **Push a main**:
   - Cada push compilará el proyecto en GitHub
   - Subirá automáticamente solo los archivos estáticos vía FTP

### Opción 2: Deployment Manual (Sin GitHub Actions)

1. **Compila localmente**:
   ```bash
   npm run build
   ```

2. **Sube SOLO la carpeta dist/**:
   - Usa FTP (FileZilla, WinSCP, etc.)
   - Servidor: Tu servidor FTP de Hostinger
   - Sube el **contenido** de `dist/` a `public_html/`
   - **NO subas**: `package.json`, `node_modules`, `src/`, etc.

3. **Verifica la estructura en Hostinger**:
   ```
   public_html/
   ├── index.html          ← Debe estar aquí
   ├── _astro/
   ├── about/
   ├── projects/
   └── ...
   ```

## 🔧 Configuración del Document Root

Si los archivos están subidos pero no se ven:

1. Panel de Hostinger → **Hosting** → **Configuración**
2. Busca **Document Root** o **Carpeta raíz**
3. Asegúrate de que apunte a donde está `index.html`
4. Generalmente debe ser: `public_html/`

## 📋 Checklist de Deployment

- [ ] Compilar localmente con `npm run build`
- [ ] Subir **SOLO** el contenido de `dist/` (no la carpeta dist misma)
- [ ] Verificar que `index.html` esté en la raíz de `public_html/`
- [ ] Configurar Document Root correctamente
- [ ] Desconectar Git Deployment si está activo
- [ ] Probar el sitio en tu dominio

## 🐛 Solución de Problemas

### "La compilación falló"
- **Causa**: Hostinger intenta compilar el proyecto
- **Solución**: Desconecta Git Deployment y usa FTP

### "404 Not Found"
- **Causa**: Document Root incorrecto
- **Solución**: Verifica que apunte a donde está `index.html`

### "Página en blanco"
- **Causa**: Rutas de archivos incorrectas
- **Solución**: Asegúrate de subir TODO el contenido de `dist/`

### "Cannot GET /about"
- **Causa**: Configuración de rutas del servidor
- **Solución**: Agrega un archivo `.htaccess` (ver abajo)

## 📄 Archivo .htaccess para Hostinger

Crea este archivo en `public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Esto permite que las rutas de Astro funcionen correctamente.

## 🚀 Deployment Exitoso

Si todo está bien configurado, deberías ver tu sitio en:
- `https://tudominio.com`
- `https://elgalo.me` (tu caso)

¡Listo! 🎉
