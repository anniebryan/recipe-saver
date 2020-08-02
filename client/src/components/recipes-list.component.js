import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recipe = props => (
    <tr>
        <td>
            <Link to={"/edit/"+props.recipe._id}>{props.recipe.recipe_title}</Link>
        </td>
        <td>{props.recipe.recipe_ingredients}</td>
        <td>{props.recipe.recipe_prep_time}</td>
        <td>{props.recipe.recipe_cook_time}</td>
        <td>{props.recipe.recipe_steps}</td>
    </tr>
)

export default class RecipesList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('/recipes/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get('/recipes/')
            .then(response => {
                this.setState({todos: response.data});
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    recipeList() {
        return this.state.todos.map(function(currentRecipe, i) {
            return <Recipe recipe={currentRecipe} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Recipes List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Ingredients</th>
                            <th>Prep Time</th>
                            <th>Cook Time</th>
                            <th>Steps</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.recipeList() }
                    </tbody>
                </table>
            </div>
        );
    }
}