const db = require("../models");
const Movie = db.movies;
const User = db.users;

exports.index = (req, res) => {
    Movie.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving users'
            })
        });
};

// Create and Save a new movie
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.userId) {
        res.status(400).send({
            message: "Please login!"
        });
        return;
    }

    const user = await User.findOne({where: {id: req.body.userId}});

    if (!user) {
        res.status(400).send({
            message: "Invalid user!"
        });
        return;
    }

    if (!req.body.title) {
        res.status(400).send({
            message: "Please fill title"
        });
        return;
    }

    const movie = {
        userId: req.body.userId,
        title: req.body.title,
    };

    // Save movie in the database
    Movie.create(movie)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });
        });
};

// send movie by id
exports.show = async (req, res) => {
    const id = req.query.id;
    if (!id) {
        res.status(400).send({
            message: "Movie doesn't exist"
        });
        return;
    }
    const movie = await Movie.findByPk(id);
    res.send(movie);

};

// update movie
exports.update = async (req, res) => {
    const userId = req.body.userId;
    const movieId = req.body.movieId;

    if (!req.body.userId) {
        res.status(400).send({
            message: "Please login!"
        });
        return;
    }

    const user = await User.findOne({where: {id: req.body.userId}});

    const movie = await Movie.findByPk(movieId);

    if (!movie || !user || movieId.userId !== user.id) {
        res.status(400).send({
            message: "Invalid parameters"
        });
        return;
    }

    const data = {
        title: req.body.title,
    };

    await Movie.update(data, {where: {id: movieId} })
        .then(num => {
            if (num == 1) {
                res.send({message: 'movie was updated successfully'})
            } else {
                res.send({
                    message: 'Please check parameters'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not update the movie"
            })
        })
};

exports.delete = async (req, res) => {
    const id = req.query.id;

    await Movie.destroy({where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({message: 'movie was deleted successfully'})
            } else {
                res.send({
                    message: 'Please check parameters'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the movie"
            })
        })}