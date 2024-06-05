const todoInput = document.getElementById("new-todo-input");
const addTodoButton = document.getElementById("add-todo-button");
addTodoButton.addEventListener("click", () => addTodoButtonAction());
let todo = JSON.parse(localStorage.getItem("todo-list"));

const addTodoButtonAction = () => {
    const value = todoInput.value;
    console.log("Creating a new todo item with the text: " + value);
    todoInput.value = ""
}