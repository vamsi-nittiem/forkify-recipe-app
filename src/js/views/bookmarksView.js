import {ResultsView} from "./resultsView";

class BookmarksView extends ResultsView {
    constructor(){
        super();
        super._defaultErrMsg = 'No Bookmarks found !!';
        super._parentElem = document.querySelector('.bookmarks__list');
    }
}

export default new BookmarksView();