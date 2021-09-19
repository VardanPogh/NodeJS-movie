module.exports = app => {
  const users = require("../controllers/user.controller.js");

  const router = require("express").Router();

  router.post("/", users.create);

  app.use('/api/users', router);
};
