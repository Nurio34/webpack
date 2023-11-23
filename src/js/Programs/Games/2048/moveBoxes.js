
import { Logger } from "sass";
import { Options } from "./app";
import { Create_New_Box, Transition } from "./createBox";


export function Move_Boxes() {


    window.addEventListener("keydown",e=>{

        const keys = ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"]

        if(keys.some(key => key === e.key)) {

            switch (e.key) {
                case "ArrowRight":
                    Lines_Y_Forward()
                    break;

                case "ArrowLeft":
                    Lines_Y_Backward()

                    break;

                case "ArrowDown":
                    Lines_X_Down()

                    break;

                case "ArrowUp":
                    Lines_X_Up()

                    break;

                default:
                    break;
            }
        }

    })
}


function Lines_Y_Forward() {
    let Size = Options.Size

    for( let i = 1; i <= Options.Size; i++) {
        let Y = [...document.querySelectorAll("[data-y='Y1']")].sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
        console.log(Y);
    }


    const Boxes_At_Y1 = [...document.querySelectorAll("[data-y='Y1']")].sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const Boxes_on_Y2 = All_Boxes.filter(box=>box.dataset.y === "Y2").sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const Boxes_on_Y3 = All_Boxes.filter(box=>box.dataset.y === "Y3").sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const Boxes_on_Y4 = All_Boxes.filter(box=>box.dataset.y === "Y4").sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const All_Series = Array()
    //     All_Series.splice(0,0,Boxes_At_Y1,Boxes_on_Y2,Boxes_on_Y3,Boxes_on_Y4)
        recrusion()
        Create_New_Box()

    function recrusion() {
        //** EN SAĞDAKİ KUTUYU TESPİT ET */
        const Most_Right = Boxes_At_Y1[Boxes_At_Y1.length - 1]

        if(Most_Right) {
            //** EN SAĞDAKİNİN POSİZSYONU TESPİT ET */
            const Most_Right_Position = Most_Right.dataset.x.slice(1)
            const Most_Right_Old_Position = [Most_Right.dataset.x,Most_Right.dataset.y]

            //** EN SAĞDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
            let Move_Amount = Size - Most_Right_Position // 1
            Most_Right.dataset.move = Move_Amount
            Most_Right.dataset.direction = "forward"

            //** EN SAĞDAKİNİN YENİ POZİSYONUNU AYARLA */
            Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
            const Most_Right_New_Position = [Most_Right.dataset.x,Most_Right.dataset.y]

            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
            Update_All_Boxes_Position_Local_Array(Most_Right_Old_Position,Most_Right_New_Position)

            //** SOLUNDAKİ KUTUYU TESPİT ET */
            const Left_Box = Boxes_At_Y1[Boxes_At_Y1.length - 2] // DİV.X2

            //** SOLUNDA KUTU YOKSA SADECE EN SAĞDAKİNİN DATA.STATUS = "NORMAL". BAŞKA YAPCAK BİŞE YOK SANIRIM */
            if(!Left_Box) {

                Most_Right.dataset.status = "normal"
                Boxes_At_Y1.pop()
            }

            //** SOLUNDA KUTU VARSA */
            else if(Left_Box) {

                //** SOLUNDAKİNİN POZİSYONUNU TESPİT ET */
                const Left_Box_Position = Left_Box.dataset.x.slice(1)
                const Left_Box_Old_Position = [Left_Box.dataset.x,Left_Box.dataset.y]
                Left_Box.dataset.direction = "forward"

                //** EN SAĞDAKİNİN SOLUNDAKİ KUTU İLE BİTİŞİK OLUP OLMAMA DURUMLARINI KONTROL ET*/
                const isLeftBoxNext = +Most_Right_Position - +Left_Box_Position === 1
                const isLeftBoxFar = +Most_Right_Position - +Left_Box_Position !== 1
                //** */ PAİR OLUP OLMADIKLARINI CHECK
                const isPair = Most_Right.dataset.value === Left_Box.dataset.value

                //! SOLUNDAKİ KUTU İLE BİTİŞİKSE
                if(isLeftBoxNext) {

                    //! ve SOLUNDAKİ İLE PAİR DEĞİLSE
                    if(!isPair) {

                        //** SOLDKİNİN YENİ POZİSYONUNU AYARLA */
                        Left_Box.dataset.x = `X${+Left_Box_Position + +Move_Amount}`
                        const Left_Box_New_Position = [Left_Box.dataset.x,Left_Box.dataset.y]

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Left_Box_Old_Position,Left_Box_New_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Left_Box.dataset.status = "normal"

                        //** BOXES_AT_Y1 ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.pop()
                            // console.log(Boxes_At_Y1);                            
                    }

                    //! ve SOLUNDAKİ İLE PAİR İSE
                    else if(isPair) {

                        //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                        Move_Amount++

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Left_Box_Old_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Most_Right.dataset.status = "mutate"
                        Left_Box.dataset.status = "remove"

                        //** BOXES_AT_Y1 ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.splice(Boxes_At_Y1.length - 2,2)
                            // console.log(Boxes_At_Y1);                            
                    }

                    //** SOLDAKİNİN DATA-MOVE = "MOVE_AMOUNT" */

                    //** KUTULARI SAĞA KAYDIR */
                }

                //! SOLUNDAKİ KUTUDAN UZAKSA
                else if(isLeftBoxFar) {

                    //** ARADAKİ MESAFEYİ HESAPLA */
                    const distance = +Most_Right_Position - +Left_Box_Position - 1

                    //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                    Move_Amount = +Move_Amount + +distance

                    //! ve SOLUNDAKİ İLE PAİR DEĞİLSE
                    if(!isPair) {
                        //** SOLDKİNİN YENİ POZİSYONUNU AYARLA */
                        Left_Box.dataset.x = `X${+Left_Box_Position + +Move_Amount}`
                        const Left_Box_New_Position = [Left_Box.dataset.x,Left_Box.dataset.y]
                        Left_Box.dataset.move = Move_Amount

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Left_Box_Old_Position,Left_Box_New_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Left_Box.dataset.status = "normal"

                        //** BOXES_AT_Y1 ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.pop()
                            // console.log(Boxes_At_Y1);                            
                    }
                    //! ve SOLUNDAKİ İLE PAİR İSE
                    else if(isPair) {

                        //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                        Move_Amount++
                        Left_Box.dataset.move = Move_Amount

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Left_Box_Old_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Most_Right.dataset.status = "mutate"
                        Left_Box.dataset.status = "remove"

                        //** BOXES_AT_Y1 ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.splice(Boxes_At_Y1.length - 2,2)
                            // console.log(Boxes_At_Y1);                            
                    }

                }
                Left_Box.dataset.move = +Move_Amount 
                Translate_On_Y_Line(Left_Box)
            }

            Translate_On_Y_Line(Most_Right)

            if(Boxes_At_Y1.length > 0) {
                Size --
                recrusion()
            }

            // console.log(Move_Amount);
            // if (Move_Amount > 0) {
            //     Create_New_Box()
            // }
        }
    }
}

