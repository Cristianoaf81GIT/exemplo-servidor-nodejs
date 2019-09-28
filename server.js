/* global __dirname */

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const protocol = 'http://';
const host = '127.0.0.1';
// const port = 3000; original
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// helper para ano corrente como global
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
// helper para letras maiusculas
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.listen(port, host, ()=>{
    //console.log(protocol+host+':'+port);
    console.log(`Servidor em ${port}`);
    console.log('CTRL+C para parar!');
});


app.get('/', (request, response)=>{
    //response.send('<h1>Olá Express</h1>');
    /*response.send({
        nome:'Cristiano',
        hobbies:['dormir',
            'comer'
        ]
    });*/
    const data = {
        pageTitle:'Página Home',
        welcomeMessage:'Bem Vindo(a)'        
    };
    response.render('home.hbs',data);
    
});

app.get('/about', (request, response)=>{
    response.render('about.hbs',{
        pageTitle: 'Duvidas?'        
    });
});

app.get('/bad', (request, response)=>{
    response.send({errorMessage:'não foi possível atender a requisição'});
});

app.use((request, response, next)=>{
    var now = new Date().toString();
    var log = `${now}:${request.method} ${request.url}`;
    console.log( log ); 
    fs.appendFile( 'server.log', log + '\n', ( exception ) => {
        
        if ( exception )
            console.log( 'não foi possível acrescentar dados ao log' );
        
    });
    next();
});

app.use( ( request, response, next ) => {
    response.render('maintenance.hbs');
} );

app.use(express.static(__dirname + '/public'));