let taskBeeingDragged = null;


export class Task {
    constructor(id, name, completed, creationDate) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    renderElement(storage, tasks) {
        const list = document.getElementById("task-list");
        const template = document.getElementById("task-template").content.firstElementChild.cloneNode(true);
        template.dataset.id = this.id;
        template.querySelector("p").innerText = this.name;
        template.querySelector("#delete-button").addEventListener("click", () => this.onDelete(storage, tasks));
        template.addEventListener("click", () => this.onClick(storage));      
        template.ondragstart = this.onDragStart
        template.ondragend = this.onDragEnd
        template.ondragover = this.onDragOver
        if (this.completed) template.classList.add("completed")
        list.appendChild(template);
    }
   
    onClick(storage){
        const element = document.querySelector(`[data-id="${this.id}"]`);
        element.classList.toggle("completed")
        this.completed === true ? this.completed = false : this.completed = true;
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