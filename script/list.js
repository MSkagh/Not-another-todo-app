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
        const listList = document.getElementById("list-list")
        const li = document.createElement("li");
        li.addEventListener("click", (e) => this.onListClick(e));
        li.innerHTML = this.name;
        listList.appendChild(li);
    }
    onListClick(e){
        console.log(e.target.innerHTML)
        this.selected = true
        LocalData.persistChanges()
        loadTasks()
    }
    
}