const alibay = require('./alibay')
const express = require('express')
const app = express()
const bodyParser = require ('body-parser');
var fs = require('fs');


app.use(bodyParser.raw({type: '*/*', limit: '20mb'}));

// express.static is built-in middleware that express uses to serve files and images
app.use(express.static('images'))

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

app.get('/soldHistory', (req, res) => {
    userId = req.query.userId;
    res.send(JSON.stringify(alibay.getItemsSold(userId)))
    }
)

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
    let itemUrl = parsed.itemUrl;
    res.send(JSON.stringify(alibay.createListing(itemName, sellerId, price, description, itemUrl)))
    }
)

// endpoint for image upload
app.post('/upics', (req, res) => {
    var extension = req.query.ext.split('.').pop();
    var randomString = '' +  Math.floor(Math.random() * 10000000)
    var randomFilename = randomString + '.' + extension
    fs.writeFileSync('images/' +  randomFilename, req.body);
    res.send(randomFilename)
    }
)

app.get('/searchItemForSale', (req, res) => {
    // MISTAKE: searchterm will alreays return undefined req.query.searchTerm
    // In the future everything should be lowercased when dealing with searches
    searchTerm = req.query.search
    res.send(JSON.stringify(alibay.searchForListings(searchTerm)))
    }
) 

app.get('/getItem', (req, res) => {
    itemId = req.query.itemId;
    res.send(JSON.stringify(alibay.getItem(itemId))) 
    }
)


app.listen(4001, () => console.log('Listening on port 4001!'))
