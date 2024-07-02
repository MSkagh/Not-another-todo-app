import { List } from "./list.js";
import { LocalData } from "./localData.js";
import { Task } from "./task.js";

//USER INPUTS
const taskInput = document.getElementById("new-task-input");
const listInput = document.getElementById("new-list-input");

const taskSection = document.querySelector("[class='task-section']");


const newListButton = document.getElementById("new-list-button");
const newTaskButton = document.getElementById("new-task-button")

const lists = document.getElementById("lists")



let renderCount = 0

newListButton.addEventListener("click", (e) => addListButtonAction(e));
newTaskButton.addEventListener("click", (e) => addTaskButtonAction(e));

listInput.addEventListener("keydown", (e) => addListButtonAction(e));
taskInput.addEventListener("keydown", (e) => addTaskButtonAction(e));

const storage = new LocalData();

function render() {
    console.log("Rendering for the " + renderCount + " time")
    renderCount++
    showTaskInteface()
    loadLists()
}

function showTaskInteface() {
    if (storage.getSelectedList()) {
        taskSection.removeAttribute("hidden")
    } else {
        taskSection.setAttribute("hidden", true)
    }
}

function loadLists() {
    for (const list of storage.getLists()) {
           list.renderElement(storage);
           if (storage.getSelectedList() && list.id === storage.getSelectedList().id) list.loadTasks(storage)
    }
}

const addTaskButtonAction = (e) => {
    if (!taskInput.value.trim()) return
    if (e.key !== "Enter" && e.type !== "click") return
    if (!storage.getSelectedList()) return
    const task = new Task(crypto.randomUUID(), taskInput.value, false, new Date(Date.now()))
    task.renderElement(storage)
    storage.saveTask(task)
    taskInput.value = ""
}

const addListButtonAction = (e) => {
    if (!listInput.value.trim()) return
    if (e.key !== "Enter" && e.type !== "click") return
    const name = listInput.value
    const newList = new List(crypto.randomUUID(), name, false, [], true)
    storage.setSelectedList(newList.id)
    newList.renderElement(storage);
    newList.clearTasks()
    newList.loadTasks()
    storage.saveList(newList)
    listInput.value = "";
}

function clearLists() {
    while (lists.firstChild) {
        lists.removeChild(lists.firstChild)
    }
}

render()