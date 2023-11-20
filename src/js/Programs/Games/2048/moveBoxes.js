
import { Create_New_Box } from "./createBox";

export function Move_Boxes() {

    window.addEventListener("keydown",e=>{

        const keys = ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"]

        if(keys.some(item => item === e.key)) {

            Create_New_Box()
            const Existing_Boxes = [...document.querySelectorAll("[data-id='exist']")]

            switch (e.key) {
                case "ArrowRight":
                    Lines_X(Existing_Boxes)                    

                    break;

                case "ArrowLeft":
                    Lines_X(Existing_Boxes)                    

                    break;

                case "ArrowDown":
                    Lines_Y(Existing_Boxes)

                    break;

                case "ArrowUp":
                    Lines_Y(Existing_Boxes)

                    break;
            
                default:
                    break;
            }
        }
        
    })
}

//** AYNI SERİDEKİ DATA-İD ="EXİST" OLAN TÜM KUTULARI KÜMELE */

function Lines_X(Existing_Boxes) {

    const Boxes_on_X1 = Existing_Boxes.filter(box=>box.dataset.x === "X1");
    const Boxes_on_X2 = Existing_Boxes.filter(box=>box.dataset.x === "X2");
    const Boxes_on_X3 = Existing_Boxes.filter(box=>box.dataset.x === "X3");
    const Boxes_on_X4 = Existing_Boxes.filter(box=>box.dataset.x === "X4");
}

function Lines_Y(Existing_Boxes) {

    const Boxes_on_Y1 = Existing_Boxes.filter(box=>box.dataset.y === "Y1");
    const Boxes_on_Y2 = Existing_Boxes.filter(box=>box.dataset.y === "Y2");
    const Boxes_on_Y3 = Existing_Boxes.filter(box=>box.dataset.y === "Y3");
    const Boxes_on_Y4 = Existing_Boxes.filter(box=>box.dataset.y === "Y4");
}
