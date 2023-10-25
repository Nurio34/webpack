
import laugh from "./assets/images/laugh.png"
import Joke from "./joke"

const generateJoke = async() => {

    const laughImgEl = document.querySelector("#laughImgEl")
    laughImgEl.style = "width: 2rem; aspect-ratio: 1"
    laughImgEl.src = laugh

    const joke = await Joke()
    const id = joke.id
    const jokeImgEl = document.querySelector("#jokeImgEl")
        jokeImgEl.src = `https://icanhazdadjoke.com/j/${id}.png`
        console.log(id);
}

export default generateJoke