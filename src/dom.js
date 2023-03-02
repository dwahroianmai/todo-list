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

  addNew.addEventListener("click", () => {
    document.querySelector("#content").appendChild(addNewEvent());
  });

  const groups = document.createElement("h2");
  groups.textContent = "My groups";
  const triangle = document.createElement("img");
  triangle.src = "../src/img/triangle.svg";
  const groupsLine = document.createElement("div");
  groupsLine.setAttribute("class", "sb-line");
  groupsLine.appendChild(triangle);
  groupsLine.appendChild(groups);

  const groupList = document.createElement("div");
  groupList.setAttribute("class", "group-list invisible");
  //function will be here
  const group1 = document.createElement("h3");
  group1.textContent = "Work";
  const group2 = document.createElement("h3");
  group2.textContent = "Traveling";
  groupList.appendChild(group1);
  groupList.appendChild(group2);
  groupList.childNodes.forEach((el) => {
    el.style.display = "none";
    el.style.marginLeft = "25px";
  });

  groupsLine.addEventListener("click", () => togglePoint(triangle, groupList));

  const settings = document.createElement("h2");
  settings.textContent = "Settings";
  const settingsLine = document.createElement("div");
  const triangleClone = triangle.cloneNode();
  settingsLine.setAttribute("class", "sb-line");
  settingsLine.appendChild(triangleClone);
  settingsLine.appendChild(settings);

  settingsLine.addEventListener("click", () => togglePoint(triangleClone));

  const sbLines = document.createElement("div");
  sbLines.setAttribute("class", "lines");
  sbLines.appendChild(groupsLine);
  sbLines.appendChild(groupList);
  sbLines.appendChild(settingsLine);

  sidebar.appendChild(sbLines);

  return sidebar;
}

function togglePoint(elem, list) {
  if (elem.style.transform === "rotate(90deg)") {
    elem.style.transition = ".3s";
    list.setAttribute("class", "visible");
    elem.style.transform = "rotate(180deg)";
    list.childNodes.forEach((elem) => (elem.style.display = "block"));
  } else {
    elem.style.transform = "rotate(90deg)";
    list.setAttribute("class", "invisible");
  }
}

function addNewEvent() {
  const info = document.createElement("div");
  info.setAttribute("id", "info");
  const close = document.createElement("img");
  close.src = "../src/img/close-outline.svg";
  info.appendChild(close);
  const form = document.createElement("form");
  form.setAttribute("id", "form");
  form.method = "post";
  const title = document.createElement("input");
  title.type = "text";
  title.placeholder = "Add title";
  const startLabel = document.createElement("label");
  startLabel.textContent = "Starts: ";
  startLabel.setAttribute("for", "start");
  const start = document.createElement("input");
  start.setAttribute("id", "start");
  startLabel.appendChild(start);
  start.type = "datetime-local";
  const endLabel = document.createElement("label");
  endLabel.textContent = "Ends: ";
  endLabel.setAttribute("for", "end");
  const end = document.createElement("input");
  end.setAttribute("id", "end");
  endLabel.appendChild(end);
  end.type = "datetime-local";

  form.appendChild(title);
  form.appendChild(startLabel);
  form.appendChild(endLabel);
  info.appendChild(form);

  close.addEventListener("click", (e) => {
    e.target.parentNode.setAttribute(
      "style",
      "opacity: 0%; transition: .2s ease"
    );
  });

  return info;
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
