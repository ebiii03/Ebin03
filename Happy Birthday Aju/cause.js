 // Reasons database
 const reasons = [
    { 
        text: "🌼 Happy birthday Kuttuse. Nine Ente life-il kittiyathil njan sherikkum lucky aanu. enikku valare special aanu Nee. 💖", 
        emoji: "🌟",
        photo: "aju1.jpeg"
    },
    { 
        text: "Ippo ulla pole thanne eppozhum positive aayi, cute aayi, happy aayi irikkane. Ninte ee puthiya varsham ninte life-il ettavum nalla memories kondu varatte. 🥳 🌸 ", 
        emoji: "💗",
        photo: "aju2.jpeg"
    },
    { 
        text: "Ninte ella dreams um goals um achieve cheyyan pattatte . Sneham mathram  ✨ ", 
        emoji: "💕",
        photo: "aju3.jpeg"
    },
    { 
        text: "Ithokey Ann Ente gift Adjust cheyyanee kuttusee 🥳 ", 
        emoji: "🌟",
        photo: "aju4.jpeg"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with a photo
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const photoOverlay = document.createElement('div');
    photoOverlay.className = 'gif-overlay';
    photoOverlay.innerHTML = `<img src="${reason.photo}" alt="Birthday Memory">`;
    
    card.appendChild(text);
    card.appendChild(photoOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Ninte Life Memories Kannan Click Cheyyuuuuuuu 💫";
                    shuffleButton.classList.add('story-mode');
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

function openMemories() {
    gsap.to('body', {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            window.location.href = 'last.html';
        }
    });
}

// Show another note, then open the gallery after all notes are visible.
shuffleButton.addEventListener('click', () => {
    if (currentReasonIndex >= reasons.length) {
        openMemories();
        return;
    }

    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (same as before)
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX - 15,
        y: e.clientY - 15,
        duration: 0.2
    });
});

// Create initial floating elements
setInterval(createFloatingElement, 2000);

// Show the first birthday note as soon as this page opens.
displayNewReason();
