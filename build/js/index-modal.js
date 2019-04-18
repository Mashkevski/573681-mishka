'use strict';

var ESC_KEYCODE = 27;

var popup = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');
var modalFormSubmit = popup.querySelector('.modal__form-submit');
var featuredProductOrder = document.querySelector('.featured-product__order');

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

featuredProductOrder.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup();
});
