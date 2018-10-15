var popup = document.querySelector(".modal");
var link = document.querySelector(".link");
var linkPopup = document.querySelector(".link-2");
var overLay = document.querySelector(".overlay");
var close = popup.querySelector(".modal-close");

var form = popup.querySelector("form");
var phone = popup.querySelector(".phone");

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-visible");
  overLay.classList.add("modal-visible");

});

linkPopup.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-visible");
  overLay.classList.add("modal-visible");

});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-visible");
  overLay.classList.remove("modal-visible");
  popup.classList.remove("modal-error");
  phone.classList.remove('empty-value-error')
});


form.addEventListener("submit", function (evt) {
  if (!phone.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
    phone.classList.add('empty-value-error')
  }
});

$(".phone").mask("+7(999)999-9999");
