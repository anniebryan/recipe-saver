import React, { Component } from 'react';
import axios from 'axios';

export default class ViewRecipe extends Component {

    constructor(props) {
        super(props);
        
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
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h3>{this.state.recipe_title}</h3>
                <p><b>Ingredients: </b>{this.state.recipe_ingredients}</p>
                <p><b>Prep Time: </b>{this.state.recipe_prep_time}</p>
                <p><b>Cook Time: </b>{this.state.recipe_cook_time}</p>
                <p><b>Steps: </b>{this.state.recipe_steps}</p>

                <form action={"/edit/"+this.props.match.params.id}>
                    <div className="form-group">
                        <input type="submit" value="Edit Recipe" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}