import { Puzzle_Solved } from "../Solved";
import { Move } from "./move";

export function Dev() {
    const Pieces = document.querySelectorAll("[data-piece]")

    const Holes = {
        1 : "71px,171px",
        2 : `141px,81px`,
        3 : `271px,31px`,
        4 : `281px,181px`,
        5 : `231px,251px`,
        6 : `61px,291px`,
        7 : `181px,181px`
    }

    Pieces.forEach((Piece,i)=>{
        const Random_Rotate = Math.floor(Math.random()*361)
        Piece.style.transform = `translate(${Holes[i+1]}) rotateZ(0deg)`
        Piece.dataset.status = "in_hole"
        Piece.dataset.hole = i + 1
    })

    Move()
    // Puzzle_Solved()
}