
import handleData from "./handleData"
import data from "./data"
import { allTodosHTML,allTodosStyle,partlyTodosHTML } from "./UI"

export default function listeners() {
    const formEl = document.querySelector("form")
    const sectionEl = document.querySelector("section")

    const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]

    let shift = ""
    let day = ""
    let category = ""
    let todo = ""
    let date = ""
    let time = ""
    let shiftFilter = ""
    let addDate = ""
    let updateDate = ""
    let complateDate = ""


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

                case "ShiftFilter":
                    shiftFilter = e.target.value

                        if(shiftFilter === "all") {
                            sectionEl.innerHTML = allTodosHTML(data())
                        }
                        else {
                            sectionEl.innerHTML = partlyTodosHTML(shiftFilter)
                        }
                            allTodosStyle(sectionEl)
                    break;
            }
        }))

    const timeInputs = formEl.querySelectorAll("[data-id='time']")
        timeInputs.forEach(timeInput=> timeInput.addEventListener("change", e=> {

            switch (e.target.name) {

                case "Date":
                    date = e.target.value
                    const day = days[new Date(date).getDay()]
                    console.log(day);
                    date = date.split("-")
                    date = `${date[2]}-${date[1]}-${date[0].substring(2)}<br>${day}`
                    console.log(date);
                    break;
            
                case "Time":
                    time = e.target.value
                    console.log(time);
                    break;
            
                default:
                    break;
            }
        }))

    const todoInput = formEl.querySelector("[type='text'][name='Todo']")
        
        todoInput.addEventListener("keydown",e=>{
 
               switch (e.key) {
                
                case "Enter":
                    e.preventDefault()
                    todo = e.target.value
                    addDate = new Date().toString().split(" ").filter((item,ind)=>ind<=4).join(" ")
                    console.log(addDate);

                    if(shift && day && category && todo) {

                        handleData(shift,day,category,todo,date,time,addDate)
                    } 
                    
                    break;
            }
        })

    const editButtons = sectionEl.querySelectorAll("button")

        editButtons.forEach(btn=> btn.addEventListener("click", e=>{
            console.log(e.target.dataset.shift, e.target.dataset.day, e.target.dataset.category, e.target.classList.contains("editBtn"));
            switch (e.target.dataset.type) {
                case "editBtn":
                    console.log(e.target);

                    //todo  EDIT MODAL AÇ
                    sectionEl.appendChild(editModal())
                    break;

                case "complateBtn":
                    console.log(e.target);
                    break;

                case "deleteBtn":
                    console.log(e.target);
                    break;
            
                default:
                    break;
            }
        }))
}

