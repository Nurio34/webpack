
import listeners from "./UI-Listeners"
import data from "./data"

export default function main() {

    //** CREATE MAIN ELEMENT AND APPEND IT TO BODY */
    const mainEl = document.createElement("main")
        document.body.appendChild(mainEl)

    //** CREATE FORM ELEMENT AND APPEND IT TO MAIN ELEMENT */
    const formEl = document.createElement("form")
        formEl.className = "m-4 p-4 border-2 border-purple-400 rounded-lg"
        formEl.classList.add("grid","grid-cols-12","gap-y-4")
        mainEl.appendChild(formEl)
        formEl.innerHTML =  shiftSelectHTML() + daySelectHTML() + categorySelectHTML() +
                            dateInputHTML() + timeInputHTML() + todoInputHTML() +
                                        shiftFilterSelectHTML()         

    //** CREATE SECTION ELEMENT AND APPEND IT TO MAIN ELEMENT*/
    const sectionEl = document.createElement("section")  
        // sectionEl.className = "w-full bg-pink-300"  
        mainEl.appendChild(sectionEl)   
        sectionEl.innerHTML = allTodosHTML(data())
        allTodosStyle(sectionEl)

            listeners()


            // console.log(data());
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
                <option value=monday>Monday</option>
                <option value=tuesday>Tuesday</option>
                <option value=wednesday>Wednesday</option>
                <option value=thursday>Thursday</option>
                <option value=friday>Friday</option>
                <option value=saturday>Saturday</option>
                <option value=sunday>Sunday</option>
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
            <i class="fa-regular fa-rectangle-list px-2 col-span-2"></i>
        </div>
        
    `
}

function shiftFilterSelectHTML() {
    return `
    <select name="ShiftFilter" id="shiftFilterSelect" 
            class=" border-2 border-black
                col-start-4 col-span-5
            ">
        <option value="" selected disabled>Filter by Shift</option>
        <option value="all">All</option>
        <option value="dayShift">Day</option>
        <option value="midShift">Mid</option>
        <option value="nightShift">Night</option>
    </select>
    `
}


export function allTodosHTML(data) {

    return Object.entries(data).map(([shift,daysArr])=>{

        return `
            <div id=${shift} class=" m-4">
            <h2 class="text-lg text-center uppercase">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-red-600 uppercase">${dayObj.day}</h3>
                        ${
                            Object.keys(dayObj.todos).map(category=>{

                                return `
                                    <div id=${category}>
                                    <h4 class="text-center text-base text-purple-600 uppercase">${category}</h4>
                                    <ul>
                                        ${
                                            dayObj.todos[category].map(todo=>{

                                                return `
                                                    <li class=" grid border-b-2 border-black pb-2 px-2">
                                                        <div class=" col-span-2">
                                                            <div class=" row-start-1 bg-pink-300 float-left mr-1">
                                                                <p class="text-center leading-4">${todo.date}</p>
                                                                <p>${todo.hour}</p>
                                                            </div>
                                                            <p class="row-start-1 break-all">${todo.todo}</p>
                                                        </div>
                                                        

                                                        <div class="row-start-3 col-span-2 flex justify-center gap-x-4">
                                                            <button data-type=editBtn data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2 border-black px-1 bg-green-400">Edit</button>
                                                            <button data-type=complateBtn data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2 border-black px-1 bg-green-400">Complate</button>
                                                            <button data-type=deleteBtn data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2  border-black px-1 bg-green-400">Delete</button>
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
export function allTodosStyle(sectionEl){

        const shiftDivEls = sectionEl.querySelectorAll("div")
        shiftDivEls.forEach(shiftDivEl=>{

            switch (shiftDivEl.id) {
                case `dayShift`:
                    shiftDivEl.classList.add("bg-gradient-to-br","from-blue-400","to-white") 
                    break;

                case `midShift`:
                    shiftDivEl.classList.add("bg-gradient-to-br","from-orange-400","to-white")
                    break;

                case `nightShift`:
                    shiftDivEl.classList.add("bg-gradient-to-br","from-black","to-gray-500")
                    break;
            
                default:
                    break;
            }
            const categoryDivEls = shiftDivEl.querySelectorAll("div")
                categoryDivEls.forEach(el=>{

                    switch (el.id) {
                        case "work":
                            el.classList.add("bg-red-200")
                            break;
        
                        case "love":
                            el.classList.add("bg-pink-200")
                            break;
        
                        case "other":
                            el.classList.add("bg-blue-200")
                            break;
        
                        case "lesson":
                            el.classList.add("bg-green-200")
                            break;
                    
                        default:
                            break;
                    }
                })

        })
}

export function partlyTodosHTML(shiftFilter) {

    return Object.entries(data()).
    filter(([shift,daysArr]) => shift === shiftFilter).
    map(([shift,daysArr]) => {

        return `
            <div id=${shift} class=" m-4">
            <h2 class="text-lg text-center uppercase">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-red-600 uppercase">${dayObj.day}</h3>
                        ${
                            Object.keys(dayObj.todos).map(category=>{

                                return `
                                    <div id=${category}>
                                    <h4 class="text-center text-base text-purple-600 uppercase">${category}</h4>
                                    <ul>
                                        ${
                                            dayObj.todos[category].map(todo=>{

                                                return `
                                                    <li class=" grid border-b-2 border-black pb-2 px-2">
                                                        <div class=" col-span-2">
                                                            <div class=" row-start-1 bg-pink-300 float-left mr-1">
                                                                <p class=" text-center leading-4">${todo.date}</p>
                                                                <p>${todo.hour}</p>
                                                            </div>
                                                            <p class="row-start-1 break-all">${todo.todo}</p>
                                                        </div>
                                                        

                                                        <div class="row-start-3 col-span-2 flex justify-center gap-x-4">
                                                            <button data-type=editBtn data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2 border-black px-1 bg-green-400">Edit</button>
                                                            <button data-type=complateBtn data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2 border-black px-1 bg-green-400">Complate</button>
                                                            <button data-type=deleteBtn data-shift=${shift} data-day=${dayObj.day} data-category=${category}
                                                                class="border-2  border-black px-1 bg-green-400">Delete</button>
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