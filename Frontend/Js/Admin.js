// ----------------- Card Transition -----------------
const addBtn = document.getElementById("addBtn");
const backBtn = document.getElementById("backBtn");
const manageCard = document.getElementById("manageCard");
const addCard = document.getElementById("addCard");

addBtn.addEventListener("click", () => {
  manageCard.classList.add("shift-left");
  addCard.classList.add("show");
});

backBtn.addEventListener("click", () => {
  manageCard.classList.remove("shift-left");
  addCard.classList.remove("show");
});

// ----------------- Firebase Setup -----------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

//Your Firebase Config
 const firebaseConfig = {
    apiKey: "AIzaSyCOKKz6-4pdmqitxHpqWXkNssINovkyJmU",
    authDomain: "login-1733f.firebaseapp.com",
    projectId: "login-1733f",
    storageBucket: "login-1733f.appspot.com",
    messagingSenderId: "296225886904",
    appId: "1:296225886904:web:cf7b3dc9f096bed9921a4d"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

//Add Product Form 
const addProductForm = document.getElementById("addCard");

addProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = addProductForm.querySelector("input[type='text']").value;
  const price = addProductForm.querySelector("input[type='number']").value;
  const description = addProductForm.querySelector("textarea").value;
  const file = document.getElementById("productImage").files[0];

  if (!file) {
    alert("Please upload an image.");
    return;
  }

  try {
    // 1. Upload image to Firebase Storage
    const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    // 2. Save product info to Firestore
    await addDoc(collection(db, "products"), {
      name,
      price: parseFloat(price),
      description,
      image: imageUrl,
      createdAt: serverTimestamp()
    });

    alert(" Product added successfully!");
    addProductForm.reset();
    backBtn.click();
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  }
});
