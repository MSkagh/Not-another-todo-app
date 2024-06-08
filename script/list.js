export class List{
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
        this.completed = false;
        this.creationDate = new Date(Date.now());
        this.tasks = [];
        this.selected = true
    }

    getNode(){
        const li = document.createElement("li");
        li.dataset.selected = this.selected;
        li.innerHTML = this.name
        li.addEventListener("click", ()=> this.onClick())
        return li
    }

    onClick(){
        this.selected = true
        console.log(this)
    }
}