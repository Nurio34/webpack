
import styles from "../assets/styles/style.css"
import carRace from "./carRace/main"

const test1 = "two hundred fifty one thousand forty two"
const test10 = "seven hundred eighty-three thousand nine hundred and nineteen" 
const test11 = "seven hundred forty three million seven hundred eighty-three thousand nine hundred and nineteen" 


function pasreInt(string) {
	
    const map = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        seventeen: 17,
        eighteen: 18,
        nineteen: 19,
        twenty: 20,
        thirty : 30,
        forty : 40,
        fifty : 50,
        sixty:60,
        seventy : 70,
        eighty : 80,
        ninety : 90,
        hundred : 100,
        thousand : 1000,
        million : 1000000
      };

      const arr = string.split(" ").join("-").split("-")
      const ind = arr.findIndex(item => item === "and")
      if(ind > -1) arr.splice(ind,1)

      return arr.map(str=> {

        return map[str]
      })
}

console.log(pasreInt(test1));