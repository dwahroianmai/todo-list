import axios from "axios";

function createEvent(title, start, end, allDay, repeats) {
  const newEvent = { title, start, end, allDay, repeats };
  axios
    .post("http://localhost:3005/events", newEvent)
    .then((response) => console.log(response));
}

export default createEvent;
