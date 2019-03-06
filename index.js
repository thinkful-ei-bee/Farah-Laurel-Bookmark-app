'use strict';
/* global $, STORE, api */

//=================
//MARK UP FUNCTIONS
//=================
const BookmarkList = (function () {
  function generateMainPageHTML(){ 
    const bookmarks = STORE.list.map(bookmark => 
      `<ul> 
      <li class="js-bookmark-element" data-id="${bookmark.id}">
        <p>${bookmark.title}</p>
        <p>${bookmark.rating}</p> 
        

        <div class="js-bookmark-details">
        <p>${bookmark.desc}</p>
        <p>${bookmark.url}</p>

          <div class="js-detail-buttons">
            <button class="js-delete-button" type="button">Delete</button>
          </div>
          </li>
          </ul> `);
    return bookmarks;
  }

  // function generateExpandedPageHTML(){
  //   const bookmarks = STORE.list.map(bookmark => 
  //     `  `);
  //   return bookmarks;
  
  // }

  function generateAddBookmarkHTML(){
    return `
      <form>
        <p>Add Boommark</p>
        <input type="add-title" class="js-add-title" placeholder="Title">
        <input type="add-link" class="js-add-link" placeholder="Link">
        <input type="add-description" class="js-add-description" placeholder="Description">
        
        <button type="submit" id="js-add-bookmark-button">Add Bookmark</button>
      </form>`;
  }

  function getBookmarkFromElement(bookmark){
    $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmarkId');
  }

  //================
  //RENDER FUNCTIONS
  //================
  //is for displaying main page
  function renderStore(){
    $('#bookmarks-list').html(generateMainPageHTML());

    //if Add Bookmark Form is false, then have '+' button, else show the form
    if (!STORE.addingFormVisible) {
      $('.add-bookmark').html('<button type="submit" id="js-plus-button">+</button>');
    } else {
      $('.add-bookmark').html(generateAddBookmarkHTML());
    }

    // if (!STORE.list[5]) {
    //   console.log(STORE.list[0]);
    //   $('#expanded-bookmark').html(generateExpandedPageHTML());
    // }
  }

  //   if (STORE.minimumStarRating) {
  //     $('container').html()
  // }

  // displaying expanded html unless item is not clicked
  // if (STORE.bookmarkList.list[5]) {
  //   $('container').html(generateExpandedPageHTML());
  // } else {
  //   $('container').html(generateMainPageHTML());
  // }

  //===============
  //EVENT LISTENERS
  //===============
  function handleExpandedView(){
    // when user clicks on bookmark
    $('#bookmarks-list').on('click', '.js-bookmark-element', function (event) {
      event.preventDefault();

      console.log('Bookmark click worked!');
      $('.js-bookmark-details').toggle().attr('data-id');
    });
  }

  function handleAddButton(){
    // when user clicks the plus sign to add bookmark
    $('.add-bookmark').on('click', '#js-plus-button', event => {
      event.preventDefault();
      console.log('add button clicked!');
      STORE.addingFormVisible = !STORE.addingFormVisible;
      renderStore();
    });
  }

  function handleAddBookmarkSubmit(){
    // user confirms adding bookmark after adding details
    $('.add-bookmark').on('click', '#js-add-bookmark-button', event => {
      event.preventDefault();
      console.log('Add Bookmark button clicked!');

      const newBookmarkTitle = $('.js-add-title').val();
      $('.js-add-title').val('');
      const newBookMarkDescription = $('.js-add-description').val();
      $('.js-add-description').val('');
      const newBookmarLink = $('.js-add-link').val();
      $('.js-add-link').val('');
      //const newBookMarkRating =

      api.createBookmarks(newBookmarkTitle, newBookMarkDescription, newBookmarLink)
        .then(res => res.json())
        .then((data) =>  {
          console.log(data);
          STORE.addBookmark(data);
          STORE.addingFormVisible = !STORE.addingFormVisible;
          renderStore();
        });
    });
  }

  function handleDeleteButtonOne(){
    // user clicks on delete button
    $('#bookmarks-list').on('click', '.js-delete-button', function(event) {
      event.preventDefault();
      console.log('delete button clicked');
      const bookmarkId = ($(this).closest('.js-bookmark-element').attr('data-id'));

      api.deleteBookmarks(bookmarkId)
        .then(res => res.json())
        .then(() => {
          STORE.deleteBookmark(bookmarkId);
          renderStore();
        });
    });
  }


  function handleSubmitButton(){
    // submits edit
  }

  function handleGoBackButton(){
    // cancel edit action
  }

  
  function handleCancelButton(){
    // cancel delete action
  }

 
 
  
  function bindEventListeners() {
    handleExpandedView();
    handleAddButton();
    handleAddBookmarkSubmit();
    handleDeleteButtonOne();
    handleCancelButton();
    renderStore();
  }

  return {
    renderStore: renderStore,
    bindEventListeners: bindEventListeners,
    //addDataToStoreAndRender: addDataToStoreAndRender
  };


}());


function addDataToStoreAndRender(list){
  list.forEach((listItem) => STORE.addBookmark(listItem));
  BookmarkList.renderStore();
}


$(document).ready(function() {
  BookmarkList.bindEventListeners();
  BookmarkList.renderStore();
  api.getBookmarks()
    .then(res => res.json())
    .then(data => addDataToStoreAndRender(data));
});

