"use strict";
const bill = document.querySelector("#bill");
const tips = document.querySelectorAll(".tip");
const peoples = document.querySelector("#peoples");
const reset = document.querySelector(".reset");
const tip = document.querySelector(".tip-amount");
const total = document.querySelector(".total-amount");
const customTip = document.querySelector(".i");
const zero = document.querySelector(".error");

for (let tip of tips) {
  tip.addEventListener("click", function () {
    checkAndRemove();
    tip.classList.add("tip-selected");

    if (Number(peoples.value.trim()) !== 0) {
      calculate();
      console.log("f" + Number(peoples.value.trim()) + "g");
    }
  });
}

function checkAndRemove() {
  for (let tip of tips) {
    if (tip.classList.contains("tip-selected")) {
      console.log("Classlist Found Removing");
      tip.classList.remove("tip-selected");
    }
  }
}

function calculate() {
  const billValue = bill.value;
  const numberOfPeople = peoples.value;

  const tipSelected = findtipSelectedValue();

  //peoples cannot be zero
  const tipTotal = Number(billValue * 0.01 * tipSelected);
  const totalValue = ((Number(billValue) + tipTotal) / numberOfPeople).toFixed(
    2
  );
  const tipValue = (tipTotal / numberOfPeople).toFixed(2);

  updateAmount(totalValue, tipValue);
}

function updateAmount(totalValue, tipValue) {
  total.textContent = "$" + totalValue;
  tip.textContent = "$" + tipValue;
}

function findtipSelectedValue() {
  for (let tip of tips) {
    if (tip.classList.contains("tip-selected") && tip.classList.contains("i")) {
      return Number(tip.value);
    }
    if (tip.classList.contains("tip-selected")) {
      return parseInt(tip.textContent);
    }
  }
}

reset.addEventListener("click", function () {
  //   calculate();
  resetButton();
});

const resetButton = () => {
  checkAndRemove();
  customTip.value = "";
  bill.value = "";
  peoples.value = "";
  total.textContent = "$0.00";
  tip.textContent = "$0.00";
  zero.style.opacity = "0";
};

peoples.addEventListener("input", function () {
  if (Number(peoples.value.trim()) !== 0) calculate();

  if (Number(peoples.value.trim()) === 0) {
    zero.style.opacity = "1";
    peoples.classList.add("error0");
  } else {
    zero.style.opacity = "0";
    peoples.classList.remove("error0");
  }
});
