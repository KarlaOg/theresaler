const express = require("express");
const router = express.Router();
const betController = require("../controllers/bet.controller");



// FIND ALL 
router.get('/', betController.getAllBets);
// CREATE 
router.post('/', betController.createBet);
// GET BY ID 
router.get('/bet/:id', betController.getBetById);
// GET BETS BY USERID 
router.get('/user/:id/bets', betController.getBetAllByUserId);
// GET BETS BY PRODUCT 
router.get('/product/:id/bets', betController.getBetAllByProducts); 
// UPDATE BET 
router.put('/bet/:id', betController.updateBet)

// router.get('/user/bets/:userId', betController.getBetAllByUserId);

module.exports = router

