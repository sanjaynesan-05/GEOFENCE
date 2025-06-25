document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (email === "admin@example.com" && password === "admin123") {
    localStorage.setItem("loggedIn", "true");  // ✅ save login
    window.location.href = "index.html";
  } else {
    document.getElementById("errorMsg").textContent = "❌ Invalid email or password";
  }
});
