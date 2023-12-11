
export function Inventory() {
    
    let Items_In_Inventory = []

    const Pieces = document.querySelectorAll("[data-piece]")
        Pieces.forEach(Piece => Piece.addEventListener("click",e=>{
            if(Piece.dataset.status === "hidden") {
                setTimeout(() => {
                    Piece.dataset.status = "in_inventory"
                }, 0);
                Piece.classList.add("transition")                
                Items_In_Inventory.push(Piece)
                Items_In_Inventory = Items_In_Inventory.filter(Item => Item.dataset.status !== "in_hole")                
                Inventory_Moves(Items_In_Inventory)
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