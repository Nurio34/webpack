
export function Events() {
    const Pieces = document.querySelectorAll("[data-piece]")
        Pieces.forEach(Piece => Piece.addEventListener("click",e=>{
            Piece.classList.add("transition")
            Piece.style.transform = `translate(40px,392px)`
        }))
}