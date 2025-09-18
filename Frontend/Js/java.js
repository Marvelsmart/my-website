document.addEventListener("DOMContentLoaded", () => {
    fetch("../HTML/Menu.html")
    .then(response => response.text())
    .then(data => {

document.getElementById("menu-placeholder").innerHTML = data;

    })
    .catch(error => console.error("Error loading menu:", error)); 
});

const backToTop = document.getElementById("backToTop");
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
