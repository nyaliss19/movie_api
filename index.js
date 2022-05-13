const express = require('express'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(morgan('combined', {stream: accessLogStream}));

let movies = [
    {
        title: 'The Matrix',
        year: '1999'
    },
    {
        title: 'Awakenings',
        year: '1990'
    },
    {
        title: 'Pans Labyrinth',
        year: '2006'
    },
    {
        title: 'Chronicles of Riddick',
        year: '2004'
    },
    {
        title: 'Lady and the Tramp',
        year: '1955'
    },
    {
        title: 'Annihilation',
        year: '2018'
    },
    {
        title: 'Arrival',
        year: '2016'
    },
    {
        title: 'The Matrix Resurrections',
        year: '2021'
    },
    {
        title: 'Speed',
        year: '1994'
    },
    {
        title: 'Twin Peaks: Fire Walk With Me',
        year: '1992'
    },
];

//Middleware


//GET requests

app.use(express.static('public'));

app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params;
    const movie = movies.find( movie => movie.title === title );

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie');
    }

});

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