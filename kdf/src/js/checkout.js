document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.getElementById("checkout-form");

    checkoutForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (cart.length === 0) {
            alert("Votre panier est vide !");
            return;
        }

        const orderData = {
            contact: {
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                email: document.getElementById("email").value,
                address: document.getElementById("address").value,
                city: document.getElementById("city").value
            },
            products: cart.map(item => item.id)
        };

        try {
            const response = await fetch("https://api.kedufront.juniortaker.com/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error("Erreur lors de la commande");

            const result = await response.json();
            localStorage.setItem("orderConfirmation", JSON.stringify(result));
            localStorage.removeItem("cart");

            window.location.href = "confirmation.html";
        } catch (error) {
            console.error("Erreur :", error);
            alert("Une erreur est survenue lors de la commande.");
        }
    });
});
