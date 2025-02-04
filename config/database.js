

const Recipe = require("../models/recipe.js");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