function Lines_Y_Backward() {

    let Go_To = 1

    const Boxes_At_Y1 = [...document.querySelectorAll("[data-y='Y1']")].sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const Boxes_on_Y2 = All_Boxes.filter(box=>box.dataset.y === "Y2").sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const Boxes_on_Y3 = All_Boxes.filter(box=>box.dataset.y === "Y3").sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const Boxes_on_Y4 = All_Boxes.filter(box=>box.dataset.y === "Y4").sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
    // const All_Series = Array()
    //     All_Series.splice(0,0,Boxes_At_Y1,Boxes_on_Y2,Boxes_on_Y3,Boxes_on_Y4)
        recrusion()
        Create_New_Box()

    function recrusion() {
        //** EN SOLDAKİ KUTUYU TESPİT ET */
        const Most_Left = Boxes_At_Y1[0]

        if(Most_Left) {
            //** EN SOLDAKİNİN POSİZSYONU TESPİT ET */
            const Most_Left_Position = Most_Left.dataset.x.slice(1)
            const Most_Left_Old_Position = [Most_Left.dataset.x,Most_Left.dataset.y]

            //** EN SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
            let Move_Amount = Most_Left_Position - Go_To // 1
            Most_Left.dataset.move = Move_Amount
            Most_Left.dataset.direction = "backward"

            //** EN SOLDAKİNİN YENİ POZİSYONUNU AYARLA */
            Most_Left.dataset.x = `X${+Most_Left_Position - +Move_Amount}`
            const Most_Left_New_Position = [Most_Left.dataset.x,Most_Left.dataset.y]

            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
            Update_All_Boxes_Position_Local_Array(Most_Left_Old_Position,Most_Left_New_Position)

            //** SAĞINDAKİ KUTUYU TESPİT ET */
            const Right_Box = Boxes_At_Y1[1] // DİV.X2

            //** SAĞINDA KUTU YOKSA SADECE EN SAĞDAKİNİN DATA.STATUS = "NORMAL". BAŞKA YAPCAK BİŞE YOK SANIRIM */
            if(!Right_Box) {

                Most_Left.dataset.status = "normal"
                Boxes_At_Y1.shift()
            }

            //** SAĞINDA KUTU VARSA */
            else if(Right_Box) {

                //** SAĞINDAKİNİN POZİSYONUNU TESPİT ET */
                const Right_Box_Position = Right_Box.dataset.x.slice(1)
                const Right_Box_Old_Position = [Right_Box.dataset.x,Right_Box.dataset.y]
                Right_Box.dataset.direction = "backward"

                //** EN SOLDAKİNİN SAĞINDAKİ KUTU İLE BİTİŞİK OLUP OLMAMA DURUMLARINI KONTROL ET*/
                const isRightBoxNext = +Right_Box_Position - +Most_Left_Position === 1
                const isRightBoxFar = +Right_Box_Position - +Most_Left_Position !== 1

                //** */ PAİR OLUP OLMADIKLARINI CHECK
                const isPair = Most_Left.dataset.value === Right_Box.dataset.value

                //! SAĞINDAKİ KUTU İLE BİTİŞİKSE
                if(isRightBoxNext) {

                    //! ve SAĞINDAKİ İLE PAİR DEĞİLSE
                    if(!isPair) {

                        //** SAĞINDAKİNİN YENİ POZİSYONUNU AYARLA */
                        Right_Box.dataset.x = `X${+Right_Box_Position - +Move_Amount}`
                        const Right_Box_New_Position = [Right_Box.dataset.x,Right_Box.dataset.y]

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Right_Box_Old_Position,Right_Box_New_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Right_Box.dataset.status = "normal"

                        // //** BOXES_AT_Y1 ARRAYİNDEKİ BAŞTAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.shift()
                    }

                    //! ve SAĞINDAKİ İLE PAİR İSE
                    else if(isPair) {

                        //** SAĞDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                        Move_Amount++

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Right_Box_Old_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Most_Left.dataset.status = "mutate"
                        Right_Box.dataset.status = "remove"

                        //** BOXES_AT_Y1 ARRAYİNDEKİ BAŞTAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.splice(0,2)

                    }

                    //** SAĞDAKİNİN DATA-MOVE = "MOVE_AMOUNT" */

                    //** KUTULARI SAĞA KAYDIR */
                }

                //! SOLUNDAKİ KUTUDAN UZAKSA
                else if(isRightBoxFar) {

                    //** ARADAKİ MESAFEYİ HESAPLA */
                    const distance = +Right_Box_Position - +Most_Left_Position   -1

                    // //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                    Move_Amount = +Move_Amount + +distance

                    //! ve SOLUNDAKİ İLE PAİR DEĞİLSE
                    if(!isPair) {
                        //** SOLDKİNİN YENİ POZİSYONUNU AYARLA */
                        Right_Box.dataset.x = `X${+Right_Box_Position - +Move_Amount}`
                        const Right_Box_New_Position = [Right_Box.dataset.x,Right_Box.dataset.y]

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Right_Box_Old_Position,Right_Box_New_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Right_Box.dataset.status = "normal"

                        // //** BOXES_AT_Y1 ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.shift()

                    }
                    //! ve SOLUNDAKİ İLE PAİR İSE
                    else if(isPair) {

                        //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                        Move_Amount++

                        //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                        Update_All_Boxes_Position_Local_Array(Right_Box_Old_Position)

                        //** STATUS DATALARINI GÜNCELLE */
                        Most_Left.dataset.status = "mutate"
                        Right_Box.dataset.status = "remove"

                        // //** BOXES_AT_Y1 ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                        Boxes_At_Y1.splice(0,2)
                        
                    }
                }

                Right_Box.dataset.move = Move_Amount
                Translate_On_Y_Line(Right_Box)
            }

            Translate_On_Y_Line(Most_Left)

            if(Boxes_At_Y1.length > 0) {
                Go_To ++
                recrusion()
            }

            // if(Move_Amount > 0) {
            //     Create_New_Box()
            // }
        }
    }
}

