// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  input: document.querySelector("#datetime-picker"),
  button: document.querySelector("[data-start]"),
  spanDays: document.querySelector("[data-days]"),
  spanHours: document.querySelector("[data-hours]"),
  spanMinutes: document.querySelector("[data-minutes]"),
  spanSeconds: document.querySelector("[data-seconds]"),
  }



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

console.log(options.onClose(selectedDates))

flatpickr(refs.input, options);

// function onPastDateChoose (options) {
if (selectedDates[0] < defaultDate) {
  window.alert("Please choose a date in the future");
}
  
