# Agenda → Google Calendar del centro

Cada vez que un paciente pulsa "Enviar por WhatsApp" o "Enviar por correo" en la agenda, la web llama a
`/api/solicitud`, que reenvía la solicitud a un Apps Script en la cuenta de Google del centro. El script:

- crea un evento **"Por confirmar · Nombre · Servicio"** (amarillo) en el calendario principal;
- añade avisos **el día anterior** y **temprano el mismo día** (7:00 a. m. por defecto);
- envía un **correo** al centro con la solicitud (responder = responder al paciente).

Si la hora es "a confirmar" (otros centros), el evento se crea a las 9:00 a. m. con "(hora a confirmar)".

## Instalación (una sola vez)

1. Entrar a https://script.google.com con la cuenta de Google del centro → **Nuevo proyecto**.
2. Borrar el contenido y pegar `docs/apps-script/Code.gs`. Guardar con el nombre "Agenda web Maxilo".
3. **Configuración del proyecto** (engranaje):
   - Zona horaria: **(GMT-04:00) Santo Domingo**.
   - Propiedades del script → Añadir: `TOKEN` = la clave privada. (Opcionales: `AVISO_HORA`, `CORREO`.)
4. Volver al editor, elegir la función **prueba** y pulsar **Ejecutar**. Autorizar los permisos
   (Calendar y Gmail; aparece "Google no ha verificado esta app" → Configuración avanzada → Ir a…).
   Debe aparecer un evento de prueba para mañana a las 11:30 y llegar un correo.
5. **Implementar → Nueva implementación → Aplicación web**:
   - Ejecutar como: **Yo** (la cuenta del centro).
   - Quién tiene acceso: **Cualquier usuario**.
   Copiar la **URL de la aplicación web** (termina en `/exec`).
6. En **Vercel** → proyecto → Settings → Environment Variables (Production):
   - `BOOKING_HOOK_URL` = la URL del paso 5.
   - `BOOKING_HOOK_TOKEN` = la misma clave del paso 3.
   Luego **Redeploy** del último despliegue.

Mientras esas variables no existan, la web funciona igual que antes (no se crea evento).

Si se cambia el código del script: Implementar → Gestionar implementaciones → editar (lápiz) → Versión: Nueva versión → Implementar (la URL no cambia).

Urgencias (/urgencias): el script crea un evento ROJO "URGENCIA · nombre" para hoy, que empieza unos minutos después, con aviso inmediato, y envía un correo "URGENCIA HOY".
