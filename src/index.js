alert("si su ubicación no es detectada, refresque la página o compruebe que la ubicación esté activada");

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData)
}

const API_KEY = '679cd93d9fa20d9803015fedfc6bf98e';
const fetchData = position => {
  const { latitude, longitude } = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => setWeatherData(data));
}

const setWeatherData = data => {
  console.log(data)
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: Math.floor(data.main.temp),
    date: getDate(),
  }

  Object.keys(weatherData).forEach(key => {
    setTextContent(key, weatherData[key]);
    cleanUp();
  });
}

const cleanUp = () => {
  let container = document.getElementById('container');
  container.style.display = 'flex';
}

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const setTextContent = (element, text) => {
  document.getElementById(element).textContent = text;
}