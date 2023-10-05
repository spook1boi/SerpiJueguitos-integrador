const productSocket = io();
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
}

productSocket.on('productList', products => {
    console.log(products);
    const productList = products.map(product => {
        let thumbnailsList = "";

        if (product.thumbnails && Array.isArray(product.thumbnails)) {
            thumbnailsList = product.thumbnails.map(thumbnail => `<li>${thumbnail}</li>`).join('');
        }

        return `
            <div class="product-card">
                <img src="product-image.jpg" alt="Product Image" class="product-image">
                <div class="product-details">
                    <h5 class="product-title">${product.title}</h5>
                    <p>Product ID: ${product._id}</p>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Image URLs:</p>
                    <ul>${thumbnailsList}</ul>
                    <p>Code: ${product.code}</p>
                    <p>Stock: ${product.stock}</p>
                    <p>Active: ${product.status}</p>
                    <button class="delete-button" data-id="${product._id}">Delete</button>
                </div>
            </div>
        `;
    }).join(' ');

    productsContainer.innerHTML = productList;

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            console.log(productId);

            productSocket.emit('deleteProduct', productId);
        });
    });
});

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newProduct = {
        title: productTitleInput.value,
        description: productDescriptionInput.value,
        price: productPriceInput.value,
        code: productCodeInput.value,
        stock: productStockInput.value,
        category: productCategoryInput.value
    };

    productSocket.emit('addProduct', newProduct);
    clearProductForm();
});