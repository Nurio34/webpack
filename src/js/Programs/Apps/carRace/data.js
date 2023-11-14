
const data = {
    "pistDistance" : "5 km",
    "data" : [
        {
            "car" : "mazda",
            "person" : {
                "name" : "bob",
                "age" : 21,
                "pic" : "https://image.com/bob"
            },
            "meanVelocity" : {
                "1" : "150 km/h",
                "2" : "142 km/h",
                "3" : "164 km/h",
                "4" : "190 km/h",
                "5" : "188 km/h"
            }
        },
        {
            "car" : "ferrari",
            "person" : {
                "name" : "andy",
                "age" : 23,
                "pic" : "https://image.com/andy"
            },
            "meanVelocity" : {
                "1" : "144 km/h",
                "2" : "154 km/h",
                "3" : "164 km/h",
                "4" : "168 km/h",
                "5" : "131 km/h"
            }
        },
        {
            "car" : "bmw",
            "person" : {
                "name" : "ralf",
                "age" : 20,
                "pic" : "https://image.com/ralf"
            },
            "meanVelocity" : {
                "1" : "156 km/h",
                "2" : "158 km/h",
                "3" : "154 km/h",
                "4" : "160 km/h",
                "5" : "165 km/h"
            }
        },{
            "car" : "toyota",
            "person" : {
                "name" : "mike",
                "age" : 19,
                "pic" : "https://image.com/ralf"
            },
            "meanVelocity" : {
                "1" : "144 km/h",
                "2" : "155 km/h",
                "3" : "166 km/h",
                "4" : "177 km/h",
                "5" : "177 km/h"
            }
        }
    ],
    "count" : 3
}

const pistDistance = data.pistDistance
const personDatas = data.data

export {pistDistance,personDatas}
