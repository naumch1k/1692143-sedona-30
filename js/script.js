const interestedButton = document.querySelector('.interested__button');
const modal = document.querySelector('.modal');
const searchForm = modal.querySelector('.search-form');
const moveIn = modal.querySelector('[name=move-in]');
const moveOut = modal.querySelector('[name=move-out]');
const adults = modal.querySelector('[name=adults]');
const children = modal.querySelector('[name=children]');
const adultsStorage = localStorage.getItem("adults");
const childrenStorage = localStorage.getItem("children");
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
    moveIn.focus({preventScroll:true});
    if (adultsStorage) {
      adults.value = adultsStorage;
    }
    if (childrenStorage) {
      children.value = childrenStorage;
    }
  } else {
    modal.classList.add('modal_hidden');
    localStorage.setItem("modal-hidden", "true")
  }
});

searchForm.addEventListener("submit", function (evt) {
  if (!moveIn.value || !moveOut.value || !adults.value || !children.value) {
    evt.preventDefault();
    modal.classList.remove("modal_error");
    modal.offsetWidth = modal.offsetWidth;
    modal.classList.add("modal_error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("adults", adults.value);
      localStorage.setItem("children", children.value);
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