
// Smooth navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Contact form - Flask backend connection
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = document.getElementById("submitBtn");
    const statusMessage = document.getElementById("statusMessage");

    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    button.disabled = true;
    button.textContent = "Sending...";
    statusMessage.textContent = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok || result.status !== "success") {
            throw new Error(result.message || "Unable to send message");
        }

        statusMessage.textContent = "Message submitted successfully!";
        contactForm.reset();

    } catch (error) {
        statusMessage.textContent = error.message;
        console.error(error);

    } finally {
        button.disabled = false;
        button.textContent = "Send Message";
    }
});

console.log("Krishanth Portfolio Loaded Successfully!");
