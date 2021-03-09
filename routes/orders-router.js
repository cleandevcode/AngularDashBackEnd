const router = require("express").Router();

const orderDB = require('../models/order-model.js');

const Providers = {
  provider_1: 'Provider 1',
  provider_2:'Provider 2',
  provider_3: 'Provider 3',
};

const OrderStatus = {
  success: 'Success',
  failed:'Failed',
};

// GET ALL GENRES
router.get("/", async (req, res) => {
  const lastName = req.query.lastName || '';
  const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(0);
  const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
  const provider = req.query.provider || null;
  const status = req.query.status || null;

  try {
    const orders = await orderDB.find(provider, status, lastName, startDate, endDate);
    return res.status(200).json(orders);
  } catch (err) {
     return res.status(500).json({ err: err });
  }
});

router.get("/providers", (req, res) => {
  res.json({ providers: Providers });
})

router.get("/statuses", (req, res) => {
  res.json({ statuses: Object.values(OrderStatus) });
})

module.exports = router;
