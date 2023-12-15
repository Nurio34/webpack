
import Recipe_Logo from "../../../../assets/images/Recipe_Logo.webp"
import Shakshuk from "../../../../assets/images/Shakshuk.webp"

export function Recipe() {

    const Header = document.querySelector("header")
    const Recipe_Header = document.createElement("div")
        Header.appendChild(Recipe_Header)
        Recipe_Header.id = "Recipe_Header"
        Recipe_Header.className = "flex items-center justify-between p-4 bg-orange-400"
        Recipe_Header.innerHTML = Recipe_Header_HTML()
    const Recipe_Main = document.createElement("main")
        document.body.appendChild(Recipe_Main)
        Recipe_Main.id = "Recipe_Main"
        Recipe_Main.className = "p-6"
        Recipe_Main.innerHTML = Recipe_Main_HTML()
}

function Recipe_Header_HTML() {
    return `
        <div class="rounded-full overflow-hidden">
            <img src="${Recipe_Logo}" width=50 height=50>
        </div>
        <div class=" font-black text-lg">
            Recipe App
        </div>
        <button>
            <i class="fa-solid fa-bars"></i>
        </button>
    `
}

function Recipe_Main_HTML() {
    return `
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <img src="${Shakshuk}" width=80>
            <div class="grow h-full">
                <h2>Shakshuk</h2>
                <p>bla bla bla</p>
            </div>
            <button>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
}