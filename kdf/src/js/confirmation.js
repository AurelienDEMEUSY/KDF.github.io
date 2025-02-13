document.addEventListener("DOMContentLoaded", () => {
    const confirmationMessage = document.getElementById("confirmation-message");
    const orderDetails = JSON.parse(localStorage.getItem("orderConfirmation"));

    if (!orderDetails) {
        confirmationMessage.innerHTML = "<p>Une erreur est survenue.</p>";
        return;
    }

    confirmationMessage.innerHTML = `
        <p>Votre commande a été confirmée avec succès ! 🎉</p>
        <p><strong>ID de commande :</strong> ${orderDetails.orderId}</p>
        <p><strong>Date estimée de livraison :</strong> ${orderDetails.deliveryDate}</p>
    `;

    localStorage.removeItem("orderConfirmation");
});
