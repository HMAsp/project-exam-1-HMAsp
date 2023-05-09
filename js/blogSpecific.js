import { burgerFunction, validateEmail } from "./global/functions.js";
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
  // console.log(post);

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

// DISPLAY COMMENTS IN BOXES

const commentContainer = document.querySelector(".commentContainer");

async function fetchComments() {
  const response = await fetch(postUrl);
  const comments = await response.json();

  return comments;
}

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

    // awaitFetchComments();
  }
}

function displayComments(comments) {
  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    // console.log(comment);

    displayComment(comment);
    // if (comment.contains(id)) {
    //   displayComment(comment);
    // }
    // displayComment(comment);
  }
}

async function awaitFetchComments() {
  const data = await fetchComments();

  displayComments(data);
}

awaitFetchComments();
