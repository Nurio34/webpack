
import { Logger } from "sass";
import { Options } from "./app";
import { Create_New_Box, Transition, Box_Colors } from "./createBox";


export function Move_Boxes() {


    window.addEventListener("keydown",Arrow_Keys_Events)
}

export function Arrow_Keys_Events(e){


    const keys = ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"]

    if(keys.some(key => key === e.key)) {

        e.preventDefault()

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

}

function Lines_Y_Forward() {    

    let Move_Amount
    const Will_Create_New_Box = []

    for( let i = 1; i <= Options.Size; i++) {
        let Boxes_At_Y = [...document.querySelectorAll(`[data-y='Y${i}']`)].sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
        let Size = Options.Size
        recrusion()

        function recrusion() {
            //** EN SAĞDAKİ KUTUYU TESPİT ET */
            const Most_Right = Boxes_At_Y[Boxes_At_Y.length - 1]

            if(Most_Right) {
                //** EN SAĞDAKİNİN POSİZSYONU TESPİT ET */
                const Most_Right_Position = Most_Right.dataset.x.slice(1)
                const Most_Right_Old_Position = [Most_Right.dataset.x,Most_Right.dataset.y]

                //** EN SAĞDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
                Move_Amount = Size - Most_Right_Position // 1
                Most_Right.dataset.move = Move_Amount
                Most_Right.dataset.direction = "forward"

                //** EN SAĞDAKİNİN YENİ POZİSYONUNU AYARLA */
                Most_Right.dataset.x = `X${+Most_Right_Position + +Move_Amount}`
                const Most_Right_New_Position = [Most_Right.dataset.x,Most_Right.dataset.y]

                //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                Update_All_Boxes_Position_Local_Array(Most_Right_Old_Position,Most_Right_New_Position)

                //** SOLUNDAKİ KUTUYU TESPİT ET */
                const Left_Box = Boxes_At_Y[Boxes_At_Y.length - 2] // DİV.X2

                //** SOLUNDA KUTU YOKSA SADECE EN SAĞDAKİNİN DATA.STATUS = "NORMAL". BAŞKA YAPCAK BİŞE YOK SANIRIM */
                if(!Left_Box) {

                    Most_Right.dataset.status = "normal"
                    Boxes_At_Y.pop()
                    Will_Create_New_Box.push(Move_Amount)
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

                            //** BOXES_AT_Y ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.pop()    
                            Will_Create_New_Box.push(Move_Amount)                            
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

                            //** BOXES_AT_Y ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.splice(Boxes_At_Y.length - 2,2) 
                            Will_Create_New_Box.push(Move_Amount)                               
                        }                        
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

                            //** BOXES_AT_Y ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.pop()
                            Will_Create_New_Box.push(Move_Amount)
                                
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

                            //** BOXES_AT_Y ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.splice(Boxes_At_Y.length - 2,2)  
                            Will_Create_New_Box.push(Move_Amount)                              
                        }

                    }
                    Left_Box.dataset.move = +Move_Amount 
                    Translate_On_Y_Line(Left_Box)
                }

                Translate_On_Y_Line(Most_Right)

                if(Boxes_At_Y.length > 0) {
                    Size --
                    recrusion()
                }                
            }
        }
    }

    if(Will_Create_New_Box.every(moveAmount => moveAmount === 0)) return
    else Create_New_Box()
}

