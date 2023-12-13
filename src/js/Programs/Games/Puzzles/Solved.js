import { Audio, Select_Puzzle } from "./Puzzle_1/app";
import solved from "../../../../assets/audios/solved.wav"

let puzzle = 0

export function Puzzle_Solved() {
    // Audio(solved)
    console.log("Puzzle Solved");
    puzzle++
    console.log({puzzle});
    const Main_El = document.querySelector("main")
    const Container = document.querySelector("#Container")
        Container.className = `relative`
    const Message_El = document.createElement("div")
        Container.appendChild(Message_El)
        Message_El.id = "Message"
        Message_El.className = `absolute w-[300px] bg-[rgba(255,255,255,0.2)] top-1/2 left-1/2 translate-x-[10000px] -translate-y-1/2  transition text-xl text-center`
        Message_El.textContent = "You Solved Puzzle-1"

    let Overlay
        setTimeout(() => {
            Message_El.classList.remove("translate-x-[10000px]")
            Message_El.classList.add("-translate-x-1/2")

            setTimeout(() => {
                    Container.className = `transition -translate-x-[200%]`
                    
                    if(!document.querySelector("#Overlay")) {                        
                        Overlay = document.createElement("div")
                            document.body.appendChild(Overlay)                            
                    } 
                    else {
                        Overlay = document.querySelector("#Overlay")
                    }
                    Overlay.id = "Overlay"
                    Overlay.className = `absolute top-0 w-screen h-screen bg-white opacity-0 pointer-events-none`
                    Overlay.style.transition = "2s"

                    setTimeout(() => {
                        Overlay.classList.remove("opacity-0")
                        Overlay.classList.add("opacitiy-100")
                        
                        setTimeout(() => {
                            Overlay.classList.remove("opacitiy-100")
                            Overlay.classList.add("opacity-0")
                            Main_El.removeChild(Container)
                                    Select_Puzzle(puzzle)
                        }, 2000);
                    }, 0);
            }, 1000);
        }, 0);
}