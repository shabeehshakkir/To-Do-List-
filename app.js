//selectors
const todoInput = document.querySelector("#input");
const todoButton = document.querySelector("#button");
const todoList = document.querySelector(".todo-list");
const completedList = document.querySelector(".completed-list");

//Event Listners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", todoClicked);
completedList.addEventListener("click", todoClicked);
document.addEventListener("DOMContentLoaded", getTodos);

//Functions

// gets the todos from localstorage and loads it into the todos
// This gets called on DOMContentLoaded
function getTodos() {
    // todos
    let todos = localStorage.getItem("todos");
    if (todos === null || todos.length === 0) {
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo) => {
            loadTodo(todo);
        });
    }

    // completed todos
    let completed = localStorage.getItem("completed");
    if (completed === null || completed.length === 0) {
        completed = [];
        localStorage.setItem("completed", JSON.stringify(completed));
    } else {
        todos = JSON.parse(localStorage.getItem("completed"));
        todos.forEach((todo) => {
            loadCompletedTodos(todo);
        });
    }
}

// creates a new todoDiv
function createNewTodo(task, completed = false) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const newTodo = document.createElement("li");
    newTodo.innerHTML = task;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    if (completed) todoDiv.classList.toggle("completed");

    todoDiv.appendChild(trashButton);

    return todoDiv;
}

function addTodo(event) {
    event.preventDefault();
    const task = todoInput.value;
    const todoDiv = createNewTodo(task);

    saveTodo(todoInput.value, "todos");
    todoInput.value = "";

    todoList.appendChild(todoDiv);
}

function loadTodo(task) {
    const todoDiv = createNewTodo(task);
    todoList.appendChild(todoDiv);
}

function loadCompletedTodos(task) {
    const completed = true;
    const todoDiv = createNewTodo(task, completed);
    completedList.appendChild(todoDiv);
}

function todoClicked(e) {
    const item = e.target;
    const todo = item.parentElement;
    const section = todo.parentElement.parentElement.classList[0];
    const task = todo.querySelector(".todo-item").innerHTML;

    if (item.classList[0] === "trash-btn") deleteTodo(todo, task, section);

    if (item.classList[0] === "complete-btn") completeTodo(todo, task, section);
}

function deleteTodo(todo, task, section) {
    const name = section === "todo-container" ? "todos" : "completed";
    deleteTodoFromLocal(task, name);
    todo.remove();
}

function completeTodo(todo, task, section) {
    if (section === "todo-container") checkTodo(todo, task);
    else unCheckTodo(todo, task);
}

function checkTodo(todo, task) {
    todo.classList.toggle("completed");
    completedList.appendChild(todo);
    deleteTodoFromLocal(task, "todos");
    saveTodo(task, "completed");
}

function unCheckTodo(todo, task) {
    todo.classList.toggle("completed");
    todoList.appendChild(todo);
    deleteTodoFromLocal(task, "completed");
    saveTodo(task, "todos");
}

function saveTodo(task, name) {
    let todos = JSON.parse(localStorage.getItem(name));

    if (!todos) {
        todos = [];
    }

    todos.push(task);
    localStorage.setItem(name, JSON.stringify(todos));
}

function deleteTodoFromLocal(todo, name) {
    let todos = localStorage.getItem(name);

    if (todos === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem(name));
    }

    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem(name, JSON.stringify(todos));
}