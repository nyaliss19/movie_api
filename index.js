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
        name: "Kim",
        favoriteMovies: []
    },
    {
        id: 2,
        name: "Jamie",
        favoriteMovies: ["The Matrix"]
    },
]

let movies = [
    {
        title: 'The Matrix',
        year: '1999',
        director: 'The Wachowskis',
        genre: 'action'
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
        genre: 'fantasy'
    },
    {
        title: 'Chronicles of Riddick',
        year: '2004',
        director: 'David Twohy',
        genre: 'action'
    },
    {
        title: 'Lady and the Tramp',
        year: '1955',
        director: 'Clyde Geronimi, Wilfred Jackson, and Hamilton Luske',
        genre: 'romance'
    },
    {
        title: 'Annihilation',
        year: '2018',
        director: 'Alex Garland',
        genre: 'sci-fi'
    },
    {
        title: 'Arrival',
        year: '2016',
        director: 'Denis Villeneuve',
        genre: 'sci-fi'
    },
    {
        title: 'The Matrix Resurrections',
        year: '2021',
        director: 'Lana Wachowski',
        genre: 'action'
    },
    {
        title: 'Speed',
        year: '1994',
        director: 'Jan de Bont',
        genre: 'action'
    },
    {
        title: 'Twin Peaks: Fire Walk With Me',
        year: '1992',
        director: 'David Lynch',
        genre: 'psychological thriller'
    },
];


//Middleware


//create
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need names')
    }
})

//update
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id );

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

//create
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id} array`);
    } else {
        res.status(400).send('no such user')
    }
})

//delete
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id );

    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id} array`);
    } else {
        res.status(400).send('no such user')
    }
})

//delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id != id );

    if (user) {
        users = users.filter( user => user.id !== id );
        res.status(200).send(`user ${id} has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

//read
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
})

//read
app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }

})

//read
app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find( movie => movie.genre === genreName ).genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }

})

//read
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find( movie => movie.director === directorName ).director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director');
    }

})


//error handling
const  methodOverride = require('method-override');

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