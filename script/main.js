import { List } from "./list.js";
import { LocalData } from "./localData.js";
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

const storage = new LocalData();

function loadLists(){
    for (const item of storage.LOCAL_LISTS) {
        const list = new List(item)
        list.createListElement()
    }
}


const addTaskButtonAction = () => {
    if (!todoInput.value.trim()) return
    const task = new Task(crypto.randomUUID(), todoInput.value, false, new Date(Date.now()))
    task.createTaskElement()
    storage.saveTask(task)
}

const addListButtonAction = () => {
    if (!listInput.value.trim()) return
    deselectAllLists()
    const name = listInput.value
    const listObject = storage.createListDTO(crypto.randomUUID, name, false, new Date(Date.now()), [], true)
    const newList = new List(listObject)
    storage.saveList(newList)
    newList.createListElement();
    listInput.value = "";

    
}

export function loadTasks(){
    clearTasks();
    const selectedList = storage.getSelectedList()
    if (!selectedList) return
    for (const task of selectedList.tasks) {
            const {id, name, completed, creationDate} = task;
            new Task(id, name, completed, creationDate).createTaskElement()
    }
}

export function deselectAllLists() {
    for (const list of storage.LOCAL_LISTS){
        list.selected = false;
    }
}

function clearTasks(){
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}

function deleteAllLists() {
    storage.deleteAllLists()
    while (listList.firstChild) {
        listList.removeChild(listList.firstChild)
    }
}
loadLists()
loadTasks()