import React, {Component} from 'react';
const assert = require('assert');
const sha256 = require ('sha256');


class alibay extends Component {
    constructor(props) {
        super (props);
        
    }
}

let itemsBought = {}; // map that keeps track of all the items a user has bought
let users = {};
let itemsSold = {};
let allItems = {};
let itemIds = Object.keys(allItems).filter ((item) => {
    if(allItems[item].itemName) {
        return {success: true}
    }
    else {return {success: false}}
});

/*
Use this function to generate a new UID every time a user creates an account.
*/
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

function signup (username, pass) {
    let userId = genUID();
    let usersList = [];
    let password = sha256(pass);
    Object.keys(users).map((userId, ind) => {usersList.push(users[userId])})
    if(password.length < 5) {
        return {success: false, }
    }
    else {return userId}
} 


function login(username, password) {
    Object.keys(users).map((user, ind) => {
        if(users[userId].username === username && users[userId].password === sha256(password)) {
            return {success:true, genUID(), username, password}
        }
        else {
            return {success: false}
        }

    })

}

function putItemsBought(userId, itemId) {
    itemsBought[userId] = itemId;
}

function putItemsSold(userId, itemId) {
    itemsSold[userId] = itemId;

}

function getItemsBought(userId) {
    var itemIds = itemsBought[userId];
    if(itemIds == undefined) {
        return null;
    }
    return {itemIds};
}

function getItemsSold (userId) {
    var itemIds = itemsSold[userId];
    if(itemIds == undefined) {
        return null;
    }
    return {itemIds};
}


/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: undefined
*/
function initializeUserIfNeeded(uid) {
    var items = getItemsBought[uid];
    if(items == null) {
        putItemsBought(uid, []);
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
function createListing(itemName, sellerId, price, description) {
    let itemId = genUID();
    allItems[itemId] = {itemName, sellerId, price, description};
    return {success: true, itemId};
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
function getItemDescription(itemId) {
    let description = allItems[itemId];
    return {success:true, description};
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
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerId) {
    let itemIds = itemsSold[sellerId];
    return {success: true, itemIds}
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    let allItems = Object.keys(allItems).map((itemId, idx) => {
        return allItems[itemId]
    })
        
    }



/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
function searchForListings(searchTerm) {
    
}

module.exports = {
    genUID, // This is just a shorthand. It's the same as genUID: genUID. 
    initializeUserIfNeeded,
    putItemsBought,
    getItemsBought,
    createListing,
    getItemDescription,
    buy,
    allItemsSold
    // Add all the other functions that need to be exported
}
