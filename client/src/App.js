import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipesList from './components/recipes-list.component';
import EditRecipe from './components/edit-recipe.component';
import CreateRecipe from './components/create-recipe.component';

import icon from './icon.png';

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/" target="_blank">
            <img src={icon} width="30" alt="" />
          </a>
          <Link to="/" className="navbar-brand">recipe app</Link>
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Recipes</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Recipe</Link>
            </li>
          </ul>
        </nav>
        <div class="container">
          <Route path="/" exact component={RecipesList} />
          <Route path="/edit/:id" component={EditRecipe} />
          <Route path="/create" component={CreateRecipe} />
        </div>
      </Router>
    );
  }
}

export default App;
