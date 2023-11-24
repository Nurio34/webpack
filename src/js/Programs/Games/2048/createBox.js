
import { Options, Box_Size } from "./app"


function Create_New_Box() {

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
            Box_Colors(New_Box)

    //** KUTUYU YARATTIKTAN SONRA RASTGELE BİYERE YERLEŞTİR */
        New_Box_Place()
        New_Box_Position()
}

function New_Box_Value() {

    const values = [2,4]
    
    return Math.random() > 0.3 ? values[0] : values[1]
}

function New_Box_Place() {

    const Box_Width = Box_Size
    const Padding = Options.Padding
    const Size = Options.Size

    const Random_X_Transition = Math.floor( Math.random() * Size )
    const Random_Y_Transition = Math.floor( Math.random() * Size )


    const New_Box = document.querySelector("[data-id='created']")
        New_Box.style.width = `${Box_Width}rem`
        New_Box.style.top = `${Padding}rem`
        New_Box.style.left = `${Padding}rem`
        New_Box.style.transform = `translate(${Random_X_Transition * Transition()}rem,${Random_Y_Transition * Transition()}rem) scale(0)`

        //** CREATİNG ANİMATİON */
        setTimeout(() => {
            New_Box.style.transition = "0.2s"
            New_Box.style.transform = `translate(${Random_X_Transition * Transition()}rem,${Random_Y_Transition * Transition()}rem) scale(1)`
        }, 100);
}

export function Transition() {
    return +Box_Size + +Options.Gap
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
        All_Boxes_Positions(Get_Position())

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

}

function All_Boxes_Positions(New_Position) {
    
    const gameZone = document.querySelector("section")
    const All_Boxes = [...gameZone.querySelectorAll(".box")]
    let Arr = JSON.parse(localStorage.getItem("AllPositions")) || []

    if(!Arr[0]) {
        Arr.push(New_Position)
        localStorage.setItem("AllPositions",JSON.stringify(Arr))
    }

    else {
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
}

export function Box_Colors(Box) {

    if(Box.dataset.value === `2`) {
        Box.style.color = "#776e65"
        Box.style.backgroundColor = "#eee4da"
    }
    else if(Box.dataset.value === `4`) {
        Box.style.color = "#776e65"
        Box.style.backgroundColor = "#eee4da"
    }
    else if(Box.dataset.value === `8`) {
        Box.style.color = "#f9faf8"
        Box.style.backgroundColor = "#f59563"
    }
    else if(Box.dataset.value === `16`) {
        Box.style.color = "#f9f6f2"
        Box.style.backgroundColor = "#f59563"
    }
    else if(Box.dataset.value === `32`) {
        Box.style.color = "#f9f6f2"
        Box.style.backgroundColor = "#f67c5f"
    }
    else if(Box.dataset.value === `64`) {
        Box.style.color = "#f9faf7"
        Box.style.backgroundColor = "#f55d36"
    }
    else if(Box.dataset.value === `128`) {
        Box.style.color = "#f9f8f8"
        Box.style.backgroundColor = "#e9d16f"
    }
    else if(Box.dataset.value === `256`) {
        Box.style.color = "#faf9fd"
        Box.style.backgroundColor = "#eccc5d"
    }
    else if(Box.dataset.value === `512`) {
        Box.style.color = "#f7f9dc"
        Box.style.backgroundColor = "#ebc74c"
    }
    else if(Box.dataset.value === `1024`) {
        Box.style.color = "#f9f8eb"
        Box.style.backgroundColor = "#eac539"
    }
    else if(Box.dataset.value === `2048`) {
        Box.style.color = "#776e65"
        Box.style.backgroundColor = "#eee4da"
    }
}




export {Create_New_Box }