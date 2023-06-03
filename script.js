//API key 522b8e29714a4227bbe50305231104

async function getWeather(){
  //const locationCity = prompt("Give me a capital city");
  locationCity = "London"
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=522b8e29714a4227bbe50305231104&q=${locationCity}&aqi=no`);
  const jsonData = await response.json();
  // console.log(jsonData);
  // console.log(jsonData.location);
  // console.log(jsonData.location.region);
  return jsonData;
}

async function getWeatherForecast(){
  //const locationCity = prompt("Give me a capital city");
  locationCity = "London"
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=522b8e29714a4227bbe50305231104&q=${locationCity}&aqi=no&days=3`);
  const jsonData = await response.json();

  console.log(jsonData);

  return jsonData;
}

function processJSON(jsonData){
  console.log(jsonData);
  console.log(jsonData.location);
  console.log(jsonData.location.region);
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
  console.log(processed);
  return processed;
}

async function main(){
  // let blah = await getWeather();
  // processJSON(blah);
  blah = await getWeatherForecast();
  processForecastJSON(blah);
}

async function display(){
  blah = await getWeatherForecast();
  forecast = processForecastJSON(blah);
  let location = forecast.name;
  
  let locationDiv = document.querySelector("#day1").querySelector(".location");
  locationDiv.innerHTML = location;
  console.log(locationDiv);

  let maxtemp_c = forecast.forecastday[0].day.maxtemp_c;
  let maxtemp_cDiv = document.querySelector("#day1").querySelector(".maxtemp_c");
  maxtemp_cDiv.innerHTML = maxtemp_c;

  let mintemp_c = forecast.forecastday[0].day.mintemp_c;
  let mintemp_cDiv = document.querySelector("#day1").querySelector(".mintemp_c");
  mintemp_cDiv.innerHTML = mintemp_c;

  let maxtemp_f = forecast.forecastday[0].day.maxtemp_f;
  let maxtemp_fDiv = document.querySelector("#day1").querySelector(".maxtemp_f");
  maxtemp_fDiv.innerHTML = maxtemp_f;

  let mintemp_f = forecast.forecastday[0].day.mintemp_f;
  let mintemp_fDiv = document.querySelector("#day1").querySelector(".mintemp_f");
  mintemp_fDiv.innerHTML = mintemp_f;

}

main();
display();