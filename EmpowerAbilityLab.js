const formMessageID = "formMessage";
const scheduleFormID = "scheduleCallForm";

const error = "Errors";
const thankYou = "Thank you!"
const errorLinkClass = "error-link";

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


// When the schedule a call form submit button is activated
document.getElementById(scheduleFormID).addEventListener('submit', function(event) {
    // Preventing the default form submission behavior
    event.preventDefault();

    // validate all required fields are filled correctly
    let listofErrors = [];
    let validated = validateFormCall(listofErrors);

    // show either thank you message or error message
    if (validated){
        sendMessageForm(thankYou, listofErrors);
    }else {sendMessageForm(error, listofErrors);}


});




// Function: Validate all required fields for the "Schedule a Call" Page form
function validateFormCall(listofErrors){
    // get the email value
    let email = document.getElementById("email").value.trim();
    if (email === ""){
        // no email, send error
        listofErrors.push({"id": "email", "message": "Please enter your email address!"});
        return false;
    }
    return true;

}

// clear an element off of the HTML page given the ID
function clearElement(elementID){
    $('#' + elementID).remove();
}

// Send either a thank you message or error messages to the user after the "Schedule a call" button is activated
function sendMessageForm(fieldsetLegend, listofErrors){
    // clear the fieldset first
    clearElement(formMessageID);

    // create a field set for the messages
    let fieldsetHTML = '<fieldset id="' + formMessageID + '"><legend>' + fieldsetLegend + '</legend><ul></ul></fieldset>';
    $('#'+scheduleFormID).prepend(fieldsetHTML);    


    // traverse through each error to display it
    // if there are no errors, the list will be empty
    listofErrors.forEach(function (error){
        let errorID = error.id;
        let errorMessage = error.message;

        // class of "error-link" is given so that we can customize the behaviour
        let listItemHTML = '<li><a href="#' + errorID + '" class="error-link" >' + errorMessage + '</a></li>';
        $('#' + formMessageID + ' ul').append(listItemHTML);
    });


    // add event listener for error links (using jquery)
    $('.error-link').on('click', function(event) {
        event.preventDefault();  
        let targetId = $(this).attr('href').substring(1);  // Get the id of the target form field
        $("#" + targetId).focus();
    
    });
}


