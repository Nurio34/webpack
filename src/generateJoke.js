const axios = require("axios")

const generateJoke = ()=> {

    const config = {
        headers : {
            Accept : "application/json"
        }
    }
    axios.get("https://icanhazdadjoke.com/", config)
    .then(res=>{

        const id = res.data.id
        const jokeImgEl = document.querySelector("#jokeImgEl")
            jokeImgEl.src = `https://icanhazdadjoke.com/j/${id}.png`
    })
} 

export default generateJoke