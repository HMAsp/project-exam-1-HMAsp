import { burgerFunction } from "./global/functions.js";
import { validateEmail } from "./global/functions.js";
import { checkLength } from "./global/functions.js";

burgerFunction();

const formContainer = document.querySelector(".formContainer");
const fullName = document.querySelector("#name");
// const nameLabel = document.querySelector(".nameLabel");

const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");

fullName.addEventListener("input", function () {
  const nameLabel = document.querySelector(".nameLabel");

  if (checkLength(fullName.value, 4)) {
    nameLabel.innerHTML = "red";
  }
});
