const buyButtons = document.querySelectorAll(".btn");

const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

buyButtons.forEach(button => {
    button.addEventListener("click", () => {
        payment.style.display = "flex";
    });
});

close.addEventListener("click", () => {
    payment.style.display = "none";
});

const AddToCart = document.querySelectorAll(".btb");
