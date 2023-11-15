
import data from "./data"
import { allTodosHTML } from "./UI"

export default function handleData(shift,day,category,todo) {

    //** CERATE TODO LİST VARIABLE */
    const todoList = data() || dataSchema

    //** PUSH DATA GOTTEN FROM UI TO VARIABLE */
    todoList[shift].forEach(item => {
        if(item.day === day) {
            item.todos[category].push(todo)
        }
    })

    //** SAVE VARIABLE TO LOCALSTORAGE */
    localStorage.setItem("todo",JSON.stringify(todoList))
        console.log(todoList);

    //** DISPLAY TODO-LIST */
    const sectionEl = document.querySelector("main section")
        sectionEl.innerHTML = allTodosHTML()
}