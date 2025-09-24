import PocketBase from '/Frontend/Js/pocketbase.js';

// ----------------- Card Transition -----------------
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("addBtn");
  const backBtn = document.getElementById("backBtn");
  const manageCard = document.getElementById("manageCard");
  const addCard = document.getElementById("addCard");
  const addProductForm = document.getElementById("addCard");
  const statusP = document.getElementById("status");

  // Show Add Product card
  addBtn.addEventListener("click", () => {
    manageCard.classList.add("shift-left");
    addCard.classList.add("show");
  });

  // Back to Manage Products card
  backBtn.addEventListener("click", () => {
    manageCard.classList.remove("shift-left");
    addCard.classList.remove("show");
  });

  // ----------------- PocketBase Setup -----------------
  //connection to localhost product5
  //const pb = new PocketBase("http://127.0.0.1:8090");

  //connection to live render url product6
  const pb = new PocketBase("https://pocketbase-3-ty01.onrender.com");
  // ----------------- Add Product Form Submission -----------------
  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const price = parseFloat(document.getElementById("productPrice").value);
    const description = document.getElementById("productDescription").value.trim();
    const fileInput = document.getElementById("productImage");
    const file = fileInput.files[0];

    if (!file) {
      statusP.textContent = " Please upload an image.";
      statusP.style.color = "red";
      return;
    }

    try {
      statusP.textContent = "Uploading product...";
      statusP.style.color = "black";

      // Prepare form data for PocketBase
      const formData = new FormData();
      formData.append("name", name);    
      formData.append("price", price);
      formData.append("description", description);
      formData.append("image", file);
console.log(formData);
      // Create record in PocketBase
      const record = await pb.collection("products").create(formData);

      statusP.textContent = " Product added successfully!";
      statusP.style.color = "green";
      console.log("Inserted record:", record);

      addProductForm.reset();
      backBtn.click();
    } catch (err) {
      console.error("Error adding product:", err);
      statusP.textContent = " Failed to add product. Check console.";
      statusP.style.color = "red";
    }
  });
});
