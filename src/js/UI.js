
import { todo } from "./Programs/Apps/todoApp/app"
import { g2048 } from "./Programs/Games/2048/app"
import {carRace} from "./Programs/Apps/carRace/main"
import CwParseInt from "./Programs/Code-Wars/4-parseInt"

export function Main_Header_Container_HTML() {

    const Main_Header_Container = document.createElement("div")
    Main_Header_Container.id = "main_Header_Container"
    Main_Header_Container.className = `grid grid-cols-3`

    Main_Header_Container.innerHTML = `
        <div id="log">
            <p>Nurio34</p>
        </div>
        <nav id="apps">
            <select name="Apps" id="appsSelect">
                <option selected disabled value="apps">Apps</option>
                <option value="">Car Race</option>
                <option value="todo">Todo</option>
            </select>
            <select name="Games" id="gamesSelect">
                <option selected disabled value="games">Games</option>
                <option value="g2048">2048</option>
            </select>
        </nav>
        <nav id="social_Links"></nav>
    `

    return Main_Header_Container
}

export function Main_Header_Container_Listeners() {

    const selectEls = document.querySelectorAll("select")

        selectEls.forEach(el=> el.addEventListener("click", e=>{

            const mainEl = document.querySelector("main")
            if(mainEl) document.body.removeChild(mainEl)

            switch (el.value) {

                case "todo":
                    todo()
                    break;

                case "g2048":
                    g2048()
                    break;

                case "carRace":
                    carRace()
                    break;
            
                default:
                    break;
            }
        }))
}