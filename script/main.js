//USER INPUTS
const todoInput = document.getElementById("new-todo-input");
const listInput = document.getElementById("new-list-input");
const addTodoButton = document.getElementById("add-todo-button");
const addListButton = document.getElementById("add-list-button");

const deleteTodosButton = document.getElementById("delete-todos");
const deleteListsButton = document.getElementById("delete-lists");

deleteTodosButton.addEventListener("click", () => deleteAllTodos());
deleteListsButton.addEventListener("click", () => deleteAllLists());

const todoList = document.getElementById("todo-list")
const listList = document.getElementById("list-list")

addTodoButton.addEventListener("click", () => addTodoButtonAction());
addListButton.addEventListener("click", () => addListButtonAction());

let LOCAL_TODOS = JSON.parse(localStorage.getItem("todos")) || [];
let LOCAL_LISTS = JSON.parse(localStorage.getItem("lists")) || [];
const getSelectedList = ()=> document.querySelector("[data-selected=true]")

for (const item of LOCAL_LISTS) {
    createListItem(item)
}

const addTodoButtonAction = () => {
    if (!todoInput.value.trim()) return
    const selectedList = getSelectedList()
    const todo = {
        parent: selectedList.innerHTML,
        completed: false,
        text: todoInput.value
    }
    createTodoItem(todo.text)
    LOCAL_TODOS.push(todo)
    persistChanges()
}

const addListButtonAction = () => {
    if (!listInput.value.trim()) return
    const name = listInput.value
    createListItem(name)
    LOCAL_LISTS.push(name);
    persistChanges();
    listInput.value = "";
}

function createListItem(listName) {
    deselectAllLists();
    const li = document.createElement("li");
    li.addEventListener("click", (e) => onListClick(e));
    li.dataset.selected = true;
    li.innerHTML = listName;
    listList.appendChild(li);
}

function createTodoItem(text){
    const li = document.createElement("li");
    li.innerHTML = text;
    todoList.appendChild(li);
}

function onListClick(e) {
    deselectAllLists()
    e.target.dataset.selected = true
    console.log("List selected: " + e.target.innerHTML)
    loadTodo(e.target.innerHTML)
}

function loadTodo(name){
    clearTodos();
    for (let i = 0; i < LOCAL_TODOS.length; i++) {
        if (LOCAL_TODOS[i].parent === name){
            createTodoItem(LOCAL_TODOS[i].text)
        }
    }
}

function deselectAllLists() {
    for (const child of listList.children) {
        child.dataset.selected = false
    }
}

function persistChanges() {
    localStorage.setItem("todos", JSON.stringify(LOCAL_TODOS));
    localStorage.setItem("lists", JSON.stringify(LOCAL_LISTS));
}

function clearTodos(){
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}

function deleteAllTodos() {
    LOCAL_TODOS = []
    persistChanges()
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}
function deleteAllLists() {
    LOCAL_LISTS = []
    persistChanges()
    while (listList.firstChild) {
        listList.removeChild(listList.firstChild)
    }
}
