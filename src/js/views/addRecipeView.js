import {View} from './view.js';
import * as model from '../model.js';


class AddRecipeView extends View {
  _parentElem = document.querySelector('.upload'); // ***
  _overlayElem = document.querySelector('.overlay');
  _uploadRecipeWindowElem = document.querySelector('.add-recipe-window');
  _addRecipeBtnElem = document.querySelector('.nav__btn--add-recipe');
  _closeRecipeBtnElem = document.querySelector('.btn--close-modal');
  _uploadBtnElem = document.querySelector('.upload__btn');
  _defaultSuccessMsg = 'Recipe was successfully uploaded !!';

  constructor() {
    super();
    this.addEventHandlers();
  }

  _generateMarkup(currPage = model.state.search.currPage) {}

  addEventHandlers() {
    [
      this._overlayElem,
      this._uploadRecipeWindowElem,
      this._addRecipeBtnElem,
    ].forEach(elem => {
      elem.addEventListener('click', ev => {
        if (
          this._overlayElem === ev.target.closest('.overlay') ||
          this._addRecipeBtnElem ===
            ev.target.closest('.nav__btn--add-recipe') ||
          ev.target.closest('.btn--close-modal')
        ) {
          this.toggleWindow();
        }
      });
    });
  }

  addRecipeFormToHtml(){
    const markup = `
    <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST12" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST12" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST12" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST12" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>`;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', markup)
  }

  handleUploadBtnClick(callback) {
    this._parentElem.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const data = [...new FormData(this._parentElem)];
      const recipe = Object.fromEntries(data);
      callback(recipe);
    });
  }

  toggleWindow(){
    this._overlayElem.classList.toggle('hidden');
    this._uploadRecipeWindowElem.classList.toggle('hidden');
  }
}

export default new AddRecipeView();