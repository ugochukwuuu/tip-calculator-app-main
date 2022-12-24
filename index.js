// selectors go brrrrrrrrrrr
const amountInput = document.querySelector(".bill-input");
const tippersInput = document.querySelector(".tippers-input");
const customPercentage = document.querySelector(".tip-input-form");
const individualTipDisplay = document.querySelector(
  ".individual-calculated-amount"
);
const groupTipDisplay = document.querySelector(".group-calculated-amount");
const resetButton = document.querySelector(".reset-button");
const tipButtons = document.querySelectorAll(".tip-button");
const errorMessage = document.querySelectorAll(".error-message");

// this is for addign a specific color to the clicked button
tipButtons.forEach((buttton) => {
  buttton.addEventListener("click", (e) => {
    tipButtons.forEach((buttton) => buttton.classList.remove("selected"));
    e.target.classList.add("selected");
    let chosenPercentage = e.target.id;
  });
});

// this is for making the input only accept numbers and numbers only
tippersInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, "").trim();
});
amountInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\dA-Z]/g, "").trim();
});

// this is the reset button
resetButton.addEventListener("click", () => {
  groupTipDisplay.textContent = "$0.00";
  individualTipDisplay.textContent = "$0.00";
  amountInput.value = "";
  tippersInput.value = "";
  customPercentage.value = "";

  deSelect();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chosenPercentage = button.innerHTML.replace("%", "");
    validate();
  });
});
customPercentage.addEventListener("input", () => {
  chosenPercentage = customPercentage.value;
  validate();
  deSelect();
  updateTotal();
});
amountInput.addEventListener("input", () => {
  if (tippersInput.value != 0 && tippersInput.value != null) {
    updateTotal();
  }
});

tippersInput.addEventListener("input", () => {
  if (amountInput.value != 0 && amountInput.value != "") {
    updateTotal();
  }
});
function updateTotal() {
  var groupTotal = (chosenPercentage / 100) * amountInput.value;
  var individualTotal = groupTotal / tippersInput.value;
  groupTipDisplay.textContent = `$${groupTotal.toFixed(2)}`;
  individualTipDisplay.textContent = `$${individualTotal.toFixed(2)}`;
}

function validate() {
  if (amountInput.value == "0") {
    errorMessage[0].classList.add("error");
    amountInput.classList.add("error");
  } else if (tippersInput.value == "0") {
    errorMessage[1].classList.add("error");
    tippersInput.classList.add("error");
  } else if (amountInput.value == "") {
    errorMessage[0].classList.add("error");
    errorMessage[0].textContent = "Cannot be empty";
    amountInput.classList.add("error");
  } else if (tippersInput.value == "") {
    errorMessage[1].classList.add("error");
    errorMessage[1].textContent = "Cannot be empty";
    tippersInput.classList.add("error");
  } else {
    errorMessage[0].textContent = "Can't be zero";
    errorMessage[0].textContent = "Can't be zero";
    errorMessage[0].classList.remove("error");
    errorMessage[1].classList.remove("error");
    amountInput.classList.remove("error");
    tippersInput.classList.remove("error");

    updateTotal();
  }
}

function deSelect() {
  tipButtons.forEach((button) => button.classList.remove("selected"));
}
