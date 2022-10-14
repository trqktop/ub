
const validatorConfig = ({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: '.popup__input_error-style',
    errorClass: '.popup__input-error',
    openedPopup: 'popup_opened'
})


function enableValidation(config) {
    const formArr = Array.from(document.querySelectorAll(config.formSelector))
    formArr.forEach((formElement) => {
        setEventListeners(config, formElement)
    });
}




function setEventListeners(config, formElement) {
    const popupSubmitButtonToggleStyle = config.inactiveButtonClass;
    formElement.addEventListener('input', function (evt) {
        hasValidForm(config, formElement, evt.target, popupSubmitButtonToggleStyle)
    });
}


function checkValidation(formElement) {
    return formElement.checkValidity()
}

function hasValidForm(config, formElement, currentInput, popupSubmitButtonToggleStyle) {
    const currentErrorMessage = findErrorMessage(currentInput, formElement)
    const submitButton = formElement.querySelector(config.submitButtonSelector)

    if (checkValidation(formElement)) {
        activeSubmitButton(submitButton, popupSubmitButtonToggleStyle)
    } else {
        disableSubmitButton(submitButton, popupSubmitButtonToggleStyle)
    }
    hasValidInput(currentInput, currentErrorMessage, config)
}

function hasValidInput(currentInput, currentErrorMessage, config) {
    if (checkValidation(currentInput)) {
        hideErrorMessage(currentErrorMessage, currentInput, config)
    }
    else {
        numberInputAutoReplacer(currentInput)
        showErrorMessage(currentErrorMessage, currentInput, config)
    }
}


function findErrorMessage(currentInput, formElement) {
    return formElement.querySelector(`.${currentInput.id}-error`)
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



function numberInputAutoReplacer(input) {
    input.id === 'phone' ?
        input.value.match(/[1-9]/) && input.value.length === 1 ?
            input.value = '+7' : '' : ''
}
















const openPopupButton = document.querySelector('.section__button')
const popup = document.querySelector('.popup')
const closePopupButton = popup.querySelector('.popup__close-button')



openPopupButton.addEventListener('click', () => openPopup(popup))
closePopupButton.addEventListener('click', () => closePopup(popup))


function openPopup(popupElement) {//Функция открытия попапа
    popupElement.classList.add('popup_opened')
    document.addEventListener("keydown", closePopupEsc)//(c)'добавлять обработчик события в функции открытия попапов'
    document.addEventListener('mousedown', closePopupOverlay)//(c)'добавлять обработчик события в функции открытия попапов'
}


function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
    document.removeEventListener("keydown", closePopupEsc)// (c)'удалять его при закрытии попапов.'
    document.removeEventListener('mousedown', closePopupOverlay)// (c)'удалять его при закрытии попапов.'
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