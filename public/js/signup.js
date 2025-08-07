document.addEventListener('DOMContentLoaded', () => {
    // --- Elements for Toggling Fields ---
    const qualYesRadio = document.getElementById('qualYes');
    const qualNoRadio = document.getElementById('qualNo');
    const additionalFields = document.getElementById('additional-qual-fields');
    const form = document.getElementById('signup-form');

    // --- Logic for Toggling Additional Qualification Fields ---
    function toggleAdditionalFields() {
        if (qualYesRadio.checked) {
            additionalFields.classList.remove('d-none');
        } else {
            additionalFields.classList.add('d-none');
        }
    }

    if(qualYesRadio && qualNoRadio) {
        qualYesRadio.addEventListener('change', toggleAdditionalFields);
        qualNoRadio.addEventListener('change', toggleAdditionalFields);
        toggleAdditionalFields(); // Initial check
    }

    // --- Logic for Form Submission ---
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const existingAlert = form.querySelector('.alert');
            if (existingAlert) {
                existingAlert.remove();
            }

            const password = form.password.value;
            const confirmPassword = form.confirmPassword.value;

            if (password !== confirmPassword) {
                showAlert('Passwords do not match.', 'danger');
                return;
            }

            // Collect form data from the modified form
            const formData = {
                fullName: form.fullName.value,
                email: form.email.value,
                phoneNumber: form.phoneNumber.value,
                degreeBranch: form.degreeBranch.value,
                graduationYear: form.graduationYear.value,
                rollNumber: form.rollNumber.value,
                dateOfBirth: form.dateOfBirth.value,
                gender: form.gender.value,
                currentLocation: form.currentLocation.value,
                address: form.address.value,
                currentJob: form.currentJob.value,
                password: password,
            };
            
            // Include additional qualification if 'Yes' is selected
            if (qualYesRadio.checked) {
                formData.additionalDegree = form.additionalDegree.value;
                formData.additionalBranch = form.additionalBranch.value;
            }

            try {
                // Send data to the back-end API
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.msg || 'An error occurred.');
                }

                showAlert(result.msg, 'success');
                form.reset();
                toggleAdditionalFields(); // Reset the radio button view

            } catch (error) {
                showAlert(error.message, 'danger');
            }
        });
    }

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} mt-4`;
        alertDiv.setAttribute('role', 'alert');
        alertDiv.textContent = message;
        form.prepend(alertDiv);
    }
});
