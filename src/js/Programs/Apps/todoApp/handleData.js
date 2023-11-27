
import data from "./data"
import { dataSchema,complatedSchema } from "./dataSchema"
import { complatedData } from "./data"
import { allTodosStyle,partlyTodosHTML, editModal } from "./UI"
import { Close_EditBtns_Modal, editBtnsListeners } from "./UI-Listeners"

export default function handleData(shift,day,category,todo,date,hour,importance,addDate,updateDate,editingMode,id,addTime,complateDate,complateTime) {
    //** CERATE TODO LİST VARIABLE */
    let todoList = data() || dataSchema
    let complatedList = complatedData() || complatedSchema

    //** ADD or UPDATE or DELETE TODO */
    if(editingMode === "add") {
        AddToTodo(todoList,shift,day,category,todo,date,hour,importance,addDate,updateDate,addTime)
    }

    else if(editingMode === "update") {
       todoList = Delete(todoList,id)
       AddToTodo(todoList,shift,day,category,todo,date,hour,importance,addDate,updateDate,addTime)
    }

    else if(editingMode === "delete") {

        todoList = Delete(todoList,id)
    }

    else if(editingMode = "complate") {
        todoList = Delete(todoList,id)
        AddToComplated(complatedList,shift,day,category,todo,date,hour,addDate,updateDate,addTime,complateDate,complateTime)
        localStorage.setItem("complated",JSON.stringify(complatedList))
    }

    //** SAVE VARIABLE TO LOCALSTORAGE */
    localStorage.setItem("todo",JSON.stringify(todoList))

    //** DISPLAY TODO-LIST */
    const sectionEl = document.querySelector("main section")

        sectionEl.innerHTML =           partlyTodosHTML(shift,data()) + 
                            editModal()
                            
        allTodosStyle()
        editBtnsListeners()
        Close_EditBtns_Modal()
}

function AddToTodo(todoList,shift,day,category,todo,date,hour,importance,addDate,updateDate,addTime) {
    todoList[shift].forEach(dayObj => {
        if(dayObj.day === day) {
            dayObj.todos[category].push(
                {
                    id : new Date().getTime(),
                    date : date,
                    hour : hour,
                    importance : importance,
                    todo : todo,
                    addDate : addDate,
                    updateDate : updateDate,
                    addTime : +addTime
                }
            )
        }
    })
}

function Delete(todoList,id) {

    const todoString =  ` {${Object.entries(todoList).map(([shift, daysArr]) => {
        return `"${shift}":[${
            daysArr.map(dayObj => {
                return `{${Object.entries(dayObj).map(([key, value]) => {
                    if (typeof value === "string") {
                        return `"${key}":"${value}"`;
                    } else {
                        return `"${key}":{${
                            Object.entries(value).map(([category, todosArr]) => {
                                return `"${category}":[${
                                    todosArr
                                        .filter(todoObj => todoObj.id != id)
                                        .map(todoObj => {
                                            return `{${Object.entries(todoObj).map(([k, v]) => {
                                                return `"${k}":"${v}"`;
                                            })}}`;
                                        })
                                }]`;
                            })
                        }}`;
                    }
                })}}`;
            })
        }]`;
    }).join(', ')}}`

    

    todoList = JSON.parse(todoString)
        return todoList
}

function AddToComplated(complatedList,shift,day,category,todo,date,hour,addDate,updateDate,addTime,complateDate,complateTime) {

    complatedList[shift].forEach(dayObj => {
        if(dayObj.day === day) {
            dayObj.todos[category].push(
                {
                    date : date,
                    hour : hour,
                    todo : todo,
                    addDate : addDate,
                    addTime : +addTime,
                    complateDate : complateDate,
                    complateTime : +complateTime,
                    complatedIn : complateTimeCalc(addTime, complateTime)
                }
            )
        }
    })
}

function complateTimeCalc(addTime, complateTime) {
    const complatedIn = +complateTime - +addTime

    const second = 1000
    const minute = 60 * second
    const hour = 60 * minute
    const day = 24 * hour
    const week = 7 * day
    const month = 30 * day
    const year = 365 * day

    let complateYear, complateMonth, complateWeek, complateDay, complateHour, complateMinute, complateSecond

    if(complatedIn >= second) complateSecond = Math.floor((complatedIn / second) % 60) + "secs"
    if(complatedIn >= minute ) complateMinute = Math.floor((complatedIn / minute) % 60) + "mins"
    if(complatedIn >= hour) complateHour = Math.floor((complatedIn / hour) % 24) + "hours"
    if(complatedIn >= day ) complateDay = Math.floor((complatedIn / day) % 30) + "days"
    if(complatedIn >= week ) complateWeek = ( Math.floor(complatedIn / week ) % 4) + "weeks"
    if(complatedIn > month) complateMonth = Math.floor(( complatedIn / month) % 12) + "months"
    if(complatedIn > year) complateYear = Math.floor(complatedIn / year) + "years"


    if(parseInt(complateYear) > 0 && parseInt(complateMonth) > 0) return complateYear + "," + complateMonth
    if(parseInt(complateYear) > 0) return complateYear
    if(parseInt(complateMonth) > 0 && parseInt(complateWeek) > 0) return complateMonth + "," + complateWeek
    if(parseInt(complateMonth) > 0) return complateMonth
    if(parseInt(complateWeek) > 0 && parseInt(complateDay) > 0) return complateWeek + "," + complateDay
    if(parseInt(complateWeek) > 0) return complateWeek 
    if(parseInt(complateDay) > 0 && parseInt(complateHour) > 0) return complateDay + "," + complateHour
    if(parseInt(complateDay) > 0) return complateDay
    if(parseInt(complateHour) > 0 && parseInt(complateMinute) > 0) return complateHour + "," + complateMinute
    if(parseInt(complateHour) > 0) return complateHour
    if(parseInt(complateMinute) > 0 && parseInt(complateSecond) > 0) return complateMinute + "," + complateSecond
    if(parseInt(complateMinute) > 0 ) return complateMinute
    if(parseInt(complateSecond) > 0 ) return complateSecond
}
