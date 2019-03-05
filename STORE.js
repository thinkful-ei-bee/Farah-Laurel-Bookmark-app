'use strict';
/* global $, cuid */

const STORE = (function(){
  
  const bookmarkList = {
    list: [
      {id: cuid(), title: '', rating: '', description: '', link: ''}
    ],
    added: false, 
    sorted: false, 
    currentView: true,
    edited: false,
    deletePrompt: false,
  };

  return {
    bookmarkList: bookmarkList
  };
}());