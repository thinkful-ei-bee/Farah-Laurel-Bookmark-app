'use strict';
/* global $, STORE */


const api = (function () {
  const BASE_URL = "https://thinkful-list-api.herokuapp.com/farah-laurel";

  const getBookmarks = function() {
    return fetch(`${BASE_URL}` + "/bookmarks")
  };
        
  const createBookmarks = function(bookmarkName) {
    const newBookmark = JSON.stringify({
      title: tile,
      description: description,
      url: url,
      rating: rating
    });  
    
    const option = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: newBookmark
      };
    return fetch(`${BASE_URL}` + "/bookmarks", option);
  };
        
  const deleteBookmarks = function(id) {
    const option = {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }) 
    };
    return fetch(`${BASE_URL}` + `/bookmarks/${id}`, option);
  };
        
  // function updateBookmarks(){
        
  // }
        
  // const displayBookmarks = function(){
        
  // }
    
  return {
    getBookmarks: getBookmarks,
    createBookmarks: createBookmarks,
    deleteBookmarks: deleteBookmarks, 
    //displayBookmarks: displayBookmarks
  };
    
}());
    




