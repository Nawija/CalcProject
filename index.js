const currentNumber = document.querySelector("#currentNumber");
const mathSign = document.querySelector("#mathSign");
const previousNumber = document.querySelector("#previousNumber");
const number_btn = document.querySelectorAll(".keys");
const clear_btn = document.querySelector(".clear");
const equal_btn = document.querySelector(".equal");
const operation_btn = document.querySelectorAll(".operation");

const clear_history_btn = document.querySelector(".clear_history_btn");
const history = document.querySelector(".history");

let result = "";

function displayNumbers() {
    if (this.textContent === "." && currentNumber.innerHTML.includes("."))
        return;
    if (this.textContent === "." && currentNumber.innerHTML === "")
        return (currentNumber.innerHTML = "0.");
    if (currentNumber.innerHTML != "-") {
        currentNumber.innerHTML = "";
    }
    currentNumber.innerHTML += this.textContent;
}
function operate() {
    if (currentNumber.innerHTML === "" && this.textContent === "-") {
        currentNumber.innerHTML = "-";
        return;
    } else if (currentNumber.innerHTML === "") {
        return;
    }
    if (mathSign.innerHTML !== "") {
        showResult();
    }
    previousNumber.innerHTML = currentNumber.innerHTML;
    mathSign.innerHTML = this.textContent;
    currentNumber.innerHTML = "";
}
function showResult() {
    if (previousNumber.innerHTML === "" || currentNumber.innerHTML === "")
        return;

    let a = Number(currentNumber.innerHTML);
    let b = Number(previousNumber.innerHTML);
    let o = mathSign.innerHTML;

    switch (o) {
        case "+":
            result = a + b;
            break;
        case "-":
            result = b - a;
            break;
        case "x":
            result = a * b;
            break;
        case ":":
            result = b / a;
            break;
        case "2^":
            result = b ** a;
            break;
    }
    addToHistory();
    clear_history_btn.classList.add("active");
    currentNumber.innerHTML = result;
    previousNumber.innerHTML = "";
    mathSign.innerHTML = "";
}

function addToHistory() {
    const newHistoryItem = document.createElement("li");
    newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
    newHistoryItem.classList.add("historyItem");
    history.appendChild(newHistoryItem);
}
function clearHistory() {
    history.textContent = "";
    if (history.innerHTML == "") {
        clear_history_btn.classList.remove("active");
    }
}
function clearScreen() {
    result = "";
    currentNumber.innerHTML = "";
    previousNumber.innerHTML = "";
    mathSign.innerHTML = "";
}

// Lisiners logic
operation_btn.forEach((button) => button.addEventListener("click", operate));

equal_btn.addEventListener("click", showResult);

clear_btn.addEventListener("click", clearScreen);

number_btn.forEach((button) => {
    button.addEventListener("click", displayNumbers);
});

clear_history_btn.addEventListener("click", clearHistory);
