// Get HTML elements
const inputBox = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// State
// State todos
let state = {
  todos: [],
};

// Render
// Render todos
function renderState() {
  todoList.innerHTML = ""; // Delete all HTML elements in <ul>

  state.todos.forEach((todo) => {
    // Iterate through the State Object
    const listItem = document.createElement("li");
    const label = document.createElement("label");

    listItem.todoObj = todo;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    label.appendChild(checkbox);
    const todoText = document.createTextNode(todo.description);
    label.append(todoText);
    listItem.appendChild(label);
    todoList.appendChild(listItem);
  });
}

renderState();

// Event Listener
// Event Listener for checkbox
todoList.addEventListener("change", (e) => {
  const checkbox = e.target;
  const liElement = checkbox.parentElement;
  const todo = liElement.todoObj;

  todo.done = checkbox.checked;
});

//Event Listener for addButton & Enter
addButton.addEventListener("click", addNewTodo);
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
});

function addNewTodo() {
  const description = inputBox.value.trim(); // Remove leading/trailing spaces from inputBox
  if (description !== "") {
    const timeStamp = Date.now();
    const newTodo = { description: description, done: false, id: timeStamp };
    state.todos.push(newTodo);
    inputBox.value = "";
  }
  renderState();
}

// // Render
// function addNewTodo() {
//   const inputString = inputBox.value.trim(); // Remove leading/trailing spaces from inputBox
//   if (inputString !== "") {
//     const newTodo = new Todo(inputString); // Create newTodo with Object class Todo
//     generateNewListItem(newTodo);
//   }
//   function generateNewListItem(newTodo) {
//     const newListItem = document.createElement("li");
//     newListItem.textContent = newTodo.description;
//     newListItem.setAttribute("id", newTodo.id);
//     todoList.appendChild(newListItem);
//     generateCheckboxForNewListItem(newTodo);
//   }
//   function generateCheckboxForNewListItem(newTodo) {
//     const newInput = document.createElement("input");
//     newInput.setAttribute("type", "checkbox", "id", newTodo.id);
//     document.getElementById(newTodo.id).appendChild(newInput);
//     refreshInputBox();
//   }
//   function refreshInputBox() {
//     inputBox.value = "";
//   }
// }

// // Event Listener
// addButton.addEventListener("click", addNewTodo);
// inputBox.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     addNewTodo();
//   }
// });

// // Class
// class Todo {
//   static idCounter = 0;

//   constructor(description) {
//     this.description = description;
//     this.id = Todo.generateUniqueId();
//   }

//   static generateUniqueId() {
//     return ++Todo.idCounter;
//   }
// }
