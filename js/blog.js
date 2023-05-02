import { burgerFunction } from "./global/functions.js";
burgerFunction();

const blogListContainer = document.querySelector(".blogListContainer");
const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts";
const loaderInd = document.querySelector(".loader");

// FETCHES THE ARRAY
async function fetchPosts() {
  const response = await fetch(url);

  const posts = await response.json();

  return posts;
}

// CREATES AND DISPLAYS POSTS ON WEBSITE
function renderPost(post) {
  console.log("recent post:" + " " + post.slug);

  loaderInd.style.display = "none";
  const image = post.jetpack_featured_media_url;
  const postTitle = `"` + post.title.rendered + `"`;
  const excerpt = post.excerpt.rendered;

  const blogContainer = document.createElement("a");
  blogContainer.style.cursor = "pointer";
  blogContainer.classList.add("blogListContent");
  blogContainer.href = `/blogSpecific.html?id=${post.id}`;

  const blogImg = document.createElement("img");
  blogImg.src = image;
  blogContainer.append(blogImg);

  const pContainer = document.createElement("div");
  blogContainer.append(pContainer);

  const descript = document.createElement("p");
  descript.innerHTML = excerpt;

  const title = document.createElement("h3");
  title.style.alignSelf = "end";
  title.style.backgroundColor = "var(--darkBg)";
  title.style.padding = "0px 10px";
  title.style.textTransform = "uppercase";
  title.innerText = postTitle;

  const clickMore = document.createElement("p");
  clickMore.innerText = "Click to read..";
  clickMore.style.textAlign = "center";
  blogContainer.append(clickMore);

  pContainer.append(title);
  pContainer.append(descript);
  blogListContainer.append(blogContainer);
}

// LOOPS THE FETCHED ARRAY AND RUNS FUNCTION TO CREATE POSTS FOR EVERY OBJECT
function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    renderPost(post);
  }
}

// AWAITS FETCH AND RUNS LOOP FUNCTION
async function main() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

main();
