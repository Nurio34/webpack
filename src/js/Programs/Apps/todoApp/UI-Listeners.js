
import handleData from "./handleData"
import data from "./data"
import { complatedData } from "./data"
import { allTodosHTML,allTodosStyle,partlyTodosHTML,editModal } from "./UI"
import dayImg from "../../../../assets/images/day.webp"
import midImg from "../../../../assets/images/mid.webp"
import nightImg from "../../../../assets/images/night.webp"

let id = ""
let shift = ""
let day = ""
let category = ""
let todo = ""
let date = ""
let time = ""
let addDate = "" 
let addTime = ""

const days = ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"]

let editingMode = ""
let editingTodo = ""
let updateDate = ""

let complateDate = ""
let complateTime = ""


let shiftFilter = ""


export function listeners() {
    const formEl = document.querySelector("form")
    const sectionEl = document.querySelector("section")


    const selectEls = formEl.querySelectorAll("select")


        selectEls.forEach(selectEl=> selectEl.addEventListener("change",e=> {

            switch (e.target.name) {

                case "Shift":
                    shift = e.target.value    

                    Change_Selects_Background(selectEl,shift)
                    break;

                case "Day":
                    day = e.target.value
                    break;

                case "Category":
                    category = e.target.value
                    break;

                case "ShiftFilter":
                    shiftFilter = e.target.value
                    Change_Selects_Background(selectEl,shiftFilter)

                        if(shiftFilter === "all") {
                            sectionEl.innerHTML = allTodosHTML(data()) +
                                                        editModal()
                        }
                        else {
                            sectionEl.innerHTML = partlyTodosHTML(shiftFilter,data()) + 
                                                    editModal()
                        }
                            allTodosStyle()
                            editBtnsListeners()

                    break;
            
                case "TodoFilter":
                    
                    if(e.target.value === "todo") {
                        sectionEl.innerHTML = allTodosHTML(data())
                    }
                    else sectionEl.innerHTML = allTodosHTML(complatedData(),`complated`)
                        allTodosStyle()
                        editBtnsListeners()
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
            addTime = +new Date().getTime()
        })

        todoInput.addEventListener("keydown",e=>{
 
               switch (e.key) {
                
                case "Enter":
                    e.preventDefault()

                    if(shift && day && category && todo) {
                        editingMode = "add"
                        handleData(shift,day,category,todo,date,time,addDate,updateDate,editingMode,"id",addTime)
                        todoInput.value = ""
                    } 
                    
                    break;
            }
        })

    const submitBtn = formEl.querySelector("#submitBtn")

        submitBtn.addEventListener("click",()=>{
            if(shift && day && category && todo) {
                editingMode = "add"
                console.log(day);
                handleData(shift,day,category,todo,date,time,addDate,updateDate,editingMode,"id",addTime)
                todoInput.value = ""
            } 
        })

    
}

export function editBtnsListeners() {

    const todoEls = document.querySelectorAll("#work,#love,#other,#lesson")

        todoEls.forEach(todoEl=>todoEl.addEventListener("contextmenu",e=>{
            
            const sectionEl = document.querySelector("section")

            document.querySelectorAll(".editBtns").forEach(btn=>btn.classList.add("invisible"))

            e.preventDefault()

            const click_X = e.clientX
            const click_Y = e.clientY

            const editBtnsContainer = todoEl.querySelector(".editBtns")
            if(!editBtnsContainer) return 

            const editBtnsContainer_Width = editBtnsContainer.getBoundingClientRect().width
            const screenWidth = window.innerWidth
            const edge = screenWidth - +editBtnsContainer_Width

                editBtnsContainer.classList.remove("invisible")
                editBtnsContainer.style.top = `${click_Y}px`

                if(click_X < edge) editBtnsContainer.style.left = `${click_X}px`
                else editBtnsContainer.style.left = `${+click_X - +editBtnsContainer_Width}px`
                
            const editBtns = editBtnsContainer.querySelectorAll("button")
            const editModal = sectionEl.querySelector("#editModal")

            editBtns.forEach(btn=> btn.addEventListener("click", e=>{


                switch (e.target.dataset.type) {
    
                    case "editBtn":
                        editingMode = "update"
    
                        //** EDIT MODAL AÇ */
                        editModal.classList.remove("invisible","-z-50")
    
                        //** EDİT BUTONUNA TIKLANILAN NOTUN TÜM BİLGİLERİNİ KAYDET */
                            getAllInfo(e)
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
                        complateDate = convertDate()
                        complateTime = new Date().getTime()
                            getAllInfo(e)
                            handleData(shift,day,category,todo,date,time,addDate,updateDate,editingMode,e.target.dataset.id,addTime,complateDate,complateTime)
                        break;
    
                    case "deleteBtn":
                        editingMode = "delete"
                            handleData(e.target.dataset.shift,`day`,`category`,`todo`,`date`,`time`,`addDate`,`updateDate`,editingMode,e.target.dataset.id)
                        break;
                
                    default:
                        break;
                }
            }))
        }))
        
}

function getAllInfo(e) {

    id = e.target.dataset.id
    shift = e.target.dataset.shift
    day = e.target.dataset.day
    category = e.target.dataset.category
    editingTodo = data()[shift].filter(dayObj => dayObj.day === day)[0].todos[category].filter(todoObj=>{
        return todoObj.id == id
    })[0].todo
        todo = editingTodo
    time = data()[shift].filter(dayObj => dayObj.day === day)[0].todos[category].filter(todoObj=>{
        return todoObj.id == id
    })[0].hour
    date = data()[shift].filter(dayObj => dayObj.day === day)[0].todos[category].filter(todoObj=>{
        return todoObj.id == id
    })[0].date
        addDate = e.target.dataset.adddate
        updateDate = convertDate()
        addTime = e.target.dataset.addtime

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
    const year = date[2].substring(2,4)
    date.splice(2,1,year)
    date = date.join(".")

    return date
}

function Change_Selects_Background(selectEl,shift) {

    switch (shift) {
        case "dayShift":                            
            selectEl.style.background = `url('${dayImg}') no-repeat`
            selectEl.style.backgroundPosition = "60% 10%"
            break;

        case "midShift":                            
            selectEl.style.background = `url('${midImg}') no-repeat`
            selectEl.style.backgroundPosition = "60% 40%"
            break;
            
        case "nightShift":                            
            selectEl.style.background = `url('${nightImg}')`
            selectEl.style.backgroundPosition = "100% 20%"
            selectEl.style.textShadow = "0 0 15px white"
            break;
    
        default:
            break;
    }
}

