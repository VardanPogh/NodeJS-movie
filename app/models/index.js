const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.movies = require("./movie.model.js")(sequelize, Sequelize);
db.rating = require("./rating.model")(sequelize, Sequelize);

sequelize.User.hasMany(sequelize.Movie, {foreignKey: 'userId'});

sequelize.Movie.belongsTo(sequelize.User, {foreignKey: 'userId'});

sequelize.Rating.belongsTo(sequelize.User, {foreignKey: 'userId'});
sequelize.Rating.belongsTo(sequelize.Movie, {foreignKey: 'movieId'});


module.exports = db;
