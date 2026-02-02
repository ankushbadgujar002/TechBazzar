# TechBazzar 🛒

TechBazzar is a frontend e-commerce website developed using HTML, CSS, and JavaScript.
The project includes a simple **user authentication system using JavaScript localStorage** to control access to protected pages.

Users must **register first**, then **log in using the same credentials** to access the products page.

---

## 🔐 Authentication Flow (Core Feature)

This project implements client-side authentication using **JavaScript localStorage**:

1. User must **register** with a username and password.
2. Registration details are stored securely in the browser using `localStorage`.
3. User must **log in using the same registered credentials**.
4. On successful login:
   - User is redirected to the **Products page**
5. If a user tries to access the Products page **without logging in**:
   - An **alert message** is shown:  
     **"Please login first"**
   - Access is denied

> ⚠️ This authentication is frontend-only and implemented for learning purposes.

---

## 🔹 Features
- User Registration (localStorage-based)
- User Login with credential validation
- Route protection for product pages
- Alert-based access restriction
- Categories mentioned
- Product listing page
- Add to Cart UI
- About Us page
- Responsive UI design
- At the end thank you massage pop up

---

## 🔹 Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- Browser LocalStorage API

---

## 🔹 Project Structure

TechBazzar/
│── index.html (Home / Login page)
│── RegisterForm.html (User Registration)
│── Products.html (Protected Page)
│── AddToCard.html
│── AboutUs.html
│── thankyou.html
│
├── css/
│ ├── indexStyle.css
│ ├── AboutUs.css
│ ├── AddToCard.css
│ ├── ProductsStyle.css
│ ├── RegisterForm.css
│ ├── thankyou.css
│
├── images/
│ └── respective images...

---

## 🔹 How Authentication Works (Technical Overview)
- User credentials are stored using `localStorage.setItem()`
- Login validation is done by comparing input values with stored data
- A login flag (e.g., `isLoggedIn`) is stored in localStorage
- Product page checks login status on page load
- Unauthorized access triggers an alert and redirects user

---

## 🔹 Live Demo
👉 https://ankushbadgujar002.github.io/TechBazzar/

---

## 🔹 Learning Outcomes
- Understanding client-side authentication
- Working with JavaScript localStorage
- Form validation using JavaScript
- Page access control logic
- Real-world frontend project structure
- GitHub Pages deployment

---

## 🔹 Author
**Ankush Badgujar**  
Information Technology Student  
Frontend Web Developer (Fresher)
Full Stack Java Developer (Fresher)

---

## 🔹 Disclaimer
This authentication system is implemented using client-side JavaScript and localStorage.
It is intended for **learning and demonstration purposes only** and should not be used in production environments.

---

## 🔹 Future Enhancements
- Backend-based authentication
- Password hashing
- Session management
- Database integration
