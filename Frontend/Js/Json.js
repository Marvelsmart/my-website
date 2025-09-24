document.addEventListener("DOMContentLoaded", () => {
  // Load products from JSON
  fetch("../Json/Product.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load Product.json");
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById("product11");
      if (!container) {
        console.error("Missing #product11 container in HTML");
        return;
      }

      data.products.forEach(productObj => {
        const key = Object.keys(productObj)[0]; // e.g., "Product 1"
        const product = productObj[key];

        // Create product card
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
          <img src="${product.Image}" alt="${product.Name}">
          <p><strong>${product.Name}</strong></p>
          <p>Price: ${product.Price}</p>
          <p class="H-Description">
            ${product.Description}
            <button class="btn">Buy Now</button>
            <button class="btb"><a href="Cart.html">Add to Cart</a></button>
          </p>
        `;

        // Add product card to container
        container.appendChild(div);

        // --- Focus view logic ---
        const buyBtn = div.querySelector(".btn");
        buyBtn.addEventListener("click", () => {
          // Fill in focus view
          document.getElementById("focus-title").textContent = product.Name;
          document.getElementById("focus-description").textContent = product.Description;
          document.getElementById("focus-price").textContent = `Price: ${product.Price}`;
          document.getElementById("focus-img").src = product.Image;

          // Show focus view & hide products
          document.querySelector(".focus-view").classList.add("active");
          container.classList.add("hidden");
        });
      });

      // Handle back button
      const closeViewBtn = document.getElementById("close-view");
      if (closeViewBtn) {
        closeViewBtn.addEventListener("click", () => {
          document.querySelector(".focus-view").classList.remove("active");
          container.classList.remove("hidden");
        });
      }
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
});
