# GitHub Actions Workflows

Este directorio contiene los workflows de GitHub Actions para automatizar el deployment del proyecto.

## 🚀 Deploy Workflow

El archivo `deploy.yml` automatiza el proceso de build y deployment a Hostinger.

## ⚙️ Configuración de Secrets (IMPORTANTE)

**El workflow NO funcionará hasta que configures los secrets requeridos.**

### Paso 1: Obtener credenciales FTP de Hostinger

1. Inicia sesión en tu panel de Hostinger
2. Ve a **Archivos** → **Administrador de archivos FTP**
3. Anota las siguientes credenciales:
   - **Servidor FTP**: Generalmente es `ftp.tudominio.com` o similar
   - **Usuario FTP**: Tu nombre de usuario FTP
   - **Contraseña**: Tu contraseña FTP

### Paso 2: Configurar Secrets en GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Agrega cada uno de los siguientes secrets:

#### Secrets Requeridos:

| Secret Name | Descripción | Ejemplo | Dónde obtenerlo |
|-------------|-------------|---------|-----------------|
| `FTP_SERVER` | Servidor FTP de Hostinger | `ftp.elgalo.me` | Panel de Hostinger → FTP |
| `FTP_USERNAME` | Usuario FTP de Hostinger | `u123456789` | Panel de Hostinger → FTP |
| `FTP_PASSWORD` | Contraseña FTP de Hostinger | `tu_contraseña_segura` | Panel de Hostinger → FTP |
| `PUBLIC_JAMENDO_CLIENT_ID` | Client ID de Jamendo API | `abc123def456` | [Jamendo Developer](https://developer.jamendo.com/) |

### Paso 3: Verificar la configuración

1. Ve a **Actions** en tu repositorio
2. Selecciona el workflow "Deploy to Hostinger"
3. Click en **Run workflow** → **Run workflow**
4. Si los secrets están bien configurados, el deployment se ejecutará correctamente

## 🔄 Cómo funciona

1. **Trigger**: Se ejecuta automáticamente cuando haces push a la rama `main`
2. **Checkout**: Descarga el código del repositorio
3. **Setup**: Configura Node.js 18 con cache de npm
4. **Install**: Instala las dependencias con `npm ci`
5. **Build**: Construye el proyecto estático
6. **Verify**: Valida que los secrets FTP estén configurados
7. **Deploy**: Sube el contenido de `dist/` a Hostinger vía FTP

## 🎯 Ejecución Manual

También puedes ejecutar el workflow manualmente:

1. Ve a **Actions** en tu repositorio
2. Selecciona "Deploy to Hostinger"
3. Click en **Run workflow**
4. Selecciona la rama `main`
5. Click en **Run workflow**

## 📝 Notas Importantes

- ⚠️ **El workflow fallará si no configuras los secrets FTP**
- 📁 El directorio de destino en Hostinger es `public_html/` (ajústalo si es necesario)
- 🔒 `dangerous-clean-slate: false` evita eliminar archivos existentes en el servidor
- 🚫 Se excluyen automáticamente archivos `.git` y `node_modules`
- ⏱️ El build tarda aproximadamente 1-2 minutos

## 🐛 Solución de Problemas

### Error: "Input required and not supplied: server"
- **Causa**: El secret `FTP_SERVER` no está configurado
- **Solución**: Configura todos los secrets FTP siguiendo el Paso 2

### Error: "Login authentication failed"
- **Causa**: Usuario o contraseña FTP incorrectos
- **Solución**: Verifica las credenciales en el panel de Hostinger

### Error: "Cannot connect to server"
- **Causa**: El servidor FTP es incorrecto o no es accesible
- **Solución**: Verifica el servidor FTP en el panel de Hostinger

## 📞 Soporte

Si tienes problemas con el deployment:
1. Revisa los logs en la pestaña **Actions**
2. Verifica que todos los secrets estén configurados correctamente
3. Asegúrate de que las credenciales FTP sean válidas
