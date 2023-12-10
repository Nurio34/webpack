
export function Drag() {
    let drag = false
    let top_start = 0
    let left_start = 0
    let top_now = 0
    let left_now = 0

    const Pieces = document.querySelectorAll("[data-status='in_inventory']")

        Pieces.forEach(Piece=> Piece.addEventListener("mousedown",e=>{
            drag = !drag
            top_start = e.clientY
            left_start = e.clientX

                if(drag === true) {
                    Piece.style.transform += "scale(1.2)"
                }

                else{
                    const Transform = Piece.style.transform.split(" ").filter((prop,i)=>i !=  Piece.style.transform.split(" ").length - 1 ).join(" ")                                          
                        Piece.style.transform = Transform
                }
            
        }))

        Pieces.forEach(Piece=> Piece.addEventListener("mousemove",e=>{
            if(drag === true) {
                top_now = e.clientY
                left_now = e.clientX
    
                const total_top = top_start - top_now
                const total_left = left_start - left_now

                let PieceX = +Piece.style.transform.split(",")[0].split("(")[1].split("px")[0] - total_left
                let PieceY = +Piece.style.transform.split(",")[1].split("px")[0] - total_top
                console.log(PieceX,PieceY);

                    Piece.style.transform = `translate(${PieceX}px,${PieceY}px)`
                //     console.log(PieceY);
            }            
        }))
}