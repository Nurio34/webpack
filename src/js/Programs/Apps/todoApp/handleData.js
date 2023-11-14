
import dataSchema from "./dataSchema"

export default function handleData(shift,day,category,todo) {

    const todoList = JSON.parse(localStorage.getItem("todo")) || dataSchema

    todoList.dataSchema[shift].forEach(item => {
        if(item.day === day) {
            item.todos[category].push(todo)
        }
    })

    console.log(todoList);

    // console.log({shift,day,category,todo});
}