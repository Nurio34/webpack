
import listeners from "./UI-Listeners"
import data from "./data"

export default function main() {

    //** CREATE MAIN ELEMENT AND APPEND IT TO BODY */
    const mainEl = document.createElement("main")

    //** CREATE FORM ELEMENT AND APPEND IT TO MAIN ELEMENT */
    const formEl = document.createElement("form")
        formEl.className = "flex flex-wrap gap-y-4 justify-between m-4 p-4 border-2 border-purple-400 rounded-lg"
        mainEl.appendChild(formEl)
        formEl.innerHTML =  shiftSelectHTML() + daySelectHTML() + categorySelectHTML() +
                            todoInputHTML() + dateInputHTML() + timeInputHTML() +
                            shiftFilterSelectHTML() + dayFilterSelectHTML() + categoryFilterSelectHTML()


    //** CREATE SECTION ELEMENT AND APPEND IT TO MAIN ELEMENT*/
    const sectionEl = document.createElement("section")  
        // sectionEl.className = "w-full bg-pink-300"  
        mainEl.appendChild(sectionEl)   
        sectionEl.innerHTML = allTodosHTML(data())
        allTodosStyle(sectionEl)

        document.body.appendChild(mainEl)
        listeners(formEl)
        
            console.log(data());

}


function shiftSelectHTML() {
    return `
        <select name="Shift" id="shiftSelect" class=" border-2 border-black " >
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
            class=" border-2 border-black"
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
            class=" border-2 border-black"
            >
                <option value="Category" selected disabled>Category</option>
                <option value="work">Work</option>
                <option value="lesson">Lesson</option>
                <option value="love">Love</option>
                <option value="other">Other</option>
            </select>
    `
}

function todoInputHTML() {
    return`
        <input type="text" name="Todo" id="todoInput"
            class="border-2 border-black grow px-1 basis-9/12"
        >
    `
}

function dateInputHTML() {
    return `
        <input type="date" name="" id="" class="border-2 border-black grow basis-1/12">
    `
}

function timeInputHTML() {
    return`
        <input type="time" name="" id="" class="border-2 border-black basis-2/12"></input>
    `
}

function shiftFilterSelectHTML() {
    return `
    <select name="ShiftFilter" id="shiftFilterSelect" class=" border-2 border-black m-auto">
        <option value="" selected disabled>Filter by Shift</option>
        <option value="dayShift">Day</option>
        <option value="midShift">Mid</option>
        <option value="nightShift">Night</option>
    </select>
    `
}

function dayFilterSelectHTML() {
    return `
    <select name="DayFilter" id="dayFilterSelect" class=" border-2 border-black m-auto">
        <option value="Day" selected disabled>Filter by Day</option>
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

function categoryFilterSelectHTML() {
    return `
    <select name="CategoryFilter" id="categoryFilterSelect" class=" border-2 border-black m-auto">
        <option value="" selected disabled>Filter by Category</option>
        <option value="daycategory">Day</option>
        <option value="work">Work</option>
        <option value="lesson">Lesson</option>
        <option value="love">Love</option>
        <option value="other">Other</option>
    </select>
    `
}

export function allTodosHTML(data) {

    return Object.entries(data).map(([shift,daysArr],ind)=>{

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
                                                    <li><span>${todo.date}</span> - <span>${todo.hour}</span> - ${todo.todo}</li>
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