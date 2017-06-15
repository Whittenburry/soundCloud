// https://developers.soundcloud.com/docs/api/reference#users
// 123333 - stray-hound

// URL for an artist's tracks http://api.soundcloud.com/users/52955/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f
const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
const URL_USER_SEARCH = "http://api.soundcloud.com/users/";

var mainDiv = document.querySelector(".main");
var searchInput = "";
var results = "";
var btn = document.querySelector("#submit");
var input = document.querySelector("#input");
btn.addEventListener("click", getSearchInput);
input.addEventListener("keypress", function(e) {
  if (e.which == 13) {
    event.preventDefault();
    var input = document.querySelector(".search");
    searchInput = input.value;
    console.log("searchInput: ", searchInput);
    results = URL_USER_SEARCH + searchInput + API_KEY;
    input.value = "";
    executeSearch(results);
  }
});

function getSearchInput() {
  event.preventDefault();
  var input = document.querySelector(".search");
  searchInput = input.value;
  console.log("searchInput: ", searchInput);
  results = URL_USER_SEARCH + searchInput + API_KEY;
  input.value = "";
  executeSearch(results);
}

console.log("results: ", results);

function executeSearch(url) {
  axios
    .get(url)
    .then(function(response) {
      console.log(response.data);
    })
    .catch(function(error) {
      console.log("ERROR: ", error);
    });
}
