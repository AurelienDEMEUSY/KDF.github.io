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
 * ajoute l'item au panier avec un valeur de 1 si il n'existe pas sinon l'incremente
 * et sauvegarde le panier dans localstorage
 * @param {*} id 
 */
const addToCart = (id) => {
    const existingItem = cart.find(cartItem => cartItem.id === id);

    if (existingItem) {
        existingItem.amount += 1;
    } else {
        cart.push({ id: id, amount: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}

/**
 * crée un élément HTML pour afficher un produit
 * sur la page creer aussi un lien vers les infos du produit
 * @param {*} item 
 * @param {*} item_container 
 */
const addItemToContainer = (item, item_container) => {
    const itemDiv = document.createElement('div',);
    itemDiv.classList.add('item');

    itemDiv.innerHTML = `
        <h4>${item.name}</h4>
        <img src="${apiUrl}picture/${item._id}" alt="${item.name}" />
        <p>${item.price}€</p>
        <div class="action-container">
            <a href="product.html?id=${item._id}">Voir produit</a>
            <button onclick="addToCart(${item._id})">Ajouter au panier</button>
        </div>
    `;
    item_container.appendChild(itemDiv);
}

/**
 * recupere les donnes de l'api puis utilise additemtocontainer pour afficher chaque produit
 */
const DisplayItems = async () => {
    const data = await fetchData();
    let item_container = document.querySelector('.item-container');
    data.forEach(item => {
        addItemToContainer(item, item_container);
    });
}

DisplayItems();
