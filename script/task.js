export class Task{
    constructor(id, name, completed){
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.creationDate = new Date(Date.now());
    }
}