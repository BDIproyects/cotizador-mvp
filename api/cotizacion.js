const sgMail = require('@sendgrid/mail');

// SendGrid API Key será inyectada por Vercel (Variable de Entorno)
sgMail.setApiKey(process.env.SENDGRID_API_KEY); 

// Función de formato de moneda (independiente del frontend)
const formatPEN = (num) => new Intl.NumberFormat('es-PE', { 
    style: 'currency', 
    currency: 'PEN', 
    minimumFractionDigits: 2 
}).format(num);

module.exports = async (req, res) => {
  // Configuración de CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST') {
    return res.status(405).send({ success: false, message: 'Solo se permiten peticiones POST.' });
  }

  const lead = req.body;

  if (!lead || !lead.email) {
    return res.status(400).send({ success: false, message: 'Faltan datos requeridos.' });
  }
  
  const { email, metrosCuadrados, tipoMaterial, nivelUrgencia, rangoMin, rangoMax } = lead;
  const rangoPrecio = `${formatPEN(rangoMin)} - ${formatPEN(rangoMax)}`;

  // 1. Definición del Contenido del Email
  const msg = {
    to: email, 
    from: 'rosecasas1606@gmail.com',
    subject: `✅ Tu Cotización Rápida ha sido calculada (${metrosCuadrados} m²)`,
    html: `
        <h2>¡Hola! Aquí está tu presupuesto rápido de ${metrosCuadrados} m².</h2>
        <p>Gracias por usar nuestra calculadora. Aquí está el resumen de tu cotización:</p>
        <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
            <tr><td style="background-color: #f0f0f0;">Tamaño del Proyecto:</td><td><strong>${metrosCuadrados} m²</strong></td></tr>
            <tr><td style="background-color: #f0f0f0;">Tipo de Material:</td><td><strong>${tipoMaterial}</strong></td></tr>
            <tr><td style="background-color: #f0f0f0;">Nivel de Urgencia:</td><td><strong>${nivelUrgencia}</strong></td></tr>
            <tr><td style="background-color: #f0f0f0;">Rango de Precio Estimado:</td><td><strong style="color: #4285F4; font-size: 1.2em;">${rangoPrecio}</strong></td></tr>
        </table>
        <p style="margin-top: 20px;">Nos pondremos en contacto contigo en las próximas 24 horas para afinar los detalles. ¡Tu proyecto es nuestra prioridad!</p>
        <p>Puedes contactarnos directamente por WhatsApp: <a href="https://wa.me/51976908412">976908412</a></p>
    `,
  };

  try {
    await sgMail.send(msg);

    console.log('--------------------------------------------------');
    console.log(`✅ LEAD CAPTURADO Y EMAIL ENVIADO a: ${email}`);
    console.log('--------------------------------------------------');

    res.status(200).send({ 
      success: true,
      message: 'Cotización recibida, lead registrado, y email enviado con éxito.'
    });

  } catch (error) {
    console.error('⚠️ Error al enviar el email con SendGrid:', error.message);
    
    res.status(200).send({ 
      success: true, 
      message: 'Lead capturado, pero hubo un error con el envío del email.'
    });
  }
};