import {View} from './view.js';
import * as model from '../model.js';
import icons from '../../img/icons.svg';
import {RES_PER_PAGE} from '../config.js';

class PaginationView extends View {

    _parentElem = document.querySelector('.pagination');

    _generateMarkup(currPage = model.state.search.currPage){
        const totalPages = Math.ceil(this._data.length / RES_PER_PAGE);

        if(totalPages > 1){
            if(currPage === 1){
                return `
                <button data-page=${currPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${currPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
                `;
            }
            if(currPage === totalPages){
                return `    
                    <button data-page=${currPage - 1} class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                            <use href="${icons}#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currPage - 1}</span>
                    </button>
                `;
            }

            return `
                <button data-page=${currPage - 1} class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage - 1}</span>
                </button>
                <button data-page=${currPage + 1} class="btn--inline pagination__btn--next">
                    <span>Page ${currPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `;
        } else{
            return '';
        }
    }

    addEventHandlers(callback){
        this._parentElem.addEventListener('click', (ev) => {
            if(!ev.target.closest('.btn--inline')) 
                return;

        const gotoPage = +ev.target.closest('.btn--inline').dataset.page;
        callback(gotoPage);
        });
    }
}

export default new PaginationView();