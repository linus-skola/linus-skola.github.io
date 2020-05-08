window.addEventListener('load', async () => {
    addEventListeners()

    const allPeople = await fetchCharacterData('https://swapi.dev/api/people/', true)
    populateCharacterDatalist(allPeople)

    const allPlanets = await fetchPlanetData('https://swapi.dev/api/planets/', true)
    populatePlanetDatalist(allPlanets)

    createCharacterObjAndPopulate(allPeople)
})


function addEventListeners() {
    const addBtn = document.querySelector('.add-btn')
    addBtn.addEventListener('click', addCharacter)


    document.addEventListener('keydown', function (event) {
        if (event.keyCode == 13) {
            addCharacter()
        }
    })


    const listTitles = document.querySelectorAll('.list-title')
    for (let div of listTitles) {
        div.addEventListener('click', toggleList)
    }

    
    const changeBtn = document.querySelector('.change-btn')
    changeBtn.addEventListener('click', () => {
        editCharacter(c)
    })
}

function toggleList() {
    const listSections = document.querySelectorAll('.list-container')
    for (let div of listSections) {
        div.classList.toggle('active')
    }

}

function toggleBtn() {
    const actionBtns = document.querySelectorAll('.action-btn')

    for (let btn of actionBtns) {
        btn.classList.toggle('active-btn')
    }
}

let c = null
function setInputValues(data) {
    const characterValue = document.querySelector('.character-input')
    const planetValue = document.querySelector('.planet-input')
    
    c = data
    let name = data.querySelector('p')
    let planet = data.querySelector('span')

    characterValue.value = name.innerText
    planetValue.value = planet.innerText

    toggleBtn()
}

function editCharacter(data) {
    const characterValue = document.querySelector('.character-input')
    const planetValue = document.querySelector('.planet-input')
    
    let name = data.querySelector('p')
    let planet = data.querySelector('span')

    name.innerText = characterValue.value
    planet.innerText = planetValue.value

    characterValue.value = ''
    planetValue.value = ''

    toggleBtn()
}

async function fetchCharacterData(url, all) {
    let allPeople = []

    const options = {
        method: 'GET'
    }

    if (all) {
        while (url !== null) {
            const response = await fetch(url, options);
            const json = await response.json();

            for (let person of json.results) {
                allPeople.push({
                    name: person.name,
                    homeworld: person.homeworld
                })
            }

            if (json.next !== null) {
                url = json.next
                url = url.replace('http', 'https')
            }
            else {
                url = null
            }
        }
        return allPeople
    }
    else {
        const response = await fetch(url, options);
        const json = await response.json();
        return json.name
    }



}

async function fetchPlanetData(url, all) {
    let allPlanets = []

    const options = {
        method: 'GET'
    }

    if (all) {
        while (url !== null) {
            const response = await fetch(url, options);
            const json = await response.json();

            for (let planet of json.results) {
                allPlanets.push(planet.name)
            }

            if (json.next !== null) {
                url = json.next
                url = url.replace('http', 'https')
            }
            else {
                url = null
            }
        }
        return allPlanets
    }
    else {
        const response = await fetch(url, options);
        const json = await response.json();
        return json.name
    }

}

function populateSWList(data) {
    const characterList = document.querySelector('#swList')
    const loadingMsg = document.querySelector('.loading')

    for (const element of data) {
        const listItem = document.createElement('li')

        //Character name
        const p = document.createElement('p')
        p.innerText = element.name

        p.innerText = element.name

        const span = document.createElement('span')
        span.innerText = element.homeworld


        listItem.append(p)
        listItem.append(span)

        loadingMsg.parentElement.remove()
        characterList.append(listItem)
    }
}

function populateCharacterDatalist(data) {
    const characterList = document.querySelector('.character-datalist')
    const characterInput = document.querySelector('.character-input')

    for (const element of data) {
        const character = document.createElement('option')

        character.value = element.name

        characterList.append(character)
    }

    characterInput.placeholder = 'Search for a Star Wars character or add your own'
}

function populatePlanetDatalist(data) {
    const planetList = document.querySelector('.planet-datalist')
    const planetInput = document.querySelector('.planet-input')

    for (const element of data) {
        const planet = document.createElement('option')

        planet.value = element

        planetList.append(planet)
    }

    planetInput.placeholder = 'Search for a Star Wars planet or add your own'
}

async function createCharacterObjAndPopulate(data) {
    allObj = []


    for (const character of data) {
        let obj = {
            name: character.name,
            homeworld: await fetchPlanetData(character.homeworld.replace('http', 'https'))
        }
        allObj.push(obj)
    }

    populateSWList(allObj)
}

function addCharacter() {
    const characterValue = document.querySelector('.character-input')
    const planetValue = document.querySelector('.planet-input')

    if (characterValue.value) {
        const characterList = document.querySelector('#myList')

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