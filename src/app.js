// core node modules
const path = require('path')

// npm packages
const express = require('express')
const hbs = require('hbs')

const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jeffrey Kaplan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jeffrey Kaplan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jeffrey Kaplan',
        message: 'Get you some help.'
    })    
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                userInput: req.query.address
            })
        })
    })

    
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help article not found',
        errorMessage: 'No such help article exists. Please return to our main help section',
        name: 'Jeffrey Kaplan'
    })
})

// '*' is wildcard character -- it will catch anything that hasnt rendered above
app.get('*', (req,res) => {
    res.render('404', {
        title: '404: Page not found',
        errorMessage: 'The specified url does not exist',
        name: 'Jeffrey Kaplan'
    })
})

// start the server up
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
