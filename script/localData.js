import { List } from "./list.js"
export class LocalData {

    constructor() {
        if (LocalData._instance) {
            throw new Error("Only one LocalData object allowed")
        }
        LocalData._instance = this;
        this.LOCAL_LISTS = JSON.parse(localStorage.getItem("lists")) || []

    }

    saveList(list) {
        this.LOCAL_LISTS.push(list)
        this.persistChanges()
    }
    saveTask(task) {
        this.getSelectedList().tasks.push(task)
        this.persistChanges()
    }
    persistChanges() {
        localStorage.setItem("lists", JSON.stringify(this.LOCAL_LISTS));
    }
    getSelectedList() {
        const list = this.LOCAL_LISTS.filter(list => list.selected === true)[0]
        return list ? new List(list.id, list.name, list.completed, list.tasks, list.selected) : null;
    }
    setSelectedList(id) {
        this.deselectAllLists();
        this.LOCAL_LISTS.filter((list) => list.id === id).map((list) => list.selected = true)

    }
    getLists() {
        const returnArray = []
        for (const list of this.LOCAL_LISTS) {
            returnArray.push(new List(list.id, list.name, list.completed, list.tasks, list.selected))
        }
        return returnArray
    }
    getTasks() {
        return this.getSelectedList().tasks ? null : this.getSelectedList().tasks
    }

    deleteListById(id) {
        let indexOfList;
        for (let i = 0; i < this.LOCAL_LISTS.length; i++) {
            if (this.LOCAL_LISTS[i].id === id)
                indexOfList = i;
        }
        this.LOCAL_LISTS.splice(indexOfList, 1)
        this.deselectAllLists()
        this.persistChanges()
    }
    deselectAllLists() {
        for (const list of this.LOCAL_LISTS) {
            list.selected = false;
        }
    }
}