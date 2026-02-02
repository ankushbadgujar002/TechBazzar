let searchBtn = document.querySelector("#search-btn");
let searchForm = document.querySelector(".search-form");

let count = true;
searchBtn.addEventListener("click", () => {
    count = !count;
    if (count) {

        searchForm.style.right = "-110%";
    }
    else {
        searchForm.style.right = "2%";
        searchForm.style.transition = "all .4s linear";
        shoppingCart.style.right = "-110%";
        menuNavbar.style.right = "-110%";
        count1 = true;
        count2 = true;
        count3 = true;
    }
});

window.addEventListener("scroll", () => {
    let y = window.scrollY;
    if (y > 10) {
        searchForm.style.right = "-110%";
        shoppingCart.style.right = "-110%";
        menuNavbar.style.right = "-110%";
        count = true;
        count1 = true;
        count2 = true;
        count3 = true;
    }
})


let cartBtn = document.querySelector("#cart-btn");

let shoppingCart = document.querySelector(".shopping-cart");

let count1 = true;
cartBtn.addEventListener("click", () => {
    count1 = !count1;
    if (count1) {

        shoppingCart.style.right = "-110%";
    }
    else {
        shoppingCart.style.right = "2%";
        shoppingCart.style.transition = "all .4s linear";
        searchForm.style.right = "-110%";
        menuNavbar.style.right = "-110%";
        count = true;
        count2 = true;
        count3 = true;
    }
});

let loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", () => {
    alert('! Login must be done in Home Page !');
});

let menuBtn = document.querySelector("#menu-btn");
let menuNavbar = document.querySelector(".navbar");
let count3 = true;
menuBtn.addEventListener("click", () => {
    count3 = !count3;
    console.log(count3);
    if (count3) {

        menuNavbar.style.right = "-110%";
    }
    else {
        menuNavbar.style.right = "2%";
        menuNavbar.style.transition = "all .4s linear";
        searchForm.style.right = "-110%";
        shoppingCart.style.right = "-110%";
        count = true;
        count1 = true;
        count2 = true;
    }
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.querySelector(".shopping-cart");

function updateCartUI() {
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty!</p>";
        shoppingCart.style.right = "-110%";
        count1 = false;
        return;
    }

    if (cart.length >= 1) {
        shoppingCart.style.right = "2%";
        count1 = true;
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("box");
        cartItem.innerHTML = `
                <i class="fa-solid fa-trash-can remove-item" data-name="${item.name}"></i>
                <img src="${item.image}" alt="${item.name}">
                <div class="content">
                    <h3>${item.name}</h3>
                    <span class="price">Rs ${item.price}/-</span>
                    <span class="quantity">Qty: ${item.quantity}</span>
                </div>
            `;
        cartContainer.appendChild(cartItem);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("total");
    totalDiv.innerHTML = `Total: Rs ${totalPrice}/-`;
    cartContainer.appendChild(totalDiv);

    const checkoutBtn = document.createElement("a");
    checkoutBtn.href = "#";
    checkoutBtn.classList.add("btn");
    checkoutBtn.textContent = "Checkout";
    cartContainer.appendChild(checkoutBtn);

    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            removeFromCart(name);
        });
    });

    checkoutBtn.addEventListener("click", function () {
        alert("Proceeding to checkout!");
        window.location.href = "AddToCard.html";
    });
}

function addToCart(name, price, image) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    alert(`${name} added to cart!`);
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
}

document.querySelectorAll(".fa-cart-plus").forEach(button => {
    button.addEventListener("click", function () {
        const card = this.closest(".card");
        const name = card.querySelector("h3").textContent;
        const priceText = card.querySelector(".cart span").textContent.replace(/[^\d]/g, '');
        const price = parseInt(priceText, 10);
        const image = card.querySelector("img").src;

        addToCart(name, price, image);
    });
});

updateCartUI();


document.getElementById("search-box").addEventListener("keyup", function () {
    let filter = this.value.trim().toLowerCase();
    let products = document.querySelectorAll(".products .card");
    let categories = document.querySelectorAll(".categories .card");

    let hasResults = false;

    products.forEach(product => {
        let productName = product.querySelector("h3").innerText.toLowerCase();
        if (filter === "" || productName.includes(filter)) {
            product.style.display = "block";
            hasResults = true;
        } else {
            product.style.display = "none";
        }
    });

    categories.forEach(category => {
        let categoryName = category.querySelector("p").innerText.toLowerCase();
        if (filter === "" || categoryName.includes(filter)) {
            category.style.display = "block";
            hasResults = true;
        } else {
            category.style.display = "none";
        }
    });

    let resultMessage = document.getElementById("no-results");
    if (!resultMessage) {
        resultMessage = document.createElement("p");
        resultMessage.id = "no-results";
        resultMessage.style.textAlign = "center";
        resultMessage.style.color = "#ff0000";
        resultMessage.style.fontSize = "18px";
        resultMessage.innerText = "No matching products or categories found.";
        document.querySelector(".products").appendChild(resultMessage);
    }

    resultMessage.style.display = hasResults ? "none" : "block";
});


document.addEventListener("DOMContentLoaded", () => {
    var swiper = new Swiper(".reviews-slider", {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
            1440: { slidesPerView: 5 },
            1600: { slidesPerView: 6 }
        }
    });
});


document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function () {
        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;

        if (!name || !price || !image) {
            console.error("Missing product data!");
            return;
        }

        window.location.href = `AddToCard.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
    });
});

let isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    alert("Access Denied! Please login first.");
    window.location.href = "index.html"; // Redirect to login page
}