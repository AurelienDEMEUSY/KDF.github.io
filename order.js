const apiUrl = 'https://api.kedufront.juniortaker.com/order/';

/**
 * Envoie une commande à l'API.
 * Cette fonction utilise Axios pour envoyer une requête POST à l'API afin de soumettre la commande.
 * Si la requête est réussie, elle vide le panier dans le `localStorage` et redirige l'utilisateur vers une page de confirmation.
 *
 * @async
 * @param {Object} order - L'objet de la commande contenant les informations de l'utilisateur et les articles du panier.
 * @throws {Error} Si l'envoi de la commande échoue, une erreur est loggée dans la console.
 */
async function postOrder(order) {
    axios.post(apiUrl, order)
        .then(function(response) {
            if (response.status !== 201) {
                console.error('Order failed:', response);
            } else {
                console.log('Order successful:', response);
                localStorage.removeItem('cart');
                window.location.href = 'comfirmation.html';
            }
        })
        .catch(function(error) {
            console.error('Order failed:', error);
        });
}

/**
 * Gestionnaire d'événement pour le formulaire de validation de commande.
 * Cette fonction est déclenchée lors de la soumission du formulaire de commande.
 * Elle empêche le comportement par défaut du formulaire, récupère les informations de l'utilisateur et du panier,
 * puis crée un objet de commande à envoyer à l'API.
 *
 * @param {Event} event - L'événement de soumission du formulaire.
 */
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const order = {
        email: email,
        name: name,
        address: address,
        cart: cart.map(item => ({
            id: item.id,
            amount: item.amount
        }))
    };
    const data = JSON.stringify(order);
    console.log('Order:', data);
    postOrder(order);
});
