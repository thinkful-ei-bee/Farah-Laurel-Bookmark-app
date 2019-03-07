'use strict';
/* global $, STORE, BookmarkList */


const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/farah-laurel';

  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        }
  
        // In either case, parse the JSON stream:
        return res.json();
      })
  
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        // Otherwise give back the data as resolved Promise
        return data;
      });
  }

  const getBookmarks = function() {
    return listApiFetch(`${BASE_URL}` + '/bookmarks');
  };
        
  const createBookmarks = function(title, desc, url, rating) {
    const newBookmark = JSON.stringify({
      title: title,
      desc: desc,
      url: url,
      rating: rating
    });  
    
    const option = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: newBookmark
    };
    return listApiFetch(`${BASE_URL}` + '/bookmarks', option);
  };
        
  const deleteBookmarks = function(id) {
    const option = {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json' }) 
    };
    return fetch(`${BASE_URL}` + `/bookmarks/${id}`, option);
  };
        
  
  return {
    getBookmarks: getBookmarks,
    createBookmarks: createBookmarks,
    deleteBookmarks: deleteBookmarks, 
    //displayBookmarks: displayBookmarks
  };
    
}());
    




