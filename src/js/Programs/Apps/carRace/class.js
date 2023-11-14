
import {pistDistance} from "./data"

class Person {

    constructor(data) {
        this.car = data.car
        this.name = data.person.name
        this.age = data.person.age
        // this.displayTime()
        this.lapTime = this.lapTime(data)
    }

    lapTime(data) {
        const pist = +pistDistance.split(" ")[0] 

        const times = {}
            for (  let i in data.meanVelocity) {
                times[i] = +((pist * 3660) / +data.meanVelocity[i].split(" ")[0]).toFixed(2)
            }
        const total = Object.values(times).reduce((res,sum)=>res+sum,0).toFixed(2)
        times.total = +total

        return times
    }
}

export {Person}