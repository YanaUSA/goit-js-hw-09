import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),
  inputDelay: document.querySelector("input[name=delay]"),
  inputStep: document.querySelector("input[name=step]"),
  inputAmount: document.querySelector("input[name=amount]"),
  button: document.querySelector("button"),
}

refs.form.addEventListener("submit", onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();

const {
    elements: { delay, step, amount}
} = evt.currentTarget;
  
  const delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1) {
    if (position === 1) {
      createPromise(position, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
    } else {
      createPromise(position, delayValue + stepValue * (position - 1))
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    };
  };
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;  

  return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);            
  });
};