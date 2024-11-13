// Function to toggle the visibility of the Skills and Other Information sections
function toggleSection() {
    var skillsSection = document.getElementById('toggleSection');
    if (skillsSection) {
        // Toggle the visibility of the skills section and other information section
        skillsSection.style.display = skillsSection.style.display === 'none' ? 'block' : 'none';
    }
}

// Function to generate the resume and display it
function generateResume(event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form values
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value; // Include the age field
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills') ? document.getElementById('skills').value : '';
    var summary = document.getElementById('summary') ? document.getElementById('summary').value : '';

    // Generate resume output with age and other fields
    var resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong><span id="edit-name" class="editable">${name}</span></p>
        <p><strong>Age:</strong><span id="edit-age" class="editable">${age}</span></p> <!-- Display Age -->
        <p><strong>Email:</strong><span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
        <h3>Education</h3>
        <p><span id="edit-education" class="editable">${education}</span></p>
        <h3>Experience</h3>
        <p><span id="edit-experience" class="editable">${experience}</span></p>
        ${skills ? `<h3>Skills</h3><p><span id="edit-skills" class="editable">${skills}</span></p>` : ''}
        ${summary ? `<h3>Other Information</h3><p><span id="edit-summary" class="editable">${summary}</span></p>` : ''}
    `;

    // Display resume output
    var resumeContainer = document.getElementById('resumeOutput');
    if (resumeContainer) {
        resumeContainer.innerHTML = resumeOutput;
        makeEditable();
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function () {
    var toggleButton = document.getElementById('toggleButton');
    var form = document.getElementById('resumeForm');
    
    // Toggle button click event listener
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleSection);
    }

    // Form submit event listener for generating the resume
    if (form) {
        form.addEventListener('submit', generateResume);
    }
});

// Function to make elements editable
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var currentElement = element;
            var currentText = currentElement.textContent || "";
            
            // Replace with input field
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input = document.createElement('input');
                input.type = "text";
                input.value = currentText;
                input.classList.add("editing-input");
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = "inline";
                    input.remove();
                });
                currentElement.style.display = "none";
                currentElement.parentNode.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
