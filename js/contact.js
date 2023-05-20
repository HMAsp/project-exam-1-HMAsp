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
  const req = document.querySelector("#nameReq");

  if (checkLength(fullName.value, 4)) {
    nameCheckmark.classList.add("valid");
    req.style.opacity = "0";
  } else {
    nameCheckmark.classList.remove("valid");
    req.style.opacity = "1";
  }
});

//CHECKS IF EMAIL IS CORRECTLY FORMATTED
email.addEventListener("input", function () {
  const req = document.querySelector("#emailReq");

  if (validateEmail(email.value)) {
    emailCheckmark.classList.add("valid");
    req.style.opacity = "0";
  } else {
    emailCheckmark.classList.remove("valid");
    req.style.opacity = "1";
  }
});

//CHECKS IF SUBJECT LENGTH IS 15 MINIMUM
subject.addEventListener("input", function () {
  const req = document.querySelector("#subjectReq");

  if (checkLength(subject.value, 14)) {
    subjectCheckmark.classList.add("valid");
    req.style.opacity = "0";
  } else {
    subjectCheckmark.classList.remove("valid");
    req.style.opacity = "1";
  }
});

//CHECKS IF MESSAGE LENGTH IS 25 MINIMUM
message.addEventListener("input", function () {
  const req = document.querySelector("#messageReq");

  if (checkLength(message.value, 25)) {
    messageCheckmark.classList.add("valid");
    req.style.opacity = "0";
  } else {
    messageCheckmark.classList.remove("valid");
    req.style.opacity = "1";
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
  } else {
    event.preventDefault();

    if (!checkLength(fullName.value, 4)) {
      fullName.style.borderLeft = "3px solid red";
    } else {
      fullName.style.borderLeft = "";
    }
    if (!validateEmail(email.value)) {
      email.style.borderLeft = "3px solid red";
    } else {
      email.style.borderLeft = "";
    }
    if (!checkLength(subject.value, 14)) {
      subject.style.borderLeft = "3px solid red";
    } else {
      subject.style.borderLeft = "";
    }
    if (!checkLength(message.value, 25)) {
      message.style.borderLeft = "3px solid red";
    } else {
      message.style.borderLeft = "";
    }
  }
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
