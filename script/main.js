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


function render(){
    clearTasks()
    clearLists()
    loadLists()
    loadTasks()
}


function loadLists(){
    for (const list of storage.getLists()) {
        
        list.renderElement(()=>{
            storage.setSelectedList(list.name)
            render()
        });
    }
}

const addTaskButtonAction = (e) => {
    if (!taskInput.value.trim()) return
    if (e.key !== "Enter") return
    const task = new Task(taskInput.value, false, new Date(Date.now()))
    task.createTaskElement()
    storage.saveTask(task)
    taskInput.value = ""
}

const addListButtonAction = (e) => {
    if (!todoInput.value.trim()) return
    if (e.key !== "Enter") return
    const name = todoInput.value
    const newList = new List(name, false, [], true)
    storage.saveList(newList)
    todoInput.value = "";   
    render()
}

export function loadTasks(){
    const selectedList = storage.getSelectedList();
    if (!selectedList) return
    for (const task of selectedList.tasks) {
            const {name, completed, creationDate} = task;
            new Task(name, completed, creationDate).createTaskElement()
    }
}

function clearTasks(){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

function clearLists(){
    while(todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}

function deleteAllLists() {
    storage.deleteAllLists()
    clearLists()
}


render()