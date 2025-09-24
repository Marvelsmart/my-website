import PocketBase from '/Frontend/Js/pocketbase.js';

// Initialize PocketBase with your online endpoint
const pb = new PocketBase("https://pocketbase-3-ty01.onrender.com");

async function loadProducts() {
  const productsContainer = document.getElementById("product11");
  const focusView = document.querySelector(".focus-view");
  const closeViewBtn = document.getElementById("close-view");

  try {
    // Fetch all products, sorted by newest
    const products = await pb.collection("products").getFullList({ sort: "-created" });
    
    if (!products || products.length === 0) {
      productsContainer.innerHTML = "<p>No products found</p>";
      return;
    }

    // Clear existing content
    productsContainer.innerHTML = "";

    products.forEach(item => {
      const imageUrl = item.image
        ? `${pb.baseUrl}/api/files/products/${item.id}/${item.image}`
        : "../Images/placeholder.png";

      const product = document.createElement("div");
      product.classList.add("product");

      product.innerHTML = `
        <img src="${imageUrl}" alt="${item.name}" class="product-img" style="height:200px">
        <p class="product-title">${item.name}</p>
        <p class="product-price">$${item.price}</p>
        <p class="H-Description">
        ${item.description}
        <button class="btn">Buy Now</button>
        <button class="btb"><a href="Cart.html">Add to Cart</a></button>
        </p>
      `;

      // Attach event listener for Buy Now
      product.querySelector(".btn").addEventListener("click", () => {
        // Hide products container
        productsContainer.style.display = "none";

        // Fill focus view
        document.getElementById("focus-img").src = imageUrl;
        document.getElementById("focus-title").textContent = item.name;
        document.getElementById("focus-description").textContent = item.description;
        document.getElementById("focus-price").textContent = "$" + item.price;

        // Show focus view
        focusView.classList.add("active");
        document.body.style.overflow = "hidden"; // prevent scrolling
      });

      productsContainer.appendChild(product);
    });

    // Close button event
    closeViewBtn.addEventListener("click", () => {
      focusView.classList.remove("active");
      productsContainer.style.display = "flex";
      document.body.style.overflow = "auto";
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

// Call the function
document.addEventListener("DOMContentLoaded", loadProducts);
