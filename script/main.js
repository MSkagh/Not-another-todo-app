import { List } from "./list.js";
import { Task } from "./task.js";

//USER INPUTS
const todoInput = document.getElementById("new-todo-input");
const listInput = document.getElementById("new-list-input");
const addTodoButton = document.getElementById("add-todo-button");
const addListButton = document.getElementById("add-list-button");

const deleteListsButton = document.getElementById("delete-lists");

deleteListsButton.addEventListener("click", () => deleteAllLists());

const todoList = document.getElementById("todo-list")
const listList = document.getElementById("list-list")

addTodoButton.addEventListener("click", () => addTaskButtonAction());
addListButton.addEventListener("click", () => addListButtonAction());

let LOCAL_LISTS = JSON.parse(localStorage.getItem("lists")) || [];
const getSelectedList = ()=> LOCAL_LISTS.filter(list => list.selected === true)[0]

for (const item of LOCAL_LISTS) {
    createListElement(item)
}

const addTaskButtonAction = () => {
    if (!todoInput.value.trim()) return
    const selectedList = getSelectedList()
    const task = new Task(crypto.randomUUID(), todoInput.value, false)
    createTaskElement(task.name)
    selectedList.tasks.push(task)
    persistChanges()
}

const addListButtonAction = () => {
    if (!listInput.value.trim()) return
    const name = listInput.value
    const newList = new List(crypto.randomUUID(), name, false, [], true)
    createListElement(newList)
    LOCAL_LISTS.push(newList);
    listInput.value = "";
    persistChanges();
}

function createListElement(list) {
    deselectAllLists();
    const li = document.createElement("li");
    li.addEventListener("click", (e) => onListClick(e));
    li.innerHTML = list.name;
    listList.appendChild(li);
    
}

function createTaskElement(text){
    const li = document.createElement("li");
    li.innerHTML = text;
    li.addEventListener('click', (e) => onTaskClick(e))
    todoList.appendChild(li);
}

function onTaskClick(e){
    const name = e.target.innerHTML
    const indexOfTask = getSelectedList().tasks.findIndex((task => task.name === name))
    console.log(getSelectedList().tasks.slice(indexOfTask,1))
    persistChanges()
    loadTasks()
    
}

function onListClick(e) {
    deselectAllLists()
    LOCAL_LISTS.map((list)=> {if(list.name === e.target.innerHTML){list.selected = true}})
    console.log("List selected: " + e.target.innerHTML)
    loadTasks(e.target.innerHTML)
}

function loadTasks(){
    clearTasks();
    const selectedList = getSelectedList()
    for (const task of selectedList.tasks) {
            createTaskElement(task.name)
    }
    persistChanges();
}

function deselectAllLists() {
    for (const list of LOCAL_LISTS){
        list.selected = false;
    }
}

function persistChanges() {
    localStorage.setItem("lists", JSON.stringify(LOCAL_LISTS));
}

function clearTasks(){
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
