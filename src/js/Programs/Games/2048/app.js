
import {createUI} from "./gameZone"
import { Arrow_Keys_Events } from "./moveBoxes";

export function g2048() {
    localStorage.removeItem("AllPositions")
    window.removeEventListener("keydown",Arrow_Keys_Events)
    createUI()
    setInterval(() => {
    }, 1000);
}

export const Options = {
    
    Max_GameZone_Width : 23.43,
    Size : 4,
    Padding : 0.5,
    Gap : 0.5,
    Theme : "#bbada0"
}

export const Box_Size =  `${ ( Options.Max_GameZone_Width - (Options.Padding * 4) - ( (Options.Size - 1) * Options.Gap ) ) / 4 }`




