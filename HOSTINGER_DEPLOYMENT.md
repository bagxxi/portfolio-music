# Guía Rápida: Deployment en Hostinger

## ⚠️ Problema Común: Error de Compilación

Si ves el error "La compilación falló" en Hostinger, es porque Hostinger detectó automáticamente que conectaste un repositorio de GitHub y está intentando compilar el proyecto Node.js directamente en su servidor. **Este proyecto ya está pre-compilado** y solo necesita servir archivos estáticos.

## ✅ Solución Recomendada

### Paso 1: Compila el Proyecto Localmente

```bash
npm run build
```

Esto generará la carpeta `dist/` con todos los archivos estáticos listos para producción.

### Paso 2: Sube los Archivos Compilados vía FTP

**IMPORTANTE**: Sube **SOLO** el contenido de la carpeta `dist/`, NO el proyecto completo.

#### Usando FileZilla (Recomendado)

1. **Descarga FileZilla**: https://filezilla-project.org/

2. **Conecta a Hostinger**:
   - Host: Tu servidor FTP (generalmente `ftp.tudominio.com`)
   - Usuario: Tu usuario FTP de Hostinger
   - Contraseña: Tu contraseña FTP
   - Puerto: 21

3. **Obtén las credenciales FTP**:
   - Panel de Hostinger → **Archivos** → **Administrador de archivos**
   - Busca la sección **FTP** o **Cuentas FTP**
   - Anota: Servidor, Usuario, Contraseña

4. **Sube los archivos**:
   - En FileZilla, navega a `public_html/` en el servidor (lado derecho)
   - En tu computadora, abre la carpeta `dist/` del proyecto (lado izquierdo)
   - Selecciona **TODO** el contenido dentro de `dist/` (no la carpeta dist misma)
   - Arrastra y suelta al lado derecho en `public_html/`

#### Usando File Manager de Hostinger

1. **Accede al File Manager**:
   - Panel de Hostinger → **Archivos** → **Administrador de archivos**

2. **Navega a public_html/**

3. **Sube los archivos**:
   - Click en **Subir archivos** o **Upload**
   - Selecciona TODO el contenido de la carpeta `dist/`
   - Espera a que termine la subida

### Paso 3: Verifica la Estructura

En `public_html/` deberías tener esta estructura:

```
public_html/
├── index.html          ← Debe estar aquí (no dentro de una carpeta dist)
├── .htaccess           ← El archivo se copiará automáticamente desde dist
├── _astro/             ← Carpeta con archivos JS/CSS
├── about/
│   └── index.html
├── projects/
│   └── index.html
├── music/
├── contact/
└── ...
```

**IMPORTANTE**: El archivo `index.html` debe estar directamente en `public_html/`, NO en `public_html/dist/`

## 🔧 Configuración del Document Root

Si los archivos están subidos pero no se ven:

1. Panel de Hostinger → **Hosting** → **Configuración**
2. Busca **Document Root** o **Carpeta raíz**
3. Asegúrate de que apunte a: `public_html/`
4. Guarda los cambios y espera 1-2 minutos

## 📋 Checklist de Deployment

- [ ] Compilar localmente con `npm run build`
- [ ] Verificar que la carpeta `dist/` se creó correctamente
- [ ] Subir **SOLO** el contenido de `dist/` (no la carpeta dist misma)
- [ ] Verificar que `index.html` esté en la raíz de `public_html/`
- [ ] Verificar que `.htaccess` esté en `public_html/`
- [ ] Configurar Document Root a `public_html/`
- [ ] Probar el sitio en tu dominio

## 🐛 Solución de Problemas

### "La compilación falló"
- **Causa**: Hostinger detectó el repositorio de GitHub y está intentando compilarlo automáticamente
- **Solución**: Ignora el error de Hostinger y sube los archivos compilados manualmente vía FTP (Paso 1 y 2 arriba)

### "404 Not Found"
- **Causa**: Document Root incorrecto o archivos no subidos correctamente
- **Solución**: 
  1. Verifica que `index.html` esté en `public_html/` (no en una subcarpeta)
  2. Verifica Document Root en Hostinger → Hosting → Configuración

### "Página en blanco"
- **Causa**: Rutas de archivos incorrectas o falta la carpeta `_astro/`
- **Solución**: Asegúrate de subir TODO el contenido de `dist/`, incluyendo todas las subcarpetas

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
