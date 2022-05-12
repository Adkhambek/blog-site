const year = document.querySelector(".year");
const searchBtn = document.querySelector(".search-btn");
const searchForm = document.querySelector(".search-form");
const navList = document.querySelector(".nav-list");
const searchInput = document.querySelector(".search-input");
const closeBtn = document.querySelector(".close-btn");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
const menuCloseBtn = document.querySelector(".menu-close-btn");
year.textContent = new Date().getFullYear();
searchBtn.addEventListener("click", () => {
    searchForm.classList.remove("hidden");
    navList.classList.add("hidden");
    searchInput.focus();
});
closeBtn.addEventListener("click", () => {
    searchForm.classList.add("hidden");
    navList.classList.remove("hidden");
});
menuButton.addEventListener("click", () => {
    nav.classList.add("block");
    menuCloseBtn.classList.remove("hidden");
    menuButton.classList.add("hidden");
});
menuCloseBtn.addEventListener("click", () => {
    nav.classList.remove("block");
    menuCloseBtn.classList.add("hidden");
    menuButton.classList.remove("hidden");
});
