document.addEventListener('DOMContentLoaded', () => {

    // --- Animate on Scroll using Intersection Observer ---
    // This function adds a 'is-visible' class to elements when they enter the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all elements with the class 'benefit-card' or 'success-story-card'
    document.querySelectorAll('.benefit-card, .success-story-card').forEach(element => {
        observer.observe(element);
    });

});
