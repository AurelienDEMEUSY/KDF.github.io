const API_BASE_URL = "https://api.kedufront.juniortaker.com/item/";

async function fetchItems() {
    const response = await fetch(API_BASE_URL);
    return response.json();
}

async function fetchItemById(id) {
    const response = await fetch(`${API_BASE_URL}${id}`);
    return response.json();
}
