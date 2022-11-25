const { application } = require("express");
const express = require("express");
const router = express.Router();


module.exports = router;

const { Movie, Genre } = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const movies = await Movie.findAll({
            include: [Genre],
            order: [
                ["title", "ASC"]
            ]
        });
        res.send(
            ` 
            <!DOCTYPE html>
            <html>
                <head><title>Movie List</title></head>
                <body>
                    <h1>Movie List</h1>
                    <ul>
                        ${movies.map((movie) => {
                            return `
                                <li>
                                    <h2>${movie.title}</h2>
                                    ${movie.imdbLink ? `<a target="_blank" href="${movie.imdbLink}">IMBD</a>` : ""}
                                        
                                            <ul>
                                            ${movie.genres.map(genre => {
                    return `<li>${genre.name}</li>`;

                }).join("")}
                                            </ul>
                                        </li>
                                        `
            }).join("")}
                                </ul>
                            </body>
                        </html>
            
                    `)
    } catch (e) {

    }
   
});

// GET/movie 
//respond with HTML text to be rendered by the browser 
//show a form 

router.get("/add-movie", async (req, res) => {

    // res.sendFile(__dirname + "/views/movie-form.html");
    const allOfMyGenres = await Genre.findAll();
    res.send(`
            < !DOCTYPE html >
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Add a movie to your watchlist</title>
                                </head>
                                <body>
                                    <h1>Add Movie 🎥 </h1>
                                    <form method="POST" action="/movies">
                                        <div>
                                            <label for="">Title:</label>
                                            <input type="text" name="title">
                                        </div>
                                        <div>
                                            <label for="">IMBD link:</label>
                                            <input type="text" name="link" placeholder="Optional">
                                        </div>
                                        <div id="genre-selects-container">
                                            <div id="genre-selects-container">
                                                <select id="genre-select" name="genres" id="">
                                                    <option value=""></option>
                                                    ${allOfMyGenres.map(genre => {
                                                        return `<option value="${genre.id}">${genre.name}</option>`
                                                    }).join("")
                                                    }
                                                </select>
                                            </div>
                                            <button type="button" id="add-button">+</button>
                                        </div>
                                        <button type="submit">Add Movie</button>
                                    </form>
                                    <script type="text/javascript" src="/movie-form.js"></script>
                                </body>
                            </html>
                            `)
});

//Post/ gmovies

router.post("/", async (req, res, next) => {
    const title = req.body.title;
                            const imdbLink = req.body.link;
                            const attachedGenreIds = req.body.genres;


                            try {
        const newMovie = await Movie.create({
                                title: title,
                            imdbLink: imdbLink || null
        });
                            await newMovie.setGenres(attachedGenreIds); //line48 index.js
                            res.redirect("/movies");
    } catch (e) {
                                next(e);
    }

});

