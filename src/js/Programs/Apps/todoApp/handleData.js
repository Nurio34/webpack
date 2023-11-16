
import data from "./data"
import { allTodosHTML, allTodosStyle } from "./UI"

export default function handleData(shift,day,category,todo,date,hour,addDate) {

    //** CERATE TODO LİST VARIABLE */
    const todoList = data() || dataSchema

    //** PUSH DATA GOTTEN FROM UI TO VARIABLE */
    todoList[shift].forEach(dayObj => {
        if(dayObj.day === day) {
            dayObj.todos[category].push(
                {
                    date : date,
                    hour : hour,
                    todo : todo,
                    addDate : addDate
                }
            )
        }
    })

    //** SAVE VARIABLE TO LOCALSTORAGE */
    localStorage.setItem("todo",JSON.stringify(todoList))

    //** DISPLAY TODO-LIST */
    const sectionEl = document.querySelector("main section")
        sectionEl.innerHTML = allTodosHTML(todoList)
        allTodosStyle(sectionEl)
            console.log(todoList);
}