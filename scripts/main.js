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
      userID = response.data.id;
      executeTrackSearchFromUserID(userID);
    })
    .catch(function(error) {});
}

function executeTrackSearchFromUserID(id) {
  let trackSearchURL = URL_BASE + id + "/tracks" + API_KEY;
  axios.get(trackSearchURL).then(function(response) {
    userTracksObj = response.data;

    populateHTML(4);
  });
}

function populateHTML(row_limit) {
  let currentIndex = 0;
  let counter = userTracksObj.length / row_limit;

  //do this as many times as i need to finish object
  for (var i = 0; i < counter; i++) {
    let newColumnContainer = document.createElement("div");
    newColumnContainer.classList.add("columns");

    for (var k = 0; k < row_limit; k++) {
      var newColumn = document.createElement("div");

      updateColumn(newColumn, currentIndex);

      newColumnContainer.appendChild(newColumn);
      if (currentIndex < counterMax - 1) {
        currentIndex++;
      } else {
        var breakout = true;
        break;
      }
    }
    mainDiv.appendChild(newColumnContainer);
  }
}

function updateColumn(newColumn, currentIndex) {
  newColumn.classList.add("column");

  let trackObj = userTracksObj[currentIndex]; //figure out correct index here

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
}
