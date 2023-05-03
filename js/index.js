import { burgerFunction } from "./global/functions.js";
burgerFunction();

const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts";
const perPage = "?per_page=";

let numberOfPosts = "8";

const fullUrl = url + perPage + numberOfPosts;

//FETCHES THE ARRAY. numberOfPosts VARIABLE SETS HOW MANY POSTS TO DISPLAY IN THE CAROUSEL
async function fetchPosts() {
  const response = await fetch(fullUrl);

  const posts = await response.json();

  return posts;
}

const container = document.querySelector(".carouselContainer");
const loaderInd = document.querySelector(".loader");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const enterBtn = document.querySelector("#enterBtn");

// CREATES AND DISPLAYS THE CAROUSEL POSTS.
function renderPost(post) {
  console.log("recent post:" + " " + post.slug);

  loaderInd.style.display = "none";
  const image = post.jetpack_featured_media_url;
  const postTitle = `"` + post.title.rendered + `"`;
  let modal = document.querySelector(".modal");

  const blogContainer = document.createElement("a");
  blogContainer.style.cursor = "pointer";
  blogContainer.classList.add("blogContainer");
  blogContainer.style.backgroundImage = `url('${image}')`;
  blogContainer.style.backgroundSize = "cover";
  const title = document.createElement("h3");
  title.style.alignSelf = "end";
  title.style.backgroundColor = "var(--darkBg)";
  title.style.padding = "0px 10px";
  title.style.textTransform = "uppercase";
  title.innerText = postTitle;
  blogContainer.append(title);
  container.append(blogContainer);
  enterBtn.onclick = function () {
    window.location.href = "/blog.html";
  };

  // CREATES AND DISPLAYS THE MODAL WHEN POSTS ARE CLICKED AND CLOSES IT IF ANYTHING ELSE THAN THE BUTTON TO READ MORE IS CLICKED
  blogContainer.onclick = function () {
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modalContainer");
    const carouselModal = document.createElement("div");
    carouselModal.classList.add("carouselModal");
    const modalImg = document.createElement("img");
    modalImg.src = image;
    modalImg.style.borderRadius = "25px";
    carouselModal.append(modalImg);
    const modalTitle = document.createElement("h1");
    modalTitle.style.color = "white";
    modalTitle.style.textTransform = "uppercase";
    modalTitle.style.fontSize = "2rem";
    modalTitle.innerText = postTitle;
    carouselModal.append(modalTitle);
    const btn = document.createElement("button");
    btn.classList.add("cta");
    btn.type = "button";
    btn.innerText = "Read more..";
    btn.onclick = function () {
      window.location.href = `../blogSpecific.html?id=${post.id}`;
    };
    carouselModal.append(btn);
    modalContainer.append(carouselModal);
    modal.append(modalContainer);

    modal.onclick = function () {
      modal.innerHTML = "";
    };
  };
}

// NAVIGATES THE CAROUSEL SCROLL
nextBtn.addEventListener("click", function () {
  container.scrollLeft += 230;
});

// NAVIGATES THE CAROUSEL SCROLL
previousBtn.addEventListener("click", function () {
  container.scrollLeft += -230;
});

//LOOPS THROUGH THE ARRAY AND RUNS THE CREATION FUNCTION FOR EACH OF THE OBJECTS IN THE ARRAY
function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    renderPost(post);
  }
}

//STARTS THE CHAIN OF FUNCTION EVENTS
async function main() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

main();
