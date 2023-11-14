
import images from "../../../../assets/images/pic.png"

function display(people) {

    const personElement = document.createElement("section")
        people.sort((a,b) => parseInt(a.order) - parseInt(b.order))

    personElement.innerHTML = people.map(({name,age,car,lapTime,order})=> {
        return `
        <div class="wrapper flex flex-wrap m-1 max-w-md bg-gradient-to-br from-red-200 to-yellow-200 rounded-lg">
                    
                    <div class="personelInfo w-2/5 flex flex-wrap p-1">
                        <img class=" w-2/3 aspect-square rounded-full" src=${images} alt="">
                        <div class="wrapper flex-grow-0 w-1/3
                                    grid place-content-center">
                            <p class="">${name.toUpperCase()}</p>
                            <p class="text-center">${age}</p>
                        </div>
                        <p class="flex-grow text-center">${car.toUpperCase()}</p>
                    </div>

                    <div class="times w-3/5 flex-grow p-1" >
                        ${laps(lapTime).join("")}
                    </div>

                    <div class="order flex-grow basis-full text-center pb-1s text-lg">
                        <p>${order}</p>
                    </div>

                </div>
        `
    }).join("")

    document.body.appendChild(personElement)

}

function laps(lapTime) {

    const lapTimeArray = Object.values(lapTime)

    return lapTimeArray.map((time,ind) => {

        if(ind == lapTimeArray.length - 1)  {
            return `
                <p>Total : ${time} sec.</p>
            `
        }

        return `
            <p class=" pl-1">Lap ${ind + 1} : ${time} sec.</p>
        `
    })

}

export {display}