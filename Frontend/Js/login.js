// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

// Your Firebase config
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

    const emailValue = document.getElementById("Email").value;
    const passwordValue = document.getElementById("password").value;

    // Simple validation
    if (!emailValue || !passwordValue) {
        alert("Please enter email and password!");
        return;
    }

    signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User logged in:", user);
            alert("Login Successful!");
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            console.error("Error:", error.code, error.message);
            alert("Error: " + error.message);
        });
});
