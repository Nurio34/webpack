
import handleData from "./handleData"
import data from "./data"
import { allTodosHTML,allTodosStyle,partlyTodosHTML,editModal } from "./UI"


let shift = ""
let day = ""
let category = ""
let todo = ""
let date = ""
let time = ""
let shiftFilter = ""

const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]
let addDate = "" 
let addTime = ""
let updateDate = ""
let complateTime = ""
let editingMode = ""

export function listeners() {
    const formEl = document.querySelector("form")
    const sectionEl = document.querySelector("section")


    const selectEls = formEl.querySelectorAll("select")

        selectEls.forEach(el=> el.addEventListener("click",e=> {

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
                            sectionEl.innerHTML =       partlyTodosHTML(shiftFilter) + 
                                                editModal()
                        }
                            allTodosStyle(sectionEl)
                            editButtonsListeneres()
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
                    break;
            
                case "Time":
                    time = e.target.value
                    break;
            
                default:
                    break;
            }
        }))

    const todoInput = formEl.querySelector("[type='text'][name='Todo']")
        
        todoInput.addEventListener("input",e=>{
            todo = e.target.value
            addDate = convertDate()
            addTime = new Date().getTime()
            console.log(addDate);
        })

        todoInput.addEventListener("keydown",e=>{
 
               switch (e.key) {
                
                case "Enter":
                    e.preventDefault()

                    if(shift && day && category && todo) {
                        editingMode = "add"
                        handleData(shift,day,category,todo,date,time,addDate,updateDate,editingMode,"id",addTime)
                    } 
                    
                    break;
            }
        })

    const submitBtn = formEl.querySelector("#submitBtn")

        submitBtn.addEventListener("click",()=>{
            editingMode = "add"
            handleData(shift,day,category,todo,date,time,addDate,updateDate,editingMode,`id`,addTime)
        })

    
}

export function editButtonsListeneres() {

    const sectionEl = document.querySelector("section")
    const editButtons = sectionEl.querySelectorAll("button")
    const editModal = sectionEl.querySelector("#editModal")

        editButtons.forEach(btn=> btn.addEventListener("click", e=>{


            switch (e.target.dataset.type) {

                case "editBtn":
                    editingMode = "update"

                    //** EDIT MODAL AÇ */
                    editModal.classList.remove("invisible","-z-50")

                    //** EDİT BUTONUNA TIKLANILAN NOTUN TÜM BİLGİLERİNİ KAYDET */
                    let id = e.target.dataset.id
                    let shift = e.target.dataset.shift
                    let day = e.target.dataset.day
                    let category = e.target.dataset.category
                    let editingTodo = data()[shift].filter(dayObj => dayObj.day === day)[0].todos[category].filter(todoObj=>{
                        return todoObj.id == id
                    })[0].todo
                        todo = editingTodo
                    let time = data()[shift].filter(dayObj => dayObj.day === day)[0].todos[category].filter(todoObj=>{
                        return todoObj.id == id
                    })[0].hour
                    let date = data()[shift].filter(dayObj => dayObj.day === day)[0].todos[category].filter(todoObj=>{
                        return todoObj.id == id
                    })[0].date
                        addDate = e.target.dataset.adddate
                        updateDate = convertDate()
                        addTime = e.target.dataset.addtime
                        console.log(e.target.dataset.addtime);

                    //** BİLGİLERİ MODAL'A YERLEŞTİR */
                    const shiftSelect = editModal.querySelector("[name='ModalShift']")
                        const shiftOptions = Array.from(shiftSelect.querySelectorAll("option"))                            
                            shiftOptions.forEach(option=>{
                                option.setAttribute("selected", false)                                
                            })
                            shiftOptions.filter(option => option.value === shift)[0].selected = true
                        shiftSelect.addEventListener("change", (e)=> shift = e.target.value)

                    const daySelect = editModal.querySelector("[name='ModalDay']")
                        const dayOptions = Array.from(daySelect.querySelectorAll("option"))                                
                                dayOptions.forEach(option=>{
                                    option.setAttribute("selected", false)                                    
                                })
                                dayOptions.filter(option => option.value === day)[0].selected = true
                        daySelect.addEventListener("change", (e)=> day = e.target.value)


                    const categorySelect = editModal.querySelector("[name='ModalCategory']")
                        const categoryOptions = Array.from(categorySelect.querySelectorAll("option"))                        
                            categoryOptions.forEach(option=>{
                                option.setAttribute("selected", false)                            
                            })
                            categoryOptions.filter(option => option.value === category)[0].selected = true
                        categorySelect.addEventListener("change", (e)=> category = e.target.value)


                    const dateSelect = editModal.querySelector("[name='ModalDate']")
                        dateSelect.value = date.split(".").reverse().map((item,ind)=>{
                            return ind === 0 ? "20"+item  : item
                        }).join("-")
                        dateSelect.addEventListener("change", (e)=> {
                            date = e.target.value
                            date = date.split("-").reverse().map((item,ind)=>{
                                return ind === 2 ? item.substring(2,4) : item
                            }).join(".")
                        } )
                        
                    const timeSelect = editModal.querySelector("[name='ModalTime']")
                        timeSelect.value = time
                        timeSelect.addEventListener("change", (e)=> time = e.target.value)

                    const todoTextarea = editModal.querySelector("[name='ModalTodo']")
                        todoTextarea.value = editingTodo
                        todoTextarea.addEventListener("input",(e)=> todo = e.target.value)

                    const addDateEl = editModal.querySelector("#addDate")
                        addDateEl.innerText = `Add : ${addDate}`

                    const updateDateEl = editModal.querySelector("#updateDate")
                        updateDateEl.innerText = `Update : ${updateDate}`

                    const submitBtn = editModal.querySelector("#ModalSubmitBtn")
                        submitBtn.addEventListener("click",()=> {

                            handleData(shift,day,category,todo,date,time,addDate,updateDate,editingMode,id,addTime)
                        })

                        

                    break;

                case "complateBtn":
                    editingMode = "complate"
                    complateTime = new Date().getTime()
                    console.log(e.target.dataset.addtime);
                        // handleData(e.target.dataset.shift,`day`,`category`,`todo`,`date`,`time`,`addDate`,`updateDate`,editingMode,e.target.dataset.id,complateTime)

                    console.log(e.target);
                    break;

                case "deleteBtn":
                    editingMode = "delete"
                        handleData(e.target.dataset.shift,`day`,`category`,`todo`,`date`,`time`,`addDate`,`updateDate`,editingMode,e.target.dataset.id)
                    break;
            
                default:
                    break;
            }
        }))
}

function convertDate() {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    let date = new Date().toString().split(" ").splice(1,3)
    const dateMonth = date[0]
    let convertedMonth = String(months.findIndex(item => item == dateMonth) + 1)
    if(convertedMonth < 10) convertedMonth = 0 + convertedMonth
    date.splice(0,1)
    date.splice(1,0,convertedMonth)
    date = date.join(".")

    return date
}

