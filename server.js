const express = require('express');
const app = express();
const bodyParser = require ('body-parser');

/* const alibay = require ('./alibay.js') */

app.use(bodyParser.raw({type: '*/*'}));

let serverState = {
    items:
        {1: {
            itemName: "1996 Honda Toyota",
            description: "nice car, runs well",
            price: 2000,
            sellerId: 1, //bob
            buyerId: 2, //sue
            itemId: 1,
            },
        2: {
            itemName:"nice red boat",
            description:"big floaty boat",
            price: 40000,
            sellerId: 1, //bob
            buyerId: undefined,//available
            itemId: 2
            },
        3: {
            itemName: "nice shoes",
            description: "red ballerina heels",
            price: 300,
            sellerId: 2,//sue
            buyerId: undefined,//jack
            itemId: 3 
            },
        4: {
            itemName: "iphone XII",
            description: "newest iphone available",
            price: 2000,
            sellerId: 3,//jack
            buyerId: 1,//bob
            itemId: 4
        }        
        },
    users: 
    {1: {
        name: "bob",
        password: "pw123",
        itemsforSale:[1, 2], //car, boat
        itemsBought: [4], //phone
        userId:  1
    },
    2: {
        name: "sue",
        password: "123pass",
        itemsforSale: [3], //shoes
        itemsBought: [1], //car
        userId: 2
    },
    3: {
        name: "jack",
        password: "jackjack",
        itemsforSale: [4], //phone
        itemsBought: [3], //shoes
        userId:3
    }

    }    
}
let itemIds = Object.keys(serverState.items); //returns an array of all the items [1,2,3,4]
allItemsArray = itemIds.map((itemId, index) => {return serverState.items[itemId]});//maps the item objects into an array, makes it easier to access the properties
let userIds = Object.keys(serverState.users);//returns an array of all users [1,2,3]
allUsersArray = userIds.map((userId, index) => {return serverState.users[userId]});// maps all user objects into an array



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

app.get('/boughtHistory', (req,res) => {
    let BobsItemsBought = allUsersArray[0].itemsBought.map((itemId, ind)=> {return items[itemId].itemName});//access the names of items bob has bought.
    res.send(JSON.stringify(BobsItemsBought))
    
})

app.get('/soldHistory', (req, res) => {
    let sueSold = allUsersArray[1].itemsforSale.map((itemId, ind) => {return items[itemId].itemName});//access the array of Item names sue has put on sale.
    res.send(JSON.stringify(sueSold))
})

app.get('/allItemsForSale', (req,res) => {
    let itemsForSale = [];
    if(allItemsArray.buyerId === undefined ){
        itemsForSale = allItemsArray.filter(x => x.buyerId === undefined)
    }
    else {
        itemsForSale = allItemsArray.filter(x => x.query.buyerId.toString() === 2 )//this is to see what items a user has for sale by userId
    }
    res.send(JSON.stringify(itemsForSale))
})

app.post('/buyItem', (req,res) => {
    let body = req.body.toString();
    let parsed = JSON.parse(body);
    let sellerId = parsed.sellerId;
    let itemId = parsed.itemId;
    let buyerId = parsed.buyerId;
    res.send('item purchased: ' + itemId)
})

app.post('/sellItem', (req, res) => {
    let body = req.body.toString();
    let parsed = JSON.stringify(body);
    let itemName = parsed.itemName;
    let description = parsed.description;
    let price = parsed.price;
    let sellerId = parsed.sellerId;
    res.send(itemId)
})

app.get('/searchItemForSale', (req, res) => {
    let searchedItems = []
   // let searchParams = query.desc.term
    searchedItems = allItemsArray.filter(
        x => x.description.includes("car"));
    
    res.send(JSON.stringify(searchedItems))
}) 

app.listen(4001, ()=> (console.log("listening on port 4000")))