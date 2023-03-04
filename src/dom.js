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

  const logoDiv = document.createElement("div");
  logoDiv.setAttribute("id", "logo-div");

  const checkbox = document.createElement("img");
  checkbox.src = "../src/img/checkbox-outline.svg";

  const logo = document.createElement("h1");
  logo.textContent = "ListIt";

  //move checkbox near the logo
  logoDiv.addEventListener("mouseover", () => {
    checkbox.setAttribute(
      "style",
      "transform: rotate(-10deg); transition: 0.3s ease"
    );
  });
  logoDiv.addEventListener("mouseout", () => {
    checkbox.setAttribute(
      "style",
      "transform: rotate(0deg); transition: 0.3s ease"
    );
  });

  logoDiv.appendChild(checkbox);
  logoDiv.appendChild(logo);
  sidebar.appendChild(logoDiv);

  const addNew = document.createElement("button");
  addNew.textContent = "New task or event";
  sidebar.appendChild(addNew);

  document.querySelector("#content").appendChild(addNewEvent());

  addNew.addEventListener("click", () => {
    document
      .querySelector("#info")
      .setAttribute("style", "opacity: 100%; transition: .2s ease");
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
  groupList.setAttribute("class", "invisible");
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
  const settingsList = document.createElement("div");
  settingsList.setAttribute("class", "invisible");
  const colorTheme = document.createElement("h3");
  colorTheme.textContent = "Change color mode";
  settingsList.appendChild(colorTheme);
  settingsList.childNodes.forEach((elem) => {
    elem.style.display = "none";
    elem.style.marginLeft = "25px";
  });

  settingsLine.addEventListener("click", () =>
    togglePoint(triangleClone, settingsList)
  );

  const sbLines = document.createElement("div");
  sbLines.setAttribute("class", "lines");
  sbLines.appendChild(groupsLine);
  sbLines.appendChild(groupList);
  sbLines.appendChild(settingsLine);
  sbLines.appendChild(settingsList);

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
  info.style.opacity = "0";
  const close = document.createElement("img");
  close.src = "../src/img/close-outline.svg";
  info.appendChild(close);
  const form = document.createElement("form");
  form.setAttribute("id", "form");
  form.method = "post";
  form.action = "../db.json";
  const title = document.createElement("input");
  title.type = "text";
  title.placeholder = "Add title";
  title.name = "title";
  const startLabel = document.createElement("label");
  startLabel.textContent = "Starts: ";
  startLabel.setAttribute("for", "start");
  const start = document.createElement("input");
  start.setAttribute("id", "start");
  startLabel.appendChild(start);
  start.type = "datetime-local";
  start.name = "start";
  const endLabel = document.createElement("label");
  endLabel.textContent = "Ends: ";
  endLabel.setAttribute("for", "end");
  const end = document.createElement("input");
  end.setAttribute("id", "end");
  endLabel.appendChild(end);
  end.type = "datetime-local";
  end.name = "end";

  const allDayDiv = document.createElement("div");
  allDayDiv.id = "all-day-div";

  const allDay = document.createElement("input");
  allDay.type = "checkbox";
  allDay.name = "allDay";
  allDay.id = "allDay";
  const allDayLabel = document.createElement("label");
  allDayLabel.setAttribute("for", "allDay");
  allDayLabel.textContent = "All day";
  allDayDiv.appendChild(allDay);
  allDayDiv.appendChild(allDayLabel);

  form.appendChild(title);
  form.appendChild(startLabel);
  form.appendChild(endLabel);
  form.appendChild(allDayDiv);
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
