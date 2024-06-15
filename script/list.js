export class List{
    constructor(name, completed, tasks, selected){
        this.name = name;
        this.completed = completed;
        this.tasks = tasks;
        this.selected = selected;
    }

    renderElement(onClick){
        const listList = document.getElementById("todo-list")
        const li = document.createElement("li");
        li.addEventListener("click", () => onClick());
        li.innerHTML = this.name;
        listList.appendChild(li);
    }    
}