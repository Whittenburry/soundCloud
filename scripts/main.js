// https://developers.soundcloud.com/docs/api/reference#users
// 123333 - stray-hound
// URL for an artist http://api.soundcloud.com/users/stray-hound/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f
// URL for an artist's tracks http://api.soundcloud.com/users/52955/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f
const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
const URL_USER_SEARCH = "http://api.soundcloud.com/users/";

var mainDiv = document.querySelector(".main");
var searchInput = "";
var userURL = "";
var userObj;
var userID = "";
var searchBtn = document.querySelector("#submit");
var searchInput = document.querySelector("#input");
searchBtn.addEventListener("click", function(e) {
  getSearchInput();
  executeUserSearch(userURL);
});
searchInput.addEventListener("keypress", function(e) {
  if (e.which == 13) {
    getSearchInput();
    executeUserSearch(userURL);
  }
});

function getSearchInput() {
  event.preventDefault();
  var input = document.querySelector(".search");
  searchInput = input.value;
  userURL = URL_USER_SEARCH + searchInput + API_KEY;
  input.value = "";
}

function executeUserSearch(url) {
  axios
    .get(url)
    .then(function(response) {
      console.log("AXIOS RESPONSE DATA", response.data);
      userObj = response.data;
      getUserID(userObj);
    })
    .catch(function(error) {
      console.log("ERROR: ", error);
    });
}

function getUserID(userObj) {
  userID = userObj.id;
  console.log("userID: ", userID);
}
