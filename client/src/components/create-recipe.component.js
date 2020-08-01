import React, { Component } from 'react';
import axios from 'axios';

export default class CreateRecipe extends Component {

    constructor(props) {
        super(props);

        this.onChangeRecipeTitle = this.onChangeRecipeTitle.bind(this);
        this.onChangeRecipeIngredients = this.onChangeRecipeIngredients.bind(this);
        this.onChangeRecipePrepTime = this.onChangeRecipePrepTime.bind(this);
        this.onChangeRecipeCookTime = this.onChangeRecipeCookTime.bind(this);
        this.onChangeRecipeSteps = this.onChangeRecipeSteps.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            recipe_title: '',
            recipe_ingredients: '',
            recipe_prep_time: 0,
            recipe_cook_time: 0,
            recipe_steps: ''
        }
    }

    onChangeRecipeTitle(e) {
        this.setState({
            recipe_title: e.target.value
        });
    }

    onChangeRecipeIngredients(e) {
        this.setState({
            recipe_ingredients: e.target.value
        });
    }

    onChangeRecipePrepTime(e) {
        this.setState({
            recipe_prep_time: e.target.value
        });
    }

    onChangeRecipeCookTime(e) {
        this.setState({
            recipe_cook_time: e.target.value
        });
    }

    onChangeRecipeSteps(e) {
        this.setState({
            recipe_steps: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Recipe title: ${this.state.recipe_title}`);
        console.log(`Recipe ingredients: ${this.state.recipe_ingredients}`);
        console.log(`Recipe prep time: ${this.state.recipe_prep_time}`);
        console.log(`Recipe cook time: ${this.state.recipe_cook_time}`);
        console.log(`Recipe steps: ${this.state.recipe_steps}`);

        const newRecipe = {
            recipe_title: this.state.recipe_title,
            recipe_ingredients: this.state.recipe_ingredients,
            recipe_prep_time: this.state.recipe_prep_time,
            recipe_cook_time: this.state.recipe_cook_time,
            recipe_steps: this.state.recipe_steps
        }

        axios.post('http://localhost:4000/recipes/add', newRecipe)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });

        this.setState({
            recipe_title: '',
            recipe_ingredients: [],
            recipe_prep_time: 0,
            recipe_cook_time: 0,
            recipe_steps: []
        });
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create new recipe</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.recipe_title}
                                onChange={this.onChangeRecipeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Ingredients: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.recipe_ingredients}
                                onChange={this.onChangeRecipeIngredients}
                                />
                    </div>
                    <div className="form-group">
                        <label>Prep Time: </label>
                        <input  type="number"
                                className="form-control"
                                value={this.state.recipe_prep_time}
                                onChange={this.onChangeRecipePrepTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>Cook Time: </label>
                        <input  type="number"
                                className="form-control"
                                value={this.state.recipe_cook_time}
                                onChange={this.onChangeRecipeCookTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>Steps: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.recipe_steps}
                                onChange={this.onChangeRecipeSteps}
                                />
                    </div>
                    <div className="form-group">
                        <input  type="submit" 
                                value="Create Recipe" 
                                className="btn btn-primary"
                                />
                    </div>
                </form>
            </div>
        );
    }
}