/**
 * Maxilo Aesthetic Implants · Agenda de la web → Google Calendar + correo
 *
 * Se pega en script.google.com con la cuenta de Google del centro y se publica como "Aplicación web".
 * Cada solicitud de la web crea un evento "Por confirmar" (amarillo) en el calendario principal de esa
 * cuenta, con avisos el día anterior y temprano el mismo día, y envía un correo al centro.
 *
 * Propiedades del script (Configuración del proyecto → Propiedades del script):
 *   TOKEN       Clave privada (la misma que BOOKING_HOOK_TOKEN en Vercel). Obligatoria.
 *   AVISO_HORA  Hora del aviso del mismo día (0–23). Opcional, por defecto 7 (7:00 a. m.).
 *   CORREO      Correo que recibe el aviso. Opcional, por defecto el de esta cuenta.
 *
 * Zona horaria del proyecto: (GMT-04:00) Santo Domingo.
 */
function doPost(e) {
  var out = function (o) {
    return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  };
  try {
    var props = PropertiesService.getScriptProperties();
    var d = JSON.parse(e.postData.contents);
    if (!d.token || d.token !== props.getProperty('TOKEN')) return out({ ok: false, error: 'token' });

    // Urgencia: evento rojo para hoy, desde ahora, con aviso inmediato
    if (d.urgent) {
      var now = new Date();
      var us = new Date(Math.ceil((now.getTime() + 5 * 60000) / (15 * 60000)) * (15 * 60000));
      var ue = CalendarApp.getDefaultCalendar().createEvent(
        'URGENCIA · ' + d.name + ' · ' + String(d.service || '').replace(/^URGEN(CIA|T)\s*—\s*/, ''),
        us, new Date(us.getTime() + 60 * 60000),
        { location: d.place || '', description: (d.referred ? 'Referido por: ' + d.referred + '\n\n' : '') + (d.message || '') }
      );
      ue.setColor(CalendarApp.EventColor.RED);
      ue.removeAllReminders();
      ue.addPopupReminder(0);
      MailApp.sendEmail({
        to: props.getProperty('CORREO') || Session.getEffectiveUser().getEmail(),
        subject: 'URGENCIA HOY · ' + d.name + ' · ' + (d.phone || ''),
        body: (d.message || '') + '\n\n— Guardada en Google Calendar como URGENCIA (rojo). Confirme la hora con el paciente.',
      });
      return out({ ok: true });
    }

    var p = String(d.date).split('-').map(Number);
    var hasTime = /^\d{1,2}:\d{2}$/.test(d.time || '');
    var hm = hasTime ? d.time.split(':').map(Number) : [9, 0];
    var start = new Date(p[0], p[1] - 1, p[2], hm[0], hm[1]);
    var end = new Date(start.getTime() + (Number(d.minutes) || 30) * 60000);

    var title = 'Por confirmar · ' + d.name + ' · ' + d.service + (hasTime ? '' : ' (hora a confirmar)');
    var ev = CalendarApp.getDefaultCalendar().createEvent(title, start, end, {
      location: d.place || '',
      description: d.message || '',
    });
    ev.setColor(CalendarApp.EventColor.YELLOW);
    ev.removeAllReminders();
    ev.addPopupReminder(24 * 60); // el día anterior
    var morning = new Date(p[0], p[1] - 1, p[2], Number(props.getProperty('AVISO_HORA') || 7), 0);
    var mins = Math.round((start.getTime() - morning.getTime()) / 60000);
    if (mins > 0) ev.addPopupReminder(mins); // temprano el mismo día

    var mail = {
      to: props.getProperty('CORREO') || Session.getEffectiveUser().getEmail(),
      subject: 'Nueva solicitud de cita · ' + d.name + ' · ' + (d.dateLabel || d.date),
      body: (d.message || '') + '\n\n— Guardada en Google Calendar como "Por confirmar".',
    };
    if (d.email) mail.replyTo = d.email;
    MailApp.sendEmail(mail);

    return out({ ok: true });
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

/** Prueba manual desde el editor: crea un evento de ejemplo para mañana a las 11:30. */
function prueba() {
  var t = new Date(Date.now() + 864e5);
  var date = Utilities.formatDate(t, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var res = doPost({ postData: { contents: JSON.stringify({
    token: PropertiesService.getScriptProperties().getProperty('TOKEN'),
    name: 'Paciente de prueba', service: 'Implantes dentales', place: 'Maxilo Aesthetic Implants, Las Terrenas',
    date: date, time: '11:30', minutes: 30, dateLabel: date, message: 'Solicitud de prueba desde el editor.',
  }) } });
  Logger.log(res.getContent());
}
