// LISTENS AND REACTS TO THE BURGERMENU AND OPENS MENU. ALSO LISTENS FOR CLICKS OUTSIDE OF THE MENU TO CLOSE IT
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

// RUNS A EMAIL FORMAT VALIDATION FOR THE FOOTER SUBSCRIBE FIELD
function subInputs() {
  const subInput = document.querySelector("#subInput");
  const subInputCheckmark = document.querySelector(".subInputCheckmark");

  subInput.addEventListener("input", function () {
    if (validateEmail(subInput.value)) {
      subInputCheckmark.classList.add("show");
    } else {
      subInputCheckmark.classList.remove("show");
    }
  });
}

export { subInputs };

// EMAIL FORMAT CHECKER
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

export { validateEmail };

// VALUE LENGTH CHECKER
function checkLength(value, len) {
  if (value.length > len) {
    return true;
  } else {
    return false;
  }
}

export { checkLength };

// FORMATS ISO STRING FORMATTED DATE TO READABLE HUMAN FORMAT (OPTIONS CAN BE CHANGED TO FIT ONES NEEDS)
function formatDateString(apiDate) {
  const dateString = apiDate;
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

export { formatDateString };

function preventSubDefaultReload() {
  const subInput = document.querySelector(".subInput");
  const subBtn = document.querySelector(".subButton");
  subBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("Valid email address:", validateEmail(subInput.value));

    if (validateEmail(subInput.value)) {
      // POST EMAIL TO WP
      subBtn.style.color = "lightgreen";
      subBtn.value = "Subscribed";
      subInput.value = "";
      subInput.placeholder = "You have signed up for our newsletter";
    } else {
      subInput.placeholder = "Please provide valid email address";
      subInput.value = "";
      subBtn.style.color = "red";
    }
  });
}

export { preventSubDefaultReload };
