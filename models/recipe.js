const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  isVegetarian: { type: Boolean, default: false },
});

module.exports = mongoose.model('Recipe', recipeSchema);