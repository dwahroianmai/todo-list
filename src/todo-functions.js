import axios from "axios";

function createEvent(title, start, end, allDay, group) {
  const newEvent = { title, start, end, allDay, group };
  axios
    .post("http://localhost:3005/events", newEvent)
    .then((response) => console.log(response));
  return newEvent;
}

export default createEvent;
