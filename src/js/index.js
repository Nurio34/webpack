
import { get } from "lodash"
import styles from "../assets/styles/style.css"
import carrace from "./carrace/main"
import CwParseInt from "./Code-Wars/4-parseInt"


const test1 = -5

function roundToNext5(n){
 
  if(n === 0) return 0
  
  else if(n > 0) {
    return Math.ceil(n / 5) * 5
  }

  else {
    return Math.ceil(n / 5) * 5

  }
}

console.log(roundToNext5(test1));
// 