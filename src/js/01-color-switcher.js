const startBtnRef = document.querySelector("button[data-start]");
const stopBtnRef = document.querySelector("button[data-stop]");

let timerId = null;

stopBtnRef.setAttribute("disabled", '');

startBtnRef.addEventListener("click", () => {
    startBtnRef.toggleAttribute("disabled", true);
    stopBtnRef.toggleAttribute("disabled", false);
        
    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`;  
        
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }        
    }, 1000);  
});

stopBtnRef.addEventListener("click", () => {
    stopBtnRef.toggleAttribute("disabled", true);
    startBtnRef.toggleAttribute("disabled", false);    
    // document.body.style.backgroundColor = "transparent"; 
    clearInterval(timerId);    
});