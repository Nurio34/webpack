
import {listeners,editBtnsListeners} from "./UI-Listeners"
import data from "./data"
import day from "../../../../assets/images/day.webp"
import mid from "../../../../assets/images/mid.webp"
import night from "../../../../assets/images/night.webp"

import { complatedData } from "./data"

export default function main() {

    //** CREATE MAIN ELEMENT AND APPEND IT TO BODY */
    const mainEl = document.createElement("main")
        document.body.appendChild(mainEl)

    //** CREATE FORM ELEMENT AND APPEND IT TO MAIN ELEMENT */
    const formEl = document.createElement("form")
        formEl.className = "m-1 p-4 border-2 border-purple-400 rounded-lg bg-white"
        formEl.classList.add("grid","grid-cols-12","gap-y-4")
        mainEl.appendChild(formEl)
        formEl.innerHTML =  shiftSelectHTML() + daySelectHTML() + categorySelectHTML() +
                            dateInputHTML() + timeInputHTML() + todoInputHTML() +
                                    shiftFilterSelectHTML() + todoFilterSelectHTML()

    //** CREATE SECTION ELEMENT AND APPEND IT TO MAIN ELEMENT*/
    const sectionEl = document.createElement("section")  
        // sectionEl.className = "w-full bg-pink-300"  
        mainEl.appendChild(sectionEl)   
        sectionEl.innerHTML = allTodosHTML(data()) +
                                    editModal()   
        allTodosStyle()
        listeners()
        editBtnsListeners()
}

function shiftSelectHTML() {
    return `
        <select name="Shift" id="shiftSelect" 
            class=" border-2 border-black
                col-start-1 col-span-3 "
        >
            <option value="shift" selected disabled>Shift</option>
            <option value="dayShift">Day</option>
            <option value="midShift">Mid</option>
            <option value="nightShift">Night</option>
        </select>
    `
}

function daySelectHTML() {
    return `
        <select name="Day" id="daySelect"
            class=" border-2 border-black
                col-start-5 col-span-3 "
            >
                <option value="Day" selected disabled>Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
                <option value="noday">No Day</option>
            </select>
    `
}

function categorySelectHTML() {
    return`
        <select name="Category" id="categorySelect"
            class=" border-2 border-black
                col-start-9 col-span-full"
            >
                <option value="Category" selected disabled>Category</option>
                <option value="work">Work</option>
                <option value="lesson">Lesson</option>
                <option value="love">Love</option>
                <option value="other">Other</option>
            </select>
    `
}

function dateInputHTML() {
    return `
        <input type="date" name="Date" id="dateInput" data-id="time"
            class="border-2 border-black
                col-start-1 col-span-1
            ">
    `
}

function timeInputHTML() {
    return`
        <input type="time" name="Time" id="timeInput" data-id="time"  
            class="border-2 border-black
                col-start-2 col-span-2
            "
            >
    `
}

function todoInputHTML() {
    return`
        <div class="border-2 border-black grid grid-cols-12 items-center
                col-start-4 col-span-full
        ">
            <input type="text" name="Todo" id="todoInput" class=" col-span-10 px-1 grow border-r-2 border-black">
            <i id="submitBtn" class="fa-regular fa-rectangle-list px-2 col-span-2"></i>
        </div>
        
    `
}

function shiftFilterSelectHTML() {
    return `
    <select name="ShiftFilter" id="shiftFilterSelect" 
            class=" border-2 border-black
                col-start-1 col-span-5
            ">
        <option value="all" selected disabled>Filter by Shift</option>
        <option value="all">All</option>
        <option value="dayShift">Day</option>
        <option value="midShift">Mid</option>
        <option value="nightShift">Night</option>
    </select>
    `
}

function todoFilterSelectHTML() {
    return `
        <select name="TodoFilter" id="todoFilterSelect" 
                class=" border-2 border-black
                    col-start-8 col-span-5
                ">
            <option value="todo" selected disabled>Show</option>
            <option value="todo">Todo</option>
            <option value="complated">Complated</option>

        </select>
    `
}

