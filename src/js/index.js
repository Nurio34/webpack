
import "../assets/styles/style.css"
import generateJoke from "./generateJoke"


const jokeBtn = document.querySelector(".jokeBtn")
jokeBtn.onclick = generateJoke

generateJoke()

console.log("heyy");


