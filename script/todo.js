export class Todo{
    constructor(name){
        this.id = crypto.randomUUID()
        this.name = name
        this.completed = false,
        this.creationDate = new Date(Date.now())
    }
}