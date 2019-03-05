'use strict';
/* global $, STORE */


//MARK UP 
function generateMainPageHTML(bookmark){
  return `
    <div class="bookmark-box">
        <p>${bookmark.title}</p> 
        <p>${bookmark.rating}</p>
    </div>`;
}

function generateExpandedPageHTML(bookmark){
  return `<div class="bookmark-box">
        <p>${bookmark.title}</p> 
        <p>${bookmark.rating}</p>
    </div>

    <div class="expanded-bookmark">
        <p>${bookmark.title}</p>
        <p>${bookmark.description} </p>
        <p>${bookmark.link}</p>
        <p>${bookmark.rating}</p>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
    </div>`;
}

function generateAddBookmarkHTML(bookmark){
  return `
  <div class="bookmark-box">
        <p>${bookmark.title}</p> 
        <p>${bookmark.rating}</p>
    </div>
  
    <form>
      <p>Add Boommark</p>
      <input type="add-title" class="js-add-title" placeholder="Title">
      <input type="add-link" class="js-add-link" placeholder="Link">
      <input type="add-description" class="js-add-description" placeholder="Description">
      <button type="submit">Add Bookmark</button>
    </form>`;
}

//RENDER FUNCTIONS
function renderStore(){
  
}





//EVENT LISTENERS
function handleExpandedView(){
  // when user hovers over bookmark
}

function handleAddButton(){
  // when user clicks the plus sign to add bookmark
}

function handleAddBookmarkButton(){
  // user confirms adding bookmark after adding details
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
}

$(main);