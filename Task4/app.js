/**
 * ──────────────────────────────────────────────────────────
 *  Weather Dashboard — Asynchronous JavaScript & REST APIs
 *  Uses Open-Meteo (free, no API key required)
 *    • Geocoding:  https://geocoding-api.open-meteo.com
 *    • Weather:    https://api.open-meteo.com
 * ──────────────────────────────────────────────────────────
 */

// ── DOM References ──────────────────────────────────────────
const searchForm     = document.getElementById('searchForm');
const cityInput      = document.getElementById('cityInput');
const searchBtn      = document.getElementById('searchBtn');
const statusMessage  = document.getElementById('statusMessage');
const welcomeState   = document.getElementById('welcomeState');
const dashboard      = document.getElementById('dashboard');

// Current weather elements
const elCityName     = document.getElementById('cityName');
const elDateTime     = document.getElementById('dateTime');
const elWeatherDesc  = document.getElementById('weatherDesc');
const elWeatherIcon  = document.getElementById('weatherIcon');
const elCurrentTemp  = document.getElementById('currentTemp');

// Metric elements
const elFeelsLike    = document.getElementById('feelsLike');
const elHumidity     = document.getElementById('humidity');
const elWindSpeed    = document.getElementById('windSpeed');
const elWindDir      = document.getElementById('windDir');
const elUvIndex      = document.getElementById('uvIndex');
const elPrecipitation = document.getElementById('precipitation');

// Forecast
const elForecastGrid = document.getElementById('forecastGrid');


// ── Weather Code → Emoji & Description mapping ─────────────
const WEATHER_CODES = {
    0:  { desc: 'Clear Sky',            icon: '☀️' },
    1:  { desc: 'Mainly Clear',         icon: '🌤️' },
    2:  { desc: 'Partly Cloudy',        icon: '⛅' },
    3:  { desc: 'Overcast',             icon: '☁️' },
    45: { desc: 'Foggy',                icon: '🌫️' },
    48: { desc: 'Depositing Rime Fog',  icon: '🌫️' },
    51: { desc: 'Light Drizzle',        icon: '🌦️' },
    53: { desc: 'Moderate Drizzle',     icon: '🌦️' },
    55: { desc: 'Dense Drizzle',        icon: '🌧️' },
    61: { desc: 'Slight Rain',          icon: '🌧️' },
    63: { desc: 'Moderate Rain',        icon: '🌧️' },
    65: { desc: 'Heavy Rain',           icon: '🌧️' },
    71: { desc: 'Slight Snow',          icon: '🌨️' },
    73: { desc: 'Moderate Snow',        icon: '🌨️' },
    75: { desc: 'Heavy Snow',           icon: '❄️' },
    77: { desc: 'Snow Grains',          icon: '❄️' },
    80: { desc: 'Slight Showers',       icon: '🌦️' },
    81: { desc: 'Moderate Showers',     icon: '🌧️' },
    82: { desc: 'Violent Showers',      icon: '⛈️' },
    85: { desc: 'Slight Snow Showers',  icon: '🌨️' },
    86: { desc: 'Heavy Snow Showers',   icon: '🌨️' },
    95: { desc: 'Thunderstorm',         icon: '⛈️' },
    96: { desc: 'Thunderstorm + Hail',  icon: '⛈️' },
    99: { desc: 'Severe Thunderstorm',  icon: '⛈️' },
};

/**
 * Look up weather code → { desc, icon }.
 * Falls back gracefully for unknown codes.
 */
function decodeWeather(code) {
    return WEATHER_CODES[code] || { desc: 'Unknown', icon: '🌡️' };
}


// ── UI Helpers ──────────────────────────────────────────────

/** Show a status bar (loading or error). */
function showStatus(message, type = 'loading') {
    statusMessage.textContent = '';
    statusMessage.className = `status-message ${type}`;

    if (type === 'loading') {
        const spinner = document.createElement('span');
        spinner.className = 'spinner';
        statusMessage.appendChild(spinner);
    }

    statusMessage.appendChild(document.createTextNode(message));
    statusMessage.classList.remove('hidden');
}

/** Hide the status bar. */
function hideStatus() {
    statusMessage.classList.add('hidden');
}

/** Convert wind degrees → compass direction. */
function degToCompass(deg) {
    const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
                  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return dirs[Math.round(deg / 22.5) % 16];
}

/** Format a date string to a readable day name. */
function formatDay(dateStr, index) {
    if (index === 0) return 'Today';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}


// ── API Calls (async / await + Fetch API) ──────────────────

/**
 * Step 1: Geocode a city name → { latitude, longitude, display name }
 * Uses the Open-Meteo Geocoding API.
 */
async function geocodeCity(cityName) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Geocoding request failed (HTTP ${response.status})`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please check the spelling and try again.`);
    }

    const place = data.results[0];
    return {
        lat:     place.latitude,
        lon:     place.longitude,
        name:    place.name,
        country: place.country || '',
        admin:   place.admin1 || '',
    };
}

