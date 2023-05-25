//API key 522b8e29714a4227bbe50305231104

async function getWeather(){
  const locationCity = prompt("Give me a capital city");
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=522b8e29714a4227bbe50305231104&q=${locationCity}&aqi=no`);
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

async function main(){
  let blah = await getWeather();
  processJSON(blah);
}

main();