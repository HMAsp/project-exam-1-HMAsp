const url = "https://codewithspooks.com/insidethetrip/wp-json/wp/v2/posts";

async function fetchPosts() {
  const response = await fetch(url);

  const posts = await response.json();

  return posts;
}

const testImg = document.querySelector(".test");

function renderPost(post) {
  console.log(post);
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
