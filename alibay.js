
const assert = require('assert');
const sha256 = require('sha256');
const fs = require('fs');


/* let ItemsBought = function (itemsBought) {
    return fs.writeFileSync('./itemsBought.json', JSON.stringify(itemsBought))
}

let getItemsBought = function () {
   return fs.readFileSync('./itemsBought', )
} */

//let itemsBought = {}; // map that keeps track of all the items a user has bought
let itemsBought = JSON.parse(fs.readFileSync('data/itemsBought.json'))
//let users = {}; //map that keeps track of all the users
let users = JSON.parse(fs.readFileSync('data/userList.json'))
//let itemsSold = {};//map that keeps track of all items sold
let itemsSold = JSON.parse(fs.readFileSync('data/itemsSold.json'))
//let allItems = {};//map that keeps track of all items
let allItems = JSON.parse(fs.readFileSync('data/allItems.json'))
let itemIds = Object.keys(allItems).filter((item) => {
    if (allItems[item].itemName) {
        return { success: true }
    }
    else { return { success: false } }
});

/*
Use this function to generate a new UID every time a user creates an account.
*/
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

//signup function takes a username and password, which must be more than 5 characters. The userId is generated using the genUID() function and
//the user is then stored in the users object.
function signup(username, pass) {
    if (pass.length < 5) {
        return "password too short";
    } else {
        let userId = genUID();
        let password = sha256(pass);
        users[userId] = {
            username,
            password,
            userId
        }
        fs.writeFileSync('data/userList.json', JSON.stringify(users))
        return userId;

    }

}

//the login function takes an username and password, matches it to a username and password in the users object, and returns success or failure accordingly
function login(username, password) {
    let result = { success: false }
    Object.keys(users).map((userId, ind) => {
        if (users[userId].username === username && users[userId].password === sha256(password)) {
            result = { success: true, userId, username, password }
        }

    })
    //must be outside of the map
    return result;
}

//this function takes an userId and itemId and places it in the itemsBought object.
function putItemsBought(userId, itemId) {
    itemsBought[userId].push(itemId);
    fs.writeFileSync('data/itemsBought.json', JSON.stringify(itemsBought))
}

//Function is similar to one above and put it in the itemsSold 
function putItemsSold(userId, itemId) {
    itemsSold[userId].push(itemId);
    fs.writeFileSync('data/itemsSold.json', JSON.stringify(itemsSold))
}

function getItemsBought(userId) {
    var itemIds = itemsBought[userId];
    if (itemIds == undefined) {
        return null;
    }
    return { itemIds };
}

function getItemsSold(userId) {
    var itemIds = itemsSold[userId];
    if (itemIds == undefined) {
        return null;
    }
    return { itemIds };
}


/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeUserIfNeeded(userId) {
    var items = getItemsBought[userId];
    if (!items) {
        itemsBought[userId] = [];
        itemsSold[userId] = [];
        putItemsBought(userId, []);
        putItemsSold(userId, []);
    }
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: an array of listing IDs
*/
function allItemsBought(buyerID) {
    return itemsBought[buyerID];
}

/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: The ID of the new listing
*/
function createListing(itemName, sellerId, price, description, itemUrl) {
    let itemId = genUID();
    allItems[itemId] = {
        itemName,
        sellerId,
        price,
        description,
        itemId,
        itemUrl
    };
    fs.writeFileSync('data/allItems.json', JSON.stringify(allItems))
    return itemId;

}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
function getItemDescription(itemId) {
    return allItems[itemId];

}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: undefined
*/
function buy(buyerId, sellerId, itemId) {
    putItemsBought(buyerId, itemId);
    putItemsSold(sellerId, itemId);
    let item = allItems[itemId];
    item.buyerId = buyerId;
    fs.writeFileSync('data/allItems.json', JSON.stringify(allItems))
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerId) {
    let itemIds = itemsSold[sellerId];
    return itemIds
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    let allListings = [];
    let allItemsArray = Object.keys(allItems)

    allListings = allItemsArray.filter(itemId => allItems[itemId].buyerId === undefined)
    // allListings was just giving us a list of keys, here we used map to create an array of objects with relevant info
    return allListings.map(listing => allItems[listing]);
}



/*
searchForListings returns the IDs of all the` listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
    console.log(searchTerm);
    let searchedItems = []
    let allItemsArray = Object.keys(allItems)

    searchedItems = allItemsArray.filter(itemId => !allItems[itemId].buyerId && (allItems[itemId].description.includes(searchTerm) || allItems[itemId].itemName.includes(searchTerm)))
    // allListings was just giving us a list of keys, here we used map to create an array of objects with relevant info
    return searchedItems.map(item => allItems[item]);

}

function getItem(itemId) {

    let specificItem = allItems[itemId];
    return specificItem
}



module.exports = {
    genUID, // This is just a shorthand. It's the same as genUID: genUID. 
    initializeUserIfNeeded,
    putItemsBought,
    getItemsBought,
    getItemsSold,
    allItemsBought,
    createListing,
    getItemDescription,
    buy,
    allItemsSold,
    allListings,
    searchForListings,
    signup,
    getItem,
    login
    // Add all the other functions that need to be exported
}
