//main sources: Learning React, O'Reilly 2017
window.id = 0;

function toggleIngredients(ingredientsList) {
  var ingredientsSection = ingredientsList.currentTarget.id;
  var hiddenIngredients = document.getElementById(ingredientsSection).children;
  if (hiddenIngredients[1].style.display === "none") {
    hiddenIngredients[1].style.display = "block";
  } else {
    hiddenIngredients[1].style.display = "none";
  }
}

const AddRecipeForm = ({onNewRecipe=f=>f}) => {
  let _title, _ingredients, _imageLink
  const submit = e => {
    e.preventDefault()
    onNewRecipe(_title.value, _ingredients.value, _imageLink.value)
    _title.value = ''
    _ingredients.value = ''
    _imageLink.value = ''
  }
  return (
    <form onSubmit={submit}>
      <label>Title</label>
      <input ref={input => _title = input}
        type="text" id="enter-title"/>
      <label>Ingredients</label>
      <input ref={input => _ingredients = input}
        type="text" id="enter-ingredients"/>
      <label>Image Link</label>
      <input ref={input => _imageLink = input}
        type="text" id="enter-imageLink"/>
      <button id="addButton">
        Add
      </button>
    </form>
  )
}

const Recipe = ({title, ingredients, imageLink, onRemove=f=>f, onEdit=f=>f }) =>
  <div>
    <div id={title} onClick={toggleIngredients}>
      <h2 id="recipe-title"><img src = {imageLink}></img>{title}</h2>
       <div id="hiddenDiv">
         Ingredients: {ingredients}
         <button onClick={onEdit}>Edit</button>
         <button onClick={onRemove}>Delete</button>
      </div>
    </div>
  </div>

const RecipeList = ({ recipes = [], onRemove=f=>f, onEdit=f=>f }) => (
  <div className="recipe-list">
    {(recipes.length === 0) ?
      <p>No Recipes</p> :
      recipes.map(recipe =>
        <Recipe key={recipe.id}
         {...recipe}
         onRemove={() => onRemove(recipe.id)}
         onEdit={() => onEdit(recipe.id)}
        />
      )
    }
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    var initialList = (typeof localStorage["savedRecipes"] != "undefined") ?
     JSON.parse(localStorage.getItem("savedRecipes")) :
     [{title: "Musubi Rice Ball", ingredients: "sushi rice, seaweed, salt, umeboshi (Japanese plum)",
      imageLink: "https://www.ashlynnpai.com/attic/hawaiifoods/img/musi.png"}, {title: "Mochi Rice Cakes", ingredients: "mochi rice, sugar", imageLink: "https://www.ashlynnpai.com/attic/hawaiifoods/img/mochii.png"}, {title: "Spam Musubi", ingredients: "Spam, sushi rice, seaweed, soy sauce", imageLink: "https://www.ashlynnpai.com/attic/hawaiifoods/img/spami2.png"}, {title: "Loco Moco", ingredients: "spam, egg, gravy, rice", imageLink: "https://www.ashlynnpai.com/attic/hawaiifoods/img/locoi.png"}];
    this.state = {
    recipes: initialList,
    editing: false
    };

    this.addRecipe = this.addRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
  }

  addRecipe(title, ingredients, imageLink){
    const recipes = [
      ...this.state.recipes,
      {
        id: window.id++,
        title,
        ingredients,
        imageLink
      }
    ]
    localStorage.setItem("savedRecipes", JSON.stringify(recipes));
    this.setState({recipes})
  }

  editRecipe(id) {
    this.setState({ editing: true })
    let recipe = this.state.recipes.filter(
      recipe => recipe.id == id)
    document.getElementById("enter-title").value = recipe[0].title
    document.getElementById("enter-ingredients").value = recipe[0].ingredients
    document.getElementById("enter-imageLink").value = recipe[0].imageLink
    this.removeRecipe(id)
  }

  removeRecipe(id) {
    const recipes = this.state.recipes.filter(
      recipe => recipe.id !== id
    )
    this.setState({recipes})
  }

  render() {
    const { addRecipe, removeRecipe, editRecipe } = this
    const { recipes } = this.state

    return (
      <div className = "app">
        <h1>Recipes</h1>
        <AddRecipeForm onNewRecipe={addRecipe} />
        <RecipeList recipes={recipes}
          onRemove={removeRecipe}
          onEdit={editRecipe}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
