
import { Options, Box_Size } from "./app"
import { Move_Boxes } from "./moveBoxes"


function Create_New_Box() {

    const Box_Width =  Box_Size

    const gameZone = document.querySelector("section")

    //** ÖNCEDEN VAROLAN DİĞER KUTULARIN DATA-İD'LERİNİ "EXİST" YAP */
    const Existing_Boxes = gameZone.querySelectorAll(".box")
        Existing_Boxes.forEach(box=>box.dataset.id = "exist")
        
    const New_Box = document.createElement("div")
        gameZone.appendChild(New_Box)
        New_Box.className = "box absolute bg-white aspect-square grid place-items-center font-bold text-[1.7rem]"
        New_Box.textContent = New_Box_Value()
        New_Box.dataset.value = New_Box.textContent
        New_Box.dataset.id = "created"

    //** KUTUYU YARATTIKTAN SONRA RASTGELE BİYERE YERLEŞTİR */
        New_Box_Place()
        New_Box_Position()
}

function New_Box_Value() {

    const values = [2,4]

    return values[Math.floor( Math.random() * values.length )]
}

function New_Box_Place() {

    const Box_Width = Box_Size
    const Padding = Options.Padding
    const Gap = Options.Gap
    const Size = Options.Size

    const Random_X_Transition = Math.floor( Math.random() * Size )
    const Random_Y_Transition = Math.floor( Math.random() * Size )


    const New_Box = document.querySelector("[data-id='created']")
        New_Box.style.width = `${Box_Width}rem`
        New_Box.style.top = `${Padding}rem`
        New_Box.style.left = `${Padding}rem`
        New_Box.style.transform = `translate(${Random_X_Transition * Transition()}rem,${Random_Y_Transition * Transition()}rem)`
}

function New_Box_Position() {

    const Size = Options.Size
    const Padding = Options.Padding
    const Gap = Options.Gap
    const Box_Width = Box_Size

    const gameZone = document.querySelector("section")
    const New_Box = document.querySelector("[data-id='created']")
    const Offset_X = (New_Box.getBoundingClientRect().x / 16) - (gameZone.getBoundingClientRect().x / 16) 
    const Offset_Y = (New_Box.getBoundingClientRect().y / 16) - (gameZone.getBoundingClientRect().y / 16) 

        Get_Position()

    function Get_Position() {

        let X,Y

        //** GET X POSİTİON */
            Array(Size).fill("")
            .forEach((item,index)=> {
                if(+Offset_X >= +Padding + ( +Box_Width * index) + ( +Gap * ( index) ) && +Offset_X < +Padding + ( +Box_Width * ( index + 1 ) ) + ( +Gap * ( index + 1 ) )) {

                    //** HEM KUTULARIN DATA-X'İNE YAZARAK DENİCEM */
                    New_Box.dataset.x = `X${index + 1}`

                    //** HEM [X,Y] SUBARRAYİNİ, ALL_BOXEX_POSİTİONS ARRAY'E PUSHLAYARAK DENİCEM  */
                    X = `X${index + 1}`
                }
            })

            //** GET Y POSİTİON */
            Array(Size).fill("")
            .forEach((item,index)=> {
                if(+Offset_Y >= +Padding + ( +Box_Width * index) + ( +Gap * ( index) ) && +Offset_Y < +Padding + ( +Box_Width * ( index + 1 ) ) + ( +Gap * ( index + 1 ) )) {

                    //** HEM KUTULARIN DATA-Y'İNE YAZARAK DENİCEM */
                    New_Box.dataset.y = `Y${index + 1}`

                    //** HEM [X,Y] SUBARRAYİNİ, ALL_BOXEX_POSİTİONS ARRAY'E PUSHLAYARAK DENİCEM  */
                    Y = `Y${index + 1}`
                }
            })

        return [X,Y]       
    }

    (function Is_There_Already_Box_In_That_Position() {

                
        All_Boxes_Positions(Get_Position())
    })()
}

export function All_Boxes_Positions(New_Position,Old_Position) {
    
    const gameZone = document.querySelector("section")
    const All_Boxes = [...gameZone.querySelectorAll(".box")]
    let Arr = JSON.parse(localStorage.getItem("AllPositions")) || []

    if(!Arr[0]) {
        Arr.push(New_Position)
        localStorage.setItem("AllPositions",JSON.stringify(Arr))
    }

    else {
        Arr = Arr.filter(subArr=>JSON.stringify(subArr) !== JSON.stringify(Old_Position))
        const isThereAlready = Arr.some(item=>JSON.stringify(item) === JSON.stringify(New_Position))
       
        if(isThereAlready){
            const New_Box = gameZone.querySelectorAll(".box")[All_Boxes.length - 1]
            gameZone.removeChild(New_Box)
            Create_New_Box()
        }
        else {
            Arr.push(New_Position)
            localStorage.setItem("AllPositions",JSON.stringify(Arr))
        }
    }

    return Arr

}


export function Transition() {
    return +Box_Size + +Options.Gap
}

export {Create_New_Box }