//PopulateDatalists()

const starWarsData = []

$.ajax({
    url: 'https://swapi.dev/api/people/',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
        //populateCharactersList(response.results)
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
        //populatePlanetsList(response.results)
    },
    error: function (response) {
        console.log(response)
    }
})


const addBtn = document.querySelector('.add-btn')
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

const characterValue = document.querySelector('.character-input')
const planetValue = document.querySelector('.planet-input')

characterValue.addEventListener('input', (event) => {
    console.log('clicked')
    console.log(event)
})


function addCharacter() {
    if (characterValue.value) {
        const activeList = document.querySelector('.active')
        const characterList = activeList.querySelector('.character-list')

        const listItem = document.createElement('li')

        //Character name
        const p = document.createElement('p')
        p.innerText = characterValue.value

        p.addEventListener('click', () => {
            setInputValues(p.parentElement)
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
            setInputValues(span.parentElement)
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

let c = null
const changeBtn = document.querySelector('.change-btn')
changeBtn.addEventListener('click', () => {
    editCharacter(c)
})

function setInputValues(data) {
    c = data
    let name = data.querySelector('p')
    let planet = data.querySelector('span')

    characterValue.value = name.innerText
    planetValue.value = planet.innerText

    toggleBtn()
}

function editCharacter(data) {
    let name = data.querySelector('p')
    let planet = data.querySelector('span')

    name.innerText = characterValue.value
    planet.innerText = planetValue.value
    
    characterValue.value = ''
    planetValue.value = ''

    toggleBtn()
}

function toggleBtn() {
    const actionBtns = document.querySelectorAll('.action-btn')

    for(let btn of actionBtns) {
        btn.classList.toggle('active-btn')
    }
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
    const planetsList = document.querySelector('.planet-list')

    for (const element of data) {
        const planet = document.createElement('option')

        planet.value = element.name

        planetsList.append(planet)
    }
}