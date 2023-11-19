
import {listeners,editButtonsListeneres} from "./UI-Listeners"
import data from "./data"
import { complatedData } from "./data"

export default function main() {

    //** CREATE MAIN ELEMENT AND APPEND IT TO BODY */
    const mainEl = document.createElement("main")
        document.body.appendChild(mainEl)

    //** CREATE FORM ELEMENT AND APPEND IT TO MAIN ELEMENT */
    const formEl = document.createElement("form")
        formEl.className = "m-1 p-4 border-2 border-purple-400 rounded-lg sticky top-0 bg-white"
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
        editButtonsListeneres()


            console.log(data());
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
            <h2 class=" text-xl text-center uppercase text-white font-extrabold ">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-blacK bg-gray-300 uppercase font-extrabold text-lg ">${dayObj.day}</h3>
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
                                                            <p class="break-all pl-2 text-white font-bold">${todo.todo}</p>
                                                            <p class="text-center leading-4 float-right bg-green-500 text-white rounded-t-xl p-1">${todo.complateDate}</p>
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
            <h2 class=" text-xl text-center uppercase text-white font-extrabold">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-blacK bg-gray-300 uppercase font-extrabold text-lg ">${dayObj.day}</h3>
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
                                                            <div class="float-left mr-1 bg-white rounded-b-xl p-1">
                                                                <p class="text-center leading-4">${todo.date}</p>
                                                                <p>${todo.hour}</p>
                                                            </div>
                                                            <p class="break-all pl-2 text-white font-bold ">${todo.todo}</p>
                                                        </div>
                                                        

                                                        <div class="row-start-3 col-start-2 flex justify-center gap-x-3 justify-self-end">
                                                            <button data-type=editBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-updateDate = "${todo.updateDate}" data-addtime="${todo.addTime}"
                                                                class="border-2 border-black rounded-full w-7 aspect-square px-1 bg-orange-500">E</button>

                                                            <button data-type=complateBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-addtime="${todo.addTime}"
                                                                class="border-2 border-black rounded-full w-7 aspect-square px-1 bg-green-500">C</button>

                                                            <button data-type=deleteBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2  border-black rounded-full w-7 aspect-square px-1 bg-red-500">D</button>
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
            <h2 class=" text-xl text-center uppercase text-white font-extrabold">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-blacK bg-gray-300 uppercase font-extrabold text-lg ">${dayObj.day}</h3>
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
                                                            <p class="break-all pl-2 text-white font-bold">${todo.todo}</p>
                                                        </div>
                                                        

                                                        <div class="row-start-3 col-start-2 flex justify-center gap-x-3 justify-self-end">
                                                            <button data-type=editBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-updateDate = "${todo.updateDate}" data-addtime="${todo.addTime}"
                                                                class="border-2 border-black rounded-full w-7 aspect-square px-1 bg-orange-500">E</button>

                                                            <button data-type=complateBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                        data-addDate = "${todo.addDate}" data-addtime="${todo.addTime}"
                                                                class="border-2 border-black rounded-full w-7 aspect-square px-1 bg-green-500">C</button>

                                                            <button data-type=deleteBtn data-id=${todo.id} data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2  border-black rounded-full w-7 aspect-square px-1 bg-red-500">D</button>
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

            shiftDivEl.style.backgroundRepeat = "no-repeat"
            shiftDivEl.style.backgroundSize = "cover"
            shiftDivEl.style.backgroundPosition = "center"

            switch (shiftDivEl.id) {
                case `dayShift`:
                    // shiftDivEl.classList.add("bg-gradient-to-br","from-blue-400","to-white") 
                    shiftDivEl.style.backgroundImage = "url('https://i1.sndcdn.com/artworks-inFkCuMeIJV7oQLc-z1ezuQ-t500x500.jpg')"
                    break;

                case `midShift`:
                    shiftDivEl.style.backgroundImage = "url('https://live.staticflickr.com/2442/3945939267_a27612ec11_b.jpg')"
                    
                    break;
                    
                    case `nightShift`:
                    shiftDivEl.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2021/11/01/22/10/night-6761907_640.jpg')"
                    break;
            
                default:
                    break;
            }

            const categoryDivEls = shiftDivEl.querySelectorAll("div")
                categoryDivEls.forEach(el=>{

                    const heading = el.querySelector("h4")
                    switch (el.id) {
                        case "work":
                            heading.classList.add("bg-red-500")
                            break;
        
                        case "love":
                            heading.classList.add("bg-pink-500")
                            break;
        
                        case "other":
                            heading.classList.add("bg-blue-500")
                            break;
        
                        case "lesson":
                            heading.classList.add("bg-green-500")
                            break;
                    
                        default:
                            break;
                    }
                })
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