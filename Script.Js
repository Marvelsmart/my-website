//==Login form==//
const Loginform = document.querySelector(".main-form");
  const errorMsg = document.getElementById("error-msg");

  Loginform.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = Loginform.querySelector("input[name='User']").value.trim();
    const password = Loginform.querySelector("input[name='Password']").value.trim();

    const correctEmail = "shopify@gmail.com";
    const correctPassword = "12345";

    if (email === correctEmail && password === correctPassword) {
      window.location.href = "index.html";
    } else {
      errorMsg.textContent = "Password is wrong. Try again!";
    }
//==signup form==//
    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value.trim();
        });

        if (!data.FirstName || !data.LastName || !data.Email || !data.password || !data.confirmPassword) {
            alert("Please fill in all required fields!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(data.Email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        if (data.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        delete data.confirmPassword;
            });
    });
