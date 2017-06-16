// https://developers.soundcloud.com/docs/api/reference#users
// 123333 - stray-hound
// URL for an artist http://api.soundcloud.com/users/stray-hound/?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f
// URL for an artist's tracks http://api.soundcloud.com/users/52955/tracks?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f

// STREAM URL https://api.soundcloud.com/tracks/3037033/stream

const API_KEY = "?client_id=095fe1dcd09eb3d0e1d3d89c76f5618f";
const URL_BASE = "http://api.soundcloud.com/users/";

var mainDiv = document.querySelector(".main");
var searchInput;
var userUR;
var userObj;
var userID;
var userTracksObj;
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
  userURL = URL_BASE + searchInput + API_KEY;
  input.value = "";
}

function executeUserSearch(url) {
  axios
    .get(url)
    .then(function(response) {
      console.log("AXIOS RESPONSE DATA", response.data);
      userObj = response.data;
      getUserID(userObj);
      executeTrackSearchFromUserID(userID);
    })
    .catch(function(error) {
      console.log("ERROR: ", error);
    });
}

function getUserID(userObj) {
  userID = userObj.id;
  console.log("userID: ", userID);
}

function executeTrackSearchFromUserID(id) {
  let trackSearchURL = URL_BASE + id + "/tracks" + API_KEY;
  axios.get(trackSearchURL).then(function(response) {
    userTracksObj = response.data;
    console.log("TRACK RESPONSE DATA", response.data);
    populateHTML();
  });
}

function populateHTML() {
  let newColumnContainer = document.createElement("div");
  newColumnContainer.classList.add("columns");

  for (var i = 0; i < userTracksObj.length; i++) {
    let newColumn = document.createElement("div");
    newColumn.classList.add("column");

    let trackObj = userTracksObj[i];
    let artworkURL = trackObj.artwork_url;
    let title = trackObj.title;
    let description = trackObj.description;
    let artist = trackObj.user.username;

    let img = document.createElement("img");
    let div2 = document.createElement("div");
    let div3 = document.createElement("div");
    let div4 = document.createElement("div");

    img.src = artworkURL;
    div2.innerHTML = title;
    div3.innerHTML = description;
    div4.innerHTML = artist;

    newColumn.appendChild(img);
    newColumn.appendChild(div2);
    newColumn.appendChild(div3);
    newColumn.appendChild(div4);

    newColumnContainer.appendChild(newColumn);
  }
  mainDiv.appendChild(newColumnContainer);
}
