const alibay = require('./alibay');
const assert = require ('assert');


function test() {

    let sellerID = alibay.genUID();
    let buyerID = alibay.genUID();

    alibay.initializeUserIfNeeded(sellerID)
    alibay.initializeUserIfNeeded(buyerID)
    let user1 = alibay.signup("bob", "pw12345");
    let listing1ID = alibay.createListing("boat",sellerID, 500000, "A very nice boat")
    let listing2ID = alibay.createListing('gloves', sellerID, 1000, "Faux fur gloves")
    let listing3ID = alibay.createListing('shoes', sellerID, 100, "Running shoes")
    let product2Description =  alibay.getItemDescription(listing2ID)

    alibay.buy(buyerID, sellerID, listing2ID)
    alibay.buy(buyerID, sellerID, listing3ID)

    let allSold = alibay.allItemsSold(sellerID)
    let soldDescriptions = allSold.map(alibay.getItemDescription)
    let allBought = alibay.allItemsBought(buyerID)
    let shoeListing = alibay.getItem()
    let allBoughtDescriptions = allBought.map(alibay.getItemDescription)
    let listings =  alibay.allListings()
    let boatListings = alibay.searchForListings("boat")
    let shoeListings = alibay.searchForListings("shoes")
    let boatDescription = alibay.getItemDescription(listings[0])
    let boatBlurb = boatDescription.description;
    let boatPrice = boatDescription.price;
    
    listings = alibay.allListings();
    assert(allSold.length == 2); // The seller has sold 2 items
    assert(allBought.length == 2); // The buyer has bought 2 items
    assert(alibay.allListings().length == 1); // Only the boat is still on sale
    assert(boatListings.length == 1); // The boat hasn't been sold yet
    assert(shoeListings.length == 0); // The shoes have been sold
    assert(boatBlurb == "A very nice boat");
    assert(boatPrice == 500000);
}
test();
