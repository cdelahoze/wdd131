// Output the current year in the first paragraph (con comprobación DOM)
const _cy = document.getElementById('currentyear');
if (_cy) {
  _cy.innerHTML = '&#169; ' + new Date().getFullYear() + ' Cristian Moisés De La Hoz Escorcia';
}

// Output the last modified date in the second paragraph (con comprobación DOM)
const _lm = document.getElementById('lastModified');
if (_lm) {
  _lm.innerHTML = 'Last Modified: ' + document.lastModified;
}

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


function updateData() {
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

// Calculate wind chill (°C) given temperature in °C and wind in km/h
function calculateWindChill(T, v) {
  const vPow = Math.pow(v, 0.16);
  const result = 13.12 + 0.6215 * T - 11.37 * vPow + 0.3965 * T * vPow;
  return Math.round(result * 10) / 10; // round to 1 decimal
}

