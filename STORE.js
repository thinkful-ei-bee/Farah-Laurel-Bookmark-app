'use strict';
/* global $, cuid, BookmarkList */

const STORE = (function(){
  const bookmarkList = {
    list: [
      //{id, title, rating: 0, description, link, expanded: false}
    ],
    addingFormVisible: false, 
    minimumRating: 1, 
    error: '',
    addBookmark: function(bookmark) {
      this.list.push(bookmark);
      //BookmarkList.renderStore();
    },
    deleteBookmark: function(id){
      const deleteBookmarkIndex = this.list.findIndex(item => item.id === id);
      STORE.list.splice(deleteBookmarkIndex, 1);
      BookmarkList.renderStore();
    }
  };

  return {
    ...bookmarkList //take all the properties from bookmark list and add them; destructuring 
  };
}());

function addDataToStoreAndRender(list){
  list.forEach((listItem) => STORE.addBookmark(listItem));
  BookmarkList.renderStore();
}

function addErrorToStoreAndRender(error){
  STORE.error = error;
  BookmarkList.renderStore();
}

$(document).ready(function() {
  BookmarkList.bindEventListeners();
  BookmarkList.renderStore();
  api.getBookmarks()
    .then(data => addDataToStoreAndRender(data))
    .catch(err => STORE.addErrorToStoreAndRender(err.message));
});