'use strict';
/* global $, STORE, api */

//=================
//MARK UP FUNCTIONS
//=================
const BookmarkList = (function () {
  function generateMainPageHTML(list){ 
    console.log(list);
    const bookmarks = list.map(bookmark => 
      `<ul> 
      <li class="js-bookmark-element" data-id="${bookmark.id}">
        <p>${bookmark.title}</p>
        <p>${bookmark.rating}/5</p>

        <div class="js-bookmark-details" data-id="${bookmark.id}">
            <p class="bookmark-desc">${bookmark.desc}</p>
            <p class="bookmark-url"><a href="${bookmark.url}">Visit site</a></p>

            <div class="js-detail-buttons">
                <button class="js-delete-button" type="button">Delete</button>
            </div>
        </div>
    
          </li>
          </ul> `);
    return bookmarks;
  }

  function generateAddBookmarkHTML(){
    return `
      <form>
        <label class="add-bookmark-label" for="add-bookmark">Add Boommark:</label>
        <input type="add-title" class="js-add-title" placeholder="Title" required>
        <input type="add-link" class="js-add-link" placeholder="Link" required>
        <input type="add-description" class="js-add-description" placeholder="Description">
        <br>
      
        <div class="star-buttons">
        <label><input class="star-buttons" type="radio" name="radio" value="1"><span> ☆ </span><br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="2"><span> ☆ ☆</span><br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="3"><span> ☆ ☆ ☆</span><br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="4"><span> ☆ ☆ ☆ ☆</span><br></label>
        <label><input class="star-buttons" type="radio" name="radio" value="5"><span> ☆ ☆ ☆ ☆ ☆</span><br></label>
        </div>
        
        
        <button type="submit" id="js-add-bookmark-button">Add Bookmark</button>
        <button type="submit" id="js-cancel-bookmark-button">Cancel</button>
      </form>`;
  }

  

  //================
  //RENDER FUNCTIONS
  //================
  //is for displaying main page
  function renderStore(){
    // if there is an error message, remove when page renders 
    $('.error-message').empty();

    // Filter
    let filterBookmarks = STORE.list.filter(bookmark => bookmark.rating >= STORE.minimumRating);
    console.log(filterBookmarks);
    let filteredBookmarks = generateMainPageHTML(filterBookmarks);
    $('#bookmarks-list').html(filteredBookmarks);

    if(STORE.error){
      $('.error-message').html(`${STORE.error}<button type="button" id="error-button"> Clear error message</button>`);
    }

    //if Add Bookmark Form is false, then have '+' button, else show the form
    if (!STORE.addingFormVisible) {
      $('.add-bookmark').html('<button type="submit" id="js-plus-button">+</button>');
    } else {
      $('.add-bookmark').html(generateAddBookmarkHTML());
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
      console.log(value);
      STORE.minimumRating = value;
      renderStore();
    });
  }

  function handleExpandedView(){
    // when user clicks on bookmark
    $('#bookmarks-list').on('click', '.js-bookmark-element', function (event) {
      //event.preventDefault();

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
        //.then(res => res.json())
        .then((data) =>  {
          STORE.addBookmark(data);
          STORE.addingFormVisible = !STORE.addingFormVisible;
          renderStore();
        })
        .catch(err => {
          console.log('TEST ERROR from handleAddBookmarkSubmit', err.message);
          addErrorToStoreAndRender(err.message); });
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

  function addErrorToStoreAndRender(error){
    STORE.error = error;
    BookmarkList.renderStore();
  }

  function handleClearError(){
    $('.error-message').on('click', '#error-button', event => {
      console.log('clear button clicked');
      STORE.error = null;
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
    handleClearError();
    addErrorToStoreAndRender();
    renderStore();
  }

  return {
    renderStore: renderStore,
    bindEventListeners: bindEventListeners,
  };
}());



