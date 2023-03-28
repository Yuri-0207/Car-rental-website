//        Responsive header
// change the menu icon when clicking on it
let changeIcon = function (icon) {
  icon.classList.toggle("bx-x");
};
let navBar = document.querySelector(".nav");
//checking if the width is bigger than 750px
function removeActive() {
  if (window.innerWidth > 750) {
    navBar.classList.remove("active");
  }
}
let menu = document.querySelector(".bx");
menu.onclick = function () {
  navBar.classList.toggle("active");
  changeIcon(menu);
  window.addEventListener("resize", function () {
    removeActive();
  });
};
//        dark mode switching
const rootElement = document.querySelector(":root");
const darkModeToggle = document.querySelector("#dark-mode-toggle");
const preferredMode = localStorage.getItem("mode");

if (preferredMode) {
  rootElement.classList.add(preferredMode);
}
darkModeToggle.addEventListener("click", function () {
  rootElement.classList.toggle("dark-mode");
  localStorage.setItem(
    "mode",
    rootElement.classList.contains("dark-mode") ? "dark-mode" : ""
  );
});

//        changing header style when scroll beyond landing page
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 550) {
    header.style.backgroundColor = "#1c575f3f";
  } else {
    header.style.backgroundColor = "";
  }
});
//        scroll reveal function for every tag with sReveal class
function reveal() {
  var reveals = document.querySelectorAll(".sReveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("activ");
    } else {
      reveals[i].classList.remove("activ");
    }
  }
}
window.addEventListener("scroll", reveal);

//          making categories filter
const cardSliderContainer = document.querySelector(".gallery");
const categoryButtons = document.querySelectorAll(".items .item");
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // get the category from the button's data attribute
    const category = button.dataset.category;
    // hide all card sliders except for the one corresponding to the selected category
    const sliders = cardSliderContainer.querySelectorAll(".card-slider");
    sliders.forEach((slider) => {
      if (slider.dataset.category === category) {
        slider.style.display = "inline-block";
      } else {
        slider.style.display = "none";
      }
    });
  });
});
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".image");
window.onload = () => {
  let lastFilter = localStorage.getItem("lastFilter"); // get the last selected filter from localStorage
  if (lastFilter) {
    filterImg.forEach((image) => {
      let filterImages = image.getAttribute("data-name");
      if (filterImages == lastFilter) {
        image.classList.add("show");
        image.classList.remove("hide");
      } else {
        image.classList.add("hide");
        image.classList.remove("show");
      }
    });
    filterItem.querySelector(".actif").classList.remove("actif");
    filterItem
      .querySelector(`[data-name="${lastFilter}"]`)
      .classList.add("actif"); // mark the last selected filter as active
  }

  filterItem.onclick = (selectedItem) => {
    if (selectedItem.target.classList.contains("item")) {
      filterItem.querySelector(".actif").classList.remove("actif");
      selectedItem.target.classList.add("actif");
      let filterName = selectedItem.target.getAttribute("data-name");
      localStorage.setItem("lastFilter", filterName); // store the selected filter in localStorage
      filterImg.forEach((image) => {
        let filterImages = image.getAttribute("data-name");
        if (filterImages == filterName) {
          image.classList.add("show");
          image.classList.remove("hide");
        } else {
          image.classList.add("hide");
          image.classList.remove("show");
        }
      });
    }
  };
  for (let index = 0; index < filterImg.length; index++) {
    filterImg[index].setAttribute("onclick", "preview(this)");
  }
};
//          making the card preview box interactive
const previewBox = document.querySelector(".preview-box"),
  previewImg = previewBox.querySelector("img"),
  categoryName = previewBox.querySelector(".title p"),
  closeIcon = previewBox.querySelector(".icon"),
  shadow = document.querySelector(".shadow");
function preview(element) {
  document.querySelector("body").style.overflow = "hidden";
  let selectedPrevImg = element.querySelector("img").src;
  let selectedImgCategory = element.querySelector(".image .name").textContent;
  categoryName.textContent = selectedImgCategory;
  previewImg.src = selectedPrevImg;
  previewBox.classList.add("show");
  shadow.classList.add("show");
  closeIcon.onclick = () => {
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
    document.querySelector("body").style.overflow = "scroll";
  };
}

//                testimonial cards slider
const productContainers = [...document.querySelectorAll(".container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];
productContainers.forEach((item, i) => {
  let cardDimensions = item.querySelector(".card").getBoundingClientRect();
  let cardWidth = cardDimensions.width * 2 + 30;
  let containerWidth = item.offsetWidth;
  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += cardWidth;
  });
  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= cardWidth;
  });
});
