import { burgerFunction } from "./global/functions.js";
import { validateEmail } from "./global/functions.js";
import { checkLength } from "./global/functions.js";
import { subInputs } from "./global/functions.js";
import { preventSubDefaultReload } from "./global/functions.js";
import { navFilterToggle } from "./global/functions.js";

subInputs();
burgerFunction();
preventSubDefaultReload();
navFilterToggle();

const formContainer = document.querySelector(".formContainer");
const fullName = document.querySelector("#name");

const nameCheckmark = document.querySelector(".nameCheckmark");
const emailCheckmark = document.querySelector(".emailCheckmark");
const subjectCheckmark = document.querySelector(".subjectCheckmark");
const messageCheckmark = document.querySelector(".messageCheckmark");

const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector(".formMsg");

const formBtn = document.querySelector(".formBtn");

//CHECKS IF NAME LENGTH IS 5 MINIMUM
fullName.addEventListener("input", function () {
  if (checkLength(fullName.value, 4)) {
    nameCheckmark.classList.add("valid");
  } else {
    nameCheckmark.classList.remove("valid");
  }
});

//CHECKS IF EMAIL IS CORRECTLY FORMATTED
email.addEventListener("input", function () {
  if (validateEmail(email.value)) {
    emailCheckmark.classList.add("valid");
  } else {
    emailCheckmark.classList.remove("valid");
  }
});

//CHECKS IF SUBJECT LENGTH IS 15 MINIMUM
subject.addEventListener("input", function () {
  if (checkLength(subject.value, 14)) {
    subjectCheckmark.classList.add("valid");
  } else {
    subjectCheckmark.classList.remove("valid");
  }
});

//CHECKS IF MESSAGE LENGTH IS 25 MINIMUM
message.addEventListener("input", function () {
  if (checkLength(message.value, 25)) {
    messageCheckmark.classList.add("valid");
  } else {
    messageCheckmark.classList.remove("valid");
  }
});

//CHECKS IF ALL INPUTS ARE VALID AND SUBMITS WITH SUCCESS MESSAGE OR FAILS WITH ERROR MESSAGE

function validateForm() {
  if (
    checkLength(fullName.value, 4) &&
    validateEmail(email.value) &&
    checkLength(subject.value, 14) &&
    checkLength(message.value, 25)
  ) {
    console.log("Validation success");
    showHideMessage();
    return true;
  } else {
    console.log("Incomplete");
    return false;
  }
}

formBtn.addEventListener("click", function (event) {
  if (validateForm()) {
    postFormData();
    // clearInputs();
  }
  event.preventDefault();
});

function postFormData() {
  const formId = "130";
  const url = `https://codewithspooks.com/insidethetrip/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

  const formData = new FormData(formContainer);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Form saved:", data);
    })
    .catch(function (error) {
      console.error(("Error:", error));
    });
}

function showHideMessage() {
  const container = document.querySelector(".confirmationCont");
  container.style.display = "flex";
  // const inputs = document.querySelector("#name");
  // const textArea = document.querySelectorAll("textarea");
  // console.log(inputs);
  // inputs.value = "";
  // textArea.value = "";

  setTimeout(function () {
    // container.style.display = "none";
    window.location.reload();
  }, 7000);
}

// function clearInputs() {
//   const inputs = document.querySelectorAll("input");
//   const textArea = document.querySelectorAll("textarea");
//   console.log(inputs);
//   inputs.value = "";
//   textArea.value = "";
// }
