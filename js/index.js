const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts";

async function fetchPosts() {
  const response = await fetch(url);

  const posts = await response.json();

  return posts;
}

const test = document.querySelector(".carouselContainer");

function renderPost(post) {
  console.log(post);

  const image = post.jetpack_featured_media_url;

  const blogContainer = document.createElement("div");
  blogContainer.classList.add("blogContainer");
  blogContainer.style.backgroundImage = `url('${image}')`;
  blogContainer.style.backgroundSize = "cover";
  const title = document.createElement("h3");
  title.style.alignSelf = "end";
  title.style.backgroundColor = "var(--darkBg)";
  title.style.padding = "0px 10px";
  title.style.textTransform = "uppercase";
  title.innerText = `"` + post.title.rendered + `"`;
  blogContainer.append(title);
  test.append(blogContainer);
}

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
