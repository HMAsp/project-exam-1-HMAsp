import { burgerFunction } from "./global/functions.js";
import { preventSubDefaultReload } from "./global/functions.js";
import { formatDateString } from "./global/functions.js";

burgerFunction();
preventSubDefaultReload();

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
  const date = formatDateString(post.date);

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
    const carouselModal = document.createElement("a");
    carouselModal.href = `../blogSpecific.html?id=${post.id}`;
    carouselModal.classList.add("blogListContent");
    const modalImg = document.createElement("img");
    modalImg.src = image;
    carouselModal.append(modalImg);
    const modalTitle = document.createElement("h1");
    modalTitle.style.textAlign = "center";
    modalTitle.style.textTransform = "uppercase";
    modalTitle.style.fontSize = "1.25rem";
    modalTitle.style.color = "var(--text)";
    modalTitle.style.backgroundColor = "var(--darkBg)";
    modalTitle.style.marginTop = "-1px";
    modalTitle.innerText = postTitle + " " + "-" + " " + date;

    carouselModal.append(modalTitle);

    const descript = document.createElement("p");
    descript.innerHTML = post.excerpt.rendered;
    carouselModal.append(descript);

    const clickMore = document.createElement("p");
    clickMore.innerText = "click to read full story";
    clickMore.style.textAlign = "center";
    clickMore.style.textTransform = "uppercase";
    clickMore.style.fontWeight = "700";
    carouselModal.append(clickMore);

    modalContainer.append(carouselModal);
    modal.append(modalContainer);

    modalContainer.addEventListener("click", function (event) {
      if (
        !carouselModal.contains(event.target)
        // !btn.contains(event.target)
      ) {
        modal.innerHTML = "";
      }
    });
  };
}

// NAVIGATES THE CAROUSEL SCROLL
nextBtn.addEventListener("click", function () {
  container.scrollLeft += 205;
});

// NAVIGATES THE CAROUSEL SCROLL
previousBtn.addEventListener("click", function () {
  container.scrollLeft += -205;
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
