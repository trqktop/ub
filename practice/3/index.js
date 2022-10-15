const container = document.querySelector('.content')//контейнер для вставки
const template = document.querySelector('template').content //темплейт



const tableHeader = document.querySelector('.table__header')
let dataFromServer = []

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
        .then(data => {
            dataFromServer = data
            return data
        })
        .then(data => data.forEach(item => createElement(item)))//для каждого оъекта создаем елемент
        .catch(res => console.log(res))//ловим ошибку в консоль
}






function createElement(data) {
    const liElement = template.querySelector('li').cloneNode(true)//ищем елемент для клонирования в темплейте
    const titleElement = liElement.querySelector('h2')
    const bodyElement = liElement.querySelector('p')
    const userIdElement = liElement.querySelector('.userId')
    const idElement = liElement.querySelector('.id')
    idElement.textContent = data.id
    userIdElement.textContent = data.userId
    titleElement.textContent = data.title//наполняем данными 
    bodyElement.textContent = data.body//наполняем данными 
    insertCard(container, liElement)//вставляем в разметку
}



function insertCard(container, element) {
    container.prepend(element)
}




function getSortedData(evt) {
    // let orientation = null;
    Array.from(container.childNodes).reverse().forEach(item => item.remove())
    dataFromServer.sort((a, b) => {
        // const current = evt.target.id
        // if (orientation) {
        //     return b[current] - a[current]
        // }
        // else {
        //     return a[current] - b[current]
        // }
    }).forEach(item => {
        createElement(item)
    })
}

tableHeader.addEventListener('click', getSortedData)



render()



