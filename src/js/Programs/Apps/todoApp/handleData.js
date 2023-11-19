
import data from "./data"
import { dataSchema,complatedSchema } from "./dataSchema"
import { complatedData } from "./data"
import { allTodosStyle,partlyTodosHTML, editModal } from "./UI"
import { editButtonsListeneres } from "./UI-Listeners"

export default function handleData(shift,day,category,todo,date,hour,addDate,updateDate,editingMode,id,addTime,complateDate,complateTime) {
    //** CERATE TODO LİST VARIABLE */
    let todoList = data() || dataSchema
    let complatedList = complatedData() || complatedSchema

    //** ADD or UPDATE or DELETE TODO */
    if(editingMode === "add") {
        AddToTodo(todoList,shift,day,category,todo,date,hour,addDate,updateDate,addTime)
    }

    else if(editingMode === "update") {
       todoList = Delete(todoList,id)
       AddToTodo(todoList,shift,day,category,todo,date,hour,addDate,updateDate,addTime)
    }

    else if(editingMode === "delete") {

        todoList = Delete(todoList,id)
    }

    else if(editingMode = "complate") {
        todoList = Delete(todoList,id)
        AddToComplated(complatedList,shift,day,category,todo,date,hour,addDate,updateDate,addTime,complateDate,complateTime)
        localStorage.setItem("complated",JSON.stringify(complatedList))
    }

    console.log(todoList);
    console.log(complatedList);

    //** SAVE VARIABLE TO LOCALSTORAGE */
    localStorage.setItem("todo",JSON.stringify(todoList))

    //** DISPLAY TODO-LIST */
    const sectionEl = document.querySelector("main section")

        sectionEl.innerHTML =           partlyTodosHTML(shift,data()) + 
                            editModal()
        allTodosStyle()
        editButtonsListeneres()
}

function AddToTodo(todoList,shift,day,category,todo,date,hour,addDate,updateDate,addTime) {
    todoList[shift].forEach(dayObj => {
        if(dayObj.day === day) {
            dayObj.todos[category].push(
                {
                    id : new Date().getTime(),
                    date : date,
                    hour : hour,
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
                    complateTime : +complateTime
                }
            )
        }
    })

    console.log(complateTimeCalc(addTime,complateTime))
}

function complateTimeCalc(addTime, complateTime) {

    return +complateTime - +addTime
}
