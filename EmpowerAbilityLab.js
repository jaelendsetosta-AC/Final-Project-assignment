const formMessageID = "formMessage";
const scheduleFormID = "scheduleCallForm";

const error = "Errors";
const thankYou = "Thank you!"
const errorLinkClass = "error-link";
const aboutEventDivID = "about-event-div";

const thankYouMessage = "Thank you for filling out the form to schedule a call! Your request has been received and we will get in touch with you soon to schedule your call.";

document.addEventListener("DOMContentLoaded", () => {

    // Dynamically change title of tab based on the active section
     const titles = {
        home: "Home - Empower Ability Labs",
        services: "Services - Empower Ability Labs",
        "schedule-call": "Schedule a Call - Empower Ability Labs"
    };

    // shared constants
    const sections = document.querySelectorAll("#home, #services, #schedule-call");
    const navLinks = document.querySelectorAll(".nav-link");

    // initializing the title of the tab to be the home page
    document.title = titles.home;

    // Function to handle tab switching
    const handleTabSwitch = (event) => {
        // Prevent the default link behavior
        event.preventDefault();

        // Get all toggleable nav link sections ( home , services , schedule a call )
        
        sections.forEach((section) => {
            section.style.display = "none";
        });

        // Remove active class from all nav links
       
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

        // Update the browser history
        window.history.pushState({ section: targetId }, titles[targetId], '#${targetId}');

        // Dynamically update the tab title
        document.title = titles[targetId];
    };

    // Make sure the back and forward button do not exit the SPA
    window.addEventListener("popstate", (event) => {
        const sectionId = event.state?.section || "home"; // default to the home section if no state exists currently

        // Show the appropriate section
        sections.forEach((section) => {
            section.style.display = "none";
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
        }

        // Update the document title
        document.title = titles[sectionId];

        // Update the active nav link
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // Attach click event listeners to all navigation links
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

    // Open Community Modal Functionality and focus trapping
    const openModalButton = document.getElementById("modalButton");
    const focusableElementsString = 'button';
    const modal = document.getElementById("communityModal");
    const closeModalButton = modal.querySelectorAll(".close-modal")
    let focusableElements = [];
    let firstFocus;
    let lastFocus;

    
    openModalButton.addEventListener("click", () => {
          modal.style.display = "flex";
          modal.setAttribute("aria-hidden", "false");
          modal.querySelector(".modal-content").focus();

          // get all focusable elements inside the modal
          focusableElements = modal.querySelectorAll(focusableElementsString);
          firstFocus = focusableElements[0];
          lastFocus = focusableElements[focusableElements.length - 1];

          // put focus on the first focusable element
          firstFocus.focus();

          // add event listener for focus trapping
          document.addEventListener("keydown", trapFocus);
     });
   
     // trap focus within the modal
     function trapFocus(event) {
        if (event.key === "Tab") {
            if (event.shiftKey) {
                // wrap the focus to the last element if it is on the first element and shift + tab is used to navigate
                if (document.activeElement === firstFocus ) {
                    event.preventDefault();
                    lastFocus.focus();
                }
            }else {
                // wrap focus to first element if at the last element
                if (document.activeElement === lastFocus ) {
                    event.preventDefault();
                    firstFocus.focus();
                }
            }
        } 
     }

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

    let fieldsetHTML = '';


    if (fieldsetLegend == thankYou){
        fieldsetHTML = '<fieldset id="' + formMessageID + '"><legend>' + fieldsetLegend + '</legend></fieldset>';
    }else {
        fieldsetHTML = '<fieldset id="' + formMessageID + '"><legend>' + fieldsetLegend + '</legend><ul></ul></fieldset>';
    }

    $('#'+scheduleFormID).prepend(fieldsetHTML);    

    // check if there are any errors before beginning to traverse through the rest of the code
    if (fieldsetLegend == thankYou){
        // if there are no errors, just add a thank you message
        $('#' + formMessageID).append(thankYouMessage);
        $('#' + formMessageID).attr('aria-live', 'polite');
        $('#' + formMessageID).attr('tabindex', '-1').focus();
        return;
    }

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


// Switch between On and Off display for the switch button
$('#subscribeUpdates').on('change', function(event){

    let on = $(this).prop('checked');
    if (on){
        $('#on-display').css('display', 'inline');
        $('#off-display').css('display', 'none');
    }else {
        $('#on-display').css('display', 'none');
        $('#off-display').css('display', 'inline');
    }
});