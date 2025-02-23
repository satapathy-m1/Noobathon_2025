// Function to flip the card
function flipCard(card) {
    // Close all other flipped cards
    document.querySelectorAll('.card').forEach(c => {
        if (c !== card) {
            c.classList.remove('flipped');
        }
    });

    // Toggle the flipped state of the clicked card
    card.classList.toggle('flipped');
}

// Event listener for each card flip
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});

