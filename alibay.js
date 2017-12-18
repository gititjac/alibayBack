const assert = require('assert');
const fs = require('fs-extra')

let itemsBought = {} // map that keeps track of all the items a user has bought

/*
Before implementing the login functionality, use this function to generate a new UID every time.
*/
function genUID() {
    return Math.floor(Math.random() * 100000000)
}

async function initPermanentStorage() {
    // check if there is a file containing all the items bought
    let fileExists = await fs.pathExists(__dirname + '/storage/itemsBought.json');
    if(!fileExists) {
        // The file doesn't exist, so this is the first time the program was run
        itemsBought = {};
        // Make sure there is a directory to store all the global variables. If not, create it.
        await fs.ensureDir(__dirname + '/storage');
        // The file should always mimick the global variable
        return fs.writeFile(__dirname + '/storage/itemsBought.json', JSON.stringify(itemsBought));
    }
}

async function putItemsBought(userID, value) {
    itemsBought[userID] = value;
    return fs.writeFile(__dirname + '/storage/itemsBought.json', JSON.stringify(itemsBought));
}

function getItemsBought(userID) {
    var ret = itemsBought[userID];
    if(ret == undefined) {
        return null;
    }
    return ret;
}


/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: A promise
*/
async function initializeUserIfNeeded(uid) {
    var items = getItemsBought[uid];
    if(items == undefined) {
        return putItemsBought(uid, {});
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
    returns: A promise containing the ID of the new listing
*/
async function createListing(sellerID, price, blurb) {
    
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: An object containing the price and blurb properties.
*/
 function getItemDescription(listingID) {
    
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
    returns: A promise indicating that the action was done
*/
async function buy(buyerID, sellerID, listingID) {
    
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: an array of listing IDs
*/
function allItemsSold(sellerID) {
    
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: an array of listing IDs
*/
function allListings() {
    
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: an array of listing IDs
*/
async function searchForListings(searchTerm) {
    
}

module.exports = {
    genUID, // This is just a shorthand. It's the same as genUID: genUID. 
    initPermanentStorage,
    initializeUserIfNeeded,
    putItemsBought,
    getItemsBought
    // Add all the other functions that need to be exported
}