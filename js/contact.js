import { validateEmail } from "./global/functions.js";
import { checkLength } from "./global/functions.js";
import { subInputs } from "./global/functions.js";
import { preventSubDefaultReload } from "./global/functions.js";
import { navFilterToggle } from "./global/functions.js";

subInputs();
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
    req.style.opacity = "0";
    fullName.style.border = "";
    fullName.style.borderLeft = "8px solid lightgreen";
  } else {
    req.style.opacity = "1";
  }
});

//CHECKS IF EMAIL IS CORRECTLY FORMATTED
email.addEventListener("input", function () {
  const req = document.querySelector("#emailReq");

  if (validateEmail(email.value)) {
    req.style.opacity = "0";
    email.style.border = "";
    email.style.borderLeft = "8px solid lightgreen";
  } else {
    req.style.opacity = "1";
  }
});

//CHECKS IF SUBJECT LENGTH IS 15 MINIMUM
subject.addEventListener("input", function () {
  const req = document.querySelector("#subjectReq");

  if (checkLength(subject.value, 14)) {
    req.style.opacity = "0";
    subject.style.border = "";
    subject.style.borderLeft = "8px solid lightgreen";
  } else {
    req.style.opacity = "1";
  }
});

//CHECKS IF MESSAGE LENGTH IS 25 MINIMUM
message.addEventListener("input", function () {
  const req = document.querySelector("#messageReq");

  if (checkLength(message.value, 25)) {
    req.style.opacity = "0";
    message.style.border = "";
    message.style.borderLeft = "8px solid lightgreen";
  } else {
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

// VALIDATES FORM ON SUBMIT. ADDS RED BORDERS TO INCOMPLETE INPUTFIELDS. BORDERS ARE REMOVED ON THE INPUT EVENTLISTENERS
formBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (validateForm()) {
    postFormData();
  } else {
    // event.preventDefault();

    if (!checkLength(fullName.value, 4)) {
      fullName.style.borderLeft = "8px solid red";
    }
    if (!validateEmail(email.value)) {
      email.style.borderLeft = "8px solid red";
    }
    if (!checkLength(subject.value, 14)) {
      subject.style.borderLeft = "8px solid red";
    }
    if (!checkLength(message.value, 25)) {
      message.style.borderLeft = "8px solid red";
    }
  }
});

// POSTS THE FORMDATA TO THE CONTACT FORM 7 WORDPRESS PLUGIN
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

// IF FORM IS COMPLETE AND SENT THIS FUNCTION SHOWS THE CONFIMATION MESSAGE, REMOVES IT AFTER A DELAY AND RELOADS THE PAGE
function showHideMessage() {
  const container = document.querySelector(".confirmationCont");
  container.style.display = "flex";

  setTimeout(function () {
    window.location.reload();
  }, 7000);
}
