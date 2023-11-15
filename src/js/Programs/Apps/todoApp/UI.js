
import listeners from "./UI-Listeners"
import data from "./data"

export default function main() {

    const mainEl = document.createElement("main")

    const formEl = document.createElement("form")
        formEl.className = "flex flex-wrap gap-4 justify-between m-4 p-4 border-2 border-purple-400 rounded-lg"
        mainEl.appendChild(formEl)
        formEl.innerHTML = shiftSelectHTML() + daySelectHTML() + categorySelectHTML() +
                                                todoInputHTML() +
                                            displayFilterSelectHTML()

    const sectionEl = document.createElement("section")  
        sectionEl.className = "w-full bg-pink-300"  
        mainEl.appendChild(sectionEl)   
        // sectionEl.innerHTML = dayPart()

        document.body.appendChild(mainEl)
        listeners(formEl)
            console.log(data());
}


function shiftSelectHTML() {
    return `
        <select name="Shift" id="shiftSelect" class=" border-2 border-black" >
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
            class="border-2 border-black grow px-1 basis-full"
        >
    `
}

function displayFilterSelectHTML() {
    return `
    <select name="DisplayFilter" id="displayFilterSelect" class=" border-2 border-black m-auto">
        <option value="" selected disabled>Display Filter</option>
        <option value="dayShift">Day</option>
        <option value="midShift">Mid</option>
        <option value="nightShift">Night</option>
    </select>
    `
}

export function allTodosHTML() {

    return Object.entries(data()).map(([shift,daysArr],ind)=>{

        return `
            <h2 class="text-lg text-center uppercase">${shift}</h2>
            ${
                daysArr.map(dayObj=>{

                    return `
                        <h3 class="text-center text-md text-red-600 uppercase">${dayObj.day}</h3>
                        ${
                            Object.keys(dayObj.todos).map(category=>{
                                // console.log(dayObj.todos[category])
                                return `
                                    <h4 class="text-center text-base text-purple-600 uppercase">${category}</h4>
                                    <ul>
                                    ${
                                        dayObj.todos[category].map(todo=>{
                                            return `
                                                <li>${todo}</li>
                                             `
                                        }).join("")
                                    }                                  
                                </ul>
                                ` 
                            }).join("")
                        }
                    `
                }).join("")
            }
        `
    }).join("")
}