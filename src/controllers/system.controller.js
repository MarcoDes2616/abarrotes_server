const catchError = require("../utils/catchError");
const Users = require("../models/Users");
require("dotenv").config();
const sendEmail = require("../utils/sendMail");
const TemporaryRegister = require("../models/TemporaryRegister");

const {
  sendTokenToRegistrationEmail,
  generateWelcomeEmail,
} = require("../utils/emailsTemplates");
const { generateCryptoToken } = require("../utils/functions")


//ENDPOINT SYSTEM 1 -- CREAR REGISTRO TEMPORAL Y ENVIAR EMAIL CON TOKEN
const createTemporaryRegister = catchError(async (req, res) => {
  const { email } = req.body;

  const existingTemporary = await TemporaryRegister.findOne({
    where: { email },
  });

  if (existingTemporary) {
    const newToken = generateCryptoToken();
    await existingTemporary.update({
      registration_token: newToken,
      updatedAt: new Date(),
    });

    await sendEmail({
      to: email,
      subject: "Registro temporal - Tu token de acceso",
      html: sendTokenToRegistrationEmail(newToken),
    });

    return res.status(200).json({
      success: true,
      message:
        "Registro temporal creado. Revisa tu email para el token de acceso.",
      temporaryRegisterId: existingTemporary.id,
    });
  }

  // flujo regular: no existe registro temporal previo
  const existingUser = await Users.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "El email ya está registrado",
    });
  }

  const registration_token = generateCryptoToken();
  const temporaryRegister = await TemporaryRegister.create({
    email,
    registration_token,
  });

  await sendEmail({
    to: email,
    subject: "Registro temporal - Tu token de acceso",
    html: sendTokenToRegistrationEmail(registration_token),
  });

  res.status(200).json({
    success: true,
    message:
      "Registro temporal creado. Revisa tu email para el token de acceso.",
    temporaryRegisterId: temporaryRegister.id,
  });
});

// ENDPOINT SYSTEM 1.5 -- VERIFICAR TOKEN
const verifyEmail = catchError(async (req, res) => {
  const { temporaryRegisterId, registration_token } = req.body;

  // Buscar el registro temporal
  const tempRegister = await TemporaryRegister.findByPk(temporaryRegisterId);
  if (!tempRegister) {
    return res.status(404).json({
      success: false,
      message: "Registro temporal no encontrado",
    });
  }

  // Verificar si el token coincide
  if (tempRegister.registration_token !== registration_token) {
    return res.status(400).json({
      success: false,
      message: "Token de verificación incorrecto",
    });
  }

  // Marcar el registro como verificado
  await tempRegister.update({
    is_verified: true,
  });

  res.status(200).json({
    success: true,
    message:
      "Email verificado correctamente. Puedes continuar con el registro.",
    email: tempRegister.email,
  });
});

// ENDPOINT SYSTEM 1.7 -- COMPLETAR REGISTRO DE USUARIO
const completeRegistration = catchError(async (req, res) => {
  const {
    temporaryRegisterId,
    nombre,
    password,
    telefono,
    role = 'cliente'
  } = req.body;

  // Buscar el registro temporal verificado
  const tempRegister = await TemporaryRegister.findOne({
    where: {
      id: temporaryRegisterId,
      is_verified: true,
    },
  });

  if (!tempRegister) {
    return res.status(404).json({
      success: false,
      message: "Registro temporal no encontrado o email no verificado",
    });
  }

  // Crear usuario en la tabla Users (con todos los campos de tu modelo)
  const user = await Users.create({
    nombre,
    email: tempRegister.email,
    telefono: telefono || null,
    password_hash: password,
    role: role,
    estado: 'pendiente',
  });

  // Eliminar el registro temporal
  await tempRegister.destroy();

  // Enviar email de bienvenida
  await sendEmail({
    to: user.email,
    subject: "¡Bienvenido a Distribuidor de Abarrotes!",
    html: generateWelcomeEmail(user.nombre),
  });

  res.status(201).json({
    success: true,
    message: "Registro completado exitosamente",
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      role: user.role,
      estado: user.estado
    },
  });
});

module.exports = {
  createTemporaryRegister,
  verifyEmail,
  completeRegistration,
};
