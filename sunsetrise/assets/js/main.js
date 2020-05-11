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

document.addEventListener('keypress', (event) => {
    if(event.keyCode === 13) {
        if (searchInput.value) {
            const lat = autocomplete.getPlace().geometry.location.lat()
            const lng = autocomplete.getPlace().geometry.location.lng()
            fetchSunData(lat, lng)
        }
    }
})

async function fetchSunData(lat, lng) {
    const url = 'https://api.sunrise-sunset.org/json?lat=' + lat + '&lng=' + lng + '&formatted=0'

    const options = {
        method: 'GET'
    }

    const response = await fetch(url, options)
    const json = await response.json()

    const sunDiv = document.querySelector('.sun-data')
    const title = document.querySelector('.sun-title')
    const sunriseElement = document.querySelector('.sunrise')
    const sunsetElement = document.querySelector('.sunset')

    let sunrise = new Date(json.results.sunrise)
    let sunset = new Date(json.results.sunset)

    title.innerText = 'Today in ' + searchInput.value
    sunriseElement.innerText = sunrise.toLocaleTimeString('sv-SE')
    sunsetElement.innerText = sunset.toLocaleTimeString('sv-SE')
    sunDiv.style.display = 'block'
}


Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
  }