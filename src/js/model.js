import {makeAjaxCall} from './helpers.js';
import {API_KEY, API_URL, RES_PER_PAGE} from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    recipes: [],
    currPage: 1
  },
  bookmarks: []
};

export const loadRecipe = async function (hash) {
  try {
    const data = await makeAjaxCall(`${API_URL}/${hash}?key=${API_KEY}`);

    console.log(data);
    state.recipe = data.data.recipe;
    const recipeInBookmarks = state.bookmarks.find(bookmark => bookmark.id === state.recipe.id)
    const recipe = state.search.recipes.find(recipe => recipe.id === hash);
    if(!!recipeInBookmarks || (recipe && recipe.isBookmarked)){
     state.recipe.isBookmarked = true;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const makeSearchQuery = async function(query) {
  try{
    const data =  await makeAjaxCall(`${API_URL}/?search=${query}&key=${API_KEY}`);

    console.log(data);
    state.search.query = query;
    state.search.recipes = data.data.recipes;
    state.search.currPage = 1;
    state.bookmarks.forEach(bookmark => {
      state.search.recipes.forEach(recipe => {
        if(recipe.id === bookmark.id){
          recipe.isBookmarked = true;
        }
      })
    });
    console.log(state.search.recipes);
  } catch(err){
    throw err;
  }
}

export const getSearchResultsOfPage = function(page = state.search.currPage){
  state.search.currPage = page;
  return state.search.recipes.slice((page-1)*RES_PER_PAGE, page*RES_PER_PAGE);
}

export const updateServings = function(newServings){
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings)/state.recipe.servings;
  });
  state.recipe.servings = newServings;
}

const saveInLocalStorage = function(bookmarks){
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} 

export const addBookmark = function(recipe){
  state.recipe.isBookmarked = true;
  state.bookmarks.push(recipe);
  saveInLocalStorage(state.bookmarks);
}

export const removeBookmark = function(recipe){
  state.recipe.isBookmarked = false;
  const index = state.bookmarks.findIndex(mrkdItem => mrkdItem.id === recipe.id);
  state.bookmarks.splice(index, 1);
  saveInLocalStorage(state.bookmarks);
}

const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
if(!!savedBookmarks && savedBookmarks.length > 0)
  state.bookmarks = savedBookmarks;

export const uploadRecipe = async function(newRecipe){
  try{
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && !!entry[1]).map(ing => {
      const ingArr = ing[1].split(',').map(item => item.trim());
      if(ingArr.length !== 3) 
        throw new Error('Entered data is in wrong format !! Please enter in specified format.')
      
        const [quantity, unit, description] = ingArr;
      return {quantity: quantity ? +quantity : null, unit, description};
  });

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingredients 
  }
  const uploadJson = await makeAjaxCall(`${API_URL}/?key=${API_KEY}`, recipe);
  const recipeInJson = uploadJson.data.recipe;
  state.recipe = {...recipeInJson, image: recipeInJson.image_url, sourceUrl: recipeInJson.source_url, cookingTime: recipeInJson.cooking_time};
  addBookmark(state.recipe);
  } catch(err){
    throw err;
  }

}

