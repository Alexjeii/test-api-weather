const express = require('express')
const app = express()
const https = require('https')
const bodyParse = require('body-parser')
const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use(bodyParse.urlencoded({extended: false}))

app.get('/', (req,res) => {
    res.render('index', {})
})


app.post('/', (req, res) => {
    const ville = req.body.ville
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ville+'&appid=55c2b88febccd0fac05fdf3f93a0fcf7&units=metric'
    https.get(url, (response)  => {response.on("data", (data) => { 
        const tableau_weather = []
        const meteo_data = JSON.parse(data) 
        const meteo = {
            city: ville,
            temperature: meteo_data.main.temp,
            description: meteo_data.weather[0].description,
            icon: meteo_data.weather[0].icon
        }

           tableau_weather.push(meteo)
           res.render('weather', { tableau:tableau_weather })
        })
    })
})



app.listen(3000, () => {
    console.log('le serveur est lancé')
})