const db = require("../models");
const User = db.users;


exports.login = async (req, res) => {
    const username = req.body.username;
    try {
        if (!username) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({where: {username}});

        if (user) {
            res.send(user.id)
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.error(err)
    }
};