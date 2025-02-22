const apiUrl = 'https://api.kedufront.juniortaker.com/item/';

/**
 * Récupère les données des produits depuis l'API.
 * Cette fonction utilise Axios pour effectuer une requête GET à l'API.
 *
 * @async
 * @returns {Promise<Array>} La liste des produits récupérés depuis l'API.
 * @throws {Error} Si la requête échoue, une erreur sera loggée dans la console.
 */
const fetchData = async () => {
    try {
        const response = await axios.get(apiUrl);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error.response);
    }
}

/**
 * Panier de l'utilisateur, récupéré depuis le localStorage ou initialisé comme un tableau vide.
 * @constant {Array} cart - Le panier de l'utilisateur, contenant des objets avec des `id` et des `amount`.
 */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Augmente la quantité d'un produit dans le panier de 1.
 * Cette fonction cherche le produit dans le panier par son `id` et incrémente sa quantité.
 * Après modification, le panier est sauvegardé dans le `localStorage` et la page est rechargée.
 *
 * @param {number} id - L'ID du produit dont la quantité doit être augmentée.
 */
const incrementAmount = (id) => {
    const item = cart.find(cartItem => cartItem.id === id);
    item.amount++;
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

/**
 * Diminue la quantité d'un produit dans le panier de 1.
 * Si la quantité est supérieure à 1, elle est réduite de 1. Sinon, la quantité reste inchangée.
 * Après modification, le panier est sauvegardé dans le `localStorage` et la page est rechargée.
 *
 * @param {number} id - L'ID du produit dont la quantité doit être diminuée.
 */
const decrementAmount = (id) => {
    const item = cart.find(cartItem => cartItem.id === id);
    if (item.amount > 1) {
        item.amount--;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

/**
 * Supprime un produit du panier.
 * Cette fonction filtre le panier pour supprimer l'élément ayant l'ID donné,
 * puis retire son élément HTML du DOM. Le panier est sauvegardé dans le `localStorage`.
 *
 * @param {number} id - L'ID du produit à supprimer du panier.
 */
const removeItem = (id) => {
    const itemDiv = document.getElementById(id);

    cart = cart.filter(cartItem => cartItem.id !== id);
    itemDiv.remove();
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

/**
 * Ajoute un produit au conteneur du panier dans le HTML.
 * Cette fonction crée un élément HTML pour chaque produit dans le panier,
 * affiche les informations du produit, ainsi que des boutons pour ajuster la quantité
 * ou supprimer le produit du panier.
 *
 * @param {Object} item - L'objet produit récupéré depuis l'API.
 * @param {Object} cartItem - L'élément du panier contenant l'ID du produit et sa quantité.
 * @param {HTMLElement} cart_container - L'élément DOM où les produits du panier doivent être ajoutés.
 */
const addCartItemToContainer = (item, cartItem, cart_container) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.setAttribute('id', item._id);
    let price = item.price * cartItem.amount;
    price = price.toFixed(2);

    itemDiv.innerHTML = `
        <img src="${apiUrl}picture/${item._id}" alt="${item.name}"/>
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${price}€</p>
            <div class="amount-container">
                <button onclick="decrementAmount(${item._id})">-</button>
                <p>nombre: ${cartItem.amount}</p>
                <button onclick="incrementAmount(${item._id})">+</button>
            </div>
            <div class="action-container">
                <a href="product.html?id=${item._id}">Voir produit</a>
                <button onclick="removeItem(${item._id})">Enlever du panier</button>
            </div>
        </div>
    `;
    cart_container.appendChild(itemDiv);
}

/**
 * Affiche le panier dans le HTML.
 * Cette fonction parcourt tous les articles du panier, récupère leurs informations depuis l'API,
 * puis les ajoute au DOM. Elle calcule également le total du panier et l'affiche.
 *
 * @async
 */
const DisplayCart = async () => {
    const data = await fetchData();
    const cart_container = document.querySelector('.cart-items');
    cart_container.innerHTML = ''; // Nettoie le conteneur avant d'ajouter les articles

    let total = 0;

    if (cart.length === 0) {
        cart_container.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
        cart.forEach(cartItem => {
            const item = data.find(item => item._id.toString() === cartItem.id.toString());
            if (item) {
                addCartItemToContainer(item, cartItem, cart_container);
                total += item.price * cartItem.amount;
            }
        });
    }

    document.getElementById('total').innerText = `Total: ${total.toFixed(2)}€`;
};


/**
 * Appel de la fonction `DisplayCart` pour afficher le contenu du panier lors du chargement de la page.
 */
DisplayCart();
