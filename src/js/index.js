
import styles from "../assets/styles/style.css"
import carrace from "./carrace/main"
import CwParseInt from "./Code-Wars/4-parseInt"

const test1 = [104976, 220900, 34969, 59049, 150544, 12321, 48841, 15876, 28561, 96100, 23104, 93025, 126025, 40401, 5776, 16641, 89401, 35344, 52900, 207936, 178929, 249001, 234256, 25600, 207936, 72900, 173056, 66049, 242064, 199809, 230400, 102400, 11664, 27225, 73984, 6724, 96100, 35721, 207025, 5476, 9025, 63001, 6084, 11881, 232324, 161604, 33489, 35721, 50176, 65025, 227529, 60025, 91204, 57121, 20164, 6889, 234256, 188356, 15876, 3136, 73441, 25921]



function solution(numbers) {
 
  let Arr = numbers
  let total = 0

  rec()

  function rec() {
    let copyArr = [...Arr].sort((a,b)=> b-a)
    let max = copyArr[0]
    let substractFrom = copyArr[1]

    if(true) {
      let substractResult = max - substractFrom

        Arr = Arr.map(num => {
          if(num == max ) return substractResult
          return num
        })
        const sum = Arr.reduce((res,num)=>res+num,0)
        console.log(Arr,sum);
      rec()
      
    }
    else {
      total = Arr.reduce((res,num)=>res+num,0)
    }
  }



  return total
}



console.log(solution(test1));