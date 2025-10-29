// ---------- Dark/Light Mode Toggle ----------
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙 Dark Mode";
toggleBtn.classList.add("mode-toggle");
document.querySelector("nav").appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
  }
});

// ---------- Simple Interactive Button ----------
const aboutSection = document.querySelector("#about");
const funBtn = document.createElement("button");
funBtn.textContent = "Click me for a fun fact 🎯";
funBtn.classList.add("primary-btn");
aboutSection.appendChild(funBtn);

funBtn.addEventListener("click", () => {
  const facts = [
    "I love building user-friendly web apps 💻",
    "I’ve completed 5+ hackathons 🚀",
    "I enjoy working with AI and data 🧠",
    "Coding + coffee = productivity ☕"
  ];
  const randomFact = facts[Math.floor(Math.random() * facts.length)];
  alert(randomFact);
});

// ---------- Contact Form Validation ----------
const form = document.querySelector(".contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (!name || !email || !message) {
    alert("⚠️ Please fill out all fields before submitting.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("❌ Please enter a valid email address.");
    return;
  }

  alert(`✅ Thank you, ${name}! Your message has been sent successfully.`);
  form.reset();

console.log(`Success: Form submitted by ${name} (${email}).`);

  form.reset();
});

