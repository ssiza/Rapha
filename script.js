document.addEventListener('DOMContentLoaded', () => {
    const heartsContainer = document.querySelector('.hearts');
    const musicPlayer = document.querySelector('.music-player');
    const bgMusic = document.getElementById('bgMusic');
    const floatingText = document.querySelector('.floating-text');
    
    // Time counter elements
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Set your anniversary date (YYYY-MM-DD)
    const anniversaryDate = new Date('2025-04-21');
    
    // Update time counter
    function updateTimeCounter() {
        const now = new Date();
        const diff = now - anniversaryDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update counter immediately and then every second
    updateTimeCounter();
    setInterval(updateTimeCounter, 1000);
    
    // Music player functionality
    musicPlayer.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            musicPlayer.style.color = '#ff4757';
        } else {
            bgMusic.pause();
            musicPlayer.style.color = 'white';
        }
    });
    
    // Create floating hearts
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random position and size
        const posX = Math.random() * 100;
        const delay = Math.random() * 2;
        const size = Math.random() * 10 + 8;
        
        heart.style.left = `${posX}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 3000);
    }
    
    // Create floating emojis
    function createFloatingEmoji() {
        const emojis = ['❤️', '💕', '💖', '💗', '💓'];
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const startPosition = Math.random() * window.innerWidth;
        const duration = Math.random() * 5 + 5;
        
        emoji.style.left = `${startPosition}px`;
        emoji.style.animationDuration = `${duration}s`;
        
        floatingText.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, duration * 1000);
    }
    
    // Optimize animation intervals for mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const heartInterval = isMobile ? 500 : 300;
    const emojiInterval = isMobile ? 1500 : 1000;
    
    // Create hearts periodically
    setInterval(createHeart, heartInterval);
    setInterval(createFloatingEmoji, emojiInterval);
    
    // Touch and click effects
    function createHeartAtPosition(x, y) {
        const colors = ['#ff4757', '#ff6b81', '#ff8e8e', '#ffa502', '#ff7f50'];
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.transform = 'rotate(45deg)';
        heart.style.animation = 'none';
        heart.style.background = colors[Math.floor(Math.random() * colors.length)];
        heart.style.width = '15px';
        heart.style.height = '15px';
        
        document.body.appendChild(heart);
        
        heart.offsetHeight;
        
        heart.style.animation = 'float 1s ease-out forwards';
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    // Handle both touch and click events
    function handleInteraction(e) {
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const y = e.clientY || (e.touches && e.touches[0].clientY);
        
        if (x && y) {
            createHeartAtPosition(x, y);
        }
    }
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    // Optimize touch move effect
    let lastTouchTime = 0;
    const touchMoveInterval = 100; // Minimum time between touch move effects
    
    document.addEventListener('touchmove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTouchTime > touchMoveInterval) {
            const touch = e.touches[0];
            createHeartAtPosition(touch.clientX, touch.clientY);
            lastTouchTime = currentTime;
        }
    });
    
    // Prevent default touch behaviors
    document.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, { passive: false });
}); 