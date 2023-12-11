import { Inventory_Moves } from "./inventory"
import {Move} from "./move"

export function Drag() {
    let drag = false
    let top_start = 0
    let left_start = 0
    let top_now = 0
    let left_now = 0
    let Piece
    let PieceX = 0
    let PieceY = 0

    const Pieces_Translate_Solves = {
        1 : "71,171",
        2 : `141,81`,
        3 : `271,31`,
        4 : `281,181`,
        5 : `231,251`,
        6 : `61,291`,
    }

    const Holes_With_Pieces = []
    let Z_Index = 10
        window.addEventListener("click",e=> {
            const Pieces = document.querySelectorAll("[data-status='in_inventory']")

            if(e.target.dataset.status === "in_inventory") {
                drag = true
                Pieces.forEach(Piece => Piece.style.transform = Piece.style.transform.split(" ").filter( (item,ind) => ind < 3 ).join(" "))

                Piece = e.target
                Piece.style.transform += "scale(1.2)"
                Piece.classList.add("z-[10]")

                top_start = e.clientY
                left_start = e.clientX

                PieceX = +Piece.style.transform.split(" ")[0].split("(")[1].split("px")[0]
                PieceY = +Piece.style.transform.split(" ")[1].split("px)")[0]
            }

            else{
                if(drag === true) {
                    Pieces.forEach(Piece => Piece.style.transform = Piece.style.transform.split(" ").filter( (item,ind) => ind < 3 ).join(" "))
                
                    top_now = e.clientY
                    left_now = e.clientX

                    const total_top = top_start - top_now
                    const total_left = left_start - left_now
                        PieceX -= total_left
                        PieceY -= total_top
                    const Piece_Rotate = Piece.style.transform.split(" ")[2]
                        Piece.style.transform = `translate(${PieceX}px,${PieceY}px) ${Piece_Rotate}`

                    const parameter = Piece.clientWidth
                        for(let i in Pieces_Translate_Solves) {
                            const SolveX = +Pieces_Translate_Solves[i].split(",")[0]
                            const SolveY = +Pieces_Translate_Solves[i].split(",")[1]

                                if(PieceX > SolveX - parameter && PieceX < SolveX + parameter &&
                                    PieceY > SolveY - parameter && PieceY < SolveY + parameter) {
                                        if(!Holes_With_Pieces.includes(i)){
                                            Piece.style.transform = `translate(${SolveX}px,${SolveY}px) ${Piece_Rotate}`
                                            Piece.dataset.status = "in_hole"
                                            Piece.dataset.hole = i    
                                            Piece.classList.remove(`z-[10]`)
                                            Holes_With_Pieces.push(i)

                                            const Pieces_In_Inventory = document.querySelectorAll("[data-status='in_inventory']")
                                                if(Pieces_In_Inventory.length)Inventory_Moves(Pieces_In_Inventory)

                                            Move()
                                        }
                                        
                                }
                        }
                    drag = false
                }
            }
        })
}