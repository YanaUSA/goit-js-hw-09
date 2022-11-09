// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector("#datetime-picker"),
  button: document.querySelector("[data-start]"),
  spanDays: document.querySelector("[data-days]"),
  spanHours: document.querySelector("[data-hours]"),
  spanMinutes: document.querySelector("[data-minutes]"),
  spanSeconds: document.querySelector("[data-seconds]"),
}

let endTargetDate = null;
refs.button.setAttribute("disabled", "");

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {        
    const endTargetDate = selectedDates[0].getTime();
    if (endTargetDate < Date.now()) {
      Notify.failure("Please choose a date in the future");
    } else {
      refs.button.removeAttribute("disabled", ""); 
    }
    onStartBtnClick(endTargetDate);    
  },  
};

flatpickr(refs.input, options);

function onStartBtnClick(startDate) {

    refs.button.addEventListener("click", () => {      
      let intervalId = null;
      refs.button.setAttribute("disabled", "");      
      
      intervalId = setInterval(() => { 
        if (startDate <= Date.now()) {
          clearInterval(intervalId); 
          Notify.info("Sorry! Sale is over!");
          return;
        }

        const currentDate = Date.now();
        deltaTime = startDate - currentDate;
        const time = convertMs(deltaTime);
        updateClockFace(time);
      }, 1000);
    }
  )
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0")
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.spanDays.textContent = `${days}`;
  refs.spanHours.textContent = `${hours}`;
  refs.spanMinutes.textContent = `${minutes}`;
  refs.spanSeconds.textContent = `${ seconds }`;  
}

