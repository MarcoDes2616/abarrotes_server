const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Shop = sequelize.define(
  "comercios",
  {
    nombre_comercio: {
      type: DataTypes.STRING,
      allowNull: false
    },
    razon_social: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rfc: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    giro: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo', 'pendiente_verificacion'),
      defaultValue: 'pendiente_verificacion'
    }
  },
  {
    timestamps: true,
    createdAt: 'fecha_registro',
    updatedAt: 'fecha_actualizacion'
  }
);

module.exports = Shop;