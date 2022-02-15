const models = require('../models');

const getAllBets = async (req, res) => {
  try {
    const bets = await models.Bet.findAll();
    return res.status(200).json({ bets });
  } catch (error) {
    return res.status(500).send(error.message);
  }

}

const createBet = async (req, res) => {
  try {
    const bet = await models.Bet.create(req.body);
    console.log(req.body)
    return res.status(201).json({
      bet,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getBetById = async (req, res) => {
  try {
    const bet = await models.Bet.findOne({
      where: { id: req.params.id }
    });
    return res.status(200).json({ bet });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getBetAllByUserId = async (req, res) => {
  try {
    const bet = await models.Bet.findAll({
      where: { userId: req.params.id }
    });
    return res.status(201).json({
      bet,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getBetAllByProducts = async (req, res) => {
  try {
    const bet = await models.Bet.findAll({
      where: { productId: req.params.id }
    });
    return res.status(201).json({
      bet,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateBet = async (req, res) => {
  try {
    const bet = await models.Bet.update(
      req.body, {
      where: { id: req.params.id }
    });
    return res.status(201).json({bet});
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}



module.exports = {
  getAllBets,
  createBet,
  getBetAllByUserId,
  getBetById,
  getBetAllByProducts,
  updateBet
}