window.onload = () => {
  //focus state for name field
  document.getElementById("name").focus();
  //hide 'other' job role text field on load
  document.getElementById("other-job-role").style.display = "none";
  //disable the color dropdown until a design has been chosen
  document.getElementById("color").setAttribute("disabled", "");
  //credit card option as set as default payment method
  payment.value = "credit-card";
  document.getElementById("paypal").style.display = "none";
  document.getElementById("bitcoin").style.display = "none";
};

//checks if job role value matches 'other' -- if so, display other job role input field
function checkOther(option) {
  if (option.value == "other") {
    document.getElementById("other-job-role").style.display = "block";
  } else {
    document.getElementById("other-job-role").style.display = "none";
  }
}

//When user selects a theme in the design input, enable 'color' drop down
//Color dropdown menu only displays color options associated with selected design
let design = document.getElementById("design");

design.addEventListener("change", (e) => {
  //enables color dropdown
  document.getElementById("color").removeAttribute("disabled", "");
  let design = e.target.value;
  if (design == "js puns") {
    document
      .querySelectorAll(`[data-theme='heart js']`)
      .forEach((heart) => heart.remove());
  } else {
    document
      .querySelectorAll(`[data-theme='js puns']`)
      .forEach((pun) => pun.remove());
  }
});

//change total cost based on user's activity choice
let total = document.getElementById("activities-cost");
let cost = 0;

document.getElementById("activities").addEventListener("change", (event) => {
  let target = event.target;

  if (target.checked) {
    cost += parseFloat(target.getAttribute("data-cost"));
  } else if (!target.checked) {
    cost -= parseFloat(target.getAttribute("data-cost"));
  }

  total.innerHTML = `Total: $${cost}`;
});

//displays payment method based on user's payment option
let payment = document.getElementById("payment");

payment.addEventListener("change", () => {
  if (payment.value == "credit-card") {
    document.getElementById("credit-card").style.display = "block";
    document.getElementById("paypal").style.display = "none";
    document.getElementById("bitcoin").style.display = "none";
  } else if (payment.value == "paypal") {
    document.getElementById("paypal").style.display = "block";
    document.getElementById("credit-card").style.display = "none";
    document.getElementById("bitcoin").style.display = "none";
  } else if (payment.value == "bitcoin") {
    document.getElementById("bitcoin").style.display = "block";
    document.getElementById("credit-card").style.display = "none";
    document.getElementById("paypal").style.display = "none";
  }
});

//validate form on when submit button is clicked
const form = document.querySelector("form");

//checks name
function validateName() {
  if (document.getElementById("name").value == "") {
    document.getElementById("name").parentElement.classList.remove("valid");
    document.getElementById("name").parentElement.classList.add("not-valid");
    document.getElementById(
      "name"
    ).parentElement.lastElementChild.style.display = "block";

    return false;
  } else {
    document.getElementById("name").parentElement.classList.add("valid");
    document.getElementById("name").parentElement.classList.remove("not-valid");
    document.getElementById(
      "name"
    ).parentElement.lastElementChild.style.display = "none";
    return true;
  }
}

//checks email address
function validateEmail() {
  let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!document.getElementById("email").value.match(emailFormat)) {
    document.getElementById("email").parentElement.classList.remove("valid");
    document.getElementById("email").parentElement.classList.add("not-valid");
    document.getElementById(
      "email"
    ).parentElement.lastElementChild.style.display = "block";
  } else {
    document.getElementById("email").parentElement.classList.add("valid");
    document
      .getElementById("email")
      .parentElement.classList.remove("not-valid");
    document.getElementById(
      "email"
    ).parentElement.lastElementChild.style.display = "none";
    return true;
  }
}

//checks if at least one activity is checked
function validateActivities() {
  let checkbox = document.querySelectorAll(`[type='checkbox']:checked`).length;
  let fieldset = document.getElementById("activities");

  if (checkbox > 0) {
    fieldset.classList.add("valid");
    fieldset.classList.remove("not-valid");
    fieldset.lastElementChild.style.display = "none";
    return true;
  } else {
    fieldset.classList.remove("valid");
    fieldset.classList.add("not-valid");
    fieldset.lastElementChild.style.display = "block";
    return false;
  }
}

//checks credit card number
function validateCredit() {
  let creditFormat = /^(\d){13,16}$/;
  if (payment.value == "credit-card") {
    if (document.getElementById("cc-num").value.match(creditFormat)) {
      document.getElementById("cc-num").parentElement.classList.add("valid");
      document
        .getElementById("cc-num")
        .parentElement.classList.remove("not-valid");
      document.getElementById(
        "cc-num"
      ).parentElement.lastElementChild.style.display = "none";
      return true;
    } else {
      document.getElementById("cc-num").parentElement.classList.remove("valid");
      document
        .getElementById("cc-num")
        .parentElement.classList.add("not-valid");
      document.getElementById(
        "cc-num"
      ).parentElement.lastElementChild.style.display = "block";
      return false;
    }
  }
}

//checks zip code
function validateZip() {
  let zipFormat = /^\d{5}$/;

  if (document.getElementById("zip").value.match(zipFormat)) {
    document.getElementById("zip").parentElement.classList.add("valid");
    document.getElementById("zip").parentElement.classList.remove("not-valid");
    document.getElementById(
      "zip"
    ).parentElement.lastElementChild.style.display = "none";
    return true;
  } else {
    document.getElementById("zip").parentElement.classList.remove("valid");
    document.getElementById("zip").parentElement.classList.add("not-valid");
    document.getElementById(
      "zip"
    ).parentElement.lastElementChild.style.display = "block";
  }
}

//checks CVV
function validateCVV() {
  let cvvFormat = /^\d{3}$/;

  if (document.getElementById("cvv").value.match(cvvFormat)) {
    document.getElementById("cvv").parentElement.classList.add("valid");
    document.getElementById("cvv").parentElement.classList.remove("not-valid");
    document.getElementById(
      "cvv"
    ).parentElement.lastElementChild.style.display = "none";
    return true;
  } else {
    document.getElementById("cvv").parentElement.classList.remove("valid");
    document.getElementById("cvv").parentElement.classList.add("not-valid");
    document.getElementById(
      "cvv"
    ).parentElement.lastElementChild.style.display = "block";
  }
}

//Program form element to listen for submit event
form.addEventListener("submit", function (e) {
  //prevent form from submitting once submit button is clicked
  e.preventDefault();
  validateName();
  validateEmail();
  validateActivities();
  validateCredit();
  validateZip();
  validateCVV();
});

//make focus states of the activities more clear to users
let inputCheckbox = document.querySelectorAll(`[type='checkbox']`);
inputCheckbox.forEach((checkbox) => {
  checkbox.addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });

  checkbox.addEventListener("blur", (e) => {
    e.target.parentElement.classList.remove("focus");
  });
});