function Lines_Y_Backward() {    

    let Move_Amount
    const Will_Create_New_Box = []

    for( let i = 1; i <= Options.Size; i++) {
        let Boxes_At_Y = [...document.querySelectorAll(`[data-y='Y${i}']`)].sort((a,b)=>a.dataset.x.slice(1) - b.dataset.x.slice(1) );
        let Go_To = 1
        recrusion()

        function recrusion() {
            //** EN SOLDAKİ KUTUYU TESPİT ET */
            const Most_Left = Boxes_At_Y[0]
    
            if(Most_Left) {
                //** EN SOLDAKİNİN POSİZSYONU TESPİT ET */
                const Most_Left_Position = Most_Left.dataset.x.slice(1)
                const Most_Left_Old_Position = [Most_Left.dataset.x,Most_Left.dataset.y]
    
                //** EN SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
                Move_Amount = Most_Left_Position - Go_To // 1
                Most_Left.dataset.move = Move_Amount
                Most_Left.dataset.direction = "backward"
    
                //** EN SOLDAKİNİN YENİ POZİSYONUNU AYARLA */
                Most_Left.dataset.x = `X${+Most_Left_Position - +Move_Amount}`
                const Most_Left_New_Position = [Most_Left.dataset.x,Most_Left.dataset.y]
    
                //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                Update_All_Boxes_Position_Local_Array(Most_Left_Old_Position,Most_Left_New_Position)
    
                //** SAĞINDAKİ KUTUYU TESPİT ET */
                const Right_Box = Boxes_At_Y[1] // DİV.X2
    
                //** SAĞINDA KUTU YOKSA SADECE EN SAĞDAKİNİN DATA.STATUS = "NORMAL". BAŞKA YAPCAK BİŞE YOK SANIRIM */
                if(!Right_Box) {
    
                    Most_Left.dataset.status = "normal"
                    Boxes_At_Y.shift()
                    Will_Create_New_Box.push(Move_Amount)
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
    
                            // //** BOXES_AT_Y ARRAYİNDEKİ BAŞTAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.shift()
                            Will_Create_New_Box.push(Move_Amount)
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
    
                            //** BOXES_AT_Y ARRAYİNDEKİ BAŞTAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.splice(0,2)
                            Will_Create_New_Box.push(Move_Amount)
                        }    
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
    
                            // //** BOXES_AT_Y ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.shift()
                            Will_Create_New_Box.push(Move_Amount)
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
    
                            // //** BOXES_AT_Y ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_Y.splice(0,2)
                            Will_Create_New_Box.push(Move_Amount)
                        }
                    }
    
                    Right_Box.dataset.move = Move_Amount
                    Translate_On_Y_Line(Right_Box)
                }
    
                Translate_On_Y_Line(Most_Left)
    
                if(Boxes_At_Y.length > 0) {
                    Go_To ++
                    recrusion()
                }
            }
        }
    }

    if(Will_Create_New_Box.every(moveAmount => moveAmount === 0)) return
    else Create_New_Box()
}

function Translate_On_Y_Line(Box) {

    const Translate_Y = parseFloat(Box.style.transform.split(" ")[1] )
    let Translate_X

    if(Box.dataset.direction === "forward") Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) + ( Transition() * Box.dataset.move)
    else if(Box.dataset.direction === "backward") Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1]) - ( Transition() * Box.dataset.move)

    // const Transition_Time = "0.2s"
    // Box.style.transition = Transition_Time
    Box.style.transform = `translate(${Translate_X}rem, ${Translate_Y}rem)`

    if(Box.dataset.status === "mutate") {
        Box.dataset.value = Box.dataset.value  * 2
        Box.textContent = Box.dataset.value
        Box.dataset.status = "normal"
            Box_Colors(Box)
    }
    else if(Box.dataset.status === "remove") {
        Box.style.opacity = "0"
        Box.classList.remove("box")
        Box.dataset.id = "remove"
        Box.dataset.x = "remove"
        Box.dataset.y = "remove"

        setTimeout(() => {
            document.querySelector("section").removeChild(Box)
        }, 1 * 750);

    }
}

