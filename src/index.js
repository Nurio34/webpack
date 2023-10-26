
import "./assets/styles/style.css"
import generateJoke from "./generateJoke"





const jokeBtn = document.querySelector(".jokeBtn")
    jokeBtn.onclick = generateJoke

generateJoke()

//! SASS LOADER DOES NOT WORK
console.log("sass-loader does NOT work")