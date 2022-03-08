let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("search-input");
let ipDetails = document.querySelector(".ip-details");
let ipAddressCon = document.getElementById("ip-address");
let locationCon = document.getElementById("location");
let timezoneCon = document.getElementById("timezone");
let ispCon = document.getElementById("isp");

let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_5AaccexM9Ms7FOm9Iic8RztcjtvMU&ipAddress=`;
searchBtn.addEventListener("click", () => {
  let ip = searchInput.value;
  fetchTheData(ip);
});
async function fetchTheData(ip) {
  if (document.querySelector(".error")) {
    document.querySelector(".error").remove();
  }

  ipAddressCon.innerHTML = `<div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>`;
  locationCon.innerHTML = `<div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>`;
  timezoneCon.innerHTML = `<div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>`;
  ispCon.innerHTML = `<div class="sk-chase">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>`;
  document.querySelector("#map").innerHTML = `<div class="sk-folding-cube">
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
</div>`;
  if (ip) {
    url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_5AaccexM9Ms7FOm9Iic8RztcjtvMU&ipAddress=${ip}&domain=${ip}`;
  }
  let data = await fetch(url);
  if (data.status === 200) {
    let ipObj = await data.json();
    ipAddressCon.innerHTML = ipObj.ip;
    locationCon.innerHTML = `${ipObj.location.city}, ${ipObj.location.country}`;
    timezoneCon.innerHTML = ipObj.location.timezone;
    ispCon.innerHTML = ipObj.isp;
    document.querySelector("#map").remove();
    let div = document.createElement("div");
    div.id = "map";
    document.body.appendChild(div);
    const map = L.map("map", {
      center: [0, 0],
      zoom: 13,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    map.setView([ipObj.location.lat, ipObj.location.lng], 13);
    L.marker([ipObj.location.lat, ipObj.location.lng]).addTo(map);
  } else {
    let span = document.createElement("span");
    span.className = "error";
    span.innerHTML = "Please enter an available IP or domain";
    ipDetails.appendChild(span);
    ipAddressCon.innerHTML = "";
    locationCon.innerHTML = "";
    timezoneCon.innerHTML = "";
    ispCon.innerHTML = "";
    document.querySelector("#map").innerHTML = "";
  }
}
fetchTheData();
