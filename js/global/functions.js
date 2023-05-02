function burgerFunction() {
  const burgerMenuBtn = document.querySelector("#hamburgerIcon");
  const burgerMenu = document.querySelector(".burgerMenu");

  burgerMenuBtn.addEventListener("click", function () {
    document.querySelector(".burgerMenu").classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (
      !burgerMenu.contains(event.target) &&
      !burgerMenuBtn.contains(event.target)
    ) {
      burgerMenu.classList.remove("active");
    }
  });
}

export { burgerFunction };

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

export { validateEmail };

function checkLength(value, len) {
  if (value.length > len) {
    return true;
  } else {
    return false;
  }
}

export { checkLength };
