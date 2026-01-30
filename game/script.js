// Card deck configuration
const cardDecks = {
    'Quality Aspects': {
        prefix: '1 Quality Aspects',
        count: 20
    },
    'Heuristics': {
        prefix: '2 Heuristics',
        count: 20
    },
    'Feelings': {
        prefix: '3 Feelings',
        count: 20
    },
    'Techniques': {
        prefix: '4 Techniques',
        count: 20
    },
    'Patterns': {
        prefix: '5 Patterns',
        count: 20
    }
};

// Track which cards have been drawn for each type
const drawnCards = {
    'Quality Aspects': [],
    'Heuristics': [],
    'Feelings': [],
    'Techniques': [],
    'Patterns': []
};

// Get a random card from a specific deck
function getRandomCard(cardType) {
    const deck = cardDecks[cardType];
    const availableCards = [];
    
    // Find cards that haven't been drawn yet
    for (let i = 1; i <= deck.count; i++) {
        if (!drawnCards[cardType].includes(i)) {
            availableCards.push(i);
        }
    }
    
    // If all cards have been drawn, reset the deck
    if (availableCards.length === 0) {
        drawnCards[cardType] = [];
        for (let i = 1; i <= deck.count; i++) {
            availableCards.push(i);
        }
    }
    
    // Pick a random card
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const cardNumber = availableCards[randomIndex];
    
    // Mark this card as drawn
    drawnCards[cardType].push(cardNumber);
    
    return `../TestSphere Cards/${deck.prefix}${cardNumber}.png`;
}

// Reveal a card when stack is clicked
function revealCard(cardType, revealedCardsContainer) {
    const cardPath = getRandomCard(cardType);
    
    // Create a new revealed card element
    const cardElement = document.createElement('div');
    cardElement.className = 'revealed-card';
    
    const cardImage = document.createElement('img');
    cardImage.src = cardPath;
    cardImage.alt = `${cardType} Card`;
    
    cardElement.appendChild(cardImage);
    
    // Add the card to the top of the revealed cards
    revealedCardsContainer.insertBefore(cardElement, revealedCardsContainer.firstChild);
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const stacks = document.querySelectorAll('.stack');
    
    stacks.forEach(stack => {
        const stackCard = stack.querySelector('.stack-card');
        const cardType = stack.dataset.type;
        const revealedCardsContainer = stack.querySelector('.revealed-cards');
        
        stackCard.addEventListener('click', () => {
            revealCard(cardType, revealedCardsContainer);
        });
    });
});
