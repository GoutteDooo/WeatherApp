const title = document.querySelector("h1");
title.style.color = "#007BFF";

fetch(
  "https://api.open-meteo.com/v1/forecast?latitude=50.21&longitude=3.31&hourly=temperature_2m"
)
  .then((res) => res.json())
  .then((data) => console.log("open-meteo: ", data));

fetch("https://geocoding-api.open-meteo.com/v1/search?name=Valencie&count=1")
  .then((res) => res.json())
  .then((data) => console.log("geocoding: ", data.results[0]));

const town = document.querySelector("#weather--town");
const temp = document.querySelector("#weather--temp");
const humidity = document.querySelector("#weather--humidity");
const wind = document.querySelector("#weather--wind");
