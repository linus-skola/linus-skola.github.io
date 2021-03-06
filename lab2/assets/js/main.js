window.addEventListener('load', async () => {
    addEventListeners()

    const allPeople = await fetchCharacterData('https://swapi.dev/api/people/', true)
    const allPlanets = await fetchPlanetData('https://swapi.dev/api/planets/', true)

    createCharacterObjAndPopulate(allPeople)
    populateCharacterDatalist(allPeople)
    populatePlanetDatalist(allPlanets)

})

function addEventListeners() {
    const addBtn = document.querySelector('.add-btn')
    addBtn.addEventListener('click', () => {
        addCharacterToList()
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

function toggleList(list) {
    const listSections = document.querySelectorAll('.list-container')

    if (typeof (list) === 'string') {
        for (let element of listSections) {
            if (element.id === list) {
                element.classList.add('active')
            }
            else {
                element.classList.remove('active')
            }
        }
    }
    else {
        for (let div of listSections) {
            div.classList.toggle('active')
        }
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

        listItem.addEventListener('click', () => {
            addCharacterToList(listItem)
        })

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

function addCharacterToList(obj) {
    const characterValue = document.querySelector('.character-input')
    const planetValue = document.querySelector('.planet-input')
    const characterList = document.querySelector('#myList')
    const errorMsg = document.querySelector('.error')
    errorMsg.innerText = null

    if(!preventDuplicate(characterValue.value)) {
        if (obj) {
            const listItem = obj.cloneNode(true)
            const icon = document.createElement('i')
            icon.className = 'fas fa-times-circle'
    
            icon.addEventListener('click', () => {
                icon.parentElement.remove()
            })
    
            const lastChild = listItem.lastChild
            listItem.insertBefore(icon, lastChild)
            characterList.append(listItem)
    
            objPlanet = obj.lastChild.innerText
            obj.lastChild.innerText = 'Added to My favorites list!'
            setTimeout(() => { obj.lastChild.innerText = objPlanet }, 4000)
        }
    
        else if (characterValue.value) {
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
    
            toggleList('my')
    
            characterValue.value = ''
            planetValue.value = ''
        }
    }
    else{
        errorMsg.innerText = 'Character already exists in list!'
    }
    
}

function preventDuplicate(character) {
    const list = document.querySelector('#myList')
    const listItems = list.querySelectorAll('li')

    for (const item of listItems) {
        if (item.querySelector('p').innerText === character) {
            return true
        }
        else {
            return false
        }
    }
}