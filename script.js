// Get HTML elements
const inputBox = document.getElementById("input-box");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// State

// Render
function addNewTodo() {
  const inputString = inputBox.value.trim(); // Remove leading/trailing spaces from inputBox
  if (inputString !== "") {
    const newTodo = new Todo(inputString); // Create newTodo with Object class Todo
    generateNewListItem(newTodo);
  }
  function generateNewListItem(newTodo) {
    const newListItem = document.createElement("li");
    newListItem.textContent = newTodo.description;
    newListItem.setAttribute("id", newTodo.id);
    todoList.appendChild(newListItem);
    generateCheckboxForNewListItem(newTodo);
  }
  function generateCheckboxForNewListItem(newTodo) {
    const newInput = document.createElement("input");
    newInput.setAttribute("type", "checkbox", "id", newTodo.id);
    document.getElementById(newTodo.id).appendChild(newInput);
    refreshInputBox();
  }
  function refreshInputBox() {
    inputBox.value = "";
  }
}

// Event Listener
addButton.addEventListener("click", addNewTodo);
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
});

// Class
class Todo {
  static idCounter = 0;

  constructor(description) {
    this.description = description;
    this.id = Todo.generateUniqueId();
  }

  static generateUniqueId() {
    return ++Todo.idCounter;
  }
}
