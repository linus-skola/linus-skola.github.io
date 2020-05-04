$.ajax({
    url: 'https://swapi.dev/api/people/',
    contentType: 'application/json',
    dataType: 'json',
    success: function (response) {
        console.log(response)
        PopulateDatalist(response.results)
    },
    error: function (response) {
        console.log(response)
    }
})


const addBtn = document.querySelector('.action-btn')

addBtn.addEventListener('click', event => {
    const inputValue = document.querySelector('.datalistInput')

    if (inputValue.value) {
        const characterList = document.querySelector('.character-list')

        const listItem = document.createElement('li')
        listItem.innerText = inputValue.value

        const icon = document.createElement('i')
        icon.className = 'fas fa-times-circle'

        icon.addEventListener('click', () => {
            icon.parentElement.remove()
        })

        console.log(inputValue)
        const span = document.createElement('span')
        //span.innerText = inputValue

        listItem.append(icon)

        characterList.append(listItem)

        inputValue.value = ''
    }
})


function PopulateDatalist(data) {
    console.log(data)
    const dataList = document.querySelector('#peopleList')

    if (dataList) {
        for (const element of data) {
            const option = document.createElement('option')
            option.value = element.name
            dataList.append(option)
        }
    }
    else {
        console.log('dataList not found')
    }
}