module.exports = (sequelize, Sequelize) => {
  sequelize.Movie = sequelize.define("movies", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: Sequelize.STRING,
    userId: Sequelize.INTEGER,
  });
};
