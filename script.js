//API key 522b8e29714a4227bbe50305231104

const searchButton = document.querySelector(`#search`);
searchButton.addEventListener("click", search.bind(null, searchButton))

const searchBar = document.querySelector(`#searchbar`);
searchBar.addEventListener("keydown", handleKeyPress);

async function getWeatherForecast(place){
  let locationCity = place;
  console.log("------------");
    
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=522b8e29714a4227bbe50305231104&q=${locationCity}&aqi=no&days=3`);
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
  display(processed);
  return processed;
}

async function main(){
  let initialWeather = await getWeatherForecastInitial();
  processForecastJSON(initialWeather);

  
}

async function search(button){
  let location = searchBar.value;
  let forecast = await getWeatherForecast(location);
  processForecastJSON(forecast);
}

function handleKeyPress(event){
  if(event.key === "Enter"){
    searchButton.click();
  }
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
    let dateFormatted = formatDate(date);

    let dayDiv = document.querySelector(`#day${i}`).querySelector(".date").querySelector(".dayNum");
    dayDiv.innerHTML = dateFormatted.day;
    let monthDiv = document.querySelector(`#day${i}`).querySelector(".date").querySelector(".month");
    monthDiv.innerHTML = dateFormatted.month;
    let yearDiv = document.querySelector(`#day${i}`).querySelector(".date").querySelector(".year");
    yearDiv.innerHTML = dateFormatted.year;
    // console.log(dateDiv);

    
    let condition = forecast.forecastday[index].day.condition.text;
    let conditionDiv = document.querySelector(`#day${i}`).querySelector(".condition");
    let conditionIcon = forecast.forecastday[index].day.condition.icon;
    if(conditionIcon.startsWith('//')){
      conditionIcon = 'https:' + conditionIcon;
    }
    console.log(conditionIcon);
    
    console.log(conditionDiv.hasChildNodes());
    deleteChildren(conditionDiv);
    let conditionIconDiv = conditionDiv.appendChild(document.createElement("img"));
    

    console.log(conditionIconDiv);
    conditionIconDiv.src = conditionIcon;
    conditionIconDiv.className = "conditionIconDiv";
    let conditionWords = conditionDiv.appendChild(document.createElement("p"));
    conditionWords.innerHTML = condition;
    conditionWords.className = "conditionWords";

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
  dateFormatted.month = new Date(date).toLocaleString('default', {month: "long"})
  dateFormatted.day = new Date(date).toLocaleString('default', {day: "numeric"})  + ",";

  console.log(dateFormatted);
  return dateFormatted;
}

function deleteChildren(element){
  while(element.firstChild){
    element.removeChild(element.firstChild)
  }
}

main();
