
import Tailwind_Css from "../assets/styles/tailwind.css"
import { get } from "lodash"
import { Main_Header_Container_HTML, Main_Header_Container_Listeners } from "./UI"



    const Header = document.createElement("header")
        document.body.append( Header)

        Header.append(Main_Header_Container_HTML())
        Main_Header_Container_Listeners()

