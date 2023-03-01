import dom from "./dom";
import "./style.css";
//import axios from "axios";

document.getElementById("content").appendChild(dom.createSidebar());
document.getElementById("content").appendChild(dom.createCalendar());
document.getElementById("content").appendChild(dom.createFooter());

//axios.get("http://localhost:3000/db").then((response) => console.log(response));
