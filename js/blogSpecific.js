import { burgerFunction, validateEmail } from "./global/functions.js";
import { formatDateString } from "./global/functions.js";
import { subInputs } from "./global/functions.js";
import { preventSubDefaultReload } from "./global/functions.js";
import { pictureGrabber } from "./global/functions.js";
import { navFilterToggle } from "./global/functions.js";

burgerFunction();
subInputs();
preventSubDefaultReload();
navFilterToggle();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts/";

// FETCHES THE URL WITH THE ADDED ID TO GET THE SPECIFIC POST
async function fetchSinglePost() {
  const response = await fetch(url + id);

  const data = await response.json();

  return data;
}

const container = document.querySelector(".blogDetailContainer");
const setTitle = document.querySelector(".blogPageTitle");

let loader = document.querySelector(".carouselContainer");

// DISPLAYS THE POST CONTENT
function displayPost(post) {
  loader.innerHTML = "";
  const title = post.title.rendered;
  const rawDate = post.date;
  const wpPost = post.content.rendered;
  const date = formatDateString(rawDate);
  const mediaGalleryArray = pictureGrabber(wpPost);

  document.title = "Inside the trip:" + " " + title.toLocaleUpperCase();

  setTitle.innerText = title;
  setTitle.style.fontSize = "2rem";
  setTitle.style.letterSpacing = "5px";
  setTitle.style.textTransform = "uppercase";

  const dateCont = document.createElement("h4");
  dateCont.innerText = date;
  dateCont.style.fontSize = "1.2rem";
  dateCont.style.marginBottom = "-40px";
  setTitle.append(dateCont);

  const galleryContainer = document.createElement("div");
  galleryContainer.classList.add("galleryContainer");

  // LOOPS THROUGH IMAGES AND ALTS AND CREATES THE IMAGES AND ADDS THE ALTS
  const imgUrls = mediaGalleryArray.imgUrls;
  const imgAlts = mediaGalleryArray.imgAlts;
  const length = (imgUrls.length, imgAlts.length);

  for (let i = 0; i < length; i++) {
    const image = document.createElement("img");
    image.src = imgUrls[i];
    image.alt = imgAlts[i];

    galleryContainer.append(image);

    // CREATES THE IMAGE MODALS ON IMAGE CLICK AND LISTENS FOR CLICKS OUTSIDE OF THE IMAGE TO CLOSE IT.
    image.addEventListener("click", function () {
      const modalCont = document.createElement("div");
      modalCont.classList.add("modalCont");

      const blogModal = document.createElement("dialog");
      blogModal.classList.add("blogModal");

      const imgClone = image.cloneNode(true);

      blogModal.append(imgClone);
      container.append(modalCont);
      modalCont.append(blogModal);

      // REMOVES MODAL IF CLICKED OUTSIDE OF CREATION
      modalCont.addEventListener("click", function (event) {
        if (
          !blogModal.contains(event.target) &&
          !image.contains(event.target)
        ) {
          blogModal.remove();
          modalCont.remove();
        }
      });
      // ADDS A TOUCH REMOVE OF MODALS FOR MOBILE
      modalCont.addEventListener("touchmove", function (event) {
        if (blogModal.contains(event.target)) {
          blogModal.remove();
          modalCont.remove();
        }
      });
    });
  }

  container.append(galleryContainer);

  // ADDS POST CONTENT (TEXT)
  const postContainer = document.createElement("div");
  postContainer.classList.add("postContainer");
  postContainer.innerHTML = wpPost;

  // REMOVES FIGURES/IMAGES EMBEDDED IN POST
  const figures = postContainer.querySelectorAll("figure");
  figures.forEach(function (figure) {
    figure.remove();
  });

  container.append(postContainer);
}

// MAIN CHAIN FUNCTION CHAIN STARTER
async function mainFunction() {
  const post = await fetchSinglePost();

  displayPost(post);
}
mainFunction();

//COMMENT SECTION OPEN-CLOSE
const openComment = document.querySelector(".addCommentTextBtn");
openComment.addEventListener("click", function (event) {
  event.preventDefault();
  const formField = document.querySelector(".addCommentForm");
  formField.classList.toggle("showCommentForm");
  openComment.innerText = "close comment";
  if (!formField.classList.contains("showCommentForm")) {
    openComment.innerText = "add comment";
  }
});

