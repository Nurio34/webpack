import { complatedSchema, dataSchema } from "./dataSchema";

export default function data() {

    return JSON.parse(localStorage.getItem("todo")) || dataSchema
}

export function complatedData() {
 return   JSON.parse(localStorage.getItem("complated")) || complatedSchema
}