export function allTodosHTML(data,filter) {

    if(filter === "complated") {
        return Object.entries(data).map(([shift,daysArr])=>{

            return `
            <div id=${shift} class=" m-1">
            <h2 class=" text-xl text-center text-white uppercase font-extrabold ">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-blacK uppercase font-extrabold text-lg ">${dayObj.day}</h3>
                        ${
                            Object.keys(dayObj.todos)
                            .filter(todo => todo)
                            .map(category=>{

                                return `
                                    <div id=${category}>
                                    <h4 class="text-center text-base text-white uppercase font-bold ">${category}</h4>
                                    <ul>
                                        ${
                                            dayObj.todos[category].map(todo=>{

                                                return `
                                                    <li class=" grid border-b-2 border-black pr-2">
                                                        <div class=" col-span-2 ml-1">
                                                            <p class="text-center leading-4 float-left bg-blue-600 text-white rounded-b-xl p-1">${todo.addDate}</p>
                                                            <p class="break-all pl-2 font-bold">${todo.todo}</p>
                                                            <p class="text-center leading-4 float-right bg-green-500 text-white rounded-t-xl p-1">${todo.complateDate}</p>
                                                            <p>Complated In : ${todo.complatedIn}
                                                        </div>                                                                                                                                                    
                                                    </li>
                                                `
                                            }).join("")
                                        }                                  
                                    </ul>
                                    </div>
                                ` 
                            }).join("")
                        }
                    `
                }).join("")
            }
            </div>
        `
        }).join("")
    }

    return Object.entries(data).map(([shift,daysArr])=>{

        return `
            <div id=${shift} class=" m-1">
            <h2 class=" text-xl text-center uppercase text-white font-extrabold bg-no-repeat">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-blacK uppercase font-extrabold text-lg ">${dayObj.day}</h3>
                        ${
                            Object.keys(dayObj.todos).map(category=>{

                                return `
                                    <div id=${category}>
                                    <h4 class="text-center text-base text-white uppercase font-bold ">${category}</h4>
                                    <ul>
                                        ${
                                            dayObj.todos[category]
                                            .filter(todo => todo)
                                            .map(todo=>{

                                                return `
                                                    <li class=" grid border-b-2 border-black pb-2 pr-2">
                                                        <div class=" col-span-2 ml-1">
                                                            <div class="float-left mr-1 rounded-b-xl p-1 text-center" style="background-color : rgba(255,255,255,0.5">
                                                                <p class=" leading-4">${todo.date}</p>
                                                                <p>${todo.hour}</p>
                                                            </div>
                                                            <p class="break-all pl-2 font-bold ">${todo.todo}</p>
                                                        </div>
                                                        

                                                        <div class="editBtns absolute grid border-2 border-black invisible  ">
                                                            <button data-type=editBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-updateDate = "${todo.updateDate}" data-addtime="${todo.addTime}"
                                                                class=" border-b-2 border-black p-1 bg-white">Edit</button>

                                                            <button data-type=complateBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-addtime="${todo.addTime}"
                                                                class="border-b-2 border-black p-1 bg-white">Complate</button>

                                                            <button data-type=deleteBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="p-1 bg-white">Delete</button>
                                                        </div>
                                                        
                                                    </li>
                                                `
                                            }).join("")
                                        }                                  
                                    </ul>
                                    </div>
                                ` 
                            }).join("")
                        }
                    `
                }).join("")
            }
            </div>
        `
    }).join("")    
}

