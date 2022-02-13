const express = require("express");
const router = express.Router();
const bidController = require("../controllers/bid.controller");



// GET all the bids on a article 
router.get('/bids', bidController.getAllBid);
// POST a bid on a artcile 
router.post('/bid', bidController.createBid); 

module.exports = router

