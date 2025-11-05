const User = require('./user');
const Shops = require('./shop');
const ShopCode = require('./ShopCode');

const initModels = () => {
    // USER 1:N SHOP (Un usuario puede tener múltiples comercios)
    User.hasMany(Shops, { foreignKey: 'user_id' });
    Shops.belongsTo(User, { foreignKey: 'user_id' });

    // SHOP 1:1 SHOPCODE (Un comercio tiene un código asignado)
    Shops.hasOne(ShopCode, { foreignKey: 'comercio_id' });
    ShopCode.belongsTo(Shops, { foreignKey: 'comercio_id' });
};

module.exports = initModels;