/* eslint-disable no-console */
/* eslint-disable object-shorthand */
require('dotenv').config();
require('./config/database');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');


const app = express();
// MODELS
const Recipe = require('./models/recipe');

// MIDDLEWARE
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// PUBLIC ROUTES

app.get('/', async (req, res) => {
  res.render('index.ejs');
});


app.get('/recipes', async (req, res) => {
  const recipes = await Recipe.find({});
  res.render('recipes/index.ejs', { recipes: recipes });
});

// create
app.get('/recipes/new', (req, res) => {
  res.render('recipes/new.ejs');
});




app.post('/recipes', async (req, res) => {
  try {
   
    const isVegetarian = req.body.isVegetarian === 'on'; 

    const newRecipe = await Recipe.create({
      ...req.body,
      isVegetarian: isVegetarian, 
    });

    console.log(newRecipe);
    res.redirect('/recipes');
  } catch (err) {
    console.log('ERROR:', err);
    res.status(500).send('Something went wrong. Please try again.');
  }
});



// show recipes
app.get('/recipes/:recipeId', async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId);
  res.render('recipes/show.ejs', { recipe: recipe });
});

// delete
app.delete('/recipes/:recipeId', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.recipeId);
  res.redirect('/recipes');
});



app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
});
