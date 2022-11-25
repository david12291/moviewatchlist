const express = require("express");
const app = express();

const PORT = 8080;

const { dbConnection } = require("./db");
const genresRouter = require("./routes/genre");
const moviesRouter = require("./routes/movie");


const startServer = async () => {
    await dbConnection.sync({force: false});
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}!~`);
    });
}
startServer();

//matches any url for a get request to a possible file 
// in public directory 
app.use(express.static(__dirname + "/public"))

// Start of all middleware

app.use(express.json());
app.use(express.urlencoded({ extended:false} ));
app.use("/genre", genresRouter);
app.use("/movies", moviesRouter);

app.get("/", (req, res) => {
    res.send("Hellllo =]");
});