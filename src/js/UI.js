
import Logo144 from "../assets/images/logo144.png"
import CwParseInt from "./Programs/Code-Wars/4-parseInt"
import {carRace} from "./Programs/Apps/carRace/main"
import { todo } from "./Programs/Apps/todoApp/app"
import { g2048 } from "./Programs/Games/2048/app"
import { Snake } from "./Programs/Games/Snake/app"
import { Puzzle } from "./Programs/Games/Puzzles/Puzzle"
import { Arrow_Keys_Events } from "./Programs/Games/2048/moveBoxes"
import { API_App } from "./Programs/Apps/recipeApp/app"


export function Main_Header_Container_HTML() {

    const Main_Header_Container = document.createElement("div")
    Main_Header_Container.id = "main_Header_Container"
    Main_Header_Container.className = ` p-2 flex justify-between items-center`

    Main_Header_Container.innerHTML = `
        <div>
            <img src="${Logo144}" class=" w-[32px]">
        </div>
        <nav id="apps">
            <select name="Apps" id="appsSelect">
                <option selected disabled value="apps">Apps</option>
                <option value="">Car Race</option>
                <option value="todo">Todo</option>
                <option value="apiApp">API Apps</option>
            </select>
            <select name="Games" id="gamesSelect">
                <option selected disabled value="games">Games</option>
                <option value="g2048">2048</option>
                <option value="puzzle">Puzzle</option>
            </select>
        </nav>
        <nav id="social_Links"></nav>
    `

    return Main_Header_Container
}

export function Main_Header_Container_Listeners() {

    const selectEls = document.querySelectorAll("select")

        selectEls.forEach(el=> el.addEventListener("change", e=>{

            document.body.className = ""
            document.body.style.backgroundImage = ``
            document.body.style.backgroundRepeat = ""
            document.body.style.backgroundSize = ""
            window.removeEventListener("keydown",Arrow_Keys_Events)

            const Header = document.querySelector("header")
            const Header_Els = [...Header.children]
                Header_Els.map(item => {
                    if(item.id !== "main_Header_Container") Header.removeChild(item)
                })

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
                    
                case "puzzle":
                    Puzzle()
                    break;
                    
                case "apiApp":
                    API_App()
                    break;
            
                default:
                    break;
            }
        }))
        API_App()

}