function Lines_X_Down() {    
    let Move_Amount
    const Will_Create_New_Box = []

    for( let i = 1; i <= Options.Size; i++) {
        let Boxes_At_X = [...document.querySelectorAll(`[data-x='X${i}']`)].sort((a,b)=>a.dataset.y.slice(1) - b.dataset.y.slice(1) );
        let Size = Options.Size
        recrusion()

        function recrusion() {
            //** EN SAĞDAKİ KUTUYU TESPİT ET */
            const Most_Bottom = Boxes_At_X[Boxes_At_X.length - 1]

            if(Most_Bottom) {
                //** EN SAĞDAKİNİN POSİZSYONU TESPİT ET */
                const Most_Bottom_Position = Most_Bottom.dataset.y.slice(1)
                const Most_Bottom_Old_Position = [Most_Bottom.dataset.x,Most_Bottom.dataset.y]

                //** EN SAĞDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
                Move_Amount = Size - Most_Bottom_Position // 1
                Most_Bottom.dataset.move = Move_Amount
                Most_Bottom.dataset.direction = "down"

                //** EN SAĞDAKİNİN YENİ POZİSYONUNU AYARLA */
                Most_Bottom.dataset.y = `Y${+Most_Bottom_Position + +Move_Amount}`
                const Most_Bottom_New_Position = [Most_Bottom.dataset.x,Most_Bottom.dataset.y]

                //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                Update_All_Boxes_Position_Local_Array(Most_Bottom_Old_Position,Most_Bottom_New_Position)

                //** SOLUNDAKİ KUTUYU TESPİT ET */
                const Top_Box = Boxes_At_X[Boxes_At_X.length - 2] // DİV.X2

                //** SOLUNDA KUTU YOKSA SADECE EN SAĞDAKİNİN DATA.STATUS = "NORMAL". BAŞKA YAPCAK BİŞE YOK SANIRIM */
                if(!Top_Box) {

                    Most_Bottom.dataset.status = "normal"
                    Boxes_At_X.pop()
                    Will_Create_New_Box.push(Move_Amount)
                }

                //** SOLUNDA KUTU VARSA */
                else if(Top_Box) {

                    //** SOLUNDAKİNİN POZİSYONUNU TESPİT ET */
                    const Top_Box_Position = Top_Box.dataset.y.slice(1)
                    const Top_Box_Old_Position = [Top_Box.dataset.x,Top_Box.dataset.y]
                    Top_Box.dataset.direction = "down"

                    //** EN SAĞDAKİNİN SOLUNDAKİ KUTU İLE BİTİŞİK OLUP OLMAMA DURUMLARINI KONTROL ET*/
                    const isTopBoxNext = +Most_Bottom_Position - +Top_Box_Position === 1
                    const isTopBoxFar = +Most_Bottom_Position - +Top_Box_Position !== 1
                    //** */ PAİR OLUP OLMADIKLARINI CHECK
                    const isPair = Most_Bottom.dataset.value === Top_Box.dataset.value

                    //! SOLUNDAKİ KUTU İLE BİTİŞİKSE
                    if(isTopBoxNext) {

                        //! ve SOLUNDAKİ İLE PAİR DEĞİLSE
                        if(!isPair) {

                            //** SOLDKİNİN YENİ POZİSYONUNU AYARLA */
                            Top_Box.dataset.y = `Y${+Top_Box_Position + +Move_Amount}`
                            const Top_Box_New_Position = [Top_Box.dataset.x,Top_Box.dataset.y]

                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Top_Box_Old_Position,Top_Box_New_Position)

                            //** STATUS DATALARINI GÜNCELLE */
                            Top_Box.dataset.status = "normal"

                            //** BOXES_AT_X ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.pop()    
                            Will_Create_New_Box.push(Move_Amount)                            
                        }

                        //! ve SOLUNDAKİ İLE PAİR İSE
                        else if(isPair) {

                            //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                            Move_Amount++

                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Top_Box_Old_Position)

                            //** STATUS DATALARINI GÜNCELLE */
                            Most_Bottom.dataset.status = "mutate"
                            Top_Box.dataset.status = "remove"

                            //** BOXES_AT_X ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.splice(Boxes_At_X.length - 2,2) 
                            Will_Create_New_Box.push(Move_Amount)                               
                        }                        
                    }

                    //! SOLUNDAKİ KUTUDAN UZAKSA
                    else if(isTopBoxFar) {

                        //** ARADAKİ MESAFEYİ HESAPLA */
                        const distance = +Most_Bottom_Position - +Top_Box_Position - 1

                        //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                        Move_Amount = +Move_Amount + +distance

                        //! ve SOLUNDAKİ İLE PAİR DEĞİLSE
                        if(!isPair) {
                            //** SOLDKİNİN YENİ POZİSYONUNU AYARLA */
                            Top_Box.dataset.y = `Y${+Top_Box_Position + +Move_Amount}`
                            const Top_Box_New_Position = [Top_Box.dataset.x,Top_Box.dataset.y]
                            Top_Box.dataset.move = Move_Amount

                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Top_Box_Old_Position,Top_Box_New_Position)

                            //** STATUS DATALARINI GÜNCELLE */
                            Top_Box.dataset.status = "normal"

                            //** BOXES_AT_X ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.pop()
                            Will_Create_New_Box.push(Move_Amount)
                                
                        }
                        //! ve SOLUNDAKİ İLE PAİR İSE
                        else if(isPair) {

                            //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                            Move_Amount++
                            Top_Box.dataset.move = Move_Amount

                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Top_Box_Old_Position)

                            //** STATUS DATALARINI GÜNCELLE */
                            Most_Bottom.dataset.status = "mutate"
                            Top_Box.dataset.status = "remove"

                            //** BOXES_AT_X ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.splice(Boxes_At_X.length - 2,2)  
                            Will_Create_New_Box.push(Move_Amount)                              
                        }

                    }
                    Top_Box.dataset.move = +Move_Amount 
                    Translate_On_X_Line(Top_Box)
                }

                Translate_On_X_Line(Most_Bottom)

                if(Boxes_At_X.length > 0) {
                    Size --
                    recrusion()
                }                
            }
        }
    }

    if(Will_Create_New_Box.every(moveAmount => moveAmount === 0)) return
    else Create_New_Box()
    // Create_New_Box()
}

