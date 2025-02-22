const apiUrl = 'https://api.kedufront.juniortaker.com/item/';

/**
 * Panier de l'utilisateur, récupéré depuis le localStorage ou initialisé comme un tableau vide.
 * @constant {Array} cart - Le panier de l'utilisateur, contenant des objets avec des `id` et des `amount`.
 */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

/**
 * Ajoute un produit au panier ou augmente la quantité d'un produit déjà présent dans le panier.
 * Si le produit est déjà dans le panier, la quantité est augmentée de 1.
 * Sinon, le produit est ajouté au panier avec une quantité initiale de 1.
 * Le panier est ensuite sauvegardé dans le localStorage.
 *
 * @param {number} id - L'ID du produit à ajouter au panier.
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
 * Récupère l'ID du produit à partir des paramètres d'URL.
 * Utilise l'API `URLSearchParams` pour extraire le paramètre `id` de l'URL de la page.
 *
 * @returns {number} L'ID du produit extrait de l'URL.
 */
function getProductID() {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    id = parseInt(id);
    return id;
}

/**
 * Récupère un produit spécifique de l'API à partir de son ID.
 * Appelle la fonction `fetchData()` pour obtenir la liste complète des produits,
 * puis recherche et retourne le produit correspondant à l'ID.
 *
 * @async
 * @param {number} id - L'ID du produit à récupérer.
 * @returns {Object|null} Le produit correspondant à l'ID, ou `null` si aucun produit n'est trouvé.
 */
async function getProduct(id) {
    const data = await fetchData();
    let product;
    data.forEach(item => {
        if (item._id === id) {
            console.log('');
            product = item;
        }
    });
    return product;
}

/**
 * Affiche un produit dans le HTML.
 * Utilise l'ID du produit pour récupérer les informations du produit,
 * puis insère ces informations dans le DOM dans un conteneur de description.
 *
 * @async
 * @param {number} id - L'ID du produit à afficher.
 */
async function displayProduct(id) {
    const product = await getProduct(id);
    const productDiv = document.querySelector('.product-description');
    productDiv.classList.add('product-container');
    productDiv.innerHTML = `
        <h4>${product.name}</h4>
        <img src="${apiUrl}picture/${product._id}" alt="${product.name}" />
        <p>${product.price}€</p>
        <p>${product.description}</p>
        <button onclick="addToCart('${product._id}')">Ajouter au panier</button>
    `;
}

displayProduct(getProductID());
