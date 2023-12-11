
export function Rotate() {

    let Rotate = false
    let Piece_Left = 0
    let Piece_Top = 0
    let Piece_Width = 0
    let Mouse_OldX = 0
    let Mouse_OldY = 0
    let Current_Piece
    let Piece_Rotate = 0
    let Piece_Translate
    let Zone
    let Mouse_NewX = 0
    let Mouse_NewY = 0
    let Diff = 0

    const Pieces = document.querySelectorAll("[data-status = 'in_hole']")

        Pieces.forEach(Piece=>Piece.addEventListener("mousedown",e=>{
            Rotate = true

            const Piece = e.target

                
                Piece.classList.add("transition")
            Piece_Left = Math.floor(Piece.getBoundingClientRect().x)
            Piece_Top =  Math.floor(Piece.getBoundingClientRect().y)
            Piece_Width = Piece.clientWidth
            Piece_Rotate = +Piece.style.transform.split(" ")[2].split("(")[1].split("deg)")[0]
            Piece_Translate = Piece.style.transform.split(" ").filter((item,ind)=> ind != 2).join(" ")

            Mouse_OldX = e.clientX
            Mouse_OldY = e.clientY

            Current_Piece = Piece
        }))

        window.addEventListener("mousemove",e=>{

            if(Rotate === true) {

                Mouse_OldX = Mouse_NewX
                Mouse_OldY = Mouse_NewY

                Mouse_NewX = e.clientX
                Mouse_NewY = e.clientY

                const X_Diff = Mouse_NewX - Mouse_OldX
                const Y_Diff = Mouse_NewY - Mouse_OldY

                if( Mouse_NewX > Piece_Left + Piece_Width / 2 && Mouse_NewY < Piece_Top + Piece_Width / 2 ) Zone = "Zone1"
                else if( Mouse_NewX > Piece_Left + Piece_Width / 2 && Mouse_NewY > Piece_Top + Piece_Width / 2) Zone = "Zone2"
                else if( Mouse_NewX < Piece_Left + Piece_Width / 2 && Mouse_NewY > Piece_Top + Piece_Width / 2 ) Zone = "Zone3"
                else if( Mouse_NewX < Piece_Left + Piece_Width / 2 && Mouse_NewY < Piece_Top + Piece_Width / 2 ) Zone = "Zone4"

                if(Zone === "Zone1") {
                    Diff = X_Diff || Y_Diff
                    Piece_Rotate += Diff * 4
                }
                else if(Zone === "Zone2") {
                    Diff = X_Diff || -Y_Diff
                    Piece_Rotate -= Diff * 4
                }
                else if(Zone === "Zone3") {
                    Diff = -X_Diff || -Y_Diff
                    Piece_Rotate += Diff * 4
                }
                else if(Zone === "Zone4") {
                    Diff = -X_Diff || Y_Diff
                    Piece_Rotate -= Diff * 4
                }
                if(Current_Piece.dataset.status === "in_hole") {
                    Current_Piece.classList.remove("transition")
                    Current_Piece.style.transform = `${Piece_Translate} rotateZ(${Piece_Rotate}deg)`
                }                
            }
        })

        window.addEventListener("mouseup",e=>{
            Rotate = false
            const True_Rotate = Piece_Rotate % 360 < 10 || Piece_Rotate % 360 > 350
            if(True_Rotate && Current_Piece.dataset.piece === Current_Piece.dataset.hole) {
                Current_Piece.dataset.status = "locked"
            }

        })
}