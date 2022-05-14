const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    uuid = require('uuid'),
    bodyParser = require('body-parser');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.static('public'));
app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Willow",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Jamie",
        favoriteMovies: []
    },
]

let movies = [
    {
        title: 'The Matrix',
        year: '1999',
        director: 'The Wachowskis',
        genre: 'action/sci-fi'
    },
    {
        title: 'Awakenings',
        year: '1990',
        director: 'Penny Marshall',
        genre: 'drama'
    },
    {
        title: 'Pans Labyrinth',
        year: '2006',
        director: 'Guillermo del Toro',
        genre: 'fantasy/drama'
    },
    {
        title: 'Chronicles of Riddick',
        year: '2004',
        director: 'David Twohy',
        genre: 'action/sci-fi'
    },
    {
        title: 'Lady and the Tramp',
        year: '1955',
        director: 'Clyde Geronimi, Wilfred Jackson, and Hamilton Luske',
        genre: 'animated/romance'
    },
    {
        title: 'Annihilation',
        year: '2018',
        director: 'Alex Garland',
        genre: 'sci-fi/horror'
    },
    {
        title: 'Arrival',
        year: '2016',
        director: 'Denis Villeneuve',
        genre: 'sci-fi/thriller'
    },
    {
        title: 'The Matrix Resurrections',
        year: '2021',
        director: 'Lana Wachowski',
        genre: 'action/sci-fi'
    },
    {
        title: 'Speed',
        year: '1994',
        director: 'Jan de Bont',
        genre: 'action/thriller'
    },
    {
        title: 'Twin Peaks: Fire Walk With Me',
        year: '1992',
        director: 'David Lynch',
        genre: 'psychological thriller'
    },
];

//Middleware


//GET requests

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }

})

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre === genreName ).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }

})

//error handling
const bodyParser = require('body-parser'),
    methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});