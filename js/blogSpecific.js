const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

console.log(id);
