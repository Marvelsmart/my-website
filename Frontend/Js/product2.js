
// Online endpoint

async function loadProducts() {
  const productsContainer = document.getElementById("product121");

  try {
    const response = await fetch("https://fakestoreapiserver.reactbd.org/api/products?page=4&perPage=5");

    if (!response.ok) throw new Error("Network response was not ok");

    const products = await response.json(); // API returns { data: [...] }

    if (!products.data || products.data.length === 0) {
      productsContainer.innerHTML = "<p>No products found</p>";
      return;
    }

    // Clear existing content
    productsContainer.innerHTML = ""; // <-- just clear the container, don't set it to products.data

    products.data.forEach(item => {
      const product = document.createElement("div");
      product.classList.add("product");

      product.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="product-img">
        <h2 class="product-title">${item.title}</h2>
        <p class="product-price">$${item.price}</p>
        <p class="H-Description">${item.description}</p>
        <p class="H-Description">
        <button class="btn">Buy Now</button>
        <button class="btb"><a href="Cart.html">Add to Cart</a></button>
        </p>
      `;

      productsContainer.appendChild(product);
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    productsContainer.innerHTML = "<p>Failed to load products.</p>";
  }
}

// Call the function
loadProducts();

