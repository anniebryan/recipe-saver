import React, { Component } from 'react';
import axios from 'axios';

export default class EditRecipe extends Component {

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

    componentDidMount() {
        axios.get('/recipes/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    recipe_title: response.data.recipe_title,
                    recipe_ingredients: response.data.recipe_ingredients,
                    recipe_prep_time: response.data.recipe_prep_time,
                    recipe_cook_time: response.data.recipe_cook_time,
                    recipe_steps: response.data.recipe_steps
                })
            })
            .catch(function(error) {
                console.log(error)
            });
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
        const obj = {
            recipe_title: this.state.recipe_title,
            recipe_ingredients: this.state.recipe_ingredients,
            recipe_prep_time: this.state.recipe_prep_time,
            recipe_cook_time: this.state.recipe_cook_time,
            recipe_steps: this.state.recipe_steps
        };
        axios.post('/recipes/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/view/'+this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <h3>Update Recipe</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input  type="text"
                                className="form-control"
                                defaultValue={this.state.recipe_title}
                                onChange={this.onChangeRecipeTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Ingredients: </label>
                        <input  type="text"
                                className="form-control"
                                defaultValue={this.state.recipe_ingredients}
                                onChange={this.onChangeRecipeIngredients}
                                />
                    </div>
                    <div className="form-group">
                        <label>Prep Time: </label>
                        <input  type="number"
                                className="form-control"
                                defaultValue={this.state.recipe_prep_time}
                                onChange={this.onChangeRecipePrepTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>Cook Time: </label>
                        <input  type="number"
                                className="form-control"
                                defaultValue={this.state.recipe_cook_time}
                                onChange={this.onChangeRecipeCookTime}
                                />
                    </div>
                    <div className="form-group">
                        <label>Steps: </label>
                        <input  type="text"
                                className="form-control"
                                defaultValue={this.state.recipe_steps}
                                onChange={this.onChangeRecipeSteps}
                                />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Recipe" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}