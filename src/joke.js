const axios = require("axios")

const Joke = async()=> {

let data = []

    const config = {
        headers : {
            Accept : "application/json"
        }
    }

    try {
        const response = await axios.get("https://icanhazdadjoke.com/", config)
        data = response.data
    } catch (error) {
        
    }
    return data
} 

export default Joke


