
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

// Contact form - Web3Forms
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const button = document.getElementById("submitBtn");
    const statusMessage = document.getElementById("statusMessage");

    const formData = {
        access_key: "c90c98d9-6789-48a3-a785-93b1e7de1d27",
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        subject: "New Portfolio Contact Message"
    };

    button.disabled = true;
    button.textContent = "Sending...";
    statusMessage.textContent = "";

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Unable to send message");
        }

        statusMessage.textContent = "Message sent successfully!";
        contactForm.reset();

    } catch (error) {
        statusMessage.textContent = "Failed to send message. Please try again.";
        console.error(error);

    } finally {
        button.disabled = false;
        button.textContent = "Send Message";
    }
});

console.log("Krishanth Portfolio Loaded Successfully!");
