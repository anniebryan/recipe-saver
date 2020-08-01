const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const recipeRoutes = express.Router();
const app = express();
const PORT = process.env.PORT || 4000;

let Recipe = require('./models/recipe.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/recipes', {
    useNewUrlParser: true
});

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB connection established successfully");
});

recipeRoutes.route('/').get(function(req, res) {
    Recipe.find(function(err, recipes) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipes);
        }
    });
});

recipeRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Recipe.findById(id, function(err, recipe) {
        if (err) {
            console.log(err);
        } else {
            res.json(recipe);
        }
    });
});

recipeRoutes.route('/add').post(function(req, res) {
    let recipe = new Recipe(req.body);
    recipe.save().then(recipe => {
            res.status(200).json({'recipe': 'recipe added successfully'});
        })
        .catch(err => {
            res.status(400).send('failed to add new recipe');
        });
});

recipeRoutes.route('/update/:id').post(function(req, res) {
    let id = req.params.id;
    Recipe.findById(id, function(err, recipe) {
        if (!recipe) {
            res.status(404).send('data is not found');
        } else {
            recipe.recipe_title = req.body.recipe_title;
            recipe.recipe_ingredients = req.body.recipe_ingredients;
            recipe.recipe_prep_time = req.body.recipe_prep_time;
            recipe.recipe_cook_time = req.body.recipe_cook_time;
            recipe.recipe_steps = req.body.recipe_steps;

            recipe.save().then(recipe => {
                res.json('recipe updated');
            })
            .catch(err => {
                res.status(400).send("update failed");
            });
        }
    });
});

app.use('/recipes', recipeRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, function() {
    console.log("Server is running on port " + PORT);
});