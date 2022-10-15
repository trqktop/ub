
function api() {
    return fetch('https://jsonplaceholder.typicode.com/posts')//запрос
        .then(res => checkResponse(res))//обрабатываем ошибку
}

function checkResponse(res) {//обрабатываем ошибку
    if (res.ok) {
        return res.json()//если все ок возвращаем данные 
    }
    return Promise.reject(`Ошибка: ${res.status}`)//иначе возвращаем ошибку
}

function render() {
    api()
        .then(data => data.forEach(item => createElement(item)))
        .catch(res => console.log(res))//ловим ошибку в консоль
}

function createElement(data) {
    const container = document.querySelector('ul')

    const template = document.querySelector('template').content
    const liElement = template.querySelector('li').cloneNode(true)
    const titleElement = liElement.querySelector('h2')
    const bodyElement = liElement.querySelector('p')
    titleElement.textContent = data.title
    bodyElement.textContent = data.body
    insertCard(container, liElement)
}

function insertCard(container, element) {
    container.prepend(element)
}



render()