/**
 * Step 2: Fetch current weather + 7-day forecast for given coordinates.
 * Uses the Open-Meteo Weather Forecast API.
 */
async function fetchWeather(lat, lon) {
    const params = [
        `latitude=${lat}`,
        `longitude=${lon}`,
        'current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
        'daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum',
        'timezone=auto',
        'forecast_days=7',
    ].join('&');

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Weather API request failed (HTTP ${response.status})`);
    }

    const data = await response.json();

    // Validate that the response contains the expected nested objects
    if (!data.current || !data.daily) {
        throw new Error('Unexpected API response structure — missing current or daily data.');
    }

    return data;
}


// ── Render Functions ────────────────────────────────────────

/**
 * Populate the dashboard with weather data.
 * Parses and renders complex nested JSON objects from the API response.
 */
function renderDashboard(location, weather) {
    // ── Current Weather ─────────────────────────────────────
    const current = weather.current;
    const weatherInfo = decodeWeather(current.weather_code);

    // City name & country
    const displayName = location.admin
        ? `${location.name}, ${location.admin}, ${location.country}`
        : `${location.name}, ${location.country}`;
    elCityName.textContent = displayName;

    // Date & time
    const now = new Date();
    elDateTime.textContent = now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }) + ' — ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Weather description & icon
    elWeatherDesc.textContent = weatherInfo.desc;
    elWeatherIcon.textContent = weatherInfo.icon;

    // Temperature
    elCurrentTemp.textContent = `${Math.round(current.temperature_2m)}°C`;

    // ── Metric Cards ────────────────────────────────────────
    elFeelsLike.innerHTML     = `${Math.round(current.apparent_temperature)}<span class="metric-unit">°C</span>`;
    elHumidity.innerHTML      = `${current.relative_humidity_2m}<span class="metric-unit">%</span>`;
    elWindSpeed.innerHTML     = `${current.wind_speed_10m}<span class="metric-unit"> km/h</span>`;
    elWindDir.innerHTML       = `${degToCompass(current.wind_direction_10m)} <span class="metric-unit">(${current.wind_direction_10m}°)</span>`;
    elPrecipitation.innerHTML = `${current.precipitation}<span class="metric-unit"> mm</span>`;

    // UV Index comes from daily forecast (today's max)
    const uvMax = weather.daily.uv_index_max[0];
    elUvIndex.innerHTML = `${uvMax}<span class="metric-unit"> / 11+</span>`;

    // ── 7-Day Forecast ──────────────────────────────────────
    elForecastGrid.innerHTML = '';

    const daily = weather.daily;
    for (let i = 0; i < daily.time.length; i++) {
        const dayInfo   = decodeWeather(daily.weather_code[i]);
        const card      = document.createElement('div');
        card.className  = 'forecast-card';
        card.innerHTML  = `
            <p class="forecast-day">${formatDay(daily.time[i], i)}</p>
            <p class="forecast-icon" aria-hidden="true">${dayInfo.icon}</p>
            <div class="forecast-temps">
                <span class="forecast-high">${Math.round(daily.temperature_2m_max[i])}°</span>
                <span class="forecast-low">${Math.round(daily.temperature_2m_min[i])}°</span>
            </div>
        `;
        elForecastGrid.appendChild(card);
    }

    // Show dashboard, hide welcome
    welcomeState.style.display = 'none';
    dashboard.classList.add('visible');
}


// ── Main Search Handler ─────────────────────────────────────

/**
 * Orchestrates the full search flow:
 *   1. Validate input
 *   2. Geocode city name → coordinates
 *   3. Fetch weather data for coordinates
 *   4. Render the dashboard
 *
 * Implements comprehensive error handling for:
 *   • Empty input
 *   • City not found (geocoding)
 *   • Network failures (fetch rejects)
 *   • Non-OK HTTP responses
 *   • Unexpected JSON structure
 */
async function handleSearch(event) {
    event.preventDefault();

    const city = cityInput.value.trim();

    // Validate input
    if (!city) {
        showStatus('Please enter a city name.', 'error');
        return;
    }

    // Disable button while loading
    searchBtn.disabled = true;
    searchBtn.textContent = 'Searching…';
    showStatus('Fetching weather data…', 'loading');

    try {
        // Step 1 — Geocode
        const location = await geocodeCity(city);

        // Step 2 — Fetch weather
        const weather = await fetchWeather(location.lat, location.lon);

        // Step 3 — Render
        hideStatus();
        renderDashboard(location, weather);

    } catch (error) {
        // Comprehensive error handling
        console.error('Weather fetch error:', error);

        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            // Network-level failure (offline, DNS, CORS, etc.)
            showStatus('Network error — please check your internet connection and try again.', 'error');
        } else {
            // Application-level error (city not found, bad response, etc.)
            showStatus(error.message, 'error');
        }

        dashboard.classList.remove('visible');

    } finally {
        // Always re-enable the button
        searchBtn.disabled = false;
        searchBtn.textContent = 'Search';
    }
}


// ── Event Listeners ─────────────────────────────────────────
searchForm.addEventListener('submit', handleSearch);
