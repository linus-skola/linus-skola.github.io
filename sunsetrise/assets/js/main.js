const searchInput = document.querySelector('.search-field')
var autocomplete = new google.maps.places.Autocomplete(searchInput, { types: ['geocode'] });

const searchBtn = document.querySelector('.search-btn')
searchBtn.addEventListener('click', () => {
    if (searchInput.value) {
        const lat = autocomplete.getPlace().geometry.location.lat()
        const lng = autocomplete.getPlace().geometry.location.lng()
        fetchSunData(lat, lng)
    }

})

async function fetchSunData(lat, lng) {
    const url = 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng

    const options = {
        method: 'GET'
    }

    const response = await fetch(url, options)
    const json = await response.json()

    const sunDiv = document.querySelector('.sun-data')
    const title = document.querySelector('.sun-title')
    const sunrise = document.querySelector('.sunrise')
    const sunset = document.querySelector('.sunset')

    title.innerText = 'Today in ' + searchInput.value
    sunrise.innerText = json.results.sunrise
    sunset.innerText = json.results.sunset
    sunDiv.style.display = 'block'
}