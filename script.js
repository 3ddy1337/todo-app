// Get HTML elements
const inputBox = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");
const all = document.getElementById("all");
const open = document.getElementById("open");
const done = document.getElementById("done");
const removeButton = document.getElementById("remove-button");

// State
let state = {
  todos: [],
  filter: "",
};

// Load state from storage
function loadStateFromStorage() {
  const loadedState = localStorage.getItem("state");
  // Stop if null
  if (loadedState === null) {
    return;
  }
  state = JSON.parse(loadedState);
  render();
}

// Save state to local storage
function saveState() {
  localStorage.setItem("state", JSON.stringify(state));
}

// Render
function render() {
  // Emptys list
  todoList.innerHTML = "";

  // For each Obj in state.todos =>
  state.todos.forEach((todo) => {
    // Filter
    if (done.checked && !todo.done) {
      return;
    }
    if (open.checked && todo.done) {
      return;
    }

    // Create <input>
    const input = document.createElement("input");
    // Add type = checkbox
    input.type = "checkbox";
    // Assign the value of done to the checkbox
    input.checked = todo.done;
    // Add name = done
    input.name = "done";

    // Event Listener for change on checkbox
    input.addEventListener("change", () => {
      // Listen and change done and assign to input.checked in todo scope
      todo.done = input.checked;
      // Save todo scope to local storage
      saveState();
      // Restart render
      render();
    });

    // Create <label>
    const label = document.createElement("label");

    // Push <input> and todo.description into <label>
    label.append(input, todo.description);

    // Create <li>
    const listItem = document.createElement("li");

    // Push <label> into <li>
    listItem.append(label);

    // Push <li> into <ul>
    todoList.append(listItem);
  });

  // Sync filter
  if (state.filter == "all") {
    all.checked = true;
  }
  if (state.filter == "open") {
    open.checked = true;
  }
  if (state.filter == "done") {
    done.checked = true;
  }
}

// Add new todo
function addNewTodo() {
  // Remove spaces
  const description = inputBox.value.trim();

  // Stop function if string is empty
  if (description === "") {
    alert("Please insert description");
    return;
  }

  // Stop function if duplicates
  for (let i = 0; i < state.todos.length; i++) {
    const todo = state.todos[i];
    if (todo.description.toLowerCase() === description.toLowerCase()) {
      alert("Todo already exists");
      return;
    }
  }

  // Create new todo
  if (description !== "") {
    const id = Date.now();
    state.todos.push({ id, description, done: false });

    saveState();

    inputBox.value = "";

    render();
  }
}

//Event Listener
addButton.addEventListener("click", addNewTodo);
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addNewTodo();
  }
});

all.addEventListener("change", () => {
  state.filter = "all";
  saveState();
  render();
});

open.addEventListener("change", () => {
  state.filter = "open";
  saveState();
  render();
});

done.addEventListener("change", () => {
  state.filter = "done";
  saveState();
  render();
});

// Remove done todos
removeButton.addEventListener("click", () => {
  state.todos = state.todos.filter((todo) => !todo.done);
  saveState();
  render();
});

loadStateFromStorage();
render();
