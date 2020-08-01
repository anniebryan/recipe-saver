const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Recipe = new Schema({
    recipe_title: {
        type: String
    },
    recipe_ingredients: {
        type: String
    },
    recipe_prep_time: {
        type: Number
    },
    recipe_cook_time: {
        type: Number
    },
    recipe_steps: {
        type: String
    }
});

module.exports = mongoose.model('Recipe', Recipe);