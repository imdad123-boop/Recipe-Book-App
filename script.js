const API_KEY = "681b5a2e44e14fe39cb07cbd5fee71a2";  
const recipeListEl = document.getElementById("recipe-list");

function displayRecipes(recipes) {
    recipeListEl.innerHTML = ""; 
    recipes.forEach((recipe) => {
    
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipe-item");

        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = recipe.title; 

        const recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        const recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML =`
            <strong>Ingredients:</strong> ${recipe.extendedIngredients
                .map((ingredient) => ingredient.original)
                .join(", ")}`;

        const recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";

    
        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);

     
        recipeListEl.appendChild(recipeItemEl);
    });
}

async function getRecipes() {
   
    const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=5`);
    const data = await response.json();
    return data.recipes;
}

async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes); 
}
init();
