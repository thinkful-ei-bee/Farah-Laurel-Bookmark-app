'use strict';
/* global $, cuid, BookmarkList */

const STORE = (function(){
  const bookmarkList = {
    list: [
      {id: '1836578956', title: 'Google', rating: 4, description: 'The best search engine ever.', link:'http://google.com', expanded: false},
      {id: '3777046442', title: 'Netflix', rating: 5, description: 'TV shows and movies', link:'http://netflix.com', expanded: false},

      {id: '', title: '', rating: 0, description: '', link: '', expanded: false}
    ],
    addingFormVisible: false, 
    minimumStarRating: 1, 
    error: null,
    addBookmark: function(bookmark) {
      this.list.push(bookmark);
      BookmarkList.renderStore();
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