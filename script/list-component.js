
const liTemplate = document.createElement('template');
liTemplate.innerHTML = `
<li>
    <p></p>
    <button id="delete-button"></button
</li>
`
const taskSectionTemplate = document.createElement('template');
taskSectionTemplate.innerHTML = `
<style>
@import url(/styles/tasks.css);
</style>
<h1 id="todo-list-header">Things to do</h1>
            <div class="new-task-container">
                <input autocomplete="off" id="new-task-input" />
                <button id="new-task-button">ADD</button>
            </div>
<ul id="tasks"></ul>
`
customElements.define(
  "list-component",
  class extends HTMLElement {
    constructor() {
      super();
      const templateContent = ulTemplate.content
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(templateContent.cloneNode(true));
      this.ul = shadowRoot.querySelector('ul')
      this.selectedList = null
      this.render()
    }
    render() {
      this.clearLists()
      for (let i = 0; i < this.listItems.length; i++) {
        const item = this.listItems[i];
        this.renderList(item,i)
      }
      this.renderTaskInterface()
    }
    renderTaskInterface(){
      document.querySelector(".task-section").innerHTML = ""
      if (this.selectedList || this.selectedList === 0) {
        const taskSectionTemplateContent = taskSectionTemplate.content
        const listName = this.listItems[this.selectedList].name
        taskSectionTemplateContent.querySelector("h1").innerText = listName
        document.querySelector(".task-section").appendChild(taskSectionTemplateContent.cloneNode(true));
      }
    }
    renderList(item,i){
      const templateContent = liTemplate.content;
      templateContent.querySelector('li').id = item.id
      this.ul.appendChild(templateContent.cloneNode(true));
      this.setName(item.name, i)
      const deleteButton = this.ul.querySelectorAll('#delete-button')[i]
      deleteButton.addEventListener('click', () => this.onTaskDelete(item.id, i))
      this.ul.querySelectorAll('li')[i].addEventListener("click", () => this.onListClick(item.tasks, i))
    }
    setName(text, i) {
      const p = this.ul.querySelectorAll('p')[i]
      p.innerText = text
    }
    clearLists() {
      while (this.ul.firstChild) {
        this.ul.removeChild(this.ul.firstChild)
      }
    }
   
    saveLists() {
      localStorage.setItem("lists", JSON.stringify(this.listItems))
    }

    onListClick(tasks, i) {
      this.selectedList = i
      this.renderTaskInterface();
      this.saveLists()
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i]
        this.renderTask(task, i)
      }
    }

    renderTask(task, i) {
      const { id, name, completed } = task
      console.log(task)
      const list = document.getElementById("tasks");
      const template = document.getElementById("task-template").content.firstElementChild.cloneNode(true);
      template.dataset.id = id;
      template.querySelector("p").innerText = name;
      template.addEventListener("click", () => { this.onTaskClick(id, i) })
      template.querySelector("button").addEventListener("click", () => { this.onTaskDelete(id, i) })
      if (completed) template.classList.add("completed")
      this.taskShadow.appendChild(template);
    }
    onTaskClick(id, i) {
      const element = document.querySelector(`[data-id="${id}"]`);
      element.classList.toggle("completed")
      this.listItems[i].completed === true ? this.completed = false : this.completed = true;

    }
    onTaskDelete(itemId, i) {
      this.listItems.splice(i, 1)
      this.shadowRoot.querySelector(`[id='${itemId}']`).remove()
    }
  },
);