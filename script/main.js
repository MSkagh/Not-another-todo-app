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


function render() {
    clearTasks()
    clearLists()
    loadLists()
    loadTasks()
}


function loadLists() {
    for (const list of storage.getLists()) {
        const onClick = () => {
            storage.setSelectedList(list.id)
            render()
        }
        const onDelete = () => {
            storage.deleteListById(list.id)
            render()
        }
        const onEdit = () => {
            alert("edit")
        }
        list.renderElement(onClick, onDelete, onEdit);
    }
}

const addTaskButtonAction = (e) => {
    if (!taskInput.value.trim()) return
    if(!storage.getSelectedList()) return
    if (e.key !== "Enter") return
    const task = new Task(taskInput.value, false, new Date(Date.now()))
    task.renderElement()
    storage.saveTask(task)
    taskInput.value = ""
    render()
}

const addListButtonAction = (e) => {
    if (!todoInput.value.trim()) return
    if (e.key !== "Enter") return
    const name = todoInput.value
    const newList = new List(crypto.randomUUID(), name, false, [], true)
    storage.saveList(newList)
    todoInput.value = "";
    render()
}

function loadTasks() {
    const selectedList = storage.getSelectedList();
    if (!selectedList) return
    for (let i = 0; i < selectedList.tasks.length; i++) {
        const { name, completed, creationDate } = selectedList.tasks[i];
        const onClick = () => {
            selectedList.tasks[i].completed = true
            render()
        }
        new Task(name, completed, creationDate).renderElement(onClick)
    }
}

function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}

function clearLists() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild)
    }
}

function deleteAllLists() {
    storage.deleteAllLists()
    clearLists()
}


render()