export class List{
    constructor(id, name, completed, tasks, selected){
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.creationDate = new Date(Date.now());
        this.tasks = tasks;
        this.selected = selected;
    }
}