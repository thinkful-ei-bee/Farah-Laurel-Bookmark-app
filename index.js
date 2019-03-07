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
        

        <div class="js-bookmark-details" data-id="${bookmark.id}">
        <p>${bookmark.desc}</p>
        <p>${bookmark.url}</p>

          <div class="js-detail-buttons">
            <button class="js-delete-button" type="button">Delete</button>
          </div>
          </li>
          </ul> `);
    return bookmarks;
  }

  function generateAddBookmarkHTML(){
    return `
      <form>
        <p>Add Boommark</p>
        <input type="add-title" class="js-add-title" placeholder="Title">
        <input type="add-link" class="js-add-link" placeholder="Link">
        <input type="add-description" class="js-add-description" placeholder="Description">
        <br>
        
        <label><input class="star-buttons" type="radio" name="radio" value="1"> &#9733<br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="2"> &#9733 &#9733<br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="3"> &#9733 &#9733 &#9733<br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="4"> &#9733 &#9733 &#9733 &#9733<br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="5"> &#9733 &#9733 &#9733 &#9733 &#9733<br></label>
        
        <button type="submit" id="js-add-bookmark-button">Add Bookmark</button>
        <button type="submit" id="js-cancel-bookmark-button">Cancel</button>
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

    if(STORE.error){
      $('.error-message').html(`${STORE.error}<button type="button" id="error-button"> Clear error message</button>`);
    }
  }

  //===============
  //EVENT LISTENERS
  //===============
  function handleRatingFilter(){
    $('.filter-menu').on('change', '#dropdown', event => {
      event.preventDefault();

      console.log('dropdown menu option clicked!');
      const value = event.currentTarget.value;
     
      const bookmarks = STORE.list.filter(bookmark => bookmark.rating >= value);
      renderStore();
    });
  }
  function handleExpandedView(){
    // when user clicks on bookmark
    $('#bookmarks-list').on('click', '.js-bookmark-element', function (event) {
      event.preventDefault();

      console.log('Bookmark click worked!');
      const element = $(event.currentTarget);
      const id = element.data('id');

      $(`.js-bookmark-details[data-id="${id}"]`).toggle();
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
      const newBookMarkRatingValue = $('.star-buttons:checked').val();

      api.createBookmarks(newBookmarkTitle, newBookMarkDescription, newBookmarLink, newBookMarkRatingValue)
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
  
  function handleCancelButton(){
    // cancel delete action
    $('.add-bookmark').on('click', '#js-cancel-bookmark-button', event => {
      event.preventDefault();
      console.log('Cancel  buttonclicked!');
      STORE.addingFormVisible = !STORE.addingFormVisible;
      renderStore();
    });
  }

  function bindEventListeners() {
    handleRatingFilter();
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

