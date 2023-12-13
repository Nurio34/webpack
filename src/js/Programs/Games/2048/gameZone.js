
import { Options, Box_Size } from "./app"
import { Create_New_Box } from "./createBox"
import { Move_Boxes } from "./moveBoxes"


export function createUI(){

    const Size = Options.Size
    const Padding = Options.Padding
    const Gap = Options.Gap
    const Theme =  Options.Theme

    const Header_El = document.querySelector("header")
    const Header_Height = Header_El.clientHeight
        console.log(Header_Height);

    const mainElement = document.createElement("main")
        mainElement.className = "grid place-items-center"
        mainElement.style.minHeight = `calc(100vh - ${Header_Height}px)`
        document.body.append(mainElement) 

    const gameZone = document.createElement("section")
        mainElement.append(gameZone)
        gameZone.className = `grid relative rounded-lg`
        gameZone.style = `padding:${Padding}rem; gap:${Gap}rem; background-color:${Theme}; grid-template-columns: repeat(${Size},1fr); max-width:${Options.Max_GameZone_Width})`
        gameZone.innerHTML = drawGameZone()

    //** AFTER CRETAING UI and GAMEZONE, CREATE FİRST BOX */
    Create_New_Box()
    Move_Boxes()
    
}

function drawGameZone(){

    const Total_Boxes = Math.pow(Options.Size,2)
    const Box_Width =  Box_Size
    
    return Array(Total_Boxes).fill("N").map(size => {
        return `
            <div class=" aspect-square bg-[#ccc0b3] place"
                    style="width:${Box_Width}rem"
            ></div>
        `
    }).join("")
}