document.addEventListener("DOMContentLoaded", function () {
    console.log("Hello from script.js");

    // Select elements
    const registerButtons = document.querySelectorAll(".register-btn");
    const modal = document.getElementById("register-modal");
    const closeModalButtons = document.querySelectorAll(".close-btn");
    const registrationForm = document.getElementById("registration-form");
    const selectedBatchDisplay = document.getElementById("selected-batch");
    const batchInputField = document.getElementById("batch"); // Hidden input field for batch
    const successModal = document.getElementById("success-modal");
    const okButton = document.getElementById("ok-btn");

    // Open Registration Modal
    registerButtons.forEach(button => {
        button.addEventListener("click", function () {
            const batchInfo = this.getAttribute("data-batch");

            // Set batch info in the modal display
            if (selectedBatchDisplay) {
                selectedBatchDisplay.textContent = batchInfo || "Not Available";
            }

            // Set batch info in the hidden input field for form submission
            if (batchInputField) {
                batchInputField.value = batchInfo || "";
            }

            if (registrationForm) {
                registrationForm.reset(); // Reset form fields
            }

            if (modal) {
                modal.classList.add("show");
                modal.classList.remove("hide");
            }
        });
    });

    // Handle Form Submission via AJAX
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            console.log("Submitting Form:", {
                batch: batchInputField.value,
                name: registrationForm.querySelector("[name='name']").value,
                whatsapp: registrationForm.querySelector("[name='whatsapp']").value,
                email: registrationForm.querySelector("[name='email']").value
            });

            // Ensure batch value is populated
            if (!batchInputField.value) {
                alert("Error: Batch is missing. Please select a batch before registering.");
                return;
            }

            const formData = new FormData(registrationForm);
            formData.append("batch", batchInputField.value);

            fetch("/register/", {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRFToken": document.querySelector("input[name='csrfmiddlewaretoken']").value,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        modal.classList.add("hide");
                        setTimeout(() => {
                            modal.classList.remove("show");
                            successModal.classList.add("show");
                        }, 300);
                    } else {
                        alert("Error: " + data.message);
                    }
                })
                .catch(error => {
                    alert("Registration failed. Try again.");
                    console.error("Error:", error);
                });
        });
    }

    // Close Modal with Fade-Out
    closeModalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const parentModal = this.closest(".modal");
            if (parentModal) {
                parentModal.classList.add("hide");
                setTimeout(() => {
                    parentModal.classList.remove("show");
                }, 300);
            }
        });
    });

    // Close Success Modal
    if (okButton) {
        okButton.addEventListener("click", function () {
            if (successModal) {
                successModal.classList.add("hide");
                setTimeout(() => {
                    successModal.classList.remove("show");
                }, 300);
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle && navbar) {
        menuToggle.addEventListener("click", function () {
            navbar.classList.toggle("show");
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!menuToggle.contains(event.target) && !navbar.contains(event.target)) {
                navbar.classList.remove("show");
            }
        });
    }

    // Curriculum Section Toggle
    const toggles = document.querySelectorAll(".curriculum-toggle");

    toggles.forEach((toggle) => {
        toggle.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".toggle-icon");

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.textContent = "+";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "−";
            }
        });
    });

    // Scroll Reveal
    const scrollElements = document.querySelectorAll(".scroll-fade");

    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show"); // Allow re-animation
                }
            });
        },
        { threshold: 0.01 } // Almost whole screen is considered as viewport
    );

    scrollElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Sidebar Toggle
    function toggleSidebar() {
        document.querySelector(".sidebar").classList.toggle("show");
        document.querySelector(".sidebar-overlay").classList.toggle("show");
    }

    function closeSidebar() {
        document.querySelector(".sidebar").classList.remove("show");
        document.querySelector(".sidebar-overlay").classList.remove("show");
    }

    console.log("Script.js Loaded");
});
