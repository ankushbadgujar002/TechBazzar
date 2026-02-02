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
        loginForm.style.right = "-110%";
        menuNavbar.style.right = "-110%";
        count1 = true;
        count2 = true;
        count3 = true;
    }
});

window.addEventListener("scroll", () => {
    let y = window.scrollY;
    if (y > 10) {
        loginForm.style.right = "-110%";
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
        loginForm.style.right = "-110%";
        menuNavbar.style.right = "-110%";
        count = true;
        count2 = true;
        count3 = true;
    }
});

let loginBtn = document.querySelector("#login-btn");

let loginForm = document.querySelector(".login-form");

let count2 = true;
loginBtn.addEventListener("click", () => {
    count2 = !count2;
    if (count2) {
        loginForm.style.right = "-110%";
    }
    else {
        loginForm.style.right = "2%";
        loginForm.style.transition = "all .4s linear";
        searchForm.style.right = "-110%";
        shoppingCart.style.right = "-110%";
        menuNavbar.style.right = "-110%";
        count = true;
        count1 = true;
        count3 = true;
    }
});

let menuBtn = document.querySelector("#menu-btn");

let menuNavbar = document.querySelector(".navbar");

let count3 = true;
menuBtn.addEventListener("click", () => {
    count3 = !count3;
    if (count3) {

        menuNavbar.style.right = "-110%";
    }
    else {
        menuNavbar.style.right = "2%";
        menuNavbar.style.transition = "all .4s linear";
        searchForm.style.right = "-110%";
        shoppingCart.style.right = "-110%";
        loginForm.style.right = "-110%";
        count = true;
        count1 = true;
        count2 = true;
    }
});

let welcomeMsg = document.querySelector("#welcome-msg");
let loginSection = document.querySelector("#login-now");
let logoutBtn = document.querySelector("#logout-btn");
let userInitial = document.querySelector("#user-initial");

function updateUI() {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (user) {
        let initial = user.name.charAt(0).toUpperCase();
        userInitial.innerText = initial;
        userInitial.style.display = "block";

        if (welcomeMsg) {
            welcomeMsg.innerText = `Welcome, ${user.name}!`;
            welcomeMsg.style.display = "block";
        }

        loginSection.style.display = "none";
        logoutBtn.style.display = "block";
    } else {
        userInitial.style.display = "none";
        if (welcomeMsg) welcomeMsg.style.display = "none";
        loginSection.style.display = "block";
        logoutBtn.style.display = "none";
    }
}

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let emailInput = document.querySelector("#email");
        let passwordInput = document.querySelector("#password");

        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        // if (!email || !password) {
        //     alert("Please fill in all fields!");
        //     return;
        // }

        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        let validUser = existingUsers.find(user => user.email === email && user.password === password);

        if (validUser) {
            alert("Login Successful!");
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", JSON.stringify(validUser));

            emailInput.value = "";
            passwordInput.value = "";

            updateUI();
        } else {
            alert("Invalid email or password!");
            emailInput.value = "";
            passwordInput.value = "";
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        alert("Logged out successfully!");
        updateUI();
    });
}

updateUI();

// document.getElementById("login-form").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent page refresh

//     let username = document.getElementById("email").value.trim();

//     if (username) {
//         localStorage.setItem("loggedInUser", username); // Store username

//     } else {
//         alert("Please enter a valid username!");
//     }
// });

document.getElementById("products-link").addEventListener("click", function (event) {
    let isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        window.location.href = "Products.html"; // Allow navigation
    } else {
        event.preventDefault(); // Stop navigation
        alert("You must be logged in to access Products!");
    }
});