/**
 * 📊 FUNCIÓN DE PAGINACIÓN PARA SEQUELIZE
 * 
 * @param {Object} options - Opciones de configuración
 * @param {Sequelize.Model} options.model - Modelo de Sequelize (REQUERIDO)
 * @param {Object} [options.where={}] - Condiciones WHERE ej: { estado: 'activo' }
 * @param {Array} [options.attributes=null] - Atributos a seleccionar ej: ['id', 'nombre']
 * @param {Array} [options.include=[]] - Relaciones a incluir ej: [{ model: User }]
 * @param {Array} [options.order=[['id', 'DESC']]] - Ordenamiento ej: [['nombre', 'ASC']]
 * @param {Number} [options.page=1] - Página actual a consultar
 * 
 * @returns {Object} Respuesta paginada
 * @returns {Array} results - Array de registros
 * @returns {Number} currentPage - Página actual
 * @returns {Number} totalPages - Total de páginas
 * @returns {Number} totalItems - Total de registros
 * 
 * @example
 * // Uso básico
 * const result = await paginate({
 *   model: User,
 *   where: { estado: 'activo' },
 *   page: 2
 * });
 * 
 * @example
 * // Con relaciones y atributos específicos
 * const result = await paginate({
 *   model: Comercio,
 *   include: [{ model: User }],
 *   attributes: ['id', 'nombre_comercio'],
 *   order: [['fecha_creacion', 'DESC']],
 *   page: 1
 * });
 */

const paginate = async ({
    model,
    where = {},
    attributes = null,
    include = [],
    order = [['id', 'DESC']],
    page = 1,
}) => {
    
    page = parseInt(page, 10) || 1;
    limit = 10;

    const offset = (page - 1) * limit;

    const { count, rows } = await model.findAndCountAll({
        where, attributes, include, order, limit, offset,
    });

    const totalPages = Math.ceil(count / limit);

    return {
        results: rows,
        currentPage: page,
        totalPages,
        totalItems: count,
    };
};

module.exports = paginate;
