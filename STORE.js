'use strict';
/* global $, cuid */

const STORE = (function(){
  
  const bookmarkList = {
    list: [
      {id: '', title: '', rating: '', description: '', link: '', expanded: false}
    ],
    addingFormVisible: false, 
    minimumStarRating: 1, 
    error: null
  };

  return {
    bookmarkList: bookmarkList
  };
}());