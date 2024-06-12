import { LocalData } from "./localData.js";
import { deselectAllLists, loadTasks } from "./main.js";


export class List{
    constructor(listObject){
        this.id = listObject.id;
        this.name = listObject.name;
        this.completed = listObject.completed;
        this.creationDate = listObject.creationDate;
        this.tasks = listObject.tasks;
        this.selected = listObject.selected;
    }

    createListElement(){
        const listList = document.getElementById("todo-list")
        const li = document.createElement("li");
        li.addEventListener("click", (e) => this.onListClick());
        li.innerHTML = this.name;
        listList.appendChild(li);
    }
    onListClick(){
        console.log(this.name)
        this.selected === true ? this.selected = false : this.selected = true;
        console.log(this.selected)

        //persistChanges()
        loadTasks()
    }
    
}