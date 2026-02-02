let searchBtn = document.querySelector("#search-btn")
let cartBtn = document.querySelector("#cart-btn");
let loginBtn = document.querySelector("#login-btn");

searchBtn.addEventListener("click", () => {
    alert("!! This field is only work in Home Page !!");
});

cartBtn.addEventListener("click", () => {
    alert("!! This field is only work in Home Page !!");
});

loginBtn.addEventListener("click", () => {
    alert("!! This field is only work in Home Page !!");
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
        loginForm.style.right = "-110%";
        count = true;
        count1 = true;
        count2 = true;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("#form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        // Get input values
        let nameInput = document.querySelector("#name");
        let usernameInput = document.querySelector("#username");
        let phoneInput = document.querySelector("#phone");
        let emailInput = document.querySelector("#email");
        let passwordInput = document.querySelector("#pass");

        let name = nameInput.value.trim();
        let username = usernameInput.value.trim();
        let phone = phoneInput.value.trim();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        // Validate fields
        if (!name || !username || !phone || !email || !password) {
            alert("All fields are required!");
            return;
        }

        // Retrieve existing users from localStorage
        let existingUsers = JSON.parse(localStorage.getItem("users")) || [];

        // Check if the user already exists (based on email, username, or phone)
        let userExists = existingUsers.some(user =>
            user.email === email || user.username === username || user.phone === phone
        );

        if (userExists) {
            alert("User already registered with the same Email, Username, or Phone!");
            return;
        }

        // Create new user object
        let newUser = {
            name,
            username,
            phone,
            email,
            password,
        };

        // Add new user to the array and store it back in localStorage
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert("Registration Successful! Please log in.");

        // Clear form fields
        nameInput.value = "";
        usernameInput.value = "";
        phoneInput.value = "";
        emailInput.value = "";
        passwordInput.value = "";
    });
});

