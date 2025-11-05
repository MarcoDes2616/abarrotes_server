const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ShopCode = sequelize.define(
  "codigos_comercio",
  {
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    estado: {
      type: DataTypes.ENUM('disponible', 'asignado', 'inactivo'),
      defaultValue: 'disponible'
    },
    fecha_asignacion: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  }
);

module.exports = ShopCode;