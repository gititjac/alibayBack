const express = require('express');
const app = express;
const bodyParser = require ('body-parser');

app.use(bodyParser.raw({type: '*/*'}));

let serverState = {
    items:[],
    userIds:[],
    passwords:[]

}

app.post('/signup', (req, res) => {
    let body=req.body.toString();
    let parsed = JSON.parse(body);
}) 

app.post('/login',(req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    //let username = parsed.username;
    //let password = parsed.password
})

app.get('/boughtHistory', (req,res) => {
    res.send(JSON.stringify(serverState.items))//details to be added
})

app.get('/soldHistory', (req, res) => {
    res.send(JSON.stringify(serverState.items))//details to be added
})

app.get('/allItemsForSale', (req,res) => {
    res.send(JSON.stringify(serverState.items))//details to be added
})

app.post('/buyItem', (req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    //let sellerId = parsed.sellerId;
    //let itemId = parsed.itemId;
    //let buyerId=parsed.buyerId;
})

app.post('/sellItem', (req, res) => {
    let body = req.body.toString();
    let parsed = JSON.stringify(body);
    //let itemName = parsed.itemName;
    //let description = parsed.description;
    //let price = parsed.price;
    //let sellerId = parsed.sellerId;
})

app.get('/searchItem', (req, res) => {
    res.send(JSON.stringify(serverState.items))//details to be added
})