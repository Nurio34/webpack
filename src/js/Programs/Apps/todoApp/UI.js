
import listeners from "./UI-Listeners"

export default function main() {
    const mainEl = document.createElement("main")
        mainEl.innerHTML = formHTML()

    const formEl = mainEl.querySelector("form")
        formEl.innerHTML = shiftSelectHTML() + daySelectHTML() + categorySelectHTML() +
                                                todoInputHTML()

    document.body.appendChild(mainEl)

    listeners(formEl)
}

function formHTML() {
    return`
    <form class="flex flex-wrap gap-4 justify-between m-4 p-4 border-2 border-purple-400 rounded-lg">

    </form>
    `
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
            class="border-2 border-black grow px-1"
        >
    `
}
