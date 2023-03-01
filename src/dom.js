import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

//creates a calendar with fullcalendar library
function createCalendar() {
  const calendarEl = document.createElement("div");
  calendarEl.setAttribute("id", "calendar");

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek",
    },
    height: "100%",
  });

  calendar.render();
  return calendarEl;
}

//create a sidebar
function createSidebar() {
  const sidebar = document.createElement("div");
  sidebar.setAttribute("id", "sidebar");

  const logo = document.createElement("h1");
  logo.textContent = "ListIt";
  sidebar.appendChild(logo);

  const addNew = document.createElement("button");
  addNew.textContent = "New task or event";
  sidebar.appendChild(addNew);

  const groups = document.createElement("h2");
  groups.textContent = "My groups";

  //ul of uls will be here

  sidebar.appendChild(groups);

  const settings = document.createElement("h2");
  settings.textContent = "Settings";
  sidebar.appendChild(settings);

  return sidebar;
}

function createFooter() {
  const footer = document.createElement("div");
  footer.setAttribute("id", "footer");
  footer.textContent = "dwahroianmai 2023";
  const ghlink = document.createElement("a");
  ghlink.href = "https://github.com/dwahroianmai";
  ghlink.target = "blank";
  const ghlogo = document.createElement("img");
  ghlogo.src = "../src/img/github-mark/github-mark.svg";
  ghlink.appendChild(ghlogo);
  footer.appendChild(ghlink);

  return footer;
}

const dom = { createSidebar, createCalendar, createFooter };

export default dom;
