const express = require('express');
const router = express.Router();


const { handleAddTank, handleTanks ,getKshirut } = require("../controllers/cars")

router.get("/tanks", handleTanks);
router.post("/addTank", handleAddTank);
router.get("/getKshirut",getKshirut);
module.exports = router;
