const express = require('express');
const app = express();

let topMovies = [
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

//GET requests

app.get('/', (req, res) => {
    res.send('Here are my favorite movies!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname});

});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});

