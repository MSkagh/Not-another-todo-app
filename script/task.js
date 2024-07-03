let taskBeeingDragged = null;


export class Task {
    static counter = 0
    constructor(id, name, completed, creationDate) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
        Task.counter ++
    }

    renderElement(storage, tasks) {
        console.log(this)
        const todoList = document.getElementById("task-list")
        const li = document.createElement("li");
        const p = document.createElement("p")
        p.innerText = this.name;
        li.classList.add("task")
        li.dataset.id = this.id
        li.draggable = true;
        li.ondragstart = this.onDragStart
        li.ondragend = this.onDragEnd
        li.ondragover = this.onDragOver
        p.addEventListener('click', (e) => this.onClick(e, storage, tasks))
        if (this.completed) li.classList.add("completed")
        li.appendChild(p)
        li.appendChild(this.getButtonElements(storage,tasks))
        
        todoList.appendChild(li);
    }
    getButtonElements(storage, tasks) {
        const buttonContainer = document.createElement("div")
        buttonContainer.classList.add("button-container")
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.innerText = "X"
        deleteButton.addEventListener("click", () => this.onDelete(storage, tasks))
        buttonContainer.appendChild(deleteButton)
        return buttonContainer
    }
    onClick(e, storage, parentList){
        e.target.classList.toggle("completed")
        this.completed === true ? this.completed = false : this.completed = true;
        console.log(parentList)
        storage.persistChanges()
    }
    onDelete = (storage, tasks)=> {
        const task = document.querySelector(`[data-id="${this.id}"]`)
        task.classList.add("slide")
        setTimeout(()=> task.remove(), 500)
        const index = tasks.map(e => e.id).indexOf(this.id)
        storage.getSelectedList().tasks.splice(index, 1)
        storage.persistChanges();
    }
    onDragStart = (e) =>{
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', null)
        taskBeeingDragged = e.target
    }
    onDragEnd = (e) =>{
        taskBeeingDragged = null
    }
    onDragOver = (e) =>{
        if (this.isBefore(taskBeeingDragged, e.target)) {
            e.target.parentNode.insertBefore(taskBeeingDragged, e.target)
          } else {
            e.target.parentNode.insertBefore(taskBeeingDragged, e.target.nextSibling)
          } 
    }
    isBefore(el1, el2) {
        let cur
        if (el2.parentNode === el1.parentNode) {
          for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
            if (cur === el2) return true
          }
        }
        return false;
      }
}