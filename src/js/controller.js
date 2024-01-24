import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import {ResultsView} from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import {MODAL_CLOSE_SEC} from './config.js';


const recipeContainer = document.querySelector('.recipe');
const resultsView = new ResultsView();

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    recipeView.addSpinner();
    await model.loadRecipe(hash);

    if (model?.state?.recipe){
      recipeView.render(model.state.recipe);
      const recipesOfPage = model.getSearchResultsOfPage();
      resultsView.render(recipesOfPage);
      bookmarksView.render(model.state.bookmarks);
    }
  } catch (err) {
    recipeView.handleError();
  }
};
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.makeSearchQuery(query);

    if (model.state.search.recipes.length){
      const recipesOfPage = model.getSearchResultsOfPage();
      resultsView.render(recipesOfPage);

      paginationView.render(model.state.search.recipes);
    }
    else
      resultsView.handleError();
  } catch (err) {
    resultsView.handleError();
  }
};

const controlServings = function(newServings){
  model.updateServings(newServings);
  recipeView.render(model.state.recipe);
}

const controlBookmarkClick = function () {
  let recipe;
  if (!!model.state.search.recipes.length)
    recipe = model.state.search.recipes.find(
      recipe => recipe.id === model.state.recipe.id
    );
  else
    recipe = model.state.bookmarks.find(
      bookmark => bookmark.id === model.state.recipe.id
    );

  if (!recipe.isBookmarked) {
    recipe.isBookmarked = true;
    model.addBookmark(recipe);
  } else {
    recipe.isBookmarked = false;
    model.removeBookmark(recipe);
  }
  if (model.state.bookmarks.length) bookmarksView.render(model.state.bookmarks);
  else bookmarksView.handleError();
  recipeView.render(model.state.recipe);
};

const controlPagination = function(gotoPage){
  const recipesOfPage = model.getSearchResultsOfPage(gotoPage);
  resultsView.render(recipesOfPage);
  paginationView.render(model.state.search.recipes);
}

const controlRecipeUpload = async function(newRecipe){
  try{
    addRecipeView.addSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.handleSuccess();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`)
    setTimeout(()=> {
      addRecipeView.toggleWindow();
      addRecipeView.addRecipeFormToHtml();
    }, MODAL_CLOSE_SEC*1000)
  } catch(err){
    addRecipeView.handleError(err)
  }
}

const init = function(){
  addRecipeView.handleUploadBtnClick(controlRecipeUpload)
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addEventHandlers(controlRecipes);
  recipeView.addBookmarkClickHandler(controlBookmarkClick);
  recipeView.addUpdateServingsHandler(controlServings);
  paginationView.addEventHandlers(controlPagination);
  console.log('CI/CD is working !!')
}

init();

if(model.state.bookmarks.length)
  bookmarksView.render(model.state.bookmarks);
