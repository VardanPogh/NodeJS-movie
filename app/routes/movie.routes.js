module.exports = app => {
  const movies = require("../controllers/movie.controller.js");

  const router = require("express").Router();

  router.get("/", movies.index);
  router.post("/", movies.create);

  app.use('/api/movies', router);
};
