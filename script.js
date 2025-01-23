let fname = document.querySelector(".fname");
let lname = document.querySelector(".lname");
let pCountry = document.querySelector(".country");
let pScore = document.querySelector(".number");
let button = document.querySelector("button");
let section2 = document.querySelector(".section2");
let data = [];

function editUser(idx) {
  let user = data[idx];
  let editForm = `
    <div class="edit-form">
      <input type="text" id="editFname" value="${user.fname}" />
      <input type="text" id="editLname" value="${user.lname}" />
      <input type="text" id="editCountry" value="${user.country}" />
      <input type="number" id="editScore" value="${user.score}" />
      <button id="saveEdit">Save</button>
      <button id="cancelEdit">Cancel</button>
    </div>`;
  let cards = document.querySelectorAll(".cards");
  cards[idx].innerHTML = editForm;
  document.querySelector("#saveEdit").addEventListener("click", function () {
    let editedFname = document.querySelector("#editFname").value;
    let editedLname = document.querySelector("#editLname").value;
    let editedCountry = document.querySelector("#editCountry").value;
    let editedScore = parseInt(document.querySelector("#editScore").value);
    if (
      editedFname === "" ||
      editedLname === "" ||
      editedCountry === "" ||
      isNaN(editedScore)
    ) {
      alert("Please fill all fields");
      return;
    }
    data[idx] = {
      fname: editedFname,
      lname: editedLname,
      country: editedCountry,
      score: editedScore,
    };
    updateDataonUI();
  });
  document.querySelector("#cancelEdit").addEventListener("click", function () {
    updateDataonUI();
  });
}

function activateButtons() {
  let buttons = document.querySelectorAll(".cards");
  buttons.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      if (e.target.className === "del") {
        data.splice(index, 1);
        updateDataonUI();
      }
      if (e.target.className === "but1") {
        data[index].score += 5;
        updateDataonUI();
      }
      if (e.target.className === "but2") {
        data[index].score -= 5;
        updateDataonUI();
      }
      if (e.target.className === "edit") {
        editUser(index);
      }
    });
  });
}

function getDate() {
  let date = new Date();
  let month = date.toLocaleString("default", { month: "short" });
  let day = date.getDate();
  let year = date.getFullYear();
  let time = date.toLocaleTimeString();
  let finaldate = `${month} ${year}: ${time}`;
  return finaldate.toUpperCase();
}

function updateDataonUI() {
  data.sort((p1, p2) => p2.score - p1.score);
  let showData = "";
  data.forEach((player) => {
    showData += `
      <div class="cards">
        <span>${player.fname}</span>
        <span>${player.lname}</span>
        <span>${getDate()}</span>
        <span>${player.country}</span>
        <span>${player.score}</span>
        <button class="del">🗑</button>
        <button class="but1">+5</button>
        <button class="but2">-5</button>
        <button class="edit">Edit</button>
      </div>`;
  });
  section2.innerHTML = showData;
  activateButtons();
}

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    fname.value === "" ||
    lname.value === "" ||
    pCountry.value === "" ||
    pScore.value === ""
  ) {
    alert("Please fill all fields");
    return;
  }
  let playerObj = {
    fname: fname.value,
    lname: lname.value,
    country: pCountry.value,
    score: parseInt(pScore.value),
  };
  data.push(playerObj);
  updateDataonUI();
  fname.value = "";
  lname.value = "";
  pCountry.value = "";
  pScore.value = "";
});
