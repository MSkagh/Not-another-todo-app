import { List } from "./list.js";
import { Todo } from "./todo.js";

//USER INPUTS
const todoInput = document.getElementById("new-todo-input");
const listInput = document.getElementById("new-list-input");
const addTodoButton = document.getElementById("add-todo-button");
const addListButton = document.getElementById("add-list-button");

const deleteTodosButton = document.getElementById("delete-todos");
const deleteListsButton = document.getElementById("delete-lists");

deleteTodosButton.addEventListener("click", () => clearTodos());
deleteListsButton.addEventListener("click", () => clearLists());

const todoList = document.getElementById("todo-list")
const listList = document.getElementById("list-list")

addTodoButton.addEventListener("click", () => addTodoButtonAction());
addListButton.addEventListener("click", () => addListButtonAction());

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let lists = JSON.parse(localStorage.getItem("lists")) || [];
let selectedList = document.querySelector("[data-selected=true]")

for (const item of lists) {
    createListItem(item)
}

const addTodoButtonAction = () => {
    console.log(selectedList)
}

const addListButtonAction = () => {
    const name = listInput.value
    createListItem(name)
    lists.push(name);
    persistChanges();
    listInput.value = "";
}

function createListItem(name) {
    const li = document.createElement("li")
    li.addEventListener("click", (e) => onListClick(e))
    li.dataset.selected = true
    li.dataset.name = name
    li.innerHTML = name
    listList.appendChild(li);
}

function onListClick(e) {
    console.log("Clicked")
}

function deselectAllLists() {
    for (const child of listList.children) {
        child.dataset.selected = false
    }
}

function persistChanges() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("lists", JSON.stringify(lists));
}

function clearTodos() {
    todos = []
    persistChanges()
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}
function clearLists() {
    lists = []
    persistChanges()
    while (listList.firstChild) {
        listList.removeChild(listList.firstChild)
    }
}
