import { List } from "./list.js";
import { LocalData } from "./localData.js";
import { Task } from "./task.js";

//USER INPUTS
const taskInput = document.getElementById("new-task-input");
const todoInput = document.getElementById("new-todo-input");

const deleteListsButton = document.getElementById("delete-lists");

deleteListsButton.addEventListener("click", () => deleteAllLists());

const taskList = document.getElementById("task-list")
const todoList = document.getElementById("todo-list")

taskInput.addEventListener("keydown", (e) => addTaskButtonAction(e));
todoInput.addEventListener("keydown", (e) => addListButtonAction(e));

const storage = new LocalData();

function loadLists(){
    for (const item of storage.LOCAL_LISTS) {
        const list = new List(item)
        list.createListElement()
    }
}


const addTaskButtonAction = (e) => {
    if (!taskInput.value.trim()) return
    if (e.key !== "Enter") return
    const task = new Task(crypto.randomUUID(), taskInput.value, false, new Date(Date.now()))
    task.createTaskElement()
    storage.saveTask(task)
    taskInput.value = ""
}

const addListButtonAction = (e) => {
    if (!todoInput.value.trim()) return
    if (e.key !== "Enter") return
    deselectAllLists()
    const name = todoInput.value
    const listObject = storage.createListDTO(crypto.randomUUID, name, false, new Date(Date.now()), [], true)
    const newList = new List(listObject)
    storage.saveList(newList)
    newList.createListElement();
    todoInput.value = "";

    
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
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

function deleteAllLists() {
    storage.deleteAllLists()
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}
loadLists()
loadTasks()