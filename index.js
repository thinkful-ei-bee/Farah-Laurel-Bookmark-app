'use strict';
/* global $, STORE, api */

//=================
//MARK UP FUNCTIONS
//=================
const BookmarkList = (function () {
  function generateMainPageHTML(){ 
    const bookmarks = STORE.list.map(bookmark => 
      ` <div class="js-bookmark-main">
      <p>${bookmark.title}</p>
      <p>${bookmark.rating}</p> 
      </div>

      <div class="js-bookmark-details">
      <p>${bookmark.title}</p>
      <p>${bookmark.rating}</p>
      <p>${bookmark.description}</p>
      <p>${bookmark.link}</p>

        <div class="js-detail-buttons">
          <button id="js-edit-button" type="button">Edit</button>
          <button id="js-delete-button" type="button">Delete</button>
        </div>
      </div> `);
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
    $('#bookmarks-list').on('click', '.js-bookmark-main', event => {
      event.preventDefault();
      console.log('Bookmark click worked!');
      $('.js-bookmark-details').toggle();
    
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

      // const newBookmarkTitle = $('.js-add-title').val();
      // $('.js-add-title').val('');
      // const newBookMarkDescription = $('.js-add-description').val();
      // $('.js-add-description').val('');
      // const newBookmarLink = $('.js-add-link').val();
      // $('.js-add-link').val('');
      // //const newBookMarkRating =

      // api.createBookmarks(newBookmarkTitle, newBookMarkDescription, newBookmarLink)
      //   .then((newTitle, newDescription, newLink) => {
      //     STORE.list.addBookmark(newTitle, newDescription, newLink);
          STORE.addingFormVisible = !STORE.addingFormVisible;
          renderStore();
        });
    //});
  }

  // function handleEditButton(){
  //   // user clicks on edit button
  //   $('.js-detail-buttons').on('click', '#js-edit-button', event => {
  //     event.preventDefault();
  //     console.log('edit button clicked');
  //   });
  // }

  function handleSubmitButton(){
  // submits edit
  }

  function handleGoBackButton(){
  // cancel edit action
  }

  function handleDeleteButtonOne(){
  // user clicks on delete button
    $('#bookmarks-list').on('click', '#js-delete-button', event => {
      event.preventDefault();
      console.log('delete button clicked');
    });
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

  }

  
  return {
    renderStore: renderStore,
    bindEventListeners: bindEventListeners
  };

}());