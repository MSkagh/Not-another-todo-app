export class Task {
    constructor(name, completed, creationDate) {
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    renderElement(onClick) {
        const todoList = document.getElementById("task-list")
        const li = document.createElement("li");
        li.innerHTML = this.name;
        if (this.completed) li.classList.add("completed")
        li.addEventListener('click', () => onClick())
        todoList.appendChild(li);
    }
}