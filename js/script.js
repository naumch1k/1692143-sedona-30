const interestedButton = document.querySelector('.interested__button');
const modal = document.querySelector('.modal');
const searchForm = modal.querySelector('.search-form');
const checkIn = modal.querySelector('[name=check-in]');
const checkOut = modal.querySelector('[name=check-out]');
const adults = modal.querySelector('[name=adults]');
const kids = modal.querySelector('[name=kids]');
const adultsStorage = localStorage.getItem("adults");
const kidsStorage = localStorage.getItem("kids");
const modalHidden = localStorage.getItem("modal-hidden");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("adults");
} catch (err) {
  isStorageSupport = false;
}

if (modalHidden == "true" && isStorageSupport) {
  modal.classList.add('modal_hidden');
} else {
  modal.classList.remove('modal_hidden');
}

interestedButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (modal.classList.contains("modal_hidden")) {
    modal.classList.remove('modal_hidden');
    modal.classList.remove('modal_error');
    localStorage.setItem("modal-hidden", "false")
    checkIn.focus({preventScroll:true});
    if (adultsStorage) {
      adults.value = adultsStorage;
    }
    if (kidsStorage) {
      kids.value = kidsStorage;
    }
  } else {
    modal.classList.add('modal_hidden');
    localStorage.setItem("modal-hidden", "true")
  }
});

searchForm.addEventListener("submit", function (evt) {
  if (!checkIn.value || !checkOut.value || !adults.value || !kids.value) {
    evt.preventDefault();
    modal.classList.remove("modal_error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal_error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("adults", adults.value);
      localStorage.setItem("kids", kids.value);
    } 
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (!modal.classList.contains("modal_hidden")) {
      evt.preventDefault();
      modal.classList.add("modal_hidden");
      modal.classList.remove("modal_error");
    }
  }
});