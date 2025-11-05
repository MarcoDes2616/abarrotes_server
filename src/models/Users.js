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
    resetCode: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    passwordChangeAt: {
      type: DataTypes.INTEGER,
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

Users.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password_hash;
  delete values.createdAt;
  delete values.resetCode;
  delete values.passwordChangeAt;  
  return values;
};

Users.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = Users;