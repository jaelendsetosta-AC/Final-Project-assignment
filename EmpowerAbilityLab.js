document.addEventListener("DOMContentLoaded", () => {
    // Function to handle tab switching
    const handleTabSwitch = (event) => {
        // Prevent the default link behavior
        event.preventDefault();

        // Get all toggleable nav link sections ( home , services , schedule a call )
        const sections = document.querySelectorAll("#home, #services, #schedule-call");
        sections.forEach((section) => {
            section.style.display = "none";
        });

        // Remove active class from all nav links
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.classList.remove("active");
        });

        // Get the target section from the link's href
        const targetId = event.target.getAttribute("href").substring(1); // Remove the '#' symbol
        const targetSection = document.getElementById(targetId);

        // Show the target section
        if (targetSection) {
            targetSection.style.display = "block";
            console.log(targetSection);
        }

        // Mark the clicked link as active
        event.target.classList.add("active");
    };

    // Attach click event listeners to all navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", handleTabSwitch);
    });

   // Initialize by showing only the Home section while hiding the others
   document.getElementById("home").style.display = "block";

   document.querySelectorAll("#services, #schedule-call").forEach((section) => {
       section.style.display = "none";
   });

    // Mark the Home tab as active
    document.querySelector(".nav-link[href='#home']").classList.add("active");

    // Open Community Modal Functionality
    const openModalButton = document.getElementById("modalButton");
    const modal = document.getElementById("communityModal");
    const closeModalButton = modal.querySelectorAll(".close-modal")

    
    openModalButton.addEventListener("click", () => {
          modal.style.display = "flex";
          modal.setAttribute("aria-hidden", "false");
          modal.querySelector(".modal-content").focus();
     });
   

    // Close Community Modal Functionality
    closeModalButton.forEach((button) => {
        button.addEventListener("click", () => {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        });
    });

    // Close the modal when clicking outside of the modal content
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }
    });

    // Close the modal when the escape key is pressed
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
        }
    })

    // ensure modal is hidden and focus is not set on load
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
});

