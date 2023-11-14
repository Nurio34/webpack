
// In this kata we want to convert a string into an integer. The strings simply represent the numbers in words.

// Examples:

// "one" => 1
// "twenty" => 20
// "two hundred forty-six" => 246
// "seven hundred eighty-three thousand nine hundred and nineteen" => 783919
// Additional Notes:

// The minimum number is "zero" (inclusively)
// The maximum number, which must be supported is 1 million (inclusively)
// The "and" in e.g. "one hundred and twenty-four" is optional, in some cases it's present and in others 
// it's not
// All tested numbers are valid, you don't need to validate them

//! CONVERT ANY NUMBERS IN STRINGS(JUST LİKE IN TEST VARIABLES BELOW) INTO NUMBERS

export default function parseInt(string) {
	
    const test1 = "two hundred fifty one thousand forty two"
    const test2 = "seven hundred eighty-three thousand nine hundred and nineteen" 
    const test3 = "seven hundred forty three million seven hundred eighty-three thousand seven hundred and fifteen" 
    const test4 = "kqlwdmmkpş qkwjmdpq qwpkjd"

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

      let Arr = string.split(" ").join("-").split("-")
      let millions = []
      let thousands = []
      let hundreds = []
      let total = 0
      let subTotal = 0

      const indOfAnd = Arr.findIndex(item => item === "and")
        if(indOfAnd > -1) Arr.splice(indOfAnd,1)

      Arr = Arr.map(str=> {

        return map[str]
      })

      rec(Arr)


      function rec(Arr) {

        if(Arr.includes(1000000)) {
          const indexOfMillion = Arr.indexOf(1000000)

            Arr.forEach((num,ind) => {
              if(ind <= indexOfMillion) millions.push(num)
            })

            Arr.splice(0,indexOfMillion + 1)

            checkHundreds(millions,"million")
            rec(Arr)


        }

        else if(Arr.includes(1000)) {
          const indexOfThousand = Arr.indexOf(1000)

            Arr.forEach((num,ind) => {
              if(ind <= indexOfThousand) thousands.push(num)
            })

            Arr.splice(0,indexOfThousand + 1)

            checkHundreds(thousands,"thousand")
            rec(Arr)

        }
        else {
          Arr.push(0)
          checkHundreds(Arr,"hundred")
        }
      }

      function checkHundreds(subArr,multiple) {

        if(subArr.includes(100)) {
          hundreds = subArr.slice(0,subArr.length - "1")

          if(hundreds.indexOf(100) !== 0) {
            subTotal = hundreds[0] * 100

            hundreds.forEach((num,ind) => {
              if(ind >1) subTotal += num
            })
          }
          else {
            subTotal = 100

            hundreds.forEach((num,ind) => {
              if(ind > 0) subTotal += num
            })
          }
        }
        else {
          subArr.forEach((num, ind)=> {
            if(ind < subArr.length - 1) {
              subTotal += num
            }
          })

        }

        if(subArr == Arr) total += subTotal
        else total += subTotal * map[multiple]
        hundreds = []
        subTotal = 0
        
      }
      // console.log(String(total) === "NaN") return 1
      if(String(total) === "NaN") return 1
      return total

}

