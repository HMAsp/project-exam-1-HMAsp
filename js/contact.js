import { burgerFunction } from "./global/functions.js";
import { validateEmail } from "./global/functions.js";
import { checkLength } from "./global/functions.js";
import { subInputs } from "./global/functions.js";

subInputs();
burgerFunction();

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
    postFormData();
    return true;
  } else {
    console.log("Incomplete");
    return false;
  }
}

formBtn.addEventListener("click", function (event) {
  validateForm();
  event.preventDefault();
});

function postFormData() {
  const formData = new FormData(formContainer);
  const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts";
  fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Basic" + btoa("testUser:sakZxhpQ^86mFnxcp)fQGyTH"),
    },
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

// formContainer.addEventListener("submit", function () {
//   const formData = new FormData(formContainer);
//   const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts/";
//   fetch(url, {
//     method: "POST",
//     body: formData,
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log("Form saved:", data);
//     })
//     .catch(function (error) {
//       console.error(("Error:", error));
//     });
// });