function Lines_X_Up() {    

    let Move_Amount
    const Will_Create_New_Box = []

    for( let i = 1; i <= Options.Size; i++) {
        let Boxes_At_X = [...document.querySelectorAll(`[data-x='X${i}']`)].sort((a,b)=>a.dataset.y.slice(1) - b.dataset.y.slice(1) );
        let Go_To = 1
        recrusion()

        function recrusion() {
            //** EN SOLDAKİ KUTUYU TESPİT ET */
            const Most_Top = Boxes_At_X[0]
            if(Most_Top) {
                //** EN SOLDAKİNİN POSİZSYONU TESPİT ET */
                const Most_Top_Position = Most_Top.dataset.y.slice(1)
                const Most_Top_Old_Position = [Most_Top.dataset.x,Most_Top.dataset.y]
                
                //** EN SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET */
                Move_Amount = Most_Top_Position - Go_To // 1
                Most_Top.dataset.move = Move_Amount
                Most_Top.dataset.direction = "up"
                
                //** EN SOLDAKİNİN YENİ POZİSYONUNU AYARLA */
                Most_Top.dataset.y = `Y${+Most_Top_Position - +Move_Amount}`
                const Most_Top_New_Position = [Most_Top.dataset.x,Most_Top.dataset.y]
    
                //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                Update_All_Boxes_Position_Local_Array(Most_Top_Old_Position,Most_Top_New_Position)
    
                //** SAĞINDAKİ KUTUYU TESPİT ET */
                const Bottom_Box = Boxes_At_X[1] // DİV.X2
    
                //** SAĞINDA KUTU YOKSA SADECE EN SAĞDAKİNİN DATA.STATUS = "NORMAL". BAŞKA YAPCAK BİŞE YOK SANIRIM */
                if(!Bottom_Box) {
    
                    Most_Top.dataset.status = "normal"
                    Boxes_At_X.shift()
                    Will_Create_New_Box.push(Move_Amount)
                }
    
                //** SAĞINDA KUTU VARSA */
                else if(Bottom_Box) {
    
                    //** SAĞINDAKİNİN POZİSYONUNU TESPİT ET */
                    const Bottom_Box_Position = Bottom_Box.dataset.y.slice(1)
                    const Bottom_Box_Old_Position = [Bottom_Box.dataset.x,Bottom_Box.dataset.y]
                    Bottom_Box.dataset.direction = "up"
    
                    //** EN SOLDAKİNİN SAĞINDAKİ KUTU İLE BİTİŞİK OLUP OLMAMA DURUMLARINI KONTROL ET*/
                    const isBottomBoxNext = +Bottom_Box_Position - +Most_Top_Position === 1
                    const isBottomBoxFar = +Bottom_Box_Position - +Most_Top_Position !== 1
    
                    //** */ PAİR OLUP OLMADIKLARINI CHECK
                    const isPair = Most_Top.dataset.value === Bottom_Box.dataset.value
    
                    //! SAĞINDAKİ KUTU İLE BİTİŞİKSE
                    if(isBottomBoxNext) {
    
                        //! ve SAĞINDAKİ İLE PAİR DEĞİLSE
                        if(!isPair) {
    
                            //** SAĞINDAKİNİN YENİ POZİSYONUNU AYARLA */
                            Bottom_Box.dataset.y = `Y${+Bottom_Box_Position - +Move_Amount}`
                            const Bottom_Box_New_Position = [Bottom_Box.dataset.x,Bottom_Box.dataset.y]
    
                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Bottom_Box_Old_Position,Bottom_Box_New_Position)
    
                            //** STATUS DATALARINI GÜNCELLE */
                            Bottom_Box.dataset.status = "normal"
    
                            // //** BOXES_AT_X ARRAYİNDEKİ BAŞTAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.shift()
                            Will_Create_New_Box.push(Move_Amount)
                        }
    
                        //! ve SAĞINDAKİ İLE PAİR İSE
                        else if(isPair) {
    
                            //** SAĞDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                            Move_Amount++
    
                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Bottom_Box_Old_Position)
    
                            //** STATUS DATALARINI GÜNCELLE */
                            Most_Top.dataset.status = "mutate"
                            Bottom_Box.dataset.status = "remove"
    
                            //** BOXES_AT_X ARRAYİNDEKİ BAŞTAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.splice(0,2)
                            Will_Create_New_Box.push(Move_Amount)
                        }    
                    }
    
                    //! SOLUNDAKİ KUTUDAN UZAKSA
                    else if(isBottomBoxFar) {
    
                        //** ARADAKİ MESAFEYİ HESAPLA */
                        const distance = +Bottom_Box_Position - +Most_Top_Position   -1
    
                        // //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                        Move_Amount = +Move_Amount + +distance
    
                        //! ve SOLUNDAKİ İLE PAİR DEĞİLSE
                        if(!isPair) {
                            //** SOLDKİNİN YENİ POZİSYONUNU AYARLA */
                            Bottom_Box.dataset.y = `Y${+Bottom_Box_Position - +Move_Amount}`
                            const Bottom_Box_New_Position = [Bottom_Box.dataset.x,Bottom_Box.dataset.y]
    
                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Bottom_Box_Old_Position,Bottom_Box_New_Position)
    
                            //** STATUS DATALARINI GÜNCELLE */
                            Bottom_Box.dataset.status = "normal"
    
                            // //** BOXES_AT_X ARRAYİNDEKİ SONDAKİ ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.shift()
                            Will_Create_New_Box.push(Move_Amount)
                        }
                        //! ve SOLUNDAKİ İLE PAİR İSE
                        else if(isPair) {
    
                            //** SOLDAKİNİN SAĞA DOĞRU NEKADR İLERLİCEĞNİ TESPİT ET*/
                            Move_Amount++
    
                            //** LOCAL ALL_POSİTİONS ARRAY'INI GÜNCELLE */
                            Update_All_Boxes_Position_Local_Array(Bottom_Box_Old_Position)
    
                            //** STATUS DATALARINI GÜNCELLE */
                            Most_Top.dataset.status = "mutate"
                            Bottom_Box.dataset.status = "remove"
    
                            // //** BOXES_AT_X ARRAYİNDEKİ SONDAKİ 2 ELEMANI YOK ET VE RECRUSİOUN() */
                            Boxes_At_X.splice(0,2)
                            Will_Create_New_Box.push(Move_Amount)
                        }
                    }
    
                    Bottom_Box.dataset.move = Move_Amount
                    Translate_On_X_Line(Bottom_Box)
                }
    
                Translate_On_X_Line(Most_Top)
    
                if(Boxes_At_X.length > 0) {
                    Go_To ++
                    recrusion()
                }
            }
        }
    }

    if(Will_Create_New_Box.every(moveAmount => moveAmount === 0)) return
    else Create_New_Box()
}

function Translate_On_X_Line(Box) {

    const Translate_X = parseFloat(Box.style.transform.split(" ")[0].split("(")[1])
    let Translate_Y

    if(Box.dataset.direction === "down") Translate_Y = parseFloat(Box.style.transform.split(" ")[1] ) + ( Transition() * Box.dataset.move)
    else if(Box.dataset.direction === "up") Translate_Y = parseFloat(Box.style.transform.split(" ")[1] ) - ( Transition() * Box.dataset.move)

    // const Transition_Time = "0.2s"
    // Box.style.transition = Transition_Time
    Box.style.transform = `translate(${Translate_X}rem, ${Translate_Y}rem)`

    if(Box.dataset.status === "mutate") {
        Box.dataset.value = Box.dataset.value  * 2
        Box.textContent = Box.dataset.value
        Box.dataset.status = "normal"
            Box_Colors(Box)
    }
    else if(Box.dataset.status === "remove") {
        Box.style.opacity = "0"
        Box.classList.remove("box")
        Box.dataset.id = "remove"
        Box.dataset.x = "remove"
        Box.dataset.y = "remove"

        setTimeout(() => {
            document.querySelector("section").removeChild(Box)
        }, 1 * 750);

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