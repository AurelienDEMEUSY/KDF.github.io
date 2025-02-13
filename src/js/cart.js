function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId) {
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.amount += 1;
    } else {
        cart.push({ id: productId, amount: 1 });
    }

    saveCart(cart);
    alert("Produit ajouté au panier !");
}

function displayCart() {
    const cartList = document.getElementById("cart-items");
    const cart = getCart();
    
    if (cart.length === 0) {
        cartList.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }

    cartList.innerHTML = cart.map(item => `
        <p>Produit ${item.id} x ${item.amount}</p>
    `).join("");
}
