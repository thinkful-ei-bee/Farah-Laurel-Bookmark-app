'use strict';
/* global $, STORE */

//=================
//MARK UP FUNCTIONS
//=================
function generateMainPageHTML(){ 
  const bookmarks = STORE.list.map(bookmark => 
    ` <p>${bookmark.title}</p>
      <p>${bookmark.rating}</p> `);
  return bookmarks;

  /*for (let i = 0; i < STORE.list.length; i++){
    return  `
    <div class="bookmark-box">
        <p>${STORE.list[i].title}</p> 
        <p>${STORE.list[i].rating}</p> 
    </div>`;
  } */
}

function generateExpandedPageHTML(bookmark){
 return ` 
        <p>${STORE.list[0]}</p>
        <p>${STORE.list.rating} </p>
        <p>${STORE.list.description}</p>
        <p>${STORE.list.link}</p>
        <button type="button">Edit</button>
        <button type="button">Delete</button> `;
}

function generateAddBookmarkHTML(){
  return `
    <form>
      <p>Add Boommark</p>
      <input type="add-title" class="js-add-title" placeholder="Title">
      <input type="add-link" class="js-add-link" placeholder="Link">
      <input type="add-description" class="js-add-description" placeholder="Description">
      <button type="submit">Add Bookmark</button>
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
    $('.add-bookmark').html('<button>+</button>');
  } else {
    $('.add-bookmark').html(generateAddBookmarkHTML());
  }

  // if (!STORE.list[5]) {
  //   console.log(STORE.list[0]);
  //   $('#expanded-bookmark').html(generateExpandedPageHTML());
  // }

}

//
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
}

function handleAddButton(){
  // when user clicks the plus sign to add bookmark
  $('.add-bookmark').on('click', event => {
    event.preventDefault();
    console.log('add button clicked!');
    STORE.addingFormVisible = !STORE.addingFormVisible;
    renderStore();
  });
}

function handleAddBookmarkButton(){
  // user confirms adding bookmark after adding details
  $('.add-bookmark').on('submit', event => {
    event.preventDefault();
    console.log('Add Bookmark button clicked!');
  });
}

function handleEditButton(){
  // user clicks on edit button
}

function handleSubmitButton(){
  // submits edit
}

function handleGoBackButton(){
  // cancel edit action
}

function handleDeleteButtonOne(){
  // user clicks on delete button
}

function handleDeleteButtonTwo(){
  // delete confirmation
}

function handleCancelButton(){
  // cancel delete action
}


function main(){
  handleExpandedView();
  handleAddButton();
  handleAddBookmarkButton();
  handleEditButton();
  handleGoBackButton();
  handleDeleteButtonOne();
  handleDeleteButtonTwo();
  handleCancelButton();
  renderStore();
  
}

$(main);