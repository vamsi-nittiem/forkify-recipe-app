import {View} from './view.js';
import icons from '../../img/icons.svg';

export class ResultsView extends View {
    _defaultErrMsg = 'No recipes found for your query !! Please try again !!';
    _parentElem = document.querySelector('.results');

    _generateMarkup(){
        return this._data.map(this.populateResult).join('');
    }

    populateResult(item){
        const hashId = window.location.hash.slice(1);
        return `<li class="preview">
                    <a class="preview__link ${item.id === hashId ? 'preview__link--active' : ''}" href="#${item.id}">
                    <figure class="preview__fig">
                        <img src="${item.image_url}" alt=${item.title} />
                    </figure>
                    <div class="preview__data">
                        <h4 class="preview__title">${item.title}</h4>
                        <p class="preview__publisher">${item.publisher}</p>
                        <div class="preview__user-generated ${item.key ? '' : 'hidden'}">
                            <svg>
                            <use href="${icons}#icon-user"></use>
                            </svg>
                        </div>
                    </div>
                    </a>
                </li>`;
    }
}
