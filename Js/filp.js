// 1. Select all cards using the class name
const cards = document.querySelectorAll('.pts_header_card');

// 2. Loop through each card to add the click event
cards.forEach((card) => {
    card.addEventListener('click', function() {
        // Find the "inner" part of THIS specific card
        const innerCard = this.querySelector('.card-inner');
        
        // Toggle the class
        innerCard.classList.toggle('is-flipped');
    });
});