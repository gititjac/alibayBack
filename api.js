const alibay = require('./alibay')
const express = require('express')
const app = express()
const bodyParser = require ('body-parser');


app.use(bodyParser.raw({type: '*/*'}));

app.post('/signup', (req, res) =>{
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let username = parsed.username;
    let password = parsed.password;
    
    let userID = alibay.signup(username, password)
    res.send(JSON.stringify(userID))
    }
)

app.post('/login',(req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let username = parsed.username;
    let password = parsed.password;
    
    let userID = alibay.login(username, password);
    res.send(JSON.stringify(userID))

    }
)

app.get('/boughtHistory', (req,res) => {
    userId = req.query.userId;
    res.send(JSON.stringify(alibay.getItemsBought(userId)))
    
    }
)

<<<<<<< HEAD
app.listen(3000, () => console.log('Listening on port 3000!'))
const alibay = require('./alibay')
const express = require('express')
const app = express()
=======
app.get('/soldHistory', (req, res) => {
    userId = req.query.userId;
    res.send(JSON.stringify(alibay.getItemsSold(userId)))
    }
)
>>>>>>> 2826dea62727d92bff9ecf812aba295bab4eccd1

app.get('/allItemsForSale', (req,res) => {
    let allItems = alibay.allListings();
    res.send(JSON.stringify(allItems))
    }
)

app.post('/buyItem', (req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let sellerId = parsed.sellerId;
    let itemId = parsed.itemId;
    let buyerId = parsed.buyerId;

    res.send(JSON.stringify(alibay.buy(buyerId, sellerId, itemId)))
    }
)

app.post('/sellItem', (req, res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let itemName = parsed.itemName;
    let description = parsed.description;
    let price = parsed.price;
    let sellerId = parsed.sellerId;
    res.send(JSON.stringify(alibay.createListing(itemName, sellerId, price, description)))
    }
)

app.get('/searchItemForSale', (req, res) => {
        
    res.send(JSON.stringify(alibay.searchForListings(searchTerm)))
    }
) 

app.get('/getItem', (req, res) => {
    itemId = req.query.itemId;
    res.send(JSON.stringify(alibay.getItem(itemId)))
    }
)


<<<<<<< HEAD
app.listen(3000, () => console.log('Listening on port 3000!'))
=======
app.listen(3001, () => console.log('Listening on port 3000!'))
>>>>>>> 2826dea62727d92bff9ecf812aba295bab4eccd1
