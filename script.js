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
  // console.log(jsonData);
  // console.log(jsonData.location);
  // console.log(jsonData.location.region);
  return jsonData;
}

function processJSON(jsonData){
  console.log(jsonData);
  console.log(jsonData.location);
  console.log(jsonData.location.region);
}

function processForecastJSON(jsonData){
  console.log("3-day Forecast");
  console.log(jsonData);
  console.log(jsonData.location);
  console.log(jsonData.location.region);
  console.log(jsonData.forecast.forecastday)
  console.log(jsonData.forecast.forecastday[0].day.maxtemp_c)
  console.log(jsonData.forecast.forecastday[1])
  console.log(jsonData.forecast.forecastday[2])
  console.log("~~~~~~~~~~~End Forecast~~~~~~~~~~");
}

async function main(){
  let blah = await getWeather();
  processJSON(blah);
  blah = await getWeatherForecast();
  processForecastJSON(blah);
}

main();