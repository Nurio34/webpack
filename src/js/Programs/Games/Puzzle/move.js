import { Rotate } from "./rotate"

const Holes = {
    1 : "71px,171px",
    2 : `141px,81px`,
    3 : `271px,31px`,
    4 : `281px,181px`,
    5 : `231px,251px`,
    6 : `61px,291px`,
    7 : `181px,181px`
}

export function Move() {

    const All_Pieces = document.querySelectorAll("[data-piece]")
    const Pieces_In_Holes =document.querySelectorAll("[data-status='in_hole']")
    let move = false

        if(Pieces_In_Holes.length === All_Pieces.length) {

            Pieces_In_Holes.forEach(Piece=>Piece.addEventListener("mousedown",e=>{
                move = true
            }))

            Pieces_In_Holes.forEach(Piece=>Piece.addEventListener("mouseup",e=>{
                if(move === true && Piece.dataset.status === "in_hole") {

                    let Full_Holes = []

                    const Old_Hole = Piece.dataset.hole

                    Pieces_In_Holes.forEach(Piece => Full_Holes.push(Piece.dataset.hole))
                    const Empty_Hole = Object.keys(Holes).filter(Hole=>!Full_Holes.includes(Hole))[0]

                    const Piece_Rotate = Piece.style.transform.split(" ")[2]
                        Piece.style.transform = `translate(${Holes[Empty_Hole]}) ${Piece_Rotate}`
                    const New_Hole = Empty_Hole
                        Piece.dataset.hole = New_Hole

                        Full_Holes.push(New_Hole)
                        Full_Holes = Full_Holes.filter(Hole => Hole !== Old_Hole)
                }
            }))

            Pieces_In_Holes.forEach(Piece=>Piece.addEventListener("mousemove",e=>{
                move = false
            }))

            Rotate()
        }
}