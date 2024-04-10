// Get HTML elements
const inputBox = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

let state = {
  todos: [],
};

function render() {
  todoList.innerHTML = "";

  state.todos.forEach((todo) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = "done";
    input.checked = todo.done;

    input.addEventListener("change", () => {
      todo.done = input.checked;
      localStorage.setItem("state", JSON.stringify(state));

      render();
    });

    const label = document.createElement("label");
    const todoText = document.createTextNode(todo.description);
    label.append(input, todoText);

    const listItem = document.createElement("li");
    listItem.append(label);

    todoList.append(listItem);
  });
}

//Event Listener for addButton & Enter
addButton.addEventListener("click", addNewTodo);
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
});

function addNewTodo() {
  const description = inputBox.value.trim();

  if (description === "") {
    alert("Please insert description");
    return;
  }

  for (let i = 0; i < state.todos.length; i++) {
    const todo = state.todos[i];
    if (todo.description.toLowerCase() === description.toLowerCase()) {
      alert("Todo already exists");
    }
  }

  if (description !== "") {
    const id = Date.now();
    state.todos.push({ id, description, done: false });

    localStorage.setItem("state", JSON.stringify(state));

    inputBox.value = "";

    render();
  }
}

function loadStateFromStorage() {
  const loadedState = localStorage.getItem("state");
  if (loadedState === null) {
    return;
  }
  state = JSON.parse(loadedState);
}

loadStateFromStorage();
render();
