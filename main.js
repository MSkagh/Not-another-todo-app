const todoInput = document.getElementById("new-todo-input");
const addTodoButton = document.getElementById("add-todo-button");
const todoList = document.getElementById("todo-list")

addTodoButton.addEventListener("click", () => addTodoButtonAction());
let todo = JSON.parse(localStorage.getItem("todo-list"));
console.log(todo)
if (!todo){
    todo = []
}
for (const item of todo){
    const li = document.createElement("li");
    li.innerHTML = item
    todoList.appendChild(li);
}
const addTodoButtonAction = () => {
    const li = document.createElement("li");
    li.innerHTML = todoInput.value;
    todoList.appendChild(li);
    todo.push(todoInput.value);
    setLocalStorage();
    todoInput.value = "";
}


function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
    console.log(todo)
}