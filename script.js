document.addEventListener('DOMContentLoaded', () => {
    // Gallery initialization
    let galleryOverlay = document.querySelector('.gallery-overlay');
    if (!galleryOverlay) {
        galleryOverlay = document.createElement('div');
        galleryOverlay.className = 'gallery-overlay';
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container';
        galleryOverlay.appendChild(galleryContainer);
        const closeButton = document.createElement('button');
        closeButton.className = 'gallery-close';
        closeButton.innerHTML = '×';
        galleryOverlay.appendChild(closeButton);
        document.body.appendChild(galleryOverlay);
    }

    // Get the gallery container and close button
    const galleryContainer = galleryOverlay.querySelector('.gallery-container');
    const closeButton = galleryOverlay.querySelector('.gallery-close');

    // Add gallery heading
    const heading = document.createElement('h2');
    heading.className = 'gallery-heading';
    heading.textContent = 'Aata canal';
    galleryContainer.parentNode.insertBefore(heading, galleryContainer);

    // Aatakanal photos array
    const aatakanalPhotos = [
        'images/Aatakanal/IMG_4823.jpg',
        'images/Aatakanal/IMG_5134.jpg',
        'images/Aatakanal/IMG_5146.jpg',
        'images/Aatakanal/IMG_5177.jpg',
        'images/Aatakanal/IMG_5240.jpg',
        'images/Aatakanal/IMG_5265.jpg',
        'images/Aatakanal/IMG_5266.jpg',
        'images/Aatakanal/IMG_5287.jpg',
        'images/Aatakanal/IMG_5306.jpg',
        'images/Aatakanal/IMG_5307.jpg',
        'images/Aatakanal/IMG_5365.jpg',
        'images/Aatakanal/IMG_5374.jpg',
        'images/Aatakanal/IMG_5582.jpg',
        'images/Aatakanal/IMG_5587.jpg',
        'images/Aatakanal/IMG_5594.jpg',
        'images/Aatakanal/IMG_5597.jpg',
        'images/Aatakanal/IMG_5626.jpg',
        'images/Aatakanal/IMG_5628.jpg',
        'images/Aatakanal/IMG_5703.jpg',
        'images/Aatakanal/IMG_5706.jpg'
    ];

    // Add Show Photos button to Aata canal event box
    const aataCanalBox = document.querySelector('.event-box:first-child');
    if (aataCanalBox) {
        const showPhotosBtn = document.createElement('button');
        showPhotosBtn.textContent = 'Show Photos';
        showPhotosBtn.style.padding = '10px 20px';
        showPhotosBtn.style.backgroundColor = '#4CAF50';
        showPhotosBtn.style.color = 'white';
        showPhotosBtn.style.border = 'none';
        showPhotosBtn.style.borderRadius = '5px';
        showPhotosBtn.style.cursor = 'pointer';
        showPhotosBtn.style.marginTop = '10px';
        showPhotosBtn.style.fontSize = '16px';
        showPhotosBtn.style.transition = 'background-color 0.3s';
        showPhotosBtn.addEventListener('mouseover', () => {
            showPhotosBtn.style.backgroundColor = '#45a049';
        });
        showPhotosBtn.addEventListener('mouseout', () => {
            showPhotosBtn.style.backgroundColor = '#4CAF50';
        });
        aataCanalBox.appendChild(showPhotosBtn);

        showPhotosBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            galleryOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            renderGallery();
            galleryOverlay.offsetHeight;
            galleryOverlay.classList.add('visible');
        });
    }

    // Close gallery
    closeButton.addEventListener('click', () => {
        galleryOverlay.classList.remove('visible');
        setTimeout(() => {
            galleryOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });

    function renderGallery() {
        if (!galleryContainer) return;
        galleryContainer.innerHTML = '';
        aatakanalPhotos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `Aatakanal photo ${index + 1}`;
            img.loading = 'lazy';
            img.style.opacity = '0';
            img.onload = () => {
                img.style.transition = 'opacity 0.3s ease-in';
                img.style.opacity = '1';
            };
            
            const imgContainer = document.createElement('div');
            imgContainer.className = 'gallery-item';
            imgContainer.appendChild(img);
            
            imgContainer.addEventListener('click', () => {
                openFullscreen(index);
            });
            
            galleryContainer.appendChild(imgContainer);
        });
    }

    function openFullscreen(index) {
        const fullscreenView = document.createElement('div');
        fullscreenView.className = 'fullscreen-view';
        setTimeout(() => {
            fullscreenView.classList.add('visible');
        }, 10);
        
        const currentImg = document.createElement('img');
        currentImg.src = aatakanalPhotos[index];
        currentImg.alt = `Aatakanal photo ${index + 1}`;
        
        fullscreenView.appendChild(currentImg);
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-btn prev';
        prevBtn.innerHTML = '‹';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-btn next';
        nextBtn.innerHTML = '›';

        const closeFullscreenBtn = document.createElement('button');
        closeFullscreenBtn.className = 'gallery-close';
        closeFullscreenBtn.innerHTML = '×';
        
        fullscreenView.appendChild(prevBtn);
        fullscreenView.appendChild(nextBtn);
        fullscreenView.appendChild(closeFullscreenBtn);
        galleryOverlay.appendChild(fullscreenView);

        let currentIndex = index;

        const updateImage = (newIndex) => {
            currentIndex = newIndex;
            currentImg.src = aatakanalPhotos[currentIndex];
            currentImg.alt = `Aatakanal photo ${currentIndex + 1}`;
            prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
            nextBtn.style.display = currentIndex === aatakanalPhotos.length - 1 ? 'none' : 'flex';
        };

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                updateImage(currentIndex - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < aatakanalPhotos.length - 1) {
                updateImage(currentIndex + 1);
            }
        });

        closeFullscreenBtn.addEventListener('click', () => {
            fullscreenView.classList.remove('visible');
            setTimeout(() => {
                fullscreenView.remove();
            }, 300);
        });

        updateImage(currentIndex);

        fullscreenView.addEventListener('click', (e) => {
            if (e.target === fullscreenView) {
                fullscreenView.classList.remove('visible');
                setTimeout(() => {
                    fullscreenView.remove();
                }, 300);
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;
        
        fullscreenView.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        
        fullscreenView.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });
        
        fullscreenView.addEventListener('touchend', () => {
            const swipeDistance = touchStartX - touchEndX;
            if (Math.abs(swipeDistance) > 50) {
                if (swipeDistance > 0) {
                    nextBtn.click();
                } else {
                    prevBtn.click();
                }
            }
        });
    }

    const header = document.querySelector('header');
    const membersContainer = document.querySelector('.members-container');
    const welcomeSection = document.querySelector('.welcome-section');
    const membersSection = document.getElementById('members');
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    // Add swipe detection
    welcomeSection.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        welcomeSection.style.transition = 'none';
    });
    
    welcomeSection.addEventListener('touchmove', (e) => {
        touchEndY = e.touches[0].clientY;
        const currentSwipe = touchStartY - e.touches[0].clientY;
        if (currentSwipe > 0) {
            welcomeSection.style.transform = `translateY(${-currentSwipe}px)`;
        }
    });
    
    welcomeSection.addEventListener('touchend', () => {
        const swipeDistance = touchStartY - touchEndY;
        welcomeSection.style.transition = 'transform 0.5s ease-out';
        
        if (swipeDistance > 50) { // Swipe up
            welcomeSection.style.transform = 'translateY(-100vh)';
            membersSection.style.transform = 'translateY(0)';
            membersSection.style.opacity = '1';
            membersSection.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            membersSection.classList.add('active');
            
            setTimeout(() => {
                welcomeSection.classList.remove('active');
                welcomeSection.style.transform = '';
                welcomeSection.style.transition = '';
            }, 500);
        } else {
            welcomeSection.style.transform = '';
        }
    });
    
    welcomeSection.addEventListener('touchcancel', () => {
        welcomeSection.style.transform = '';
        welcomeSection.style.transition = 'transform 0.3s ease';
    });
    
    // Add event listeners for navigation
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            // Hide all sections first
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active');
            });
            // Show the target section
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Show welcome section by default
    document.querySelector('.welcome-section').classList.add('active');
    
    // Show header
    header.style.opacity = '1';

    // Member data
    const members = [
        { name: 'Akshay', image: 'images/Akshay.jpeg' },
        { name: 'Subhash', image: 'images/subash.jpeg' },
        { name: 'Rakesh', image: 'images/rakesh.jpeg' },
        { name: 'Akash', image: 'images/Akash.jpeg' },
        { name: 'Ajay', image: 'images/ajay.jpeg' },
        { name: 'Hareen', image: 'images/Hareen.jpeg' },
        { name: 'Nithin', image: 'images/Nithin.jpg' }
    ];

    // Create member cards
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'member-card';
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'member-image';
        
        const img = document.createElement('img');
        img.src = member.image;
        img.alt = member.name;
        
        const name = document.createElement('div');
        name.className = 'member-name';
        name.textContent = member.name;
        
        imageContainer.appendChild(img);
        memberCard.appendChild(imageContainer);
        memberCard.appendChild(name);
        membersContainer.appendChild(memberCard);
    });
});
