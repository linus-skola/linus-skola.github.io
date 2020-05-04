//PopulateDatalists()

const starWarsData = []

$.ajax({
    url: 'https://swapi.dev/api/people/',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
        populateCharactersList(response.results)
        //allCharacters(response.results)
    },
    error: function (response) {
        console.log(response)
    }
})

$.ajax({
    url: 'https://swapi.dev/api/planets/',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
        populatePlanetsList(response.results)
    },
    error: function (response) {
        console.log(response)
    }
})


const addBtn = document.querySelector('.action-btn')
addBtn.addEventListener('click', addCharacter)

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
        addCharacter()
    }
})

const listTitles = document.querySelectorAll('.list-title')
for(let div of listTitles){
    div.addEventListener('click', toggleList)
}

function addCharacter() {
    const characterValue = document.querySelector('.character-input')
    const planetValue = document.querySelector('.planet-input')


    if (characterValue.value) {
        const activeList = document.querySelector('.active')
        const characterList = activeList.querySelector('.character-list')

        const listItem = document.createElement('li')

        //Character name
        const p = document.createElement('p')
        p.innerText = characterValue.value

        p.addEventListener('click', () => {
            editCharacter(p.parentElement)
        })

        // ICON
        const icon = document.createElement('i')
        icon.className = 'fas fa-times-circle'

        icon.addEventListener('click', () => {
            icon.parentElement.remove()
        })


        //Planet
        const span = document.createElement('span')
        span.innerText = planetValue.value

        span.addEventListener('click', () => {
            editCharacter(span.parentElement)
        })

        listItem.append(p)
        listItem.append(icon)
        listItem.append(span)

        characterList.append(listItem)

        characterValue.value = ''
        planetValue.value = ''
    }
}

function toggleList() {
    const listSections = document.querySelectorAll('.list-container')
    for(let div of listSections) {
        div.classList.toggle('active')
    }
    
}

function editCharacter(data) {
    const characterValue = document.querySelector('.character-input')
    const planetValue = document.querySelector('.planet-input')
}

function populateCharactersList(data) {
    const characterList = document.querySelector('.character-datalist')

    for (const element of data) {
        const character = document.createElement('option')

        character.value = element.name

        characterList.append(character)
    }
}

function populatePlanetsList(data) {
    const planetsList = document.querySelector('.planets-list')

    for (const element of data) {
        const planet = document.createElement('option')

        planet.value = element.name

        planetsList.append(planet)
    }
}