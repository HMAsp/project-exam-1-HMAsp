const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts";

async function fetchPosts() {
  const response = await fetch(url);

  const posts = await response.json();

  return posts;
}

const container = document.querySelector(".carouselContainer");
const loaderInd = document.querySelector(".loader");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const enterBtn = document.querySelector("#enterBtn");

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
      window.location.href = `../#.html'${post.id}'`;
    };
    carouselModal.append(btn);
    modalContainer.append(carouselModal);
    modal.append(modalContainer);

    modal.onclick = function () {
      modal.innerHTML = "";
    };
  };
}

nextBtn.addEventListener("click", function () {
  container.scrollLeft += 230;
});

previousBtn.addEventListener("click", function () {
  container.scrollLeft += -230;
});

function renderPosts(posts) {
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    renderPost(post);
  }
}

async function main() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

main();
