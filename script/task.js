export class Task{
    constructor(name, completed, creationDate){
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    createTaskElement(){
        const todoList = document.getElementById("task-list")
        const li = document.createElement("li");
        li.innerHTML = this.name;
        li.addEventListener('click', () => this.onTaskClick())
        todoList.appendChild(li);
    }
    onTaskClick(){
        console.log(this)
    }
}