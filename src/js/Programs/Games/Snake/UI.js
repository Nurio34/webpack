
import {Options} from "./app"

export function UI() {
    
    const Screen_Height = window.innerHeight // 667

    const Header = document.querySelector("header")
    const Header_Height = Header.getBoundingClientRect().height // 24
    const Min_Main_Height = Screen_Height - Header_Height // 643

    const main = document.createElement("main")
        main.id = "Snake"
        main.className = `grid place-content-center min-h-[${Min_Main_Height}px]`
        document.body.appendChild(main)
        main.innerHTML = Gameboard_HTML()
            Snake_Start_Position()
            Food_Start_Position()
}

function Gameboard_HTML() {

    const Gameboard_Size = Options().Size
    const Max_Gameboard_Width = Options().Size * Options().Width

    return `
        <section id="Gameboard" class="grid grid-cols-${Gameboard_Size} max-w-[${Max_Gameboard_Width}rem] relative border-2 border-black">

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
        Snake_Head.style.transform = `translate(0,${Options().Width * 9}rem)`
        Curren_Position(Snake_Head)
}

function Food_Start_Position() {

    const random = Math.floor( Math.random() * Options().Size)

    const Snake_Head = document.getElementById("Food")
        Snake_Head.style.transform = `translate(${(Options().Width * random) + 0.5}rem,${(Options().Width * random) + 0.5}rem)`
}

function Curren_Position(item) {
    const item_Position = item.style.transform.split(",")
    let item_X_Position = +item_Position[0].replace("translate(","").replace("px","")
    let item_Y_Position = +item_Position[1].replace("rem)","")
    
    if(item_X_Position < Options().Width ) item_X_Position = "X1"
    else if( item_X_Position >= Options().Width && item_X_Position < Options().Width * 2) item_X_Position = "X2"

        console.log(item_X_Position);
        //! BURDA KALDIM
}