// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOKKz6-4pdmqitxHpqWXkNssINovkyJmU",
    authDomain: "login-1733f.firebaseapp.com",
    projectId: "login-1733f",
    storageBucket: "login-1733f.firebasestorage.app",
    messagingSenderId: "296225886904",
    appId: "1:296225886904:web:939cc6b3fb304fc0921a4d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Submit button
const submit = document.getElementById("submit");

submit.addEventListener("click", function (event) {
    event.preventDefault();

    const First_name = document.getElementById("FirstName");
    const Last_name = document.getElementById("LastName");
    const Email = document.getElementById("Email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");


    // Get values at the moment of click
    const emailValue = Email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    // Simple password match check
    if (passwordValue !== confirmPasswordValue) {
        alert("Passwords do not match!");
        return;
    }

    createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(" User registered:", user);
            alert("Registered Successfully!");
            window.location.href = "../../index.html"; // redirect to login page
        })
        .catch((error) => {
            console.error(" Error:", error.code, error.message);
            alert("Error: " + error.message);
        });
});
