import { Task } from "./task.js";
const taskList = document.getElementById("task-list")
const todoListHeader = document.getElementById("todo-list-header")
const taskSection = document.querySelector("[class='task-section']");
export class List {
    constructor(id, name, completed, tasks, selected) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.tasks = tasks;
        this.selected = selected;
    }

    renderElement(storage) {
        const listList = document.getElementById("lists");
        const template = document.getElementById("list-template").content.firstElementChild.cloneNode(true);
        template.dataset.id = this.id;
        template.querySelector("p").innerText = this.name;
        template.querySelector("#delete-button").addEventListener("click", () => this.onDelete(storage));
        template.addEventListener("click", () => this.onClick(storage));
        listList.appendChild(template);
    }

    onClick(storage) {
        this.clearTasks()
        todoListHeader.innerText = this.name;
        storage.setSelectedList(this.id)
        this.loadTasks(storage)
        this.showListInterface(storage)
        storage.persistChanges()

    }
    onDelete(storage) {
        storage.deleteListById(this.id)
    }
    loadTasks(storage) {
        for (let i = 0; i < this.tasks.length; i++) {
            const { id, name, completed, creationDate } = this.tasks[i];
            new Task(id, name, completed, creationDate).renderElement(storage, this.tasks)
        }
    }

    clearTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
    }
    showListInterface(storage) {
        todoListHeader.innerText = this.name
        if (storage.getSelectedList()) {
            taskSection.removeAttribute("hidden")
        } else {
            taskSection.setAttribute("hidden", true)
        }
    }
}