# GitHub Actions Workflows

Este directorio contiene los workflows de GitHub Actions para automatizar el deployment del proyecto.

## 🚀 Deploy Workflow

El archivo `deploy.yml` automatiza el proceso de build y deployment a Hostinger.

### Configuración de Secrets

Para que el workflow funcione correctamente, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

1. Ve a **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

2. Agrega los siguientes secrets:

| Secret Name | Descripción | Ejemplo |
|-------------|-------------|---------|
| `FTP_SERVER` | Servidor FTP de Hostinger | `ftp.tudominio.com` |
| `FTP_USERNAME` | Usuario FTP de Hostinger | `usuario@tudominio.com` |
| `FTP_PASSWORD` | Contraseña FTP de Hostinger | `tu_contraseña_segura` |
| `PUBLIC_JAMENDO_CLIENT_ID` | Client ID de Jamendo API | `abc123def456` |

### Cómo funciona

1. **Trigger**: Se ejecuta automáticamente cuando haces push a la rama `main`
2. **Build**: Instala dependencias y construye el proyecto
3. **Deploy**: Sube el contenido de `dist/` a Hostinger vía FTP

### Ejecución Manual

También puedes ejecutar el workflow manualmente:
1. Ve a **Actions** en tu repositorio
2. Selecciona "Deploy to Hostinger"
3. Click en "Run workflow"

### Notas Importantes

- El workflow usa `npm ci` para instalación más rápida y reproducible
- El directorio de destino en Hostinger es `public_html/` (ajusta según tu configuración)
- `dangerous-clean-slate: false` evita eliminar archivos existentes en el servidor
