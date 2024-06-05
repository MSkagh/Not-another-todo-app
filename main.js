const todoInput = document.getElementById("new-todo-input")
todoInput.addEventListener("input", (e)=> alertMe(e))

let enteredValue;
function alertMe(e){
    enteredValue = e.target.value
    console.log(enteredValue)
}