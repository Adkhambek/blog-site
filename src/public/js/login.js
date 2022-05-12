const alertCloseBtn = document.querySelector(".alert-close");
const alertBox = document.querySelector(".alert");

if (alertCloseBtn) {
    alertCloseBtn.addEventListener("click", () => {
        alertBox.classList.add("hidden");
    });
}
