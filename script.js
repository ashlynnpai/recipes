//main sources: Learning React, O'Reilly 2017
window.id = 0;

const AddRecipeForm = ({onNewRecipe=f=>f}) => {
  let _title, _ingredients
  const submit = e => {
    e.preventDefault()
    onNewRecipe(_title.value, _ingredients.value)
    _title.value = ''
    _ingredients.value = ''
  }
  return (
    <form onSubmit={submit}>
      <label>Title</label>
      <input ref={input => _title = input}
        type="text" id="enter-title"/>
      <label>Ingredients</label>
      <input ref={input => _ingredients = input}
        type="text" id="enter-ingredients"/>
      <button>
        Add
      </button>  
    </form>  
  )
}

const Recipe = ({title, ingredients, onRemove=f=>f, onEdit=f=>f }) =>
  <div>
  <h3>{title}</h3>
  <p>{ingredients}</p>
  <button onClick={onRemove}>X</button>
  <button onClick={onEdit}>Edit</button>
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
    this.state = {
    recipes: [{title: "Cake", ingredients: "sugar"}],
    editing: false
    };
    
    this.addRecipe = this.addRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.removeRecipe = this.removeRecipe.bind(this)
  }
  
  addRecipe(title, ingredients){
    const recipes = [
      ...this.state.recipes,
      {
        id: window.id++,
        title,
        ingredients
      }
    ]
    this.setState({recipes})
  }
  
  editRecipe(id) {
    this.setState({ editing: true })
    let recipe = this.state.recipes.filter(
      recipe => recipe.id == id)
    document.getElementById("enter-title").value = recipe[0].title
    document.getElementById("enter-ingredients").value = recipe[0].ingredients
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

