"use strict";

// 11. ստեղծում եք inecobank-ի կայքի հաշվիչի նման հաշվիչ :) արտաքին տեսքը կարևոր չի :)

const inputArm = document.querySelector("#amd");
const inputUsd = document.querySelector("#usd");
const date = document.querySelector("[data-date]");
date.textContent += ` ${new Date().toLocaleDateString() }`;

inputArm.addEventListener("input", function () {
  const request = new XMLHttpRequest();

  request.open("GET", "./db/data.json");
  request.setRequestHeader("content-type", "application/json");
  request.send();

  request.addEventListener("load", () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      inputUsd.value = (parseFloat(this.value) / parseFloat(data.value.usd));
    }

    if (isNaN(inputUsd.value)) {
        inputUsd.value = 0;
    }
  });

});
 
inputUsd.addEventListener("input", function () {
  const request = new XMLHttpRequest();
  request.open("GET", "./db/data.json");
  request.setRequestHeader("content-type", "application/json");
  request.send();

  request.addEventListener("load", () => {
    if (request.status === 200) {
      const data = JSON.parse(request.response);
      inputArm.value = (parseFloat(data.value.usd) * parseFloat(this.value));
    }

    if (isNaN(inputArm.value)) {
        inputArm.value = 0;
    }
  });
});