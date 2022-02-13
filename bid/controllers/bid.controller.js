const models = require('../models/'); 

const getAllBid = async (req, res) => {
  try {
    const bids = await models.Bid.findAll(); 
    console.log(bids)

    return res.status(200).json({ bids });
  } catch (error) {
    return res.status(500).send(error.message);
  }

}


const createBid = async (req, res) => {
  try {
    const bid = await models.Bid.create(req.body);
    return res.status(201).json({
      bid,
    });
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

module.exports = {
  getAllBid,
  createBid,
}