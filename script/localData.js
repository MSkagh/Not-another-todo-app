import { List } from "./list.js"
export class LocalData {
    constructor() {
        if (LocalData._instance) {
            throw new Error("Only one LocalData object allowed")
        }
        LocalData._instance = this;
        this.LOCAL_LISTS = JSON.parse(localStorage.getItem("lists")) || []
        this.selectedList = localStorage.getItem("selectedList") || null
        this.taskCounter = localStorage.getItem("taskCounter") || 0;

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
        localStorage.setItem("selectedList", this.selectedList);
        localStorage.setItem("listCounter", this.listCounter);
        localStorage.setItem("taskCounter", this.taskCounter);
    }

    getSelectedList() {
        const list = this.LOCAL_LISTS.filter(list => list.id.toString() === this.selectedList)[0]
        return list ? new List(list.id, list.name, list.completed, list.tasks, list.selected) : null;
    }

    setSelectedList(id) {
        this.selectedList = id;
    }

    getLists() {
        const returnArray = []
        for (const list of this.LOCAL_LISTS) {
            returnArray.push(new List(list.id, list.name, list.completed, list.tasks, list.selected))
        }
        return returnArray
    }

    deleteListById(id) {
        let indexOfList;
        for (let i = 0; i < this.LOCAL_LISTS.length; i++) {
            if (this.LOCAL_LISTS[i].id === id)
                indexOfList = i;
        }
        this.LOCAL_LISTS.splice(indexOfList, 1)
    }
}