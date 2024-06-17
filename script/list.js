export class List {
    constructor(id, name, completed, tasks, selected) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.tasks = tasks;
        this.selected = selected;
    }

    renderElement(onClick, onDelete, onEdit) {
        const listList = document.getElementById("todo-list")
        const li = document.createElement("li");
        const buttonContainer = this.getButtonElements(onEdit, onDelete)

        li.addEventListener("click", () => onClick());
        li.innerHTML = this.name;
        li.appendChild(buttonContainer);
        listList.appendChild(li);
    }
    getButtonElements(onEdit, onDelete){
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button-container")
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.addEventListener("click", () => onDelete())
        const editButton = document.createElement("button")
        editButton.classList.add("edit-button")
        editButton.addEventListener("click", () => onEdit())

        buttonContainer.appendChild(editButton)
        buttonContainer.appendChild(deleteButton)

        return buttonContainer
    }
}