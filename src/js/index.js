
import Tailwind_Css from "../assets/styles/tailwind.css"
import Style from "../assets/styles/style.css"
import logo144 from "../assets/images/logo144.png"
import logo192 from "../assets/images/logo192.png"
import logo512 from "../assets/images/logo512.png"
import { get } from "lodash"
import { Main_Header_Container_HTML, Main_Header_Container_Listeners } from "./UI"


    const Header = document.createElement("header")
        document.body.append( Header)

        Header.append(Main_Header_Container_HTML())
        Main_Header_Container_Listeners()

    //? SERVİCE WORKER REGISTERATION*/
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js")
        .then((reg) => reg)
        .catch((err) =>  err)
    }
    //? --------------------------------

