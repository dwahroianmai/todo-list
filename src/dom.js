import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import createEvent from "./todo-functions";
import axios from "axios";

/*
TODO:
  allow user to change color theme
  add dark theme ?
  mobile version
  
  allow user to remove groups
  allow user to create repeated events
  editing and deleting events

  DONE implement groups
  DONE allow user to create events that start and end at specific time
  
*/

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

  document.querySelector("#submit").addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title");
    const start = document.querySelector("#start");
    const end = document.querySelector("#end");
    const allDay = document.querySelector("#allDay");
    const chosenGroups = Array.from(document.querySelectorAll(".group-item"))
      .filter((group) => group.style.backgroundColor === "lightgrey")
      .map((el) => el.textContent);
    calendar.addEvent(
      createEvent(
        title.value,
        start.value,
        end.value,
        allDay.checked,
        chosenGroups
      )
    );
    calendar.render();
    e.target.parentNode.parentNode.setAttribute(
      "style",
      "opacity: 0%; transition: .2s ease"
    );
  });

  let events;
  axios.get("http://localhost:3005/events").then((response) => {
    events = response.data;
    for (let i = 0; i < events.length; i++) {
      calendar.addEvent(events[i]);
    }
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
  groupList.setAttribute("id", "sb-groups");
  let groupsDb;
  let events;
  axios.get("http://localhost:3005/groups").then((response) => {
    groupsDb = response.data;
    console.log(groupsDb);
    axios.get("http://localhost:3005/events").then((response) => {
      events = response.data;
      console.log(events);
      for (let i = 0; i < groupsDb.length; i++) {
        const h3 = document.createElement("h3");
        const ul = document.createElement("ul");
        h3.textContent = groupsDb[i].name;
        console.log(groupsDb[i]);
        groupList.appendChild(h3);
        for (let j = 0; j < events.length; j++) {
          if (
            events[j].group.filter((group) => group === groupsDb[i].name)
              .length === 1
          ) {
            const li = document.createElement("li");
            li.textContent = events[j].title;
            ul.appendChild(li);
            //.style.marginLeft = "10px";
          }
          groupList.appendChild(ul);
        }
      }
      groupList.childNodes.forEach((el) => {
        el.style.display = "none";
        el.style.marginLeft = "25px";
      });
    });
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

  const title = document.createElement("input");
  title.type = "text";
  title.placeholder = "Add title";
  title.name = "title";
  title.id = "title";

  const startLabel = document.createElement("label");
  startLabel.textContent = "Starts: ";
  startLabel.setAttribute("for", "start");

  const start = document.createElement("input");
  start.setAttribute("id", "start");
  startLabel.appendChild(start);
  start.type = "datetime-local";
  start.name = "start";
  start.id = "start";

  const endLabel = document.createElement("label");
  endLabel.textContent = "Ends: ";
  endLabel.setAttribute("for", "end");

  const end = document.createElement("input");
  end.setAttribute("id", "end");
  endLabel.appendChild(end);
  end.type = "datetime-local";
  end.name = "end";
  end.id = "end";

  const allDayDiv = document.createElement("div");
  allDayDiv.className = "checkbox-div";

  const allDay = document.createElement("input");
  allDay.type = "checkbox";
  allDay.name = "allDay";
  allDay.id = "allDay";
  allDay.checked = true;

  const allDayLabel = document.createElement("label");
  allDayLabel.setAttribute("for", "allDay");
  allDayLabel.textContent = "All day";
  allDayDiv.appendChild(allDay);
  allDayDiv.appendChild(allDayLabel);

  const repeatsDiv = document.createElement("div");
  repeatsDiv.className = "checkbox-div";

  const repeats = document.createElement("input");
  repeats.type = "checkbox";
  repeats.name = "repeats";
  repeats.id = "repeats";
  repeats.checked = true;
  repeats.value = false;

  const repeatsLabel = document.createElement("label");
  repeatsLabel.setAttribute("for", "repeats");
  repeatsLabel.textContent = "Does not repeat";

  repeatsDiv.appendChild(repeats);
  repeatsDiv.appendChild(repeatsLabel);

  const intervals = document.createElement("select");
  intervals.style.display = "none";

  const daily = document.createElement("option");
  daily.textContent = "Every day";
  intervals.appendChild(daily);

  const groupsDiv = document.createElement("div");
  groupsDiv.className = "checkbox-div";

  const groups = document.createElement("input");
  groups.id = "groups-inp";
  groups.name = "groups";
  groups.type = "checkbox";

  const groupsLabel = document.createElement("label");
  groupsLabel.textContent = "Add to group";
  groupsLabel.setAttribute("for", "groups-inp");
  groupsDiv.appendChild(groups);
  groupsDiv.appendChild(groupsLabel);

  const groupList = document.createElement("div");
  let groupsDb;
  axios.get("http://localhost:3005/groups").then((response) => {
    groupsDb = response.data;
    for (let i = 0; i < groupsDb.length; i++) {
      const group = document.createElement("h3");
      group.textContent = groupsDb[i].name;
      groupList.appendChild(group);
      group.className = "group-item";
    }
    document.querySelectorAll(".group-item").forEach((group) =>
      group.addEventListener("click", (e) => {
        console.log(e.target.textContent);
        if (e.target.style.backgroundColor === "white") {
          e.target.style.backgroundColor = "lightgrey";
        } else {
          e.target.style.backgroundColor = "white";
        }
      })
    );
  });

  const addGroup = document.createElement("button");
  const newGroup = document.createElement("input");
  groupList.appendChild(addGroup);
  groupList.appendChild(newGroup);
  addGroup.type = "button";
  addGroup.textContent = "Add new group";
  groupList.className = "invisible";
  groupList.childNodes.forEach((el) => (el.style.display = "none"));

  addGroup.addEventListener("click", () => {
    if (newGroup.style.display === "none") {
      newGroup.style.display = "block";
    } else {
      console.log(newGroup.value);
      axios
        .post("http://localhost:3005/groups", { name: newGroup.value })
        .then(() => {
          const added = document.createElement("h3");
          added.textContent = newGroup.value;
          added.className = "group-item";
          added.addEventListener("click", (e) => {
            if (e.target.style.backgroundColor === "white") {
              e.target.style.backgroundColor = "lightgrey";
            } else {
              e.target.style.backgroundColor = "white";
            }
          });
          groupList.appendChild(added);
          const forSb = added.cloneNode();
          forSb.textContent = newGroup.value;
          forSb.style.marginLeft = "25px";
          document.querySelector("#sb-groups").appendChild(forSb);
          newGroup.value = "";
        });
    }
  });

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Add event";
  submit.id = "submit";

  form.appendChild(title);
  form.appendChild(startLabel);
  form.appendChild(endLabel);
  form.appendChild(allDayDiv);
  form.appendChild(repeatsDiv);
  form.appendChild(intervals);
  form.appendChild(groupsDiv);
  form.appendChild(groupList);
  form.appendChild(submit);
  info.appendChild(form);

  close.addEventListener("click", (e) => {
    e.target.parentNode.setAttribute(
      "style",
      "opacity: 0%; transition: .2s ease"
    );
  });

  groupsDiv.addEventListener("click", () => {
    if (groups.checked) {
      groupList.className = "visible";
      groupList.childNodes.forEach((el) => (el.style.display = "block"));
      newGroup.style.display = "none";
    } else {
      groupList.className = "invisible";
      groupList.childNodes.forEach((el) => (el.style.display = "none"));
    }
  });

  return info;
}

function createFooter() {
  const footer = document.createElement("div");
  footer.setAttribute("id", "footer");
  footer.textContent = "dwahroianmai 2023";
  const ghLink = document.createElement("a");
  ghLink.href = "https://github.com/dwahroianmai";
  ghLink.target = "blank";
  const ghLogo = document.createElement("img");
  ghLogo.src = "../src/img/github-mark/github-mark.svg";
  ghLink.appendChild(ghLogo);
  footer.appendChild(ghLink);

  return footer;
}

const dom = { createSidebar, createCalendar, createFooter };

export default dom;
