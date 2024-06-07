import { List } from "./list.js";
import { Todo } from "./todo.js";
const todoInput = document.getElementById("new-todo-input");
const addTodoButton = document.getElementById("add-todo-button");
const listInput = document.getElementById("new-list-input");
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

function reRender(){
    while(todoList.firstChild){
        todoList.removeChild(todoList.firstChild)
    }
    while(listList.firstChild){
        listList.removeChild(listList.firstChild)
    }
    for (const item of todos){
        const li = document.createElement("li");
        li.innerHTML = item
        todoList.appendChild(li);
    }
    
    for (const item of lists){
        const li = document.createElement("li");
        li.innerHTML = item
        listList.appendChild(li);
    }
}
reRender()
const addTodoButtonAction = () => {
    const li = document.createElement("li");
    li.innerHTML = todoInput.value;
    todoList.appendChild(li);
    todos.push(todoInput.value);
    persistChanges();
    todoInput.value = "";
}

const addListButtonAction = () => {
    const li = document.createElement("li");
    li.innerHTML = listInput.value;
    listList.appendChild(li);
    lists.push(listInput.value);
    persistChanges();
    listInput.value = "";
}


function persistChanges() {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("lists", JSON.stringify(lists));
}

function clearTodos(){
    todos = []
    persistChanges()
    reRender()
}
function clearLists(){
    lists = []
    persistChanges()
    reRender()
}
