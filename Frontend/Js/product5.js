import PocketBase from '/Frontend/Js/pocketbase.js';

const pb = new PocketBase("http://127.0.0.1:8090");

async function loadProducts() {
  try {
    // Fetch all products
    const products = await pb.collection("products").getFullList({
      sort: "-created"
    });
    console.log(products);


    const container = document.getElementById("product11");
    container.innerHTML = "";

    products.forEach(item => {
      const imageUrl = item.image
        ? `${pb.baseUrl}/api/files/products/${item.id}/${item.image}`
        : "../Images/placeholder.png";

      const product = document.createElement("div");
      product.classList.add("product");

      product.innerHTML = `
        <img src="${imageUrl}" alt="${item.title}" style="height:200px" class="product-img">
        <p class="product-title">${item.name}</p>
        <p class="product-price">$${item.price}</p
        <pclass="H-Description">
        <p class="H-Description">${item.description}
        <button class="btn">Buy Now</button>
        <button class="btb"><a href="Cart.html">Add to Cart</a></button>
        </p>
      `;

      container.appendChild(product);
    });
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadProducts);
