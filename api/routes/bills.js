const Bill = require("../models/Bill.js");
const express = require("express");
const router = express.Router();

//It queries records using the Bill model in the MongoDB database and returns them.
router.get("/get-all", async (req, res) => {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json(error);
  }
});

/* Creating a new Bill in the Database */
router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Item added successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
