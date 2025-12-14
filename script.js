// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Add animation to feature cards when they come into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add ripple effect to cards
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animation = 'pulse 2s ease-in-out infinite';
            }
        }
    });
}, observerOptions);

// Animate all cards and sections
document.querySelectorAll('.feature-card, .category, .step').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    
    // Add parallax effect to gradient spheres
    const spheres = document.querySelectorAll('.gradient-sphere');
    spheres.forEach((sphere, index) => {
        const speed = 0.2 + (index * 0.1);
        sphere.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-content h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', typeWriter);

// Add gradient animation to hero background
const gradientSpheres = document.querySelectorAll('.gradient-sphere');
gradientSpheres.forEach((sphere, index) => {
    sphere.style.animation = `float ${5 + index * 2}s ease-in-out infinite`;
});

// Add mouse move effect to hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const { clientX, clientY } = e;
    const { left, top, width, height } = hero.getBoundingClientRect();
    
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    const spheres = document.querySelectorAll('.gradient-sphere');
    spheres.forEach((sphere, index) => {
        const moveX = (x - 0.5) * (index + 1) * 30;
        const moveY = (y - 0.5) * (index + 1) * 30;
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

// Add hover effect to category items
document.querySelectorAll('.category li').forEach(item => {
    item.addEventListener('mouseover', function() {
        this.style.transform = 'translateX(10px)';
        this.style.background = 'rgba(255, 255, 255, 0.05)';
    });
    
    item.addEventListener('mouseout', function() {
        this.style.transform = 'translateX(0)';
        this.style.background = 'rgba(255, 255, 255, 0.03)';
    });
});

// Add animation to section headings
document.querySelectorAll('h2').forEach(heading => {
    heading.classList.add('animate-fade-in');
});

// Add this CSS animation to your styles.css
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
        z-index: 1001;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);

// GitHub API Integration
async function fetchLatestVersion() {
    try {
        const response = await fetch('https://api.github.com/repos/Adivise/ExpertiseX/releases/latest');
        if (!response.ok) throw new Error('Failed to fetch version');
        const data = await response.json();
        return data.tag_name.replace('v', ''); // Remove 'v' prefix if present
    } catch (error) {
        console.error('Error fetching version:', error);
        return '2.9.0'; // Fallback to current version from package.json
    }
}

// Download Button Functionality
async function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    // Fetch latest version
    const latestVersion = await fetchLatestVersion();
    
    // Update version display in all buttons
    downloadButtons.forEach(button => {
        const versionElement = button.querySelector('.version');
        if (versionElement) {
            versionElement.textContent = `v${latestVersion}`;
        }
    });
    
    downloadButtons.forEach(button => {
        let isDownloading = false;
        
        button.addEventListener('click', function(e) {
            // Check if it's the hero download button
            if (this.classList.contains('hero-download')) {
                e.preventDefault();
                const downloadSection = document.querySelector('#installation');
                if (downloadSection) {
                    downloadSection.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            if (isDownloading) return;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            ripple.addEventListener('animationend', () => {
                ripple.remove();
            });
            
            // Start download simulation
            isDownloading = true;
            this.classList.add('downloading');
            
            // Simulate download progress
            setTimeout(() => {
                isDownloading = false;
                this.classList.remove('downloading');
                
                // Add success state
                const originalText = this.querySelector('.download-text').textContent;
                this.querySelector('.download-text').textContent = 'Downloading...';
                this.style.background = 'var(--card-bg)';

                // auto change version
                const version = latestVersion;
                let downloadUrl = '';
                if (this.classList.contains('windows')) {
                    downloadUrl = 'https://github.com/Adivise/ExpertiseX/releases/download/v' + version + '/expertisex-' + version + '.exe';
                } else if (this.classList.contains('mac')) {
                    downloadUrl = 'https://github.com/Adivise/ExpertiseX/releases/download/v' + version + '/expertisex-' + version + '.dmg';
                } else if (this.classList.contains('linux')) {
                    downloadUrl = 'https://github.com/Adivise/ExpertiseX/releases/download/v' + version + '/expertisex-' + version + '.AppImage';
                }

                // Create a temporary link element
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = 'expertisex-' + version + '.exe'; // Default filename
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Redirect to GitHub releases after a short delay
                setTimeout(() => {
                    window.open(downloadUrl, '_blank');
                    this.querySelector('.download-text').textContent = originalText;
                }, 500);
            }, 1000);
        });
    });
}

// Initialize download buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDownloadButtons();
    // ... existing initialization code ...
}); 