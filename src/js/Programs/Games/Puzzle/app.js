
import puzzle1 from "../../../../assets/images/puzzle1.webp"
import border_left from "../../../../assets/images/border_left.png"
import border_right from "../../../../assets/images/border_right.png"
import border_top from "../../../../assets/images/border_top.png"
import border_bottom from "../../../../assets/images/border_bottom.png"
const Borders = [border_left,border_top,border_right,border_bottom]
import piece1 from "../../../../assets/images/1.png"
import piece2 from "../../../../assets/images/2.png"
import piece3 from "../../../../assets/images/3.png"
import piece4 from "../../../../assets/images/4.png"
import piece5 from "../../../../assets/images/5.png"
import piece6 from "../../../../assets/images/6.png"
const Pieces = [piece1,piece2,piece3,piece4,piece5,piece6]
import cyberpunk_bgImg from "../../../../assets/images/cyberpunk.png"
import cyberpunk2_bgImg from "../../../../assets/images/cyberpunk-2.jpg"
import border_left_2 from "../../../../assets/images/border-left-2.png"
import border_top_2 from "../../../../assets/images/border-top-2.png"
import border_right_2 from "../../../../assets/images/border-right-2.png"
import border_bottom_2 from "../../../../assets/images/border-bottom-2.png"
import { Inventory } from "./inventory"
const Inventory_Borders = [border_left_2,border_top_2,border_right_2,border_bottom_2]




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
        Main_El.className = "grid place-content-center isolate overflow-hidden max-w-[375px]"
        Main_El.style.backgroundImage = `url('${cyberpunk_bgImg}')`

    const Gameboard = document.createElement("section")
        Main_El.appendChild(Gameboard)
        Gameboard.id = "Gameboard"
        Gameboard.className = "w-[375px] max-w-[375px]"

    const Image_Container = document.createElement("div")
        Gameboard.appendChild(Image_Container)
        Image_Container.id = "Image_Container"
        Image_Container.className = "w-full aspect-square relative"

    Borders.forEach(border => {
        let Border = document.createElement("img")
            Image_Container.appendChild(Border)
            Border.src = border
            Border.className = "absolute w-full aspect-square pointer-events-none rounded-[1rem] z-10"         
    } ) 

    const Puzzle1_Img_El = document.createElement("img")
        Image_Container.appendChild(Puzzle1_Img_El)
        Puzzle1_Img_El.id = "Puzzle1"
        Puzzle1_Img_El.src = puzzle1
        Puzzle1_Img_El.className = "rounded-[1rem]"

    const Holes = 7
    const Holes_Translates = {
        1 : `70px,170px`,
        2 : `140px,80px`,
        3 : `270px,30px`,
        4 : `280px,180px`,
        5 : `230px,250px`,
        6 : `60px,290px`,
        7 : `180px,180px`
    }
        for(let i=1; i <= Holes; i++){
            let Hole = document.createElement("div")
                Image_Container.appendChild(Hole)
                Hole.className = "absolute top-[0] border-2 border-yellow-500 rounded-full w-[36px] aspect-square bg-black"
                Hole.classList.add(`hole${i}`)
                Hole.style.transform = `translate(${Holes_Translates[i]})`
        }

    const Pieces_Translate_Solves = {
        1 : "71px,171px",
        2 : `141px,81px`,
        3 : `271px,31px`,
        4 : `281px,181px`,
        5 : `231px,251px`,
        6 : `61px,291px`,
    }

    const Pieces_Translates = {
        1 : "121px,-11px",
        2 : `361px,-116px`,
        3 : `71px,431px`,
        4 : `321px,331px`,
        5 : `1px,201px`,
        6 : `301px,0px`,
    }
        for(let i=0; i<=Pieces.length; i++) {
            let Piece = document.createElement("img")
                if(i < Pieces.length) Image_Container.appendChild(Piece)
                Piece.dataset.piece = i + 1
                Piece.className = `absolute top-[0px] w-[34px] rounded-full`
                if(Pieces[i]) Piece.src = Pieces[i]
            
            let random = Math.floor(Math.random()*361)
                Piece.style.transform = `translate(${Pieces_Translates[i+1]}) rotateZ(${random}deg)`
        }

    const Inventory_Bar = document.createElement("div")
        Main_El.appendChild(Inventory_Bar)
        Inventory_Bar.id = "Inventory"
        Inventory_Bar.className = "relative h-[72px] pointer-events-none"
            for(let i = 0; i<Inventory_Borders.length; i++) {
                let border = document.createElement("img")
                    Inventory_Bar.appendChild(border)
                    border.className = `absolute top-0 pointer-events-none`
                    border.src = Inventory_Borders[i]
            }

    Inventory()
}
