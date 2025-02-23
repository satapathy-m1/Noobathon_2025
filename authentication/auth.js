document.addEventListener("DOMContentLoaded", () => {
    // Register Form Handling
    let registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); 

            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;
            let username = document.getElementById("username").value;
            let favCharacter = document.getElementById("fav-character").value;

            let users = JSON.parse(localStorage.getItem("users")) || []; // Get users array
            let userExists = users.some(user => user.username === username);

            if (userExists) {
                alert("Username already taken. Choose a different one.");
                return;
            }

            let userData = { name, email, username, favCharacter };
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users)); // Store updated users

            alert("Registration successful! Redirecting...");
            window.location.href = "login.html"; // Redirect to login page
        });
    }

    // Login Form Handling
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let username = document.getElementById("username-login").value;
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let storedUser = users.find(user => user.username === username);
            
            if (storedUser) {
                localStorage.setItem("loggedInUser", JSON.stringify(storedUser)); // Store logged-in user
                alert("Login successful! Redirecting...");
                window.location.href = "../home/index.html";
            } else {
                alert("User not found! Try again or register.");
            }
        });
    }
});
