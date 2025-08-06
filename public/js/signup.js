document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous messages
            const existingAlert = document.querySelector('.alert');
            if (existingAlert) {
                existingAlert.remove();
            }

            const password = form.password.value;
            const confirmPassword = form.confirmPassword.value;

            if (password !== confirmPassword) {
                showAlert('Passwords do not match.', 'danger');
                return;
            }

            // Collect form data
            const formData = {
                fullName: form.fullName.value,
                email: form.email.value,
                username: form.username.value,
                phoneNumber: form.phoneNumber.value,
                degreeBranch: form.degreeBranch.value,
                graduationYear: form.graduationYear.value,
                rollNumber: form.rollNumber.value,
                dateOfBirth: form.dateOfBirth.value,
                gender: form.gender.value,
                currentJob: form.currentJob.value,
                password: password,
            };

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
