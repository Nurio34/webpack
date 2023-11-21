
import { Options, Box_Size } from "./app"
import { Create_New_Box } from "./createBox"
import { Move_Boxes } from "./moveBoxes"


export function createUI(){

    localStorage.clear("AllPositions")
    const Size = Options.Size
    const Padding = Options.Padding
    const Gap = Options.Gap
    const Theme =  Options.Theme

    const mainElement = document.createElement("main")
        mainElement.className = "grid place-items-center"
        document.body.append(mainElement) 
        document.body.className = "min-h-screen grid justify-stretch items-center"

    const gameZone = document.createElement("section")
        mainElement.append(gameZone)
        gameZone.className = `grid grid-cols-${Size} relative`
        gameZone.style = `padding:${Padding}rem; gap:${Gap}rem; background-color:${Theme}`
        gameZone.innerHTML = drawGameZone()

    //** AFTER CRETAING UI and GAMEZONE, CREATE FİRST BOX */
    Create_New_Box()
    Move_Boxes()
    // Create_New_Box()
    // Create_New_Box()
}

function drawGameZone(){

    const Total_Boxes = Math.pow(Options.Size,2)
    const Max_GameZone_Width = Options.Max_GameZone_Width
    const Size = Options.Size
    const Padding = Options.Padding
    const Gap = Options.Gap
    const Box_Width =  Box_Size
    
    return Array(Total_Boxes).fill("N").map(size => {
        return `
            <div class=" aspect-square bg-pink-400 place"
                    style="width:${Box_Width}rem"
            ></div>
        `
    }).join("")
}