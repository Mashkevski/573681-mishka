'use strict';

var ESC_KEYCODE = 27;

var popup = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');
var modalFormSubmit = popup.querySelector('.modal__form-submit');
var openModalButtons = document.querySelectorAll('.catalog-item__open-modal');

var openPopup = function () {
  popup.classList.add('modal--show');
  modalOverlay.classList.add('modal-overlay--show');

  document.addEventListener('keydown', onPopupEscPress);
  modalOverlay.addEventListener('click', onOverlayPress);
  modalFormSubmit.addEventListener('click', onSubmitButtonPress);
};

var closePopup = function () {
  popup.classList.remove('modal--show');
  modalOverlay.classList.remove('modal-overlay--show');

  document.removeEventListener('keydown', onPopupEscPress);
};

var onOverlayPress = function () {
  closePopup();
};

var onPopupEscPress = function (evt) {
  evt.preventDefault();

  if(evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onSubmitButtonPress = function () {
  closePopup();
};

for (var i = 0; i < openModalButtons.length; i++) {
  openModalButtons[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup();
  })
}
