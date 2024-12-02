const formMessageID = "formMessage";
const scheduleFormID = "scheduleCallForm";

const error = "Errors";
const thankYou = "Thank you!"
const errorLinkClass = "error-link";
const aboutEventDivID = "about-event-div";

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

    // Dynamically change title of tab based on the active section
    const titles = {
        home: "Home - Empower Ability Labs",
        services: "Services - Empower Ability Labs",
        scheduleCall: "Schedule a Call - Empower Ability Labs"
    };

    // adding event listeners to the navigation links
    document.getElementById("home").addEventListener("click", () => {
        document.title = titles.home;
    });

    document.getElementById("services").addEventListener("click", () => {
        document.title = titles.services;
    });

    document.getElementById("schedule-call").addEventListener("click", () => {
        document.title = titles.scheduleCall;
    });

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

    // check if there are any errors before beginning to traverse through the rest of the code
    if (fieldsetLegend == thankYou){return;}

    // traverse through each error to display it
    // if there are no errors, the list will be empty
    listofErrors.forEach(function (error){
        let errorID = error.id;
        let errorMessage = error.message;

        // class of "error-link" is given so that we can customize the behaviour
        let listItemHTML = '<li><a href="#' + errorID + '" class="error-link" >' + errorMessage + '</a></li>';
        $('#' + formMessageID + ' ul').append(listItemHTML);

        // if the error is for the email, display the hint
        if (errorID == 'email'){
            $('#email-hint').css('display', 'block');
            $('#email').attr('aria-describedby', 'email-hint');
        }
        
    });

    

    // add focus to the form message fieldset
    $('#' + formMessageID).attr('tabindex', '-1').focus();

    // add event listener for error links (using jquery)
    $('.error-link').on('click', function(event) {
        event.preventDefault();  
        let targetId = $(this).attr('href').substring(1);  // Get the id of the target form field
        $("#" + targetId).focus();
    
    });
}


// Checkbox and textarea functionality for "Invite a speaker with disabilities to your event"
$('#' + 'check_2').on('change', function(event){

    // check if the checkbox is selected or not
    let selected = $(this).prop('checked');

    if (selected){
        // reveal the text area for "Please tell us about your event"
        $('#' + aboutEventDivID).css('display', 'block');
        return;
    }
    // hide it if the checkbox is not selected
    $('#' + aboutEventDivID).css('display', 'none');
});