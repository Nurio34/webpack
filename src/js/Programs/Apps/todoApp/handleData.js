
import data from "./data"
import { allTodosHTML, allTodosStyle, editModal } from "./UI"
import { editButtonsListeneres } from "./UI-Listeners"

export default function handleData(shift,day,category,todo,date,hour,addDate,editingMode,id) {

    console.log(editingMode);

    //** CERATE TODO LİST VARIABLE */
    let todoList = data() || dataSchema

    //** PUSH DATA GOTTEN FROM UI TO VARIABLE */
    if(editingMode === false) {
        todoList[shift].forEach(dayObj => {
            if(dayObj.day === day) {
                dayObj.todos[category].push(
                    {
                        id : new Date().getTime(),
                        date : date,
                        hour : hour,
                        todo : todo,
                        addDate : addDate
                    }
                )
            }
        })
    }

    //** PUSH DATA GOTTEN FROM EDIT MODAL */
    else {
       
        //todo ** ELDEKİ ID'Yİ İÇEREN OBJECTİ DATA'DAN ÇIKAR */
    
        let todoCopy = "fuck"
    }

    //** SAVE VARIABLE TO LOCALSTORAGE */
    localStorage.setItem("todo",JSON.stringify(todoList))

    //** DISPLAY TODO-LIST */
    const sectionEl = document.querySelector("main section")
        sectionEl.innerHTML =           allTodosHTML(todoList) + 
                            editModal()
        allTodosStyle(sectionEl)
        editButtonsListeneres()

            console.log(todoList);
}