document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");
    const products = await fetchProducts();

    if (products.length === 0) {
        productList.innerHTML = "<p>Aucun produit disponible.</p>";
        return;
    }

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="150">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p><strong>${product.price}€</strong></p>
            <button onclick="addToCart(${product._id})">Ajouter au panier</button>
        `;
        productList.appendChild(productDiv);
    });
});
