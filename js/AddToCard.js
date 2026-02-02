function generateUPIQRCode(upiID, amount) {
    const upiURL = `upi://pay?pa=${upiID}&pn=TechBazzar&mc=123456&tid=1234567890&tr=123456&tn=OrderPayment&am=${amount}&cu=INR`;
    document.getElementById("upi-qrcode").innerHTML = "";
    new QRCode(document.getElementById("upi-qrcode"), {
        text: upiURL,
        width: 200,
        height: 200,
    });
}

document.getElementById("payment-method").addEventListener("change", function() {
    const upiContainer = document.getElementById("upi-qrcode-container");
    if (this.value === "UPI") {
        upiContainer.style.display = "block";
        let quantity = parseInt(document.getElementById("quantity").value) || 1;
        let totalAmount = (productPrice * quantity).toFixed(2);
        generateUPIQRCode("9172479138@ybl", totalAmount);
    } else {
        upiContainer.style.display = "none";
    }
});

const params = new URLSearchParams(window.location.search);
const productName = params.get("name");
const productPrice = parseFloat(params.get("price")) || 0;
const productImage = params.get("image") || "images/default.png";
const productDescription = params.get("description") || "No description available.";

const productNameElem = document.getElementById("product-name");
const productPriceElem = document.getElementById("product-price");
const productImageElem = document.getElementById("product-image");
const productDescriptionElem = document.getElementById("product-description");
const quantityInput = document.getElementById("quantity");
const addToCartBtn = document.getElementById("add-to-cart");
const removeFromCartBtn = document.getElementById("remove-from-cart");
const cartContainer = document.querySelector(".product-details");

productNameElem.textContent = productName || "No Product Name";
productPriceElem.textContent = `Rs ${productPrice.toLocaleString()}/-`;
productImageElem.src = decodeURIComponent(productImage);
productDescriptionElem.textContent = productDescription;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let existingItem = cart.find(item => item.name === productName);
if (existingItem) {
    quantityInput.value = existingItem.quantity;
    removeFromCartBtn.style.display = "inline-block";
    updateTotalPrice(existingItem.quantity);
} else {
    cartContainer.style.display = "block";
}

function updateTotalPrice(quantity) {
    let total = productPrice * quantity;
    productPriceElem.textContent = `Rs ${total.toLocaleString()}/-`;
}

addToCartBtn.addEventListener("click", function() {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 1) quantity = 1;

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.description = productDescription;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity,
            description: productDescription
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    removeFromCartBtn.style.display = "inline-block";
    updateTotalPrice(quantity);
});

removeFromCartBtn.addEventListener("click", function() {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${productName} removed from cart!`);
    cartContainer.style.display = "none";
});

quantityInput.addEventListener("input", function() {
    let quantity = parseInt(this.value);
    if (quantity < 1) quantity = 1;
    updateTotalPrice(quantity);
});

const userData = JSON.parse(localStorage.getItem("userDetails")) || {};
document.getElementById("customer-name").value = userData.name || "";
document.getElementById("customer-email").value = userData.email || "";
document.getElementById("customer-phone").value = userData.phone || "";
document.getElementById("customer-address").value = userData.address || "";

document.getElementById("billing-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const paymentMethod = document.getElementById("payment-method").value;

    const orderDetails = {
        name: document.getElementById("customer-name").value,
        email: document.getElementById("customer-email").value,
        phone: document.getElementById("customer-phone").value,
        address: document.getElementById("customer-address").value,
        paymentMethod: paymentMethod,
        cartItems: cart
    };

    if (!orderDetails.name || !orderDetails.email || !orderDetails.phone || !orderDetails.address) {
        alert("Please fill in all required fields.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty! Please add products before placing an order.");
        return;
    }

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");

    document.getElementById("order-confirmation-popup").classList.add("show");
});

document.getElementById("close-popup").addEventListener("click", function() {
    document.getElementById("order-confirmation-popup").classList.remove("show");
    window.location.href = "index.html";
});