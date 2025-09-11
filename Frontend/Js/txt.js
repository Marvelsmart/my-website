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

    // Split file into blocks by empty lines
    const blocks = text.split(/\n\s*\n/);

    blocks.forEach((block, i) => {
      if (!block.trim()) return; // skip empty

      // Parse key: value pairs
      const product = {};
      block.split(/\n/).forEach(line => {
        const [key, ...rest] = line.split(":");
        if (!key || rest.length === 0) return;
        product[key.trim().toLowerCase()] = rest.join(":").trim();
      });

      if (!product.name) {
        console.warn(`Skipping block ${i+1}, no name found`, block);
        return;
      }

      // Create product card
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
      container.appendChild(div);
    });
  })
  .catch(err => console.error("Error loading products.txt:", err));