//API key 522b8e29714a4227bbe50305231104

async function getWeatherForecast(place){
  //const locationCity = prompt("Give me a capital city");
  let searchbar = document.querySelector('#searchbar');

  let locationCity = place;
  console.log("------------");
    
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=522b8e29714a4227bbe50305231104&q=${locationCity}&aqi=no&days=3`);
  const jsonData = await response.json();

  console.log(jsonData);

  return jsonData;
}


async function getWeatherForecastInitial(){
  let defaultLocation = "Honolulu";
  console.log(defaultLocation)
  json = await getWeatherForecast(defaultLocation);
  return json;
}

function processForecastJSON(jsonData){
  console.log("3-day Forecast");

  const {name, region} = jsonData.location;

  const {forecastday} = jsonData.forecast;

  const processed = {
    name,
    region,
    forecastday
  };
  // console.log(jsonData);
  // console.log(jsonData.location);
  // console.log(jsonData.location.region);
  // console.log(jsonData.forecast.forecastday)
  // console.log(jsonData.forecast.forecastday[0].day.maxtemp_c)
  // console.log(jsonData.forecast.forecastday[1])
  // console.log(jsonData.forecast.forecastday[2])
  console.log("Here is the processsed jasdon");
  console.log(processed);
  return processed;
}

async function main(){
  let initialWeather = await getWeatherForecastInitial();
  let initialWeatherProcessed = processForecastJSON(initialWeather);
  display(initialWeatherProcessed);
}

async function display(forecast){
  console.log("inDisplay");
  console.log(forecast);
  let location = forecast.name;
  
  for(let i = 1; i < 4; i++){
    let index = i - 1;

    let locationDiv = document.querySelector(`#day${i}`).querySelector(".location");
    locationDiv.innerHTML = location;
    // console.log(locationDiv);

    let date = forecast.forecastday[index].date;
    let dateDiv = document.querySelector(`#day${i}`).querySelector(".date");
    let dateFormatted = formatDate(date);

    let dayDiv = document.querySelector(`#day${i}`).querySelector(".date").querySelector(".day");
    dayDiv.innerHTML = dateFormatted.day;
    let monthDiv = document.querySelector(`#day${i}`).querySelector(".date").querySelector(".month");
    monthDiv.innerHTML = dateFormatted.month;
    let yearDiv = document.querySelector(`#day${i}`).querySelector(".date").querySelector(".year");
    yearDiv.innerHTML = dateFormatted.year;
    // console.log(dateDiv);

    
    let condition = forecast.forecastday[index].day.condition.text;
    let conditionDiv = document.querySelector(`#day${i}`).querySelector(".condition");
    conditionDiv.innerHTML = condition;

    let conditionIcon = forecast.forecastday[index].day.condition.icon;
    let conditionIconDiv = conditionDiv.appendChild(document.createElement("img"));
    // console.log(conditionIcon);
    // console.log(conditionIconDiv);
    conditionIconDiv.src = conditionIcon;

    let maxtemp_c = forecast.forecastday[index].day.maxtemp_c;
    let maxtemp_cDiv = document.querySelector(`#day${i}`).querySelector(".maxtemp_c");
    maxtemp_cDiv.innerHTML = maxtemp_c;

    let mintemp_c = forecast.forecastday[index].day.mintemp_c;
    let mintemp_cDiv = document.querySelector(`#day${i}`).querySelector(".mintemp_c");
    mintemp_cDiv.innerHTML = mintemp_c;

    let maxtemp_f = forecast.forecastday[index].day.maxtemp_f;
    let maxtemp_fDiv = document.querySelector(`#day${i}`).querySelector(".maxtemp_f");
    maxtemp_fDiv.innerHTML = maxtemp_f;

    let mintemp_f = forecast.forecastday[index].day.mintemp_f;
    let mintemp_fDiv = document.querySelector(`#day${i}`).querySelector(".mintemp_f");
    mintemp_fDiv.innerHTML = mintemp_f;
  }

}

function formatDate(date){
  const dateFormatted = {year: null, month: null, day: null};
  dateFormatted.year = new Date(date).toLocaleString('default', {year: "numeric"})
  dateFormatted.month = new Date(date).toLocaleString('default', {month: "short"})
  dateFormatted.day = new Date(date).toLocaleString('default', {day: "2-digit"})

  console.log(dateFormatted);
  return dateFormatted;
}

main();