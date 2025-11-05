const sendTokenToRegistrationEmail = (token) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Registro Temporal</h2>
        <p>Utiliza el siguiente código para completar tu registro:</p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <strong style="font-size: 24px; letter-spacing: 3px; color: #000; font-weight: bold;">${token}</strong>
        </div>
        <p>Este código es válido por <strong>30 minutos</strong>.</p>
        <p style="font-size: 12px; color: #777;">Si no solicitaste este registro, por favor ignora este mensaje.</p>
      </div>
    `;
};

const generateWelcomeEmail = (nombre) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">¡Bienvenido a Distribuidor de Abarrotes!</h2>
      <p>Hola <strong>${nombre}</strong>,</p>
      <p>Tu registro se ha completado exitosamente. Ahora puedes acceder a todas las funcionalidades de nuestra plataforma.</p>
      
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #28a745;">¿Qué puedes hacer ahora?</h3>
        <ul>
          <li>Gestionar tus comercios</li>
          <li>Asignar códigos a tus tiendas</li>
          <li>Monitorear tu presencia en línea</li>
        </ul>
      </div>
      
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p style="color: #666; font-size: 14px;">El equipo de Distribuidor de Abarrotes</p>
    </div>
  `;
};

module.exports = { sendTokenToRegistrationEmail, generateWelcomeEmail };
