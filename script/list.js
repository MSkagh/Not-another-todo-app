import { Task } from "./task.js";
const taskList = document.getElementById("task-list")
const todoListHeader = document.getElementById("todo-list-header")

export class List {
    constructor(id, name, completed, tasks, selected) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.tasks = tasks;
        this.selected = selected;
    }

    renderElement(storage) {
        const listList = document.getElementById("lists")
        const li = document.createElement("li");
        li.dataset.id = this.id
        const buttonContainer = this.getButtonElements(storage)
        const p = document.createElement("p");
        p.textContent = this.name
        li.classList.add("list")
        li.addEventListener("click", () => this.onClick(storage));
        li.appendChild(p)
        li.appendChild(buttonContainer);
        listList.appendChild(li);
    }
    getButtonElements(storage) {
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button-container")
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.innerText = "X"
        deleteButton.addEventListener("click", () => this.onDelete(storage))
        buttonContainer.appendChild(deleteButton)
        return buttonContainer
    }
    onClick(storage){
        this.clearTasks()
        todoListHeader.innerText = this.name;
        storage.setSelectedList(this.id)
        this.loadTasks(storage)
        storage.persistChanges()
    }
    onDelete(storage){
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
}