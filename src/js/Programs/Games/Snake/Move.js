import { Track_Food, Track_Snake_Map } from "./Map";
import { Curren_Position } from "./UI";
import { Options } from "./app";

let Interval

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

        Track_Snake_Map(Curren_Position(Snake_Head).XY)

    //** YEMİ YEMEDEN DOLAŞIRKEN */
    if(JSON.stringify(Curren_Position(Food).XY) !== JSON.stringify(Curren_Position(Snake_Head).XY)) {
        // localStorage.setItem("Track_Snake_Map", "[]")
    }
    //** YILAN YEMİ YEDİĞİ ZAMAN */
    else {
        console.log("yep");
    }
}