// POSTING COMMENTS TO WP AND FETCHING STORED COMMENTS TO DISPLAY THEM
const postBtn = document.querySelector(".addCommentBtn");
const postUrl =
  "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/comments";

async function createComment() {
  const formField = document.querySelector(".addCommentForm");
  const nameInput = document.querySelector("#yourName");
  const emailInput = document.querySelector("#yourEmail");
  const commentInput = document.querySelector("#comment");
  const authorName = nameInput.value;
  const commentContent = commentInput.value;
  const email = emailInput.value;
  console.log(id);

  const commentObject = {
    post: id,
    author_name: authorName,
    author_email: email,
    content: commentContent,
  };

  console.log(commentObject);

  fetch(postUrl, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(commentObject),
  })
    .then(function (response) {
      if (response.ok && validateEmail(email)) {
        formField.innerHTML = `<h5 class="commentThanks">Thank you for leaving a comment</h5>`;

        return response.json();
      } else {
        formErrorHandler();
        throw new Error("Error creating comment");
      }
    })
    .then(function (data) {
      console.log("Comment created:", data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

postBtn.addEventListener("click", function (event) {
  event.preventDefault();
  createComment();
});

// COMMENTS FORM VALIDATOR
function formErrorHandler() {
  const nameInput = document.querySelector("#yourName");
  const emailInput = document.querySelector("#yourEmail");
  const commentInput = document.querySelector("#comment");
  const formError = document.querySelector(".commentErrorMessage");

  if (nameInput.value == "") {
    (formError.innerText = "Please provide your name"),
      (formError.style.display = "flex");
  }

  if (!validateEmail(emailInput.value)) {
    (formError.innerText = "Please check that your email is correct"),
      (formError.style.display = "flex");
  }

  if (commentInput.value == "") {
    (formError.innerText = "Please write a comment"),
      (formError.style.display = "flex");
  }
}

const commentContainer = document.querySelector(".commentContainer");

// FETCHES COMMENTS
async function fetchComments() {
  const response = await fetch(postUrl);
  const comments = await response.json();

  return comments;
}

// CHECKS IF COMMENT IDS AND POST ID MATCH. IF TRUE THEY ARE DISPLAYED
function displayComment(comment) {
  if (comment.post == id) {
    console.log("Post matches ID:", comment.post);

    const commentBox = document.createElement("div");
    commentBox.classList.add("commentBox");

    const commentName = document.createElement("h5");
    commentName.classList.add("commentUserName");
    commentName.innerText = comment.author_name;

    const commentTime = document.createElement("span");
    commentTime.classList.add("commentTime");
    const commentTimeFormatted = formatDateString(comment.date);
    commentTime.innerText = commentTimeFormatted;

    const userComment = document.createElement("p");
    userComment.classList.add("userComment");
    userComment.innerHTML = comment.content.rendered;

    const commentLikes = document.createElement("div");
    commentLikes.classList.add("commentLikes");

    const commentLiked = document.createElement("commentLiked");
    commentLiked.classList.add("commentLiked");

    const likeImg = document.createElement("img");
    likeImg.classList.add("likeHeart");
    likeImg.src = "/images/like_red_heart.png";
    likeImg.alt = "heart outline icon";
    const likeText = document.createElement("p");
    likeText.classList.add("likeText");
    likeText.innerText = "Liked";

    commentBox.append(commentName);
    commentBox.append(commentTime);
    commentBox.append(userComment);

    commentLiked.append(likeImg);
    commentLiked.append(likeText);

    commentLikes.append(commentLiked);
    commentContainer.append(commentBox);
    commentContainer.append(commentLiked);
  }
}

//LOOPS COMMENTS AND PASSES THEM TO DISPLAY COMMENT
function displayComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];

    displayComment(comment);
  }
}

// FETCH COMMENTS AND PASS THEM TO LOOP COMMENTS FUNCTION
async function awaitFetchComments() {
  const data = await fetchComments();

  displayComments(data);
}

awaitFetchComments();
