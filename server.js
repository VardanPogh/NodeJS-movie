const express = require("express");
const cors = require("cors");

const app = express();
const session = require('express-session')

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to scriptofilm test application." });
});

require("./app/routes/auth.routes")(app);

require("./app/routes/user.routes")(app);
require("./app/routes/movie.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
