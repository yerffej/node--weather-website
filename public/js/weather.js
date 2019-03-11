const weatherForm = document.querySelector('form#weather-search')
const searchElement = document.querySelector('#address')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            searchElement.value = ''
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})

