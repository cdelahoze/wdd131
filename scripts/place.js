// Output the current year in the first paragraph
document.getElementById("currentyear").innerHTML =
  "&#169; " + new Date().getFullYear() + " Cristian Moisés De La Hoz Escorcia";

// Output the last modified date in the second paragraph
document.getElementById("lastModified").innerHTML =
  "Last Modified: " + document.lastModified;

// Wind Chill Calculation
window.addEventListener('DOMContentLoaded', () => {
  
  // ===== Static weather values for course exercise =====
  // Define static values that match the displayed weather content
  const staticTemp = 30; // °C
  const staticWind = 25.9; // km/h

  const elTemp = document.getElementById('temp');
  const elWind = document.getElementById('wind');
  const elChill = document.getElementById('windchill');
  const elCond = document.getElementById('conditions');

  if (elTemp) elTemp.textContent = staticTemp;
  if (elWind) elWind.textContent = staticWind;
  if (elCond) elCond.textContent = 'Partly Cloudy';

  // Only calculate wind chill when conditions are met
  if (staticTemp <= 10 && staticWind > 4.8) {
    const wc = calculateWindChill(staticTemp, staticWind);
    if (elChill) elChill.textContent = wc + ' °C';
  } else {
    if (elChill) elChill.textContent = 'N/A';
  }
});


async function updateData() {
      // ===== Place information =====
  const elArea = document.getElementById('area');
  const elPopulation = document.getElementById('population');
  const elCapital = document.getElementById('capital');
  const elLanguages = document.getElementById('languages');
  const elCurrency = document.getElementById('currency');
  const elTimezone = document.getElementById('timezone');
  const elCallingCode = document.getElementById('callingcode');
  const elInternet = document.getElementById('internet');
  innerTextWithFallback(elArea, 'Area:', '1.109.500 Km²');
  innerTextWithFallback(elPopulation, 'Population:', '53.425.635 people');
  innerTextWithFallback(elCapital, 'Capital:', 'Bogota DC');
  innerTextWithFallback(elLanguages, 'Languages:', 'Spanish');
  innerTextWithFallback(elCurrency, 'Currency:', 'Colombian Peso (COP)');
  innerTextWithFallback(elTimezone, 'Time Zone:', 'UTC-5');
  innerTextWithFallback(elCallingCode, 'Calling Code:', '+57');
  innerTextWithFallback(elInternet, 'Internet:', 'High-speed available');
}

window.addEventListener('DOMContentLoaded', () => {
  updateData();
});

// Helper: set element text to fallback when empty or placeholder
function innerTextWithFallback(el, _label, fallback) {
  if (!el) return;
  const text = (el.textContent || '').trim();
  if (!text || text === '—') el.textContent = fallback;
}

// /* ===== Clima (OpenWeatherMap) =====
//    OpenWeatherMap.
// */
// const WEATHER_API_KEY = 'e93d01a7d7decc7738ad72d0a7828e68';
// const WEATHER_CITY = 'San Andres,CO'; // formato: City,COUNTRYCODE

// function calculateWindChill(tempC, windKmh) {
//   return Math.round((13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)) * 10) / 10;
// }

// async function fetchWeather() {
//   const elTemp = document.getElementById('temp');
//   const elCond = document.getElementById('conditions');
//   const elWind = document.getElementById('wind');
//   const elChill = document.getElementById('windchill');

//   if (!elTemp) return;

//   if (!WEATHER_API_KEY || WEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
//     elCond.textContent = 'API key faltante. Reemplaza WEATHER_API_KEY.';
//     return;
//   }

//   try {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(WEATHER_CITY)}&units=metric&appid=${WEATHER_API_KEY}`;
//     const resp = await fetch(url);
//     if (!resp.ok) throw new Error('Error al obtener datos: ' + resp.status);
//     const data = await resp.json();

//     const temp = data.main && data.main.temp != null ? Math.round(data.main.temp * 10) / 10 : '—';
//     const cond = data.weather && data.weather[0] && data.weather[0].description ? data.weather[0].description : '—';
//     const windMs = data.wind && data.wind.speed != null ? data.wind.speed : 0; // m/s
//     const windKmh = Math.round((windMs * 3.6) * 10) / 10;

//     elTemp.textContent = temp;
//     elCond.textContent = cond;
//     elWind.textContent = windKmh;

//     const chill = calcWindChill(Number(temp), windKmh);
//     elChill.textContent = chill === null ? 'No aplica' : chill + ' °C';
//   } catch (err) {
//     elCond.textContent = 'Error al cargar clima';
//     console.error(err);
//   }
// }