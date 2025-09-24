const buyButtons = document.querySelectorAll(".btn");
const productsContainer = document.querySelector(".products");
const focusView = document.querySelector(".focus-view");

const focusImg = document.getElementById("focus-img");
const focusTitle = document.getElementById("focus-title");
const focusDesc = document.getElementById("focus-description");
const focusPrice = document.getElementById("focus-price");
const closeBtn = document.getElementById("close-view");

buyButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product");
    const img = card.querySelector("img").src;
    const title = card.querySelector("p").innerText;
    const price = card.querySelectorAll("p")[1].innerText;
    const desc = card.querySelector(".H-Description").innerText;

    // Fill focus view
    focusImg.src = img;
    focusTitle.innerText = title;
    focusDesc.innerText = desc;
    focusPrice.innerText = price;

    // Show focus view
    productsContainer.classList.add("hidden");
    focusView.classList.add("active");
  });
});

// Close back
closeBtn.addEventListener("click", () => {
  focusView.classList.remove("active");
  productsContainer.classList.remove("hidden");
});
