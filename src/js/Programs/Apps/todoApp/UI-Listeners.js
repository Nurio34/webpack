
import handleData from "./handleData"

export default function listeners(formEl) {

    let shift = ""
    let day = ""
    let category = ""
    let filter = ""
    let todo = ""
        
    const selectEls = formEl.querySelectorAll("select")

        selectEls.forEach(el=> el.addEventListener("change",e=> {

            switch (e.target.name) {

                case "Shift":
                    shift = e.target.value
                    break;

                case "Day":
                    day = e.target.value
                    break;

                case "Category":
                    category = e.target.value
                    break;

                case "DisplayFilter":
                    filter = e.target.value
                    break;
            }
        }))

    const todoInput = formEl.querySelector("[type='text'][name='Todo']")
        
        todoInput.addEventListener("keydown",e=>{
 
               switch (e.key) {
                
                case "Enter":
                    e.preventDefault()
                    todo = e.target.value

                    if(shift && day && category && todo) {

                        handleData(shift,day,category,todo)
                    } 
                    
                    break;
            }
        })
}

