const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();


app.use(bodyParser.urlencoded({extended : true}));




app.get("/", function(req,res){
    res.sendFile(__dirname+ "/index.html");

   
    
})
app.post("/", function(req,res){
    
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=e758dc1bac0f38668f877472d4ec628b&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const des = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/"+ icon+ "@2x.png"

            res.write("<h1>Temperature in "+query+" is "+ temp + " degree celcius</h1>" )
            res.write ("<p>The weather condition is " + des + "</p>")
            res.write("<img src="+ imageURL +">")

            res.send()
        })

    })
})
app.listen(3000);
