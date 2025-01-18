window.onload = () => {
    const leftFlower = document.querySelector('.flower.left');
    const rightFlower = document.querySelector('.flower.right');

    // Add event listeners to restart animations if needed
    if (leftFlower) {
        leftFlower.addEventListener('animationend', () => {
            leftFlower.style.animation = 'none';
        });
    }

    if (rightFlower) {
        rightFlower.addEventListener('animationend', () => {
            rightFlower.style.animation = 'none';
        });
    }

    // Add event listener to close sidebar when clicking outside
    document.addEventListener('click', (event) => {
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.querySelector('.sidebar-toggle');
        const closeButton = document.querySelector('.sidebar-close');
        if (sidebar.classList.contains('active') && !sidebar.contains(event.target) && !toggleButton.contains(event.target) && !closeButton.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });
};

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

function createFlowerGroup(containerId, count) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < 100 ; i++) {
        const img = document.createElement("img");
        img.src = "./assets/images/flower.png";
        img.alt = "Flower";
        img.className = "flower";
        container.appendChild(img);
    }
}

// Create flowers for both groups
createFlowerGroup("topFlowerGroup", 8); // 8 flowers in the top group
createFlowerGroup("bottomFlowerGroup", 9); // 9 flowers in the bottom group
// Throttle control for flower creation

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Enables smooth scrolling
    });
}

// code to redirect events pages
// Wait until the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const eventCards = document.querySelectorAll('.event-card');
    const urls = [
        './events/art.html',
        './events/dance.html',
        './events/event1.html',
        './events/literary.html',
        './events/theatre.html',
        './events/danceext.html'
    ];

    eventCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = card.getAttribute('data-index');
            if (urls[index]) {
                window.location.href = urls[index];
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.team-carousel');
    const members = Array.from(document.querySelectorAll('.team-member'));
    let currentScroll = 0;
    let memberWidth;

    const updateMemberWidth = () => {
        // Dynamically calculate member width based on current viewport
        memberWidth = members[0].offsetWidth + (window.innerWidth < 768 ? 20 : 40);
    };

    const ensureClones = () => {
        const visibleCards = Math.ceil(carousel.offsetWidth / memberWidth);
        
        // Remove existing clones
        Array.from(carousel.children)
            .filter(child => !members.includes(child))
            .forEach(clone => clone.remove());

        // Clone members to ensure smooth infinite scrolling
        while (carousel.childElementCount < members.length * 3) {
            members.forEach(member => {
                const clone = member.cloneNode(true);
                carousel.appendChild(clone);
            });
        }
    };

    const slideCarousel = () => {
        currentScroll += memberWidth;
        carousel.style.transition = 'transform 0.5s linear';
        carousel.style.transform = `translateX(-${currentScroll}px)`;

        // Reset when reaching the end of scrollable content
        if (currentScroll >= memberWidth * members.length) {
            setTimeout(() => {
                carousel.style.transition = 'none';
                currentScroll = 0;
                carousel.style.transform = `translateX(0)`;
            }, 500);
        }
    };

    // Setup initial configuration
    const setupCarousel = () => {
        updateMemberWidth();
        ensureClones();
    };

    // Initial setup and responsive resize handling
    setupCarousel();
    window.addEventListener('resize', setupCarousel);

    // Auto-slide every 3 seconds
    let interval = setInterval(slideCarousel, 3000);

    // Pause on hover
    carousel.addEventListener('mouseover', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(slideCarousel, 3000);
    });
});

    // Auto-slide every 3 seconds
    let interval = setInterval(slideCarousel, 3000);

    // Adjust member width dynamically and add clones as needed
    window.addEventListener('resize', () => {
        updateMemberWidth();
        ensureClones();
    });

    // Initial setup
    updateMemberWidth();
    ensureClones();

    // Pause carousel on hover
    carousel.addEventListener('mouseover', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(slideCarousel, 3000);
    });
// });

document.querySelectorAll('.linkedin').forEach(button => {
    button.addEventListener('mouseenter', function (e) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        // Remove ripple after animation
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});

if (window.innerWidth > 768) {
    // Auto-slide logic here
}
if (window.innerWidth > 768) {
    // Clone members only on larger screens
    membersArray.forEach(member => {
        const clone = member.cloneNode(true);
        carousel.appendChild(clone);
    });
}
/******************************************** */
let targetDate = new Date("2024-12-10T00:00:00").getTime(); // Target date

async function fetchServerTime() {
    try {
        const response = await fetch("http://worldtimeapi.org/api/timezone/etc/UTC");
        const data = await response.json();
        return new Date(data.datetime).getTime(); // Get the current UTC time
    } catch (error) {
        console.error("Error fetching server time:", error);
        return new Date().getTime(); // Fallback to local time
    }
}

async function updateCountdown() {
    const serverNow = await fetchServerTime();
    const timeLeft = targetDate - serverNow; // Use server time to calculate remaining time

    if (timeLeft <= 0) {
        document.getElementById("countdown").innerHTML = "⏰ It's time! Reminder for 10th December!";
        clearInterval(countdownInterval); // Stop the countdown
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = 
        `Only ${days} Days ${hours} Hours ${minutes} Minutes and ${seconds} Seconds Left!`;
        
}

// Update the countdown every second
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Run immediately on load


/*********************************** */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
document.querySelectorAll('.linkedin').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();

        // Calculate size and position of the ripple
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        // Set ripple size and position
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Add ripple class and append to button
        ripple.classList.add('ripple');
        button.appendChild(ripple);

        // Remove ripple after animation ends
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});
