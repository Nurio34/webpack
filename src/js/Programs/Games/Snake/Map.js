
export function Track_Snake_Map(subArr) {

    const Map_Array = JSON.parse(localStorage.getItem("Track_Snake_Map")) || []
    Map_Array.push(subArr)
    localStorage.setItem("Track_Snake_Map",JSON.stringify(Map_Array))
}

export function Track_Food(Food_Position) {

    let Map_Array = JSON.parse(localStorage.getItem("Track_Food")) || []
    Map_Array = Food_Position
    localStorage.setItem("Track_Food",JSON.stringify(Map_Array))
}