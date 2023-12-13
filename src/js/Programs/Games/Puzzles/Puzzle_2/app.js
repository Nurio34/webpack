import { Puzzle_Solved } from "../Solved"

export function Puzzle2() {
    console.log("Puzzle-2")
    const btn = document.createElement("buton")
    const Container = document.createElement("div")
        Container.id = "Container"
        document.querySelector("main").appendChild(btn)
        document.querySelector("main").appendChild(Container)

        btn.textContent = "BUTTON"
        btn.className = "bg-white"
        btn.addEventListener("click",e=>{
            console.log(e.target);
            Puzzle_Solved()
        })
}