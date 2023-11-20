
import {createUI} from "./gameZone"

export function g2048() {

    createUI()
}

export const Options = {
    
    Max_GameZone_Width : 23.43,
    Size : 4,
    Padding : 1,
    Gap : 1,
    Theme : "purple"
}

export const Box_Size =  `${ ( Options.Max_GameZone_Width - (Options.Padding * 4) - ( (Options.Size - 1) * Options.Gap ) ) / 4 }`




