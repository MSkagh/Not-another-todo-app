const listInput = document.getElementById("new-list-input");
listInput.addEventListener("keydown", (e) => addListButtonAction(e));
const newListButton = document.getElementById("new-list-button");
newListButton.addEventListener("click", (e) => addListButtonAction(e));
const taskInput = document.getElementById("new-task-input");
taskInput.addEventListener("keydown", (e) => addTask(e));
const newTaskButton = document.getElementById("new-task-button");
newListButton.addEventListener("click", (e) => addTask(e));
const deleteListButton = document.querySelector("#delete-list-button")
deleteListButton.addEventListener("click", () => deleteList())
let listItems = JSON.parse(localStorage.getItem("lists")) || []
const listsUlElement = document.querySelector("#lists");
const tasksUlElement = document.querySelector("#tasks");

let selectedList = localStorage.getItem("selectedList") || null;

function render() {
    console.info("Re-Rendering")
    setTaskListHeader()
    document.querySelector(".task-section").hidden = selectedList ? false : true;
    clearElement(listsUlElement)
    //clearElement(tasksUlElement)
    renderLists()
    renderTasks()
}
function renderLists() {
    for (const list of listItems) {
        renderList(list)
    }
}

function renderTasks() {
    if (!getTasksofSelectedList()) return
    for (const task of getTasksofSelectedList()) {
        renderTask(task)
    }
}

function renderList(list) {
    const { id, name, progression } = list
    const li = document.createElement("li");
    li.innerText = name
    li.dataset.id = id;
    li.addEventListener("click", (e) => onListClick(e))
    const span = document.createElement("span")
    span.innerText = parseInt(progression) + "%"
    listsUlElement.appendChild(span)
    listsUlElement.appendChild(li);
}

function renderTask(task) {
    const { id, name, completed } = task
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    checkbox.checked = completed
    label.appendChild(checkbox)
    label.insertAdjacentText("beforeend", name)
    checkbox.addEventListener("click", () => onTaskClick(task, checkbox))
    
    tasksUlElement.appendChild(label);
}

function onListClick(e) {
    setSelectedList(e.target.dataset.id);
    setTaskListHeader(e.target.innerText);
    render();
}

function onTaskClick(task, checkbox) {
    task.completed = checkbox.checked
    checkProgression()
    clearElement(listsUlElement)
    renderLists()
    save()
}

function checkProgression(){
    const listItem = getSelectedList();
    let completedTasks = 0
    let uncompletedTasks = 0
    for (const task of listItem.tasks){
        if (task.completed) {completedTasks++}
        else {uncompletedTasks++}
    }
    listItem.progression = completedTasks / listItem.tasks.length * 100
}

function clearElement(element) {
    while (element.firstElementChild) {
        element.removeChild(element.firstElementChild)
    }
}

function getSelectedList() {
    if (!selectedList) return
    return listItems.find(list => list.id === selectedList)
}

function getTasksofSelectedList() {
    const selectedListItem = listItems.find(list => list.id === selectedList);
    return selectedListItem ? selectedListItem.tasks : null
}
function setTaskListHeader() {
    const listItem = listItems.find(list => list.id === selectedList)
    if (!listItem) return
    document.querySelector("#task-list-header").innerText = listItem.name;
}
function setSelectedList(id) {
    selectedList = id;
    localStorage.setItem("selectedList", id)
}

const addListButtonAction = (e) => {
    if (!listInput.value.trim()) return
    if (e.key !== "Enter" && e.type !== "click") return
    const name = listInput.value
    const id = crypto.randomUUID()
    const list = {
        id,
        name,
        tasks: []
    }
    listInput.value = "";
    listItems.push(list)
    renderList(list)
    save()
}

const addTask = (e) => {
    if (!taskInput.value.trim()) return
    if (e.key !== "Enter" && e.type !== "click") return
    const name = taskInput.value
    const id = crypto.randomUUID();
    const completed = false;
    const task = {
        id,
        name,
        completed
    }
    taskInput.value = "";
    getTasksofSelectedList().push(task)
    renderTask(task)
    save()
}

function deleteList() {
    listItems = listItems.filter(list => list.id !== selectedList)
    selectedList = null
    saveAndRender()
}

function save() {
    console.info("Saving")
    localStorage.setItem("lists", JSON.stringify(listItems))
}
function saveAndRender() {
    save();
    render();
}
render()