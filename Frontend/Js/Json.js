fetch("../Json/Product.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load product.json");
    }
    return response.json();
  })
  .then(data => {
    const productsContainer = document.getElementById("product11");

    // Loop through products and create HTML
    data.products.forEach(productObj => {
      const key = Object.keys(productObj)[0]; // e.g., "Product 1"
      const product = productObj[key];

      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      productDiv.innerHTML = `
        <img src="${product.Image}" alt="${product.Name}">
        <p>${product.Name}</p>
        <p>Price: ${product.Price}</p>
        <p class="H-Description">
          ${product.Description}
          <button class="btn">Buy Now</button>
          <button class="btb"><a href="Cart.html">Add to Cart</a></button>
        </p>
      `;

      productsContainer.appendChild(productDiv);
    });
  })
  .catch(error => {
    console.error("Error loading products:", error);
  });