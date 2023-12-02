import { Track_Food, Track_Snake_Map } from "./Map";
import { Curren_Position } from "./UI";
import { Options } from "./app";

let Interval
let Snake_Length = Options().Snake_Length
export function Move(e) {
    
    const Direction = e.key.slice(5)
        if(Direction === "Right" || Direction === "Left" || Direction === "Up" || Direction === "Down") {
            clearInterval(Interval)
            Interval = setInterval(() => {
                Translate(Direction)
            }, Options().GameSpeed);
        }               
}


function Translate(Direction) {

    const Gameboard = document.getElementById("Gameboard")
    const Snake_Head = document.getElementById("Snake_Head")
    const Food = document.getElementById("Food")
    const Transition_Parameter = Options().Width

        Track_Food(Curren_Position(Food).XY)
        Track_Snake_Map(Curren_Position(Snake_Head).XY)

        switch (Direction) {

            case "Right":
                Snake_Head.style.transform = `translate(${Curren_Position(Snake_Head).X + Transition_Parameter}rem,${Curren_Position(Snake_Head).Y}rem)`
                break;

            case "Left":
                Snake_Head.style.transform = `translate(${Curren_Position(Snake_Head).X - Transition_Parameter}rem,${Curren_Position(Snake_Head).Y}rem)`
                break;

            case "Up":
                Snake_Head.style.transform = `translate(${Curren_Position(Snake_Head).X}rem,${Curren_Position(Snake_Head).Y  - Transition_Parameter}rem)`

                break;

            case "Down":
                Snake_Head.style.transform = `translate(${Curren_Position(Snake_Head).X}rem,${Curren_Position(Snake_Head).Y + Transition_Parameter}rem)`

                break;
        
            default:
                break;
        }

        const Snake_Map = Track_Snake_Map(Curren_Position(Snake_Head).XY)

    //! YEMİ YEMEDEN DOLAŞIRKEN */
    if(JSON.stringify(Curren_Position(Food).XY) !== JSON.stringify(Curren_Position(Snake_Head).XY)) {
        localStorage.setItem("Track_Snake_Map", "[]")
    }
    //! YILAN YEMİ YEDİĞİ ZAMAN */
    else {
        
        //** YILANA BİR ADET BODY EKLE ["ESKİ POZİSYONA"] */
        const Snake_Old_Position = Snake_Map[0] // X7Y8
        const Snake_Old_X_Position = +Snake_Old_Position[0].slice(1)
        const Snake_Old_Y_Position = +Snake_Old_Position[1].slice(1)

        const Snake_Body = document.createElement("div")
            Gameboard.appendChild(Snake_Body)
            Snake_Body.dataset.id = "Snake_Body"
            Snake_Body.className = "w-30 aspect-square absolute bg-black"
            Snake_Body.style.transform = `translate(${(Snake_Old_X_Position - 1) * Options().Width}rem, ${(Snake_Old_Y_Position - 1) * Options().Width}rem )`        

        const All_Snake_Bodys = Gameboard.querySelectorAll("[data-id='Snake_Body']")
            All_Snake_Bodys.forEach((body,i) => body.dataset.line = i + 1)

        //** MAP ARRAY'İ BİR FAZLADAN TAKİP ETCEK ŞEKİLDE DİZAYN SET */
        //todo BURDA KALDIM
    }
}
