import { List } from "./list.js";
import { LocalData } from "./localData.js";
import { Task } from "./task.js";

//USER INPUTS
const taskInput = document.getElementById("new-task-input");
const listInput = document.getElementById("new-list-input");

const taskSection = document.querySelector("[class='task-section']");


const newListButton = document.getElementById("new-list-button");

const taskList = document.getElementById("task-list")
const listList = document.getElementById("list-list")

newListButton.addEventListener("click", (e) => addListButtonAction(e));
listInput.addEventListener("keydown", (e) => addListButtonAction(e));
taskInput.addEventListener("keydown", (e) => addTaskButtonAction(e));

const storage = new LocalData();

function render() {
    clearTasks()
    clearLists()
    showTaskInteface()
    loadLists()
    loadTasks()
}

function showTaskInteface(){
    if(storage.getSelectedList()){
    taskSection.removeAttribute("hidden")
    } else{
        taskSection.setAttribute("hidden")
    }
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
    if (!listInput.value.trim()) return
    if (e.key !== "Enter" && e.type !== "click") return
    const name = listInput.value
    const newList = new List(crypto.randomUUID(), name, false, [], true)
    storage.saveList(newList)
    listInput.value = "";
    render()
}

function loadTasks() {
    const selectedList = storage.getSelectedList();
    if (!selectedList) return
    for (let i = 0; i < selectedList.tasks.length; i++) {
        const { name, completed, creationDate } = selectedList.tasks[i];
        const onClick = () => {
            selectedList.tasks[i].completed === true ? selectedList.tasks[i].completed = false : selectedList.tasks[i].completed = true;
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
    while (listList.firstChild) {
        listList.removeChild(listList.firstChild)
    }
}

render()