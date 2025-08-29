
let input = document.querySelector(".search-box input");
let btn = document.querySelector(".btn button");
let images = document.querySelector(".images");
let load = document.querySelector("#load");

const accessKey = "PIW-0KwTYNLrNREra6MH9AQYd0VWfPfmmww5sB37bEw";
let page = 1;
let keyword = "";

// ✅ Download Function
function download(imgurl) {
  fetch(imgurl)
    .then(res => res.blob())
    .then(file => {
      let a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime(); // unique filename
      a.click();
    })
    .catch(() => alert("Failed to Download"));
}

// ✅ Fetch API Response
async function getResponse() {
  keyword = input.value.trim(); // remove extra space

  if (keyword === "") {
    alert("Please enter a keyword!");
    return;
  }

  let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  let response = await fetch(url);
  let data = await response.json();
  let results = data.results;

  if (page === 1) {
    images.innerHTML = ""; // clear old images
  }

  if (results.length === 0) {
    images.innerHTML = `<p style="color:red; font-size:18px;">No images found</p>`;
    load.style.display = "none";
    return;
  }

  load.style.display = "block";

  results.map((result) => {
    let li = document.createElement("li");
    li.classList.add("image");

    let html = `
      <img src="${result.urls.small}" alt="img" class="photo">

      <div class="details">
        <div class="user">
          <img src="Camera.svg" alt="Camera">
          <span>${result.user.name}</span>
        </div>
        <div class="download" onClick="download('${result.urls.full}')">
          <img src="Download.svg" alt="Download">
        </div>
      </div>
    `;

    li.innerHTML = html;
    images.appendChild(li);
  });
}

//Input + Button Events
input.addEventListener("keyup", (e) => {
  page = 1;
  if (e.key === "Enter") {
    getResponse();
  }
});

btn.addEventListener("click", () => {
  page = 1;
  getResponse();
});

load.addEventListener("click", () => {
  page++;
  getResponse();
});

//Typewriter Effect
const text = "Search and Download any image within a second";
const textElement = document.getElementById("type-text");

let index = 0;
function typeEffect() {
  if (index < text.length) {
    textElement.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 50);
  }
}
window.onload = typeEffect;

