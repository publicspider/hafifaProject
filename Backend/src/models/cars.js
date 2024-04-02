const mongoose = require("mongoose");

const carDataSchema = new mongoose.Schema({
  carNumber: { type: String, require: true },
  makat: String,
  kshirot: Boolean,
  gdud: String,
});

const CarData = mongoose.model("CarData", carDataSchema, "carDatas");

module.exports = CarData;
