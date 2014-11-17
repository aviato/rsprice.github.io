// a √ in a comment after a function means that it has passed review alongside the source code


//Global variables
var newItem = document.getElementById("addItem");             //add item input
var addButton = document.getElementsByTagName("button")[0];   //first button
var toDoList = document.getElementById("incompleteUl");       //to do
var completedList = document.getElementById("completeUl");    //complete


//create a new list item
var createNewListItem = function (formInputString) {

/*

  createNewList does a few different things:

    * 1.) it first creates a bunch of variables that will be appended to a new li on creation.
    * 2.) sets some attributes for the new elements created in step 1
    * 3.) appends the new elements to each li when it is made

*/

  // 1.) create variables:
  var listItem = document.createElement("li");          //create new li
  var checkBox = document.createElement("input");       //create new checkbox
  var label = document.createElement("label");          //create new label
  var editInput = document.createElement("input");      //create new edit input
  var editButton = document.createElement("button");    //create new edit button
  var deleteButton = document.createElement("button");  //create new delete button


  // 2.) set attributes
  checkBox.type = "checkbox";         //sets the type attribute of checkBox to "checkbox"
  editInput.type = "text";            //sets the type attribute of editInput to "text" (a basic html input)
  editButton.innerText = "Edit";      //sets the editButton's text to "Edit"
  editButton.className = "edit";      //sets the editButton's class name to "edit"
  deleteButton.innerText = "Delete";  //sets the deleteButton's text to "Delete"
  deleteButton.className = "delete";  //sets the deleteButton's class name to "delete"

  //the label text is set to the argument of createNewTaskElement
  label.innerText = formInputString;

  // 3.) append children
  listItem.appendChild(checkBox);     //appends a checkbox input to the li
  listItem.appendChild(label);        //appends a label to the li
  listItem.appendChild(editInput);    //appends
  listItem.appendChild(editButton);   //appends a checkbox input to the li
  listItem.appendChild(deleteButton); //appends a checkbox input to the li

  return listItem;
}


// add item to the to do list
var addItem = function () {

  //defining new li
  var listItem = createNewListItem(newItem.value);

  // appends a new list item to #incompleteul (the to do list)
  toDoList.appendChild(listItem);

  //calls the bindEvents function with listItem, and completeItem as parameters
  bindEvents(listItem, completeItem);   //bindEvents defined on ln. 154

  //new item's value attribute is set to an empty string?? Confused by this**
  newItem.value= "";

  //test -- if function is working this will log a message to the console
  console.log("added to \"To Do\"");

}


// edit item on the to do list
var editItem = function () {

  //listItem is set to
  var listItem = this.parentNode;

  //editInput is a text input
  var editInput = listItem.querySelector("input[type=text]")

  //label is the first label within the listItem
  var label = listItem.querySelector("label");

  //containsClass queries the classList for a class called "editMode"
  var containsClass = listItem.classList.contains("editMode")


  //if the Parent Node contains the "editMode" class
  if (containsClass) {

    //changes the label text to the value attribute of editInput
    label.innerText = editInput.value;

  //if the Parent Node does NOT contain "editMode" class
  } else {

    //the editInput value is set label elements text
    editInput.value = label.innerText;

  }

  //toggles the editMode class when function is called
  listItem.classList.toggle("editMode");


  //test
  console.log("editing item in \"To Do\"");

}


// delete item from to do list
var deleteItem = function () {

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  ul.removeChild(listItem);

  console.log("deleted item in \"To Do\"");

}


// checkbox click moves item to the Completed list
var completeItem = function () {

  var listItem = this.parentNode;
  completedList.appendChild(listItem);

  // i have no idea what im doing
  bindEvents(listItem, incompleteItem);

  // test
  console.log("item marked as complete, added to \"Complete\"");

}


// checkbox click moves item to the To Do list
var incompleteItem = function () {

  var listItem = this.parentNode;
  toDoList.appendChild(listItem);

  bindEvents(listItem, completeItem);

  //test
  console.log("item marked as incomplete, added to \"To Do\"")

}


var bindEvents = function(taskListItem, checkBoxEventHandler) {

  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editItem;
  deleteButton.onclick = deleteItem;
  checkBox.onchange = checkBoxEventHandler;

}


var ajaxRequest = function() {
  console.log("AJAX request");
}


//Set the click handler to the addTask function
addButton.addEventListener("click", addItem);
addButton.addEventListener("click", ajaxRequest);

//loop through list items in To Do
for (var i = 0; i < toDoList.children.length; i++) {

  bindEvents(toDoList.children[i], completeItem);

}


//loop through list items in CompletedList  -  √
for (var i = 0; i < completedList.children.length; i++) {
  //in this case bindEvents will loop through every list item
  //and will
  bindEvents(completedList.children[i], incompleteItem);
}
