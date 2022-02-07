"use strict"

var express = require('express')
const bodyParser = require("body-parser");
var path = require('path');
const { sendStatus } = require('express/lib/response');
var app = express()

app.listen(3000)
console.log('Node.js Express server is running on part 3000...')

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Verify token, adding variables:
app.get('/v1/weather', get_weather)


function get_weather(request, response)
{
    const bearHeader = request.headers['authorization'];
    console.log(bearHeader);
    // const bearer = bearHeader.split(' ')[1];
    console.log(bearHeader.split('  '))
    const bearerToken = bearHeader.split(' ')[0]
    // console.log('this is my bearer:', bearer);
    console.log('my bearerToken: ', bearerToken);
    if (is_valid_token(bearerToken)) {
        response.json(
            { "coord": { "lon": -123.262, "lat": 44.5646 }, "weather": [{ "id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d" }], "base": "stations", "main": { "temp": 278.05, "feels_like": 278.05, "temp_min": 276.45, "temp_max": 279.76, "pressure": 1032, "humidity": 66 }, "visibility": 10000, "wind": { "speed": 0.45, "deg": 113, "gust": 0.89 }, "clouds": { "all": 59 }, "dt": 1642789417, "sys": { "type": 2, "id": 2040223, "country": "US", "sunrise": 1642779731, "sunset": 1642813576 }, "timezone": -28800, "id": 5720727, "name": "Corvallis", "cod": 200 })

    } else {
        return response.sendStatus(401);
    }
    
}

// Adding variables just like /v1/weather
app.get('/v1/hello', hello)

// If the request is correct, response with message:
function hello(request, response) {
    const bearHeader = request.headers['authorization'];
    console.log(bearHeader);
    // const bearer = bearHeader.split(' ')[1];
    console.log(bearHeader.split('  '))
    const bearerToken = bearHeader.split(' ')[0]
    // console.log('this is my bearer:', bearer);
    console.log('my bearerToken: ', bearerToken);
    if (is_valid_token(bearerToken)) {
        response.json
        ( 
            {"message": "Hello from Ricardo"} 
        )
    }
    else{
        return response.sendStatus(401);
    }
   
}

app.post('/v1/auth', authorization)
function authorization(request, response)
{
    var username = request.body.username;
    var password = request.body.password;
    // response.send(request.body);
    console.log('body is ', request.body);
    response.json({
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmljYXJkbyBXdSIsImV4cGlyZWQgZGF0ZSI6IkZlYi4gMjR0aCwgMjAyMi4ifQ.n_3i2eW-C8CRNOpdx5qkzBIMUb7O_Z4EPPZmDL-Jlgk" + username,
        "expire": "2022-02-24T14:14:30:000Z"
    })
}

// A function to verify mock token here:
function is_valid_token(bearerToken) {
   
    if (bearerToken === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmljYXJkbyBXdSIsImV4cGlyZWQgZGF0ZSI6IkZlYi4gMjR0aCwgMjAyMi4ifQ.n_3i2eW-C8CRNOpdx5qkzBIMUb7O_Z4EPPZmDL-Jlgk"){
        console.log("correct");
        return true
    }
    else{
        console.log("incorrect");
        return false
    }
}

// 3rd PR: Verifying mock token