export class Task{
    constructor(id, name, completed, creationDate){
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.creationDate = creationDate;
    }

    createTaskElement(){
        const todoList = document.getElementById("todo-list")
        const li = document.createElement("li");
        li.innerHTML = this.name;
        li.addEventListener('click', () => this.onTaskClick())
        todoList.appendChild(li);
    }
    onTaskClick(){
        console.log(this)
    }
}