export function partlyTodosHTML(shiftFilter,data) {

    return Object.entries(data).
    filter(([shift,daysArr]) => shift === shiftFilter).
    map(([shift,daysArr]) => {

        return `
            <div id=${shift} class=" m-1">
            <h2 class=" text-xl text-center text-white uppercase font-extrabold">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-blacK uppercase font-extrabold text-lg ">${dayObj.day}</h3>
                        ${
                            Object.keys(dayObj.todos).map(category=>{

                                return `
                                    <div id=${category}>
                                    <h4 class="text-center text-base text-white uppercase font-bold ">${category}</h4>
                                    <ul>
                                        ${
                                            dayObj.todos[category].map(todo=>{

                                                return `
                                                    <li class=" grid border-b-2 border-black pb-2 pr-2">
                                                        <div class=" col-span-2 ml-1">
                                                            <div class="float-left mr-1 bg-white rounded-b-xl p-1">
                                                                <p class="text-center leading-4">${todo.date}</p>
                                                                <p>${todo.hour}</p>
                                                            </div>
                                                            <p class="break-all pl-2 font-bold">${todo.todo}</p>
                                                        </div>
                                                        

                                                        <div class="editBtns absolute grid border-2 border-black invisible">
                                                            <button data-type=editBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-updateDate = "${todo.updateDate}" data-addtime="${todo.addTime}"
                                                                class="border-b-2 border-black px-1 bg-white">Edit</button>

                                                            <button data-type=complateBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-addtime="${todo.addTime}"
                                                                class="border-b-2 border-black px-1 bg-white">Complate</button>

                                                            <button data-type=deleteBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="px-1 bg-white">Delete</button>
                                                        </div>
                                                        
                                                    </li>
                                                `
                                            }).join("")
                                        }                                  
                                    </ul>
                                    </div>
                                ` 
                            }).join("")
                        }
                    `
                }).join("")
            }
            </div>
        `
    }).join("")
}

//** ADJUST CLASS PROPERITIES OF EACHOTHER DIV ELEMENTS IN SECTION ELEMENT */
export function allTodosStyle(){

    const sectionEl = document.querySelector("section")

    const shiftDivEls = sectionEl.querySelectorAll("div")
        shiftDivEls.forEach(shiftDivEl=>{
            const h2Els= shiftDivEl.querySelectorAll("h2")

                h2Els.forEach(h2El => {
                    
                    h2El.style.backgroundRepeat = "no-repeat"
                    h2El.style.backgroundSize = "cover"
                    h2El.style.backgroundPosition = "center"

                    switch (shiftDivEl.id) {
                        case `dayShift`:
                            // shiftDivEl.classList.add("bg-gradient-to-br","from-blue-400","to-white") 
                            h2El.style.backgroundImage = `url('${day}')`
                            h2El.style.backgroundPosition = "center 10%"

                            break;
        
                        case `midShift`:
                            h2El.style.backgroundImage = `url('${mid}')`
                            h2El.style.backgroundPosition = "center 40%"
                            
                            break;
                            
                            case `nightShift`:
                            h2El.style.backgroundImage = `url('${night}')`
                            h2El.style.backgroundPosition = "center 10%"

                            break;
                    
                        default:
                            break;
                    }
                })                            

            const categoryDivEls = shiftDivEl.querySelectorAll("div")
                categoryDivEls.forEach(categoryDivEl=>{

                    const heading = categoryDivEl.querySelector("h4")

                    switch (categoryDivEl.id) {
                        case "work":
                            heading.style.backgroundColor = "rgb(239,68,68)"
                            break;
        
                        case "love":
                            heading.style.backgroundColor = "rgb(255,155,54)"
                            break;
        
                        case "other":
                            heading.style.backgroundColor = "rgb(93,154,229)"
                            break;
        
                        case "lesson":
                            heading.style.backgroundColor = "rgb(34,197,94)"
                            break;
                    
                        default:
                            break;
                    }

                    const todoLiEls = categoryDivEl.querySelectorAll("li")
                        todoLiEls.forEach(todoLiEl => {

                            switch (todoLiEl.parentElement.parentElement.id) {
                                case "work":
                                    todoLiEl.style.backgroundColor = "rgba(239,68,68,0.3)"
                                    break;

                                case "love":
                                    todoLiEl.style.backgroundColor = "rgba(255,155,54,0.3)"
                                    break;

                                case "other":
                                    todoLiEl.style.backgroundColor = "rgba(93,154,229,0.3)"
                                    break;

                                case "lesson":
                                    todoLiEl.style.backgroundColor = "rgba(34,197,94,0.3)"
                                    break;

                            
                                default:
                                    break;
                            }
                        })

                })

            const h3Els = document.querySelectorAll("h3")
                h3Els.forEach(el => el.style.backgroundColor = "rgba(209,213,219,0.5)")
        })
}

export function editModal() {

    return `
        <div id="editModal" class=" bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                         w-10/12 px-4 py-8 shadow-cus rounded-lg
                                         grid grid-cols-12 gap-y-4 
                                         -z-50 invisible                                
        ">

            <select name="ModalShift" id="modalShiftSelect" 
                class=" border-2 border-black
                    col-start-1 col-span-3 "
            >
                <option value="shift" selected disabled>Shift</option>
                <option value="dayShift">Day</option>
                <option value="midShift">Mid</option>
                <option value="nightShift">Night</option>
            </select>

            <select name="ModalDay" id="modalDaySelect"
                class=" border-2 border-black
                    col-start-5 col-span-3 "
            >
                <option value="Day" selected disabled>Day</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
                <option value="noday">No Day</option>
            </select>

            <select name="ModalCategory" id="modalCategorySelect"
                class=" border-2 border-black
                    col-start-9 col-span-full"
            >
                <option value="Category" selected disabled>Category</option>
                <option value="work">Work</option>
                <option value="lesson">Lesson</option>
                <option value="love">Love</option>
                <option value="other">Other</option>
            </select>

            <input type="date" name="ModalDate" id="modalDateInput" data-id="time"
                class="border-2 border-black
                    col-start-1 col-span-5
            ">

            <input type="time" name="ModalTime" id="modalTimeInput" data-id="time"  
                class="border-2 border-black
                    col-start-8 col-span-5
            "
            >

            <div class="border-2 border-black grid grid-cols-12 items-center
                col-start-1 col-span-full
            ">
                
                <textarea name="ModalTodo" id="modalTodoTextarea" rows="3"
                    class=" col-span-10 px-1 grow border-r-2 border-black"
                ></textarea>
                <i id="ModalSubmitBtn" class="fa-regular fa-rectangle-list px-2 col-span-2"></i>
            </div>

            <p id="addDate" class=" col-start-1 col-span-6">Add : 12.12.23 </p>

            <p id="updateDate" class=" col-start-7 col-span-6">Update : 15.12.23 </p>
        </div>
    `
}