
import generateJoke from "./generateJoke"
import "./styles/style.css"
import laugh from "./assets/laugh.png"


const laughImgEl = document.querySelector("#laughImgEl")
    laughImgEl.style = "width: 2rem; aspect-ratio: 1"
    laughImgEl.src = laugh

const jokeBtn = document.querySelector(".jokeBtn")
    jokeBtn.onclick = generateJoke

generateJoke()

//! SASS LOADER DOES NOT WORK
console.log("sass-loader does NOT work");