function Translate_On_Y_Line(Box) {

    const Translate_Y = parseFloat(Box.style.transform.split(" ")[1] )
    let Translate_X

    if(Box.dataset.direction === "forward") Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) + ( Transition() * Box.dataset.move)
    else if(Box.dataset.direction === "backward") Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) - ( Transition() * Box.dataset.move)

    const Transition_Time = "0.3s"
    Box.style.transition = Transition_Time
    Box.style.transform = `translate(${Translate_X}rem, ${Translate_Y}rem)`

    if(Box.dataset.status === "mutate") {
        Box.dataset.value = Box.dataset.value  * 2
        Box.textContent = Box.dataset.value
        Box.dataset.status = "normal"

        if(Box.dataset.value === `4`) Box.style.backgroundColor = "orange"
    }
    else if(Box.dataset.status === "remove") {
        Box.style.opacity = "0"
        Box.classList.remove("box")
        Box.dataset.id = "remove"

        setTimeout(() => {
            document.querySelector("section").removeChild(Box)
        }, parseInt(Transition_Time) * 750);

    }
}


function Update_All_Boxes_Position_Local_Array(Old_Position,New_Position) {
    let All_Boxes_Positions = JSON.parse(localStorage.getItem("AllPositions"))
    All_Boxes_Positions = All_Boxes_Positions.filter(subArr => JSON.stringify(subArr) !== JSON.stringify(Old_Position))

    if(New_Position) {

        All_Boxes_Positions.push(New_Position)
    }

    localStorage.setItem("AllPositions", JSON.stringify(All_Boxes_Positions))
}