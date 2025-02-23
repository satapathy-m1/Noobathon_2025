document.addEventListener("DOMContentLoaded", function () {
    // Check authentication
    const userData = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    if (!userData.name) {
        window.location.href = "../authentication/login.html";
        return;
    }

    // Initialize theme immediately
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Initialize all components
    initializeNavbar(userData);
    initializeHeroSection(userData);
    initializeCatchphrases();
    initializeMap();
    initializeTheme();
    initializeButtons();
});

function initializeNavbar(userData) {
    const authLink = document.getElementById("auth-link");
    
    if (userData.name) {
        authLink.textContent = "Logout";
        authLink.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("loggedInUser");
            window.location.href = "../authentication/login.html";
        });
    }

    // Add active class to current page link
    const currentPage = window.location.pathname;
    document.querySelectorAll('.custom-nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializeHeroSection(userData) {
    const welcomeMessage = document.getElementById("welcome-message");
    const characterQuote = document.getElementById("character-quote");
    const characterImage = document.getElementById("character-image");

    const quotes = {
        "Barney Stinson": "Suit up! This is going to be legendary!",
        "Ted Mosby": "You can't design your life like a building.",
        "Robin Scherbatsky": "But umm, I'm Sparkles!",
        "Marshall Eriksen": "Lawyered!",
        "Lily Aldrin": "Where's the poop, Ted?"
    };

    const images = {
        "Barney Stinson": "assets/barney.jpeg",
        "Ted Mosby": "assets/ted.jpeg",
        "Robin Scherbatsky": "assets/robin.jpeg",
        "Marshall Eriksen": "assets/marshall.jpeg",
        "Lily Aldrin": "assets/lily.jpeg"
    };

    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${userData.name}!`;
        // Add typing animation class
        welcomeMessage.classList.add('typing-animation');
    }

    if (characterQuote && userData.favCharacter) {
        characterQuote.textContent = quotes[userData.favCharacter] || "This is going to be legendary!";
    }

    if (characterImage && userData.favCharacter) {
        setCharacterImage(characterImage, images[userData.favCharacter], userData.favCharacter);
    }
}

function initializeCatchphrases() {
    const catchphrases = [
        { text: "Suit Up!", character: "barney.jpeg", name: "Barney Stinson" },
        { text: "Wait for it... Legendary!", character: "barney.jpeg", name: "Barney Stinson" },
        { text: "Challenge Accepted!", character: "barney.jpeg", name: "Barney Stinson" },
        { text: "Haaaave you met Ted?", character: "ted.jpeg", name: "Ted Mosby" },
        { text: "Nothing good happens after 2 AM.", character: "ted.jpeg", name: "Ted Mosby" },
        { text: "You just got Slapped!", character: "marshall.jpeg", name: "Marshall Eriksen" },
        { text: "Lawyered!", character: "marshall.jpeg", name: "Marshall Eriksen" },
        { text: "Let's go to the mall!", character: "robin.jpeg", name: "Robin Scherbatsky" },
        { text: "Nobody asked you, Patrice!", character: "robin.jpeg", name: "Robin Scherbatsky" },
        { text: "Where's the poop?", character: "lily.jpeg", name: "Lily Aldrin" }
    ];

    const catchphraseBtn = document.getElementById("catchphrase-btn");
    const catchphraseDisplay = document.getElementById("catchphrase-display");
    const catchphraseCharacter = document.getElementById("catchphrase-character");
    const catchphraseGreeting = document.getElementById("catchphrase-greeting");

    if (catchphraseBtn) {
        catchphraseBtn.addEventListener("click", () => {
            const randomCatchphrase = catchphrases[Math.floor(Math.random() * catchphrases.length)];
            
            // Add fade-out effect
            catchphraseDisplay.style.opacity = '0';
            catchphraseCharacter.style.opacity = '0';
            
            setTimeout(() => {
                catchphraseDisplay.textContent = `"${randomCatchphrase.text}"`;
                catchphraseGreeting.textContent = `Hey, it's ${randomCatchphrase.name}!`;
                setCharacterImage(catchphraseCharacter, `assets/${randomCatchphrase.character}`, randomCatchphrase.name);
                
                // Add fade-in effect
                catchphraseDisplay.style.opacity = '1';
                catchphraseCharacter.style.opacity = '1';
            }, 300);
        });
    }
}

function initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const map = L.map('map').setView([40.758, -73.985], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const locations = [
        { 
            name: "MacLaren's Pub",
            coords: [40.7596, -73.9837],
            description: "The gang's favorite bar",
            icon: "🍺"
        },
        { 
            name: "GNB Building",
            coords: [40.7549, -73.9840],
            description: "Where Barney and Marshall work",
            icon: "🏢"
        },
        { 
            name: "Ted's Apartment",
            coords: [40.7789, -73.9790],
            description: "The iconic apartment",
            icon: "🏠"
        }
    ];

    locations.forEach(location => {
        const marker = L.marker(location.coords)
            .bindPopup(`
                <div class="map-popup">
                    <h3>${location.icon} ${location.name}</h3>
                    <p>${location.description}</p>
                </div>
            `)
            .addTo(map);

        // Add hover effect
        marker.on('mouseover', function() {
            this.openPopup();
        });
    });
}

function initializeTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    if (!themeToggle) return;

    const icon = themeToggle.querySelector("i");
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    
    // Update button appearance
    updateThemeButton(currentTheme === "dark", icon);

    themeToggle.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        const newTheme = isDark ? "light" : "dark";
        
        // Add transition effect
        document.body.style.opacity = '0.5';
        
        setTimeout(() => {
            // Update theme
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            
            // Update button appearance
            updateThemeButton(!isDark, icon);
            
            // Restore opacity
            document.body.style.opacity = '1';
        }, 200);
    });
}

function updateThemeButton(isDark, icon) {
    // Update icon
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    
    // Update text
    const textNode = icon.nextSibling;
    if (textNode) {
        textNode.textContent = isDark ? " Light Mode" : " Dark Mode";
    }
    
    // Update map styles if needed
    const map = document.getElementById('map');
    if (map) {
        map.style.borderColor = isDark ? 'var(--primary-color)' : 'var(--secondary-color)';
    }
}

function initializeButtons() {
    const startJourneyBtn = document.querySelector('.cta-primary');
    const learnMoreBtn = document.querySelector('.cta-secondary');

    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', () => {
            window.location.href = '../quiz/index.html';
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            document.querySelector('#map-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

function setCharacterImage(imgElement, src, alt) {
    if (!imgElement) return;
    
    imgElement.onerror = () => {
        imgElement.src = "assets/default.png";
        console.error(`Failed to load image: ${src}`);
    };

    // Add fade effect
    imgElement.style.opacity = '0';
    imgElement.src = src;
    imgElement.alt = alt || "Character";
    
    imgElement.onload = () => {
        imgElement.style.opacity = '1';
    };
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});