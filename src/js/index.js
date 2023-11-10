
const test1 = "abde[fgh]ijk" //ok
const test2 = "ab#de[fgh]ijk" //ok
const test3 = "ab#de[fgh]ijk[lmn]opr" //ok
const test4 = "ab#de[fgh]ij#k" // ok
const test5 = "##abde[fgh]ijk" //ok


const test6 = "#abde[fgh]ijk[lmn]##"
const test7 = "##abde[fgh]##ijk[lmn]"
const test8 = "abde[fgh]##ijk[lmn]#"
const test9 = "abde[fgh]ijk[lmn]##"


const test20 = "[ab]adfd[dd]##[abe]dedf[ijk]d#d[h]#"

function alphabetWar(battlefield) {
    let Arr = battlefield.split("")
    const bomb = "#"
    const totalBombs = Arr.filter(item => item === bomb).length
    const shelter = "["
    const shelterEnd = "]"
    let totalShelter = Arr.filter(item => item === shelter).length
    let shelterPos = []
    let survivors = ""

    if(totalBombs === 0) return battlefield.split("").filter(item=> item !== "[" && item !== "]").join("")

    else if(totalBombs === 1) {
        recr()

        function recr(){
            Arr.forEach((str,ind)=> str === "[" || str == "]" ? shelterPos.push(ind) : false )
            shelterPos.length = 2
            survivors += Arr.join("").slice(shelterPos[0] + 1, shelterPos[1])
            Arr = Arr.filter((item,ind)=> ind < shelterPos[0] || ind > shelterPos[1])
            shelterPos = []

            if(Arr.includes("[")) recr(Arr)
            //shelterın çıkarılmış haliyle yeni string oluştur
        }
        
        return survivors
    }

    else if( totalBombs > 1 && totalShelter === 1  ) return ""

    else if( totalBombs > 1 && totalShelter > 1) {

        Arr.forEach((item,ind) => {
            if(item === shelter || item === shelterEnd ) shelterPos.push(ind)
        })
            console.log(shelterPos);
        Arr = Arr.filter((item,ind)=> {
            return item === bomb || ind > 4 && ind < 10
        })

        //! ilk shelterdan önce ve sonra bir mi iki mi bomba var

            // Önce bir bomba var, diğer sheltera kadar bomba yoksa
                //

            // Önce iki bomba varsa

            
            // Sonra bir bomba varsa


            // Sonra bir bomba, diğer sheltera kadar bir ve ya iki bomba varsa
        console.log(Arr);

    }
}



  console.log(alphabetWar(test6));