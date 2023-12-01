import { UI } from "./UI"



export function Snake() {
    localStorage.removeItem("Track_Snake_Map")
    localStorage.removeItem("Track_Food")
    //** GAMEBOARD'U ÇİZ ve YILANIN BAŞLANGIÇ POZİSYONUNU AYARLA */
    UI()
}

export function Options() {

    //** SEÇENEKLERİ AYARLA */
    return {
        Size : 10,
        Width : 1.875,
        GameSpeed : 500
    }
}