
import {Options} from "./app"
import {Move} from "./Move"

export function UI() {
    
    const Screen_Height = window.innerHeight // 667

    const Header = document.querySelector("header")
    const Header_Height = Header.getBoundingClientRect().height // 24
    const Min_Main_Height = Screen_Height - Header_Height // 643

    const main = document.createElement("main")
        main.id = "Snake"
        main.className = `grid place-content-center`
        main.style.minHeight = `${Min_Main_Height}px`
        document.body.appendChild(main)
        main.innerHTML = Gameboard_HTML()
            Snake_Start_Position()
            Food_Start_Position()

        window.addEventListener("keydown",Move)
}

function Gameboard_HTML() {

    const Gameboard_Size = Options().Size
    const Max_Gameboard_Width = Options().Size * Options().Width

    return `
        <section id="Gameboard" class="grid relative border-2 border-black"
            style="grid-template-columns: repeat(${Gameboard_Size},1fr) ">

            ${Array(Gameboard_Size * Gameboard_Size).fill("N").map(item => {
                return `
                    <div class=" w-30 aspect-square"> 

                    </div>
                `
            }).join("")}

            <div id="Snake_Head" class=" w-30 aspect-square absolute bg-black"></div>

            <div id="Food" class=" w-[15px] aspect-square absolute bg-orange-500 rounded-full "></div>

        </section>
    `
}

function Snake_Start_Position() {

    const Snake_Head = document.getElementById("Snake_Head")
    Snake_Head.style.transform = `translate(0rem,${Options().Width * 9}rem)`
        Curren_Position(Snake_Head)
}

function Food_Start_Position() {

    const random = Math.floor( Math.random() * Options().Size)

    const Snake_Head = document.getElementById("Food")
        Snake_Head.style.transform = `translate(${(Options().Width * random) + 0.5}rem,${(Options().Width * random) + 0.5}rem)`
}

export function Curren_Position(item) {
    const item_Position = item.style.transform.split(", ")
    let item_X_Position = item_Position[0].replace("translate(","").replace("rem","")
    let item_Y_Position = item_Position[1].replace("rem)","")
    const Position_Obj = {
        X : +item_X_Position,
        Y : +item_Y_Position
    }
    
    if(item_X_Position < Options().Width>= 0 && item_X_Position < Options().Width ) item_X_Position = "X1"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 2) item_X_Position = "X2"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 3) item_X_Position = "X3"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 4) item_X_Position = "X4"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 5) item_X_Position = "X5"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 6) item_X_Position = "X6"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 7) item_X_Position = "X7"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 8) item_X_Position = "X8"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 9) item_X_Position = "X9"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 10) item_X_Position = "X10"

    if(item_Y_Position < Options().Width >= 0 && item_Y_Position < Options().Width ) item_Y_Position = "Y1"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 2) item_Y_Position = "Y2"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 3) item_Y_Position = "Y3"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 4) item_Y_Position = "Y4"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 5) item_Y_Position = "Y5"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 6) item_Y_Position = "Y6"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 7) item_Y_Position = "Y7"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 8) item_Y_Position = "Y8"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 9) item_Y_Position = "Y9"
    else if( item_Y_Position >= Options().Width && item_Y_Position < Options().Width * 10) item_Y_Position = "Y10"

    Position_Obj.XY = [item_X_Position,item_Y_Position]
    return Position_Obj
}