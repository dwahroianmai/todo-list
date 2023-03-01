import dom from "./dom";
import "./style.css";

document.getElementById("content").appendChild(dom.createSidebar());
document.getElementById("content").appendChild(dom.createCalendar());
document.getElementById("content").appendChild(dom.createFooter());
