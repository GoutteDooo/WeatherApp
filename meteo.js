const TITLE_ELEMENT = document.querySelector("h1");
const TOWN_ELEMENT = document.querySelector("#weather--town");
const DATE_ELEMENT = document.querySelector("#weather--date");
const TEMP_ELEMENT = document.querySelector("#weather--temp");
const HUMIDITY_ELEMENT = document.querySelector("#weather--humidity");
const WIND_ELEMENT = document.querySelector("#weather--wind");
let townName, temp, humidity, wind, conf;

const updateDate = () => {
  const DATE = new Date();
  const DAY = DATE.getDate();
  const MONTH = DATE.getMonth() + 1;
  const YEAR = DATE.getFullYear();
  const HOURS = DATE.toLocaleString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  DATE_ELEMENT.textContent = `Nous sommes le ${DAY}/${MONTH}/${YEAR} et il est ${HOURS}`;
};

function main() {
  //Récupérer le fichier de configuration
  fetch("./conf.json")
    .then((res) => res.json())
    .then((configs) => {
      //Récupérer les données de la ville en question
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${configs.town}&count=1`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("geocoding: ", data.results[0]);
          townName = data.results[0].name;
          const lat = data.results[0].latitude;
          const lon = data.results[0].longitude;
          //Récupérer les données de l'API open-meteo en fonction des latitude et longitude de la ville
          fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m&timezone=Europe%2FBerlin&forecast_minutely_15=4`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("open-meteo: ", data);
              temp =
                data.current.temperature_2m +
                " " +
                data.current_units.temperature_2m;
              humidity =
                data.current.relative_humidity_2m +
                " " +
                data.current_units.relative_humidity_2m;
              wind =
                data.current.wind_speed_10m +
                " " +
                data.current_units.wind_speed_10m;
              //Les afficher dans le DOM
              console.log("variables : ", townName, temp, humidity, wind);
              TOWN_ELEMENT.textContent = " " + townName;
              TEMP_ELEMENT.textContent = `${temp}`;
              HUMIDITY_ELEMENT.textContent = `${humidity}`;
              WIND_ELEMENT.textContent = `${wind}`;
              updateDate();
            });
        })
        .catch((err) =>
          console.log("ERREUR, Les données n'ont pas pu être récupérées: ", err)
        );
    });
}

const refreshment = 1000 * 60 * 60;
setInterval(main, refreshment);
main();
