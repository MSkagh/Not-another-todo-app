export class LocalData{
    constructor(){
        this.LOCAL_LISTS = JSON.parse(localStorage.getItem("lists")) || []
    }
    createListDTO(id, name, completed, creationDate, tasks, selected){
        return {
            id,
            name,
            completed,
            creationDate,
            tasks,
            selected,
        }
    }
    saveList(data){
        this.LOCAL_LISTS.push(data)
        LocalData.persistChanges()
    }
    saveTask(data){
        this.getSelectedList().tasks.push(data)
        LocalData.persistChanges()
    }
    static persistChanges() {
        localStorage.setItem("lists", JSON.stringify(this.LOCAL_LISTS));
    }
    getSelectedList(){
        return this.LOCAL_LISTS.filter(list => list.selected === true)[0]
    }
    deleteAllLists(){
        this.LOCAL_LISTS = []
        this.persistChanges()
    }
}