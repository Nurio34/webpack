
import {createUI} from "./gameZone"
import { Arrow_Keys_Events } from "./moveBoxes";

export function g2048() {

    document.body.className = "min-h-[100vh] overflow-hidden"

    localStorage.removeItem("AllPositions")
    window.removeEventListener("keydown",Arrow_Keys_Events)
    createUI()
}

export const Options = {
    
    Max_GameZone_Width : 23.43, //20.3125
    Size : 4,
    Padding : 0.5,
    Gap : 0.5,
    Theme : "#bbada0"
}

export const Box_Size =  `${ ( 23.40 - (Options.Padding * 4) - ( (Options.Size - 1) * Options.Gap ) ) / 4 }`




