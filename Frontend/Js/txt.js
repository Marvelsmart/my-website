fetch("../txt/product1.txt")
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.text();
  })
  .then(text => {
    const container = document.getElementById("products");
    if (!container) {
      console.error("Missing #products container in HTML");
      return;
    }

    // Split file into blocks
    const blocks = text.split(/\n\s*\n/);

    blocks.forEach((block, i) => {
      if (!block.trim()) return;

      const product = {};
      block.split(/\n/).forEach(line => {
        const [key, ...rest] = line.split(":");
        if (!key || rest.length === 0) return;
        product[key.trim().toLowerCase()] = rest.join(":").trim();
      });

      if (!product.name) return;

      // Create card
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${product.image || '../Images/placeholder.png'}" alt="${product.name}">
        <p><strong>${product.name}</strong></p>
        <p>Price: ${product.price || 'N/A'}</p>
        <p class="H-Description">
          ${product.description || ''} <br>
          <button class="btn">Buy Now</button>
          <button class="btb"><a href="Cart.html">Add to Cart</a></button>
        </p>
      `;

      // Hook up Buy button → open focus view
      div.querySelector(".btn").addEventListener("click", () => {
        document.querySelector(".products").classList.add("hidden");
        const focus = document.querySelector(".focus-view");
        focus.classList.add("active");
        document.getElementById("focus-title").textContent = product.name;
        document.getElementById("focus-description").textContent = product.description || "";
        document.getElementById("focus-price").textContent = `Price: ${product.price || 'N/A'}`;
        document.getElementById("focus-img").src = product.image || "../Images/placeholder.png";
      });

      container.appendChild(div);
    });

    // Close focus view
    document.getElementById("close-view").addEventListener("click", () => {
      document.querySelector(".products").classList.remove("hidden");
      document.querySelector(".focus-view").classList.remove("active");
    });
  })
  .catch(err => console.error("Error loading products.txt:", err));
