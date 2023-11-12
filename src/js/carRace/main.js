
import {personDatas} from "./data"
import {Person} from "./class"
import {display} from "./display"

//! WHEN NEW DATA COMES TO DATA.JS, APP UPDATES 

export default function carRace () {

    const people = []

    personDatas.forEach(data=> {
        let person = new Person(data)
        people.push(person)
    }) 

//** */  /  /  /  /  /  /  /  /  /  /  /  /

const totalTimes = {}

    people.forEach(person => {
        totalTimes[person.name] = person.lapTime.total
    })

//** */  /  /  /  /  /  /  /  /  /  /  /  /

const sorted = Object.entries(totalTimes).sort((a,b)=> a[1]-b[1])
    sorted.forEach((item,index)=>{
        if(index === 0) item.push("1st")
        else if(index === 1) item.push("2nd")
        else if( index === 2) item.push("3rd")
        else item.push(`${index + 1}th`)
    })

    people.forEach(item=> {
        item.order = sorted.filter(sortedItem=> sortedItem[0] === item.name )[0][2]
    })

    return display(people)

}
