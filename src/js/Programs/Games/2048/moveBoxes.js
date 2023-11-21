
import { Options } from "./app";
import { Create_New_Box, Transition } from "./createBox";


export function Move_Boxes() {


    window.addEventListener("keydown",e=>{

        const keys = ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"]

        if(keys.some(item => item === e.key)) {

            const All_Boxes = [...document.querySelectorAll(".box")]

            switch (e.key) {
                case "ArrowRight":
                    Lines_Y_Forward(All_Boxes)  
                    Create_New_Box()                  

                    break;

                case "ArrowLeft":
                    Lines_Y_Backward(All_Boxes)                    
                    Create_New_Box()                  

                    break;

                case "ArrowDown":
                    Lines_X(All_Boxes)

                    break;

                case "ArrowUp":
                    Lines_X(All_Boxes)

                    break;
            
                default:
                    break;
            }
        }
        
    })
}


// function Lines_Y_Forward(All_Boxes) {

//     const Size = Options.Size

//     const Boxes_on_Y1 = All_Boxes.filter(box=>box.dataset.y === "Y1").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
//     const Boxes_on_Y2 = All_Boxes.filter(box=>box.dataset.y === "Y2").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
//     const Boxes_on_Y3 = All_Boxes.filter(box=>box.dataset.y === "Y3").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
//     const Boxes_on_Y4 = All_Boxes.filter(box=>box.dataset.y === "Y4").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
//     const All_Series = Array()
//         All_Series.splice(0,0,Boxes_on_Y1,Boxes_on_Y2,Boxes_on_Y3,Boxes_on_Y4)
//         Move_Y_Forward()

//     function Move_Y_Forward() {

//         All_Series.forEach(arr=> {

//             let Move_Amount 


//             const Most_Right = arr[arr.length - 1]

//             if(Most_Right) {
//                 const Most_Right_Position = Most_Right.dataset.x.slice(-1)
//                 Move_Amount = Size - Most_Right_Position
//                     Most_Right.dataset.move = Move_Amount
//                     Most_Right.dataset.direction = "forward"

//                 const Left_Box = arr[arr.length - 2]

//                 if(Left_Box) {
//                     const Left_Box_Position = Left_Box.dataset.x.slice(-1)
//                     const isPair = Most_Right.dataset.value === Left_Box.dataset.value
                    
//                     if(isPair === true) {
//                         Most_Right.dataset.status = "mutate"
//                         Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
//                         Left_Box.dataset.status = "remove"
//                         Left_Box.dataset.direction = "forward"

//                         Move_Amount ++
//                         Left_Box.dataset.move = Move_Amount

//                         Translate_Forwards(Most_Right)
//                         Translate_Forwards(Left_Box)


//                         arr.splice(arr.length - 2,2)
//                             console.log({spliced:arr});
//                     }
//                     else{
//                         console.log("else working");
//                         Most_Right.dataset.status = "normal"
//                         Left_Box.dataset.status = "normal"
//                         Left_Box.dataset.move = Move_Amount
//                         Translate_Forwards(Most_Right)
//                             Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
//                         Translate_Forwards(Left_Box)
//                             Left_Box.dataset.x = `X${+Left_Box_Position + +Move_Amount}`

//                         arr.pop()
//                             console.log({poped:arr});
//                     }
//                 }
                
//             }                    
//         })
//     }
// }

