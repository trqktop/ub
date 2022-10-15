
const validatorConfig = ({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: '.popup__input_error-style',
    errorClass: '.popup__input-error',
    openedPopup: 'popup_opened'
})//конфиг настроек для валидации


function enableValidation(config) {
    const formArr = Array.from(document.querySelectorAll(config.formSelector))
    formArr.forEach((formElement) => {
        setEventListeners(config, formElement)
    });
}//вешаем слушатель событий на все формы




function setEventListeners(config, formElement) {
    const popupSubmitButtonToggleStyle = config.inactiveButtonClass;
    formElement.addEventListener('input', function (evt) {
        hasValidForm(config, formElement, evt.target, popupSubmitButtonToggleStyle)
    });
}//при вводе в инпут проверям каждый символ на валидность


function checkValidation(formElement) {
    return formElement.checkValidity()
}//false если форма не валидна

function hasValidForm(config, formElement, currentInput, popupSubmitButtonToggleStyle) {
    const currentErrorMessage = findErrorMessage(currentInput, formElement)
    const submitButton = formElement.querySelector(config.submitButtonSelector)
    if (checkValidation(formElement)) {
        activeSubmitButton(submitButton, popupSubmitButtonToggleStyle)//если валидна разблокировать кнопку субмита
    } else {
        disableSubmitButton(submitButton, popupSubmitButtonToggleStyle)//если не валидно. заблокировать
    }
    hasValidInput(currentInput, currentErrorMessage, config)//смотрим валидность инпута
}

function hasValidInput(currentInput, currentErrorMessage, config) {
    if (checkValidation(currentInput)) {
        hideErrorMessage(currentErrorMessage, currentInput, config)//если инпут валиден. прячем ошибку
    }
    else {
        numberInputAutoReplacer(currentInput) //это нужно дописать. автозамена на вилдную маску в импуте с номером!!!!!!!
        showErrorMessage(currentErrorMessage, currentInput, config)//если нет показываем ошибку
    }
}


function findErrorMessage(currentInput, formElement) {
    return formElement.querySelector(`.${currentInput.id}-error`)//ищем ошибку в текущей форме
}

function showErrorMessage(currentErrorMessage, currentInput, config) {
    currentInput.classList.add(config.inputErrorClass)
    currentErrorMessage.textContent = currentInput.validationMessage

}

function hideErrorMessage(currentErrorMessage, currentInput, config) {
    currentInput.classList.remove(config.inputErrorClass)
    currentErrorMessage.textContent = '';
}


function disableSubmitButton(submitButton, popupSubmitButtonToggleStyle) {
    submitButton.classList.add(popupSubmitButtonToggleStyle)
    submitButton.disabled = true;
}

function activeSubmitButton(submitButton, popupSubmitButtonToggleStyle) {
    submitButton.classList.remove(popupSubmitButtonToggleStyle)
    submitButton.disabled = false;
}


function resetError(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(inputElement => hideErrorMessage(findErrorMessage(inputElement, formElement), inputElement, config));
}

enableValidation(validatorConfig)



function numberInputAutoReplacer(input) {//не нравится. переделать!!!!!!!
    input.id === 'phone' ?
        input.value.match(/[1-9]/) && input.value.length === 1 ?
            input.value = '+7' : '' : ''
}








const popupConfig = {
    openPopupButtonSelector: '.section__button',
    closePopupButtonSelector: '.popup__close-button',
    popupSelector: '.popup',
    popupSubmitButtonSelector: 'popup__submit-button'
}//конфиг настроек для модульного окна


enablePopup(popupConfig)


function enablePopup({ ...popupConfig }) { //передаем конфиг
    const { openPopupButtonSelector, closePopupButtonSelector, popupSelector, popupSubmitButtonSelector } = popupConfig//деструктуризируем
    const openPopupButton = document.querySelector(openPopupButtonSelector)
    const popup = document.querySelector(popupSelector)
    const popupSubmitButton = popup.querySelector(popupSubmitButtonSelector);
    const closePopupButton = popup.querySelector(closePopupButtonSelector)//находим все елементы
    openPopupButton.addEventListener('click', () => openPopup(popup))//вешаем слушатели
    closePopupButton.addEventListener('click', () => closePopup(popup))//и этот тоже
}





function openPopup(popupElement) {//Функция открытия попапа
    popupElement.classList.add('popup_opened')
    document.addEventListener("keydown", closePopupEsc)//'добавлять обработчик события в функции открытия попапов'
    document.addEventListener('mousedown', closePopupOverlay)//'добавлять обработчик события в функции открытия попапов'
    popupElement.addEventListener('submit', (event) => {
        event.preventDefault();
        submitForm(popupElement);
    }, true)
}


function submitForm(popupElement) {
    closePopup(popupElement)
}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
    document.removeEventListener("keydown", closePopupEsc)// 'удалять его при закрытии попапов.'
    document.removeEventListener('mousedown', closePopupOverlay)//'удалять его при закрытии попапов. иначе будет вешаться бесконечно'
}



function closePopupEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup)
    }
}

function closePopupOverlay(evt) {
    if (evt.target.classList.contains('popup'))
        closePopup(evt.target)
}








const inputLogo = document.getElementById('logo')
const clearInputLogoButton = document.querySelector('.popup__input-logo_clear-button')


clearInputLogoButton.addEventListener('click', () => {
    inputLogo.value = ''
})

