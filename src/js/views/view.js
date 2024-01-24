import icons from "url:../../img/icons.svg";

export class View {
    _parentElem = document.querySelector('.recipe');
    _data;
    _defaultErrMsg = 'Cannot find the Recipe !!';
    _defaultSuccessMsg = 'Start by searching for a recipe or an ingredient. Have fun!';

    /**
     * This function renders the data sent to the DOM
     * @param {Object} recipe 
     */
    render(recipe){
        this._data = recipe;
        
        const markup = this._generateMarkup();
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup)
    }

    _clear(){
        this._parentElem.innerHTML = '';
    }

    addSpinner(){
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
        this._clear();
        this._parentElem.insertAdjacentHTML('afterbegin', markup);
      }


    handleError(message = this._defaultErrMsg){
      const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

      this._clear();
      this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }

    handleSuccess(message = this._defaultSuccessMsg){
      const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;

      this._clear();
      this._parentElem.insertAdjacentHTML('afterbegin', markup);
    }
}