function Lines_Y_Backward(All_Boxes) {

    const Size = Options.Size

    const Boxes_on_Y1 = All_Boxes.filter(box=>box.dataset.y === "Y1").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    const Boxes_on_Y2 = All_Boxes.filter(box=>box.dataset.y === "Y2").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    const Boxes_on_Y3 = All_Boxes.filter(box=>box.dataset.y === "Y3").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    const Boxes_on_Y4 = All_Boxes.filter(box=>box.dataset.y === "Y4").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    const All_Series = Array()
        All_Series.splice(0,0,Boxes_on_Y1,Boxes_on_Y2,Boxes_on_Y3,Boxes_on_Y4)
        Move_Y_Backward()

    function Move_Y_Backward() {

        All_Series.forEach(arr=> {

            let Move_Amount 

            const Most_Left = arr[0]

            if(Most_Left) {
                const Most_Left_Position = Most_Left.dataset.x.slice(-1)
                Move_Amount = +Most_Left_Position - 1
                    Most_Left.dataset.move = Move_Amount
                    Most_Left.dataset.direction = "backward"

                const Right_Box = arr[1]

                if(Right_Box) {
                    const Right_Box_Position = Right_Box.dataset.x.slice(-1)
                    const isPair = Most_Left.dataset.value === Right_Box.dataset.value
                    
                    if(isPair === true) {
                        Most_Left.dataset.status = "mutate"
                        Most_Left.dataset.x = `X${+Most_Left_Position - +Move_Amount}`
                        Right_Box.dataset.status = "remove"
                        Right_Box.dataset.direction = "backward"

                        Move_Amount --
                        Right_Box.dataset.move = Move_Amount

                        Translate_Backwards(Most_Left)
                        Translate_Backwards(Right_Box)

                        arr.splice(0,2)

                    }
                    else{
                        console.log("else working");
                        Most_Left.dataset.status = "normal"
                        Right_Box.dataset.status = "normal"
                        Right_Box.dataset.move = Move_Amount
                        Translate_Backwards(Most_Left)
                            Most_Left.dataset.x = `X${+Most_Left_Position - +Move_Amount}`
                        Translate_Backwards(Right_Box)
                            Right_Box.dataset.x = `X${+Right_Box_Position - +Move_Amount}`

                        arr.pop()

                            console.log({poped:arr});
                    }
                }
                
            }                        
        })
    }
}

function Translate_Forwards(Box) {
    const Translate_Y = parseFloat(Box.style.transform.split(" ")[1] )
    let Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) + ( Transition() * Box.dataset.move)

    const Transition_Time = "2s"
    Box.style.transition = Transition_Time
    Box.style.transform = `translate(${Translate_X}rem, ${Translate_Y}rem)`

    if(Box.dataset.status === "mutate") {
        Box.dataset.value = Box.dataset.value  * 2
        Box.textContent = Box.dataset.value

        if(Box.dataset.value === `4`) Box.style.backgroundColor = "orange"
    }
    else if(Box.dataset.status === "remove") {
        // Box.style.opacity = "0"
        setTimeout(() => {
            document.querySelector("section").removeChild(Box);
        }, parseInt(Transition_Time) * 1000);
        
    }
}

function Translate_Backwards(Box) {
    const Translate_Y = parseFloat(Box.style.transform.split(" ")[1] )
    let Translate_X = -parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) + ( Transition() * Box.dataset.move)

    const Transition_Time = "2s"
    Box.style.transition = Transition_Time
    Box.style.transform = `translate(${Translate_X}rem, ${Translate_Y}rem)`

    if(Box.dataset.status === "mutate") {
        Box.dataset.value = Box.dataset.value  * 2
        Box.textContent = Box.dataset.value

        if(Box.dataset.value === `4`) Box.style.backgroundColor = "orange"
    }
    else if(Box.dataset.status === "remove") {
        // Box.style.opacity = "0"
        setTimeout(() => {
            document.querySelector("section").removeChild(Box);
        }, parseInt(Transition_Time) * 1000);
        
    }
}

function Lines_X(All_Boxes) {

    const Boxes_on_X1 = All_Boxes.filter(box=>box.dataset.x === "X1");
    const Boxes_on_X2 = All_Boxes.filter(box=>box.dataset.x === "X2");
    const Boxes_on_X3 = All_Boxes.filter(box=>box.dataset.x === "X3");
    const Boxes_on_X4 = All_Boxes.filter(box=>box.dataset.x === "X4");
}