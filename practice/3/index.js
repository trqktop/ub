const container = document.querySelector('ul')//контейнер для вставки
const template = document.querySelector('template').content //темплейт


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
        .then(data => data.forEach(item => createElement(item)))//для каждого оъекта создаем елемент
        .catch(res => console.log(res))//ловим ошибку в консоль
}

function createElement(data) {
    const liElement = template.querySelector('li').cloneNode(true)//ищем елемент для клонирования в темплейте
    const titleElement = liElement.querySelector('h2')
    const bodyElement = liElement.querySelector('p')
    titleElement.textContent = data.title//наполняем данными 
    bodyElement.textContent = data.body//наполняем данными 
    insertCard(container, liElement)//вставляем в разметку
}

function insertCard(container, element) {
    container.prepend(element)
}

render()
