import { dataSchema } from "./dataSchema";

export default function data() {

    return JSON.parse(localStorage.getItem("todo")) || dataSchema
}