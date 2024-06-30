export class Task {
    constructor(name, completed, creationDate) {
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    renderElement(onClick, onDelete, onDragStart ,onDragEnd, onDragOver) {
        const todoList = document.getElementById("task-list")
        const li = document.createElement("li");
        const p = document.createElement("p")
        p.innerText = this.name;
        li.classList.add("task")
        li.draggable = true;
        li.ondragstart = onDragStart
        li.ondragend = onDragEnd
        li.ondragover = onDragOver
        p.addEventListener('click', () => onClick())
        if (this.completed) li.classList.add("completed")
        li.appendChild(p)
        li.appendChild(this.getButtonElements(onDelete))
        
        todoList.appendChild(li);
    }
    getButtonElements(onDelete) {
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button-container")
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.innerText = "X"
        deleteButton.addEventListener("click", () => onDelete())
        // const editButton = document.createElement("button")
        // editButton.classList.add("edit-button")
        // editButton.addEventListener("click", () => onEdit())

        // buttonContainer.appendChild(editButton)
        buttonContainer.appendChild(deleteButton)

        return buttonContainer
    }
}