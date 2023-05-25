// TOGGLE FILTERLIST
function navFilterToggle() {
  const btn = document.querySelector("#filterBtnOpenClose");
  const allBtn = document.querySelector(".all");
  const asia = document.querySelector(".asia");
  const america = document.querySelector(".america");
  const africa = document.querySelector(".africa");
  const europe = document.querySelector(".europe");
  const filterDisplay = document.querySelector("#filterDisplay");

  btn.addEventListener("mouseover", function () {
    filterDisplay.classList.remove("filterListClosed");
  });

  allBtn.addEventListener("click", function () {
    document.location = "../../blog.html";
  });

  asia.addEventListener("click", function () {
    document.location = "../../blog.html?categories=3";
  });

  america.addEventListener("click", function () {
    document.location = "../../blog.html?categories=13";
  });

  africa.addEventListener("click", function () {
    document.location = "../../blog.html?categories=6";
  });

  europe.addEventListener("click", function () {
    document.location = "../../blog.html?categories=1";
  });
  document.addEventListener("click", function (event) {
    if (!filterDisplay.contains(event.target) && !btn.contains(event.target)) {
      filterDisplay.classList.add("filterListClosed");
    }
  });
}

export { navFilterToggle };

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

      postFormData(subInput.value);
      subBtn.style.color = "lightgreen";
      subBtn.value = "Subscribed";
      subInput.value = "";
      subInput.style.borderLeft = "8px solid lightgreen";
      subInput.placeholder = "Newsletter on its way!";
    } else {
      subInput.placeholder = "Please provide valid email";
      subInput.value = "";
      subInput.style.borderLeft = "8px solid red";
      subBtn.style.color = "red";
    }
  });
}
export { preventSubDefaultReload };

// GRABBING IMG ELEMENTS FROM ARRAY
function pictureGrabber(post) {
  const tempImageContainer = document.createElement("div");
  tempImageContainer.innerHTML = post;

  const postImages = tempImageContainer.getElementsByTagName("img", "alt");

  const imgUrls = [];
  const imgAlts = [];
  for (let i = 0; i < postImages.length; i++) {
    const imgUrl = postImages[i].src;
    const imgAlt = postImages[i].alt;
    imgUrls.push(imgUrl);
    imgAlts.push(imgAlt);
  }
  return {
    imgUrls: imgUrls,
    imgAlts: imgAlts,
  };
}
export { pictureGrabber };

// POSTS EMAIL ADDRESS TO WP BACKEND TO NEWSLETTER FORM FROM THE FOOTER
function postFormData(input) {
  const formId = "139";
  const url = `https://codewithspooks.com/insidethetrip/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;

  const formData = new FormData();
  formData.append("your-name", "Newsletter");
  formData.append("your-email", input);
  formData.append("your-subject", "Please send me the newsletter");

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
