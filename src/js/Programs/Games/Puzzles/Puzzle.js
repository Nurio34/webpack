import cyberpunk_bgImg from "../../../../assets/images/cyberpunk.png"
import cyberpunk2_bgImg from "../../../../assets/images/cyberpunk-2.jpg"
import { Select_Puzzle } from "./Puzzle_1/app"



export function Puzzle() {

    document.body.className = "grid justify-center items-start min-h-[100vh]"
    document.body.style.backgroundImage = `url('${cyberpunk2_bgImg}')`
    document.body.style.backgroundRepeat = "no-repeat"
    document.body.style.backgroundSize = "cover"

    const Header = document.querySelector("header")
        Header.className = `self-start`
    const Header_Height = Header.getBoundingClientRect().height

    const Main_El = document.createElement("main")
        document.body.appendChild(Main_El)
        Main_El.style.minHeight = `calc(667px - ${Header_Height}px )`
        Main_El.className = "grid place-content-center isolate overflow-hidden max-w-[375px] overflow-hidden"
        Main_El.style.backgroundImage = `url('${cyberpunk_bgImg}')`
        Select_Puzzle(0)
}