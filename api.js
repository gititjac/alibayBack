<<<<<<< HEAD
const alibay = require('./alibay')
const express = require('express')
const app = express()

app.get('/itemsBought', (req, res) => {
    let uid = req.query.userId;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});

app.post('/signup', (req, res) =>{
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let username = parsed.username;
    let password = parsed.password;
    
    if (username.length > 0 && password.length > 5) {
        res.send('your userid is: ' + (Math.ceil(Math.random()*100000))) //generate userid here?
    }
    else {
        res.send('password too short')
    }
})

app.post('/login',(req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let username = parsed.username;
    let password = parsed.password;
    if (username === "bob" && password === "pw123") {
        res.send('login successful')
    }
    else {
        res.send('invalid username or password')
    }
})

app.listen(3000, () => console.log('Listening on port 3000!'))
=======
const alibay = require('./alibay')
const express = require('express')
const app = express()

app.get('/itemsBought', (req, res) => {
    let uid = req.query.uid;
    res.send(JSON.stringify(alibay.getItemsBought(uid)));
});

app.post('/signup', (req, res) =>{
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let username = parsed.username;
    let password = parsed.password;
    
    if (username.length > 0 && password.length > 5) {
        res.send('your userid is: ' + (Math.ceil(Math.random()*100000))) //generate userid here?
    }
    else {
        res.send('password too short')
    }
})

app.post('/login',(req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let username = parsed.username;
    let password = parsed.password;
    if (username === "bob" && password === "pw123") {
        res.send('login successful')
    }
    else {
        res.send('invalid username or password')
    }
})

app.listen(3000, () => console.log('Listening on port 3000!'))
>>>>>>> 4730f48a1065ebcfd8ca488c4b2e9d943345ba49
