const db = require("../models");
const {Rating, Movie, User} = db.rating;


exports.create = async (req, res) => {

    // Validate request
    const userId = req.body.userId;
    const movieId = req.body.movieId;

    if (!userId) {
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
        rate: req.body.rate,
        movieId,
        userId
    }
    // Save or Update rating in the database
    Rating.upsert(data, {where: {rateId: req.body.rateId}})
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

exports.delete = async (req, res) => {
    const id = req.query.id;

    await Rating.destroy({where: {id: id}})
        .then(num => {
            if (num == 1) {
                res.send({message: 'rating was deleted successfully'})
            } else {
                res.send({
                     message: 'Please check parameters'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete the rating"
            })
        })}