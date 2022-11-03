const startBtnRef = document.querySelector("button[data-start]");
const stopBtnRef = document.querySelector("button[data-stop]");

let timerId = null;

startBtnRef.addEventListener("click", () => {
    startBtnRef.setAttribute("disabled", "");

    timerId = setInterval(() => {
        document.body.style.backgroundColor = `${getRandomHexColor()}`;        

        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        }        
    }, 1000);  
    
    
});

stopBtnRef.addEventListener("click", () => {
    startBtnRef.removeAttribute("disabled"); 
    document.body.style.backgroundColor = "transparent"; 
    clearInterval(timerId);    
});