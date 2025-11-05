const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Users = sequelize.define(
  "users",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'comercio', 'cliente'),
      defaultValue: 'cliente'
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('activo', 'inactivo', 'pendiente'),
      defaultValue: 'pendiente'
    }
  },
  {
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
  }
);

module.exports = Users;