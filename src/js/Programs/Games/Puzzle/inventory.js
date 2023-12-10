import { Drag } from "./drag"

export function Inventory() {
    
    const Items_In_Inventory = []

    const Pieces = document.querySelectorAll("[data-piece]")
        Pieces.forEach(Piece => Piece.addEventListener("click",e=>{
            if(Piece.dataset.status !== "in_inventory") {
                Piece.dataset.status = "in_inventory"
                Piece.classList.add("transition")                
                Items_In_Inventory.push(Piece)                
                Inventory_Moves(Items_In_Inventory)
                Drag()
            }
            
        }))
}

export function Inventory_Moves(Items_In_Inventory) {
    const InventoryX = 40
    const InventoryY = 392
    const parameter = Items_In_Inventory[0].clientWidth + Items_In_Inventory[0].clientWidth / 2

        Items_In_Inventory.forEach((Item,ind) => {
            const Item_Rotate = Item.style.transform.split("px)")[1]
                Item.style.transform = `translate(${InventoryX + (parameter * ind)}px,${InventoryY}px) ${Item_Rotate}`
        })
}