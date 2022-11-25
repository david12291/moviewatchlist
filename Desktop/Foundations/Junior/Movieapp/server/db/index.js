const Sequelize = require("sequelize");

const dbConnection = new Sequelize(
    "postgres://localhost:5432/moviewatchlist"


);



// usually have own tab for bigger sites for models

const Movie = dbConnection.define("movie", {
    title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imdbLink: {
        type: Sequelize.STRING(1000),
        allowNull: true,
        validate: {
            isURL: true,
        },
    },
    watched: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },

});


const Genre = dbConnection.define("genre", {
    name: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
    }
});

Movie.belongsToMany(Genre, { through: "movies_genres"}); //setGenres 
Genre.belongsToMany(Movie, { through: "movies_genres"});



module.exports = {
    dbConnection : dbConnection,
    Movie: Movie,
    Genre: Genre,
};


// const test = async () => {
//     try {
//     await dbConnection.authenticate();
//     console.log("authenicate worked")

// } catch (e) {
//     console.error(e);
// }
// };
// test();