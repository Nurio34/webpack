
import { Options } from "./app";
import { Create_New_Box, Transition, All_Boxes_Positions } from "./createBox";


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


function Lines_Y_Forward(All_Boxes) {

    const Size = Options.Size

    const Boxes_on_Y1 = All_Boxes.filter(box=>box.dataset.y === "Y1").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const Boxes_on_Y2 = All_Boxes.filter(box=>box.dataset.y === "Y2").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const Boxes_on_Y3 = All_Boxes.filter(box=>box.dataset.y === "Y3").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const Boxes_on_Y4 = All_Boxes.filter(box=>box.dataset.y === "Y4").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const All_Series = Array()
    //     All_Series.splice(0,0,Boxes_on_Y1,Boxes_on_Y2,Boxes_on_Y3,Boxes_on_Y4)

    

    Move_Y_Forward()



    function Move_Y_Forward() {

        let Move_Amount 

        //** EN SAĞDAKİ KUTUYU TESPİT ET */
        const Most_Right = Boxes_on_Y1[Boxes_on_Y1.length - 1] // DİV.X3

        if(Most_Right) { 
            //** EN SAĞDAKİNİN POSİZSYONU TESPİT ET */
            const Most_Right_Position = Most_Right.dataset.x.slice(-1) // 3

            //** SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
            Move_Amount = Size - Most_Right_Position // 1
            Most_Right.dataset.move = Move_Amount
            Most_Right.dataset.direction = "forward"

            //** EN SAĞDAKİNİN POZİSYONLARINI AYARLA */
            const Old_Position = [Most_Right.dataset.x,Most_Right.dataset.y]
            Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`            
            const New_Position = [Most_Right.dataset.x,Most_Right.dataset.y]

            //** GLOBAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
            console.log({Old_Position,New_Position});
            All_Boxes_Positions(New_Position,Old_Position)

            //** SOLUNDAKİ KUTUYU TESPİT ET */
            const Left_Box = Boxes_on_Y1[Boxes_on_Y1.length - 2] // DİV.X2

            if(!Left_Box) {
                //** SAĞA İLERLET */
                Most_Right.dataset.status = "normal"
                Translate_On_X_Line(Most_Right)     
            }

            else {


            //** SOLUNDAKİNİN ESKİ POZİSYONUNU TESPİT ET */
            const Left_Box_Position = Left_Box.dataset.x.slice(-1)
            const Old_Position = [Left_Box.dataset.x,Left_Box.dataset.y]

            //! PAİR OLUP OLMADIKLARINI CHECK
            const isPair = Most_Right.dataset.value === Left_Box.dataset.value

                if(isPair === false) {
                    /** SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
                    Left_Box.dataset.move = Move_Amount
                    Most_Right.dataset.direction = "forward"

                    //** SOLDAKİNİN YENİ POZİSYONUNU ARALA */
                    Left_Box.dataset.x = `X${+Left_Box_Position + +Move_Amount}`            
                    const New_Position = [Left_Box.dataset.x,Left_Box.dataset.y]
                    //TODO // BU SATIRDA KALMİŞEM LO



                    //** KUTULARIN STATUSLERİNİ AYARLA */
                    Most_Right.dataset.status = "mutate"
                    Left_Box.dataset.status = "remove"

                    //** KUTULARI SAĞA İLERLET */
                    Translate_On_X_Line(Left_Box) 
                                        
                    //**  */
                    Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
                    






                //     Boxes_on_Y1.splice(Boxes_on_Y1.length - 2,2)
            
                //         
                }
                else{
            
                    Most_Right.dataset.status = "normal"
                    Left_Box.dataset.status = "normal"
                    Left_Box.dataset.move = Move_Amount
                //     Translate_Forwards(Most_Right)
                //         Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
                //     Translate_Forwards(Left_Box)
                //         Left_Box.dataset.x = `X${+Left_Box_Position + +Move_Amount}`

                //     Boxes_on_Y1.pop()
            
                //         
                }
            }
            
        }                    
    }
}

function Lines_Y_Backward(All_Boxes) {

    const Size = Options.Size

    const Boxes_on_Y1 = All_Boxes.filter(box=>box.dataset.y === "Y1").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const Boxes_on_Y2 = All_Boxes.filter(box=>box.dataset.y === "Y2").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const Boxes_on_Y3 = All_Boxes.filter(box=>box.dataset.y === "Y3").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const Boxes_on_Y4 = All_Boxes.filter(box=>box.dataset.y === "Y4").sort((a,b)=>a.dataset.x.slice(-1) - b.dataset.x.slice(-1) );
    // const All_Series = Array()
    //     All_Series.splice(0,0,Boxes_on_Y1,Boxes_on_Y2,Boxes_on_Y3,Boxes_on_Y4)

    Move_Y_Backward()

    function Move_Y_Backward() {

        let Move_Amount 

        //** EN SOLDAKİ KUTUYU TESPİT ET */
        const Most_Left = Boxes_on_Y1[0] // DİV.X3

        if(Most_Left) { 
            //** EN SOLDAKİNİN POSİZSYONU TESPİT ET */
            const Most_Left_Position = Most_Left.dataset.x.slice(-1) // 3

            //** SOLA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
            Move_Amount = Most_Left_Position - 1 // 2
            Most_Left.dataset.move = Move_Amount
            Most_Left.dataset.direction = "backward"

            //** SAĞINDAKi KUTUYU TESPİT ET */
            const Right_Box = Boxes_on_Y1[1] // DİV.X4

            if(!Right_Box) {

                //** STATUSUNU AYARLA */
                Most_Left.dataset.status = "normal"

                //** YENİ X POZİSYONUNU AYARLA */
                const Old_Position = [Most_Left.dataset.x,Most_Left.dataset.y]
                Most_Left.dataset.x = `X${+Most_Left_Position - +Move_Amount}`

                //** GLOBAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                const New_Position = [Most_Left.dataset.x,Most_Left.dataset.y]
                    console.log({Old_Position,New_Position});
                All_Boxes_Positions(New_Position,Old_Position)
                Translate_On_X_Line(Most_Left)


            }
            else {
                //** SAĞINDAKİNİN POZİSYONUNU TESPİT ET */
                const Right_Box_Position = Right_Box.dataset.x.slice(-1)

                //! PAİR OLUP OLMADIKLARINI CHECK
                const isPair = Most_Left.dataset.value === Right_Box.dataset.value

                
                // if(isPair === true) {
                //     Most_Right.dataset.status = "mutate"
                //     Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
                //     Left_Box.dataset.status = "remove"
                //     Left_Box.dataset.direction = "forward"

                //     Move_Amount ++
                //     Left_Box.dataset.move = Move_Amount

                //     Translate_Forwards(Most_Right)
                //     Translate_Forwards(Left_Box)


                //     Boxes_on_Y1.splice(Boxes_on_Y1.length - 2,2)
            
                //         
                // }
                // else{
            
                //     
                //     Most_Right.dataset.status = "normal"
                //     Left_Box.dataset.status = "normal"
                //     Left_Box.dataset.move = Move_Amount
                //     Translate_Forwards(Most_Right)
                //         Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
                //     Translate_Forwards(Left_Box)
                //         Left_Box.dataset.x = `X${+Left_Box_Position + +Move_Amount}`

                //     Boxes_on_Y1.pop()
            
                //         
                // }
            }
            
        }                    
    }
}


function Translate_On_X_Line(Box) {
    const Translate_Y = parseFloat(Box.style.transform.split(" ")[1] )
    let Translate_X

    if(Box.dataset.direction === "forward") Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) + ( Transition() * Box.dataset.move)
    else if(Box.dataset.direction === "backward") Translate_X = - parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) + ( Transition() * Box.dataset.move)

    const Transition_Time = "1s"
    Box.style.transition = Transition_Time
    Box.style.transform = `translate(${Translate_X}rem, ${Translate_Y}rem)`

    if(Box.dataset.status === "normal") {

    }
    else if(Box.dataset.status === "mutate") {
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