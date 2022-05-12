const menuBtn = document.querySelector(".menu-btn");
const aside = document.querySelector(".aside");
const title = document.querySelector("aside .title");
const main = document.querySelector(".main");
const pageLink = document.querySelectorAll(".page-link");
const pageName = document.querySelectorAll(".page-name");
const hiddenInputs = document.querySelectorAll(".hiddenInput");
const copyBtns = document.querySelectorAll(".copy");
const alertCloseBtn = document.querySelector(".alert-close");
const alertBox = document.querySelector(".alert");

if (alertCloseBtn) {
    alertCloseBtn.addEventListener("click", () => {
        alertBox.classList.add("hidden");
    });
}

menuBtn.addEventListener("click", () => {
    if (title.textContent != "A") {
        aside.style.cssText = "width: auto !important; ease-in-out;";
        main.style.cssText = "width: 100% !important; ";
        title.textContent = "A";
        pageName.forEach((item) => {
            item.classList.add("hidden");
        });
        pageLink.forEach((item) => {
            item.style.cssText = "justify-content: center";
        });

        i = 1;
    } else {
        aside.style.cssText = "";
        main.style.cssText = "";
        title.textContent = "Admin panel";
        pageName.forEach((item) => {
            item.classList.remove("hidden");
        });
        pageLink.forEach((item) => {
            item.style.cssText = "";
        });
    }
});

copyBtns.forEach((btn, key) => {
    btn.addEventListener("click", () => {
        navigator.clipboard.writeText(hiddenInputs[key].value);
        alert("Copied URL: " + hiddenInputs[key].value);
    });
});

$("#summernote").summernote({
    tabsize: 2,
    height: 120,
    toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "underline", "clear"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["table", ["table"]],
        ["insert", ["link", "picture", "video"]],
        ["view", ["fullscreen", "codeview", "help"]]
    ]
});
