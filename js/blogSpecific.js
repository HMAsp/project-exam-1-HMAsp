import { burgerFunction } from "./global/functions.js";
import { formatDateString } from "./global/functions.js";
import { subInputs } from "./global/functions.js";
import { preventSubDefaultReload } from "./global/functions.js";
burgerFunction();
subInputs();
preventSubDefaultReload();

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);

const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts/";

async function fetchSinglePost() {
  const response = await fetch(url + id);

  const data = await response.json();

  return data;
}

const container = document.querySelector(".blogDetailContainer");
const setTitle = document.querySelector(".blogPageTitle");

let loader = document.querySelector(".carouselContainer");

function displayPost(post) {
  // const date = formatDateString(rawDate);

  loader.innerHTML = "";
  const title = post.title.rendered;
  const rawDate = post.date;
  const wpPost = post.content.rendered;
  const date = formatDateString(rawDate);

  setTitle.innerText = title;
  setTitle.style.fontSize = "2rem";
  setTitle.style.letterSpacing = "5px";
  setTitle.style.textTransform = "uppercase";

  const dateCont = document.createElement("h4");
  dateCont.innerText = date;
  dateCont.style.fontSize = "1.2rem";
  dateCont.style.marginBottom = "-40px";
  setTitle.append(dateCont);

  const postContainer = document.createElement("div");
  postContainer.classList.add("postContainer");
  postContainer.innerHTML = wpPost;

  container.append(postContainer);
}

async function mainFunction() {
  const post = await fetchSinglePost();
  console.log(post);

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

// POSTING COMMENTS TO WP

const postBtn = document.querySelector(".addCommentBtn");
const postUrl =
  "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/comments";

postBtn.addEventListener("click", function (event) {
  event.preventDefault();
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
      if (response.ok) {
        // createCommentResponse();
        return response.json();
      } else {
        throw new Error("Error creating comment");
      }
    })
    .then(function (data) {
      console.log("Comment created:", data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

function createCommentResponse() {
  const commentResponse = document.querySelector(".showCommentForm");
  const formField = document.querySelector(".addCommentForm");

  commentResponse.classList.remove(".showCommentForm");
  formField.document.createElement("h5");
  commentResponse.innerHTML = "Thank you for your comment!";
}

async function fetchComments() {
  const response = await fetch(postUrl);
  const commentData = await response.json();
  console.log(commentData);
}

fetchComments();
