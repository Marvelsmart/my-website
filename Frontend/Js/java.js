document.addEventListener("DOMContentLoaded", () => {
    fetch("../HTML/Menu.html")
    .then(response => response.text())
    .then(data => {

document.getElementById("menu-placeholder").innerHTML = data;

    })
    .catch(error => console.error("Error loading menu:", error)); 
});

const backToTop = document.getElementById("backToTop");
window.onscroll = function () {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



//fetching product from .txt
fetch("../txt/product.txt")
  .then(response => response.text())
  .then(data => {
    let lines = data.trim().split("\n");
    let table = document.getElementById("productTable");

    for (let i = 1; i < lines.length; i++) {
      let row = document.createElement("tr");
      let cols = lines[i].split("|");
  
      
      let imgCell = document.createElement("td");
      let img = document.createElement("img");
      img.src = cols[0].trim();
      img.alt = "Product";
      img.style.width = "100px";
      imgCell.appendChild(img);
      row.appendChild(imgCell);

      // product name, price, description
      for (let j = 1; j < cols.length; j++) {
        let cell = document.createElement("td");
        cell.innerText = cols[j].trim();
        row.appendChild(cell);
      }

      table.appendChild(row);
    }
  })
  .catch(err => console.error("Error loading products.txt:", err));


document.addEventListener("DOMContentLoaded", () => {
  fetch("../txt/product2.txt")
    .then(response => response.text())
    .then(text => {
      let data = JSON.parse(text);
      let table = document.getElementById("productTable4");

      data.products.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${item["product-picture"]}" alt="${item["product-name"]}" width="80"></td>
          <td>${item["product-name"]}</td>
          <td>${item["product-price"]}</td>
          <td>${item["description"]}</td>
        `;
        table.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading products:", error));
});



