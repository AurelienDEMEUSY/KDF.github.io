document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");
            addProductToCart(productId);
        });
    });

    function addProductToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        fetch(`https://api.kedufront.juniortaker.com/item/${productId}`)
            .then(response => response.json())
            .then(product => {
                const productIndex = cart.findIndex(item => item.id === productId);
                if (productIndex === -1) {
                    cart.push({
                        id: productId,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image 
                    });
                } else {
                    cart[productIndex].quantity += 1;
                }

                localStorage.setItem("cart", JSON.stringify(cart));
            })
            .catch(error => console.error("Erreur lors de l'ajout au panier:", error));
    }
});
