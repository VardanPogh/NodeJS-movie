module.exports = (sequelize, Sequelize) => {
    sequelize.Rating = sequelize.define("rating", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {type: Sequelize.INTEGER, allowNull: false},
            movieId: {type: Sequelize.INTEGER, allowNull: false},

        },
        {
            sequelize,
            tableName: 'rating',
            timestamps: false,
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{name: 'id'}]
                },
                {
                    name: 'idx_userId_movieId',
                    unique: true,
                    using: 'BTREE',
                    fields: [{name: 'movieId'}, {name: 'userID'}]
                }
            ]
        }
    );
};
