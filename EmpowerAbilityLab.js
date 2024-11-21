document.addEventListener("DOMContentLoaded", () => {
    // Function to handle tab switching
    const handleTabSwitch = (event) => {
        // Prevent the default link behavior
        event.preventDefault();

        // Get all sections and hide them
        const sections = document.querySelectorAll("main > section");
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
        }

        // Mark the clicked link as active
        event.target.classList.add("active");
    };

    // Attach click event listeners to all navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
        link.addEventListener("click", handleTabSwitch);
    });

    // Initialize by showing the Home section and hiding others
    const homeSection = document.getElementById("home");
    homeSection.style.display = "block";

    const otherSections = document.querySelectorAll("main > section:not(#home)");
    otherSections.forEach((section) => {
        section.style.display = "none";
    });

    // Mark the Home tab as active
    document.querySelector(".nav-link[href='#home']").classList.add("active");
});
