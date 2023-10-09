const socket = io(); 

const productsContainer = document.getElementById('product-container');
const productForm = document.getElementById('product-form');
const productTitleInput = document.getElementById('product-title');
const productDescriptionInput = document.getElementById('product-description');
const productPriceInput = document.getElementById('product-price');
const productCodeInput = document.getElementById('product-code');
const productStockInput = document.getElementById('product-stock');
const productCategoryInput = document.getElementById('product-category');

const clearProductForm = () => {
    productTitleInput.value = '';
    productDescriptionInput.value = '';
    productPriceInput.value = '';
    productCodeInput.value = '';
    productStockInput.value = '';
    productCategoryInput.value = '';
};

const renderProducts = (products) => {
    productsContainer.innerHTML = ''; 

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = document.createElement('img');
        productImage.src = 'product-image.jpg';
        productImage.alt = 'Product Image';
        productImage.classList.add('product-image');
        productCard.appendChild(productImage);

        const productDetails = document.createElement('div');
        productDetails.classList.add('product-details');

        const productTitle = document.createElement('h5');
        productTitle.classList.add('product-title');
        productTitle.textContent = product.title;
        productDetails.appendChild(productTitle);


        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.id = product._id;
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            const productId = product._id;
            socket.emit('deleteProduct', productId);
        });
        productDetails.appendChild(deleteButton);

        productCard.appendChild(productDetails);
        productsContainer.appendChild(productCard);
    });
};

socket.on('productList', (products) => {
    renderProducts(products);
});

socket.on('productDeleted', () => {

});


productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        title: productTitleInput.value,
        description: productDescriptionInput.value,
        price: parseFloat(productPriceInput.value),
        code: productCodeInput.value,
        stock: parseInt(productStockInput.value),
        category: productCategoryInput.value,
    };

    socket.emit('addProduct', newProduct);
    clearProductForm();
});