document.addEventListener("DOMContentLoaded", function () {
    console.log("Script.js Loaded");

    // Select elements
    const registerButtons = document.querySelectorAll(".register-btn");
    const modal = document.getElementById("register-modal");
    const closeModalButtons = document.querySelectorAll(".close-btn");
    const registrationForm = document.getElementById("registration-form");
    const selectedBatchDisplay = document.getElementById("selected-batch");
    const batchInputField = document.getElementById("batch"); // Hidden input field for batch
    const successModal = document.getElementById("success-modal");
    const okButton = document.getElementById("ok-btn");
    const errorMessage = document.getElementById("error-message"); // Error message container
    const submitButton = document.getElementById("submit-btn"); // Submit button

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

            if (errorMessage) {
                errorMessage.textContent = ""; // Clear any previous error messages
                errorMessage.style.display = "none";
            }

            if (modal) {
                modal.classList.add("show");
                modal.classList.remove("hide");
            }
        });
    });

    // Handle Form Submission
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
    
            if (submitButton) {
                submitButton.disabled = true; // Disable button to prevent multiple clicks
            }
    
            // Collect form data
            const formData = new FormData(this);
    
            console.log("Submitting Form:", Object.fromEntries(formData.entries()));
    
            // Send AJAX request
            fetch("/register/", {
                method: "POST",
                body: formData,
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
                    errorMessage.textContent = data.message;
                    errorMessage.style.display = "block";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                errorMessage.textContent = "An unexpected error occurred. Please try again.";
                errorMessage.style.display = "block";
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false; // Re-enable submit button
                }
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
});
