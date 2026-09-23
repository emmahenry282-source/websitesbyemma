/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    });
});

/*==================== REMOVE MENU MOBILE ====================*/

/*==================== ACCORDION SKILLS ====================*/
const skillHeaders = document.querySelectorAll('.skill-box__header');
skillHeaders.forEach(header => {
    const parent = header.parentElement;
    parent.classList.add('active');

    header.addEventListener('click', () => {
        parent.classList.toggle('active');
    });
});

/*==================== QUALIFICATION TABS ====================*/
const qualificationItems = document.querySelectorAll('.sidebar-card li');
qualificationItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateX(4px)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateX(0)';
    });
});

/*==================== SERVICES MODAL ====================*/
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-3px)';
        item.style.boxShadow = '0 10px 18px rgba(125, 91, 233, 0.12)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});

/*==================== PORTFOLIO SWIPER  ====================*/
const portfolioCards = document.querySelectorAll('.project-card, .mini-project');
portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
        card.style.transition = 'transform 0.2s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

const projectModal = document.getElementById('project-modal');
const projectModalImage = document.getElementById('project-modal-image');
const projectModalTag = document.getElementById('project-modal-tag');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalDescription = document.getElementById('project-modal-description');
const projectModalGallery = document.getElementById('project-modal-gallery');
const projectModalLink = document.getElementById('project-modal-link');
const projectModalClose = document.querySelector('.project-modal__close');

const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

const setContactStatus = (message, type = 'error') => {
    if (!contactStatus) return;

    contactStatus.textContent = message;
    contactStatus.classList.remove('success', 'error', 'show');
    contactStatus.classList.add(type, 'show');
};

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const subject = (formData.get('subject') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name || !email || !subject || !message) {
            setContactStatus('Please fill in all fields before sending your message.', 'error');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setContactStatus('Please enter a valid email address.', 'error');
            return;
        }

        const formEndpoint = contactForm.dataset.endpoint || 'https://formspree.io/f/your-form-id';

        if (formEndpoint.includes('your-form-id')) {
            const recipient = contactForm.dataset.email || 'hello@emma-portfolio.com';
            const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            setContactStatus('Set your Formspree form ID to send without opening your mail app.', 'error');
            window.location.href = mailtoLink;
            return;
        }

        try {
            const response = await fetch(formEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            setContactStatus('Thanks! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } catch (error) {
            const recipient = contactForm.dataset.email || 'hello@emma-portfolio.com';
            const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

            setContactStatus('Your message could not be sent right now. A draft was opened in your mail app.', 'error');
            window.location.href = mailtoLink;
        }
    });
}

const openProjectModal = (card) => {
    if (!projectModal || !projectModalImage || !projectModalTag || !projectModalTitle || !projectModalDescription) return;

    const title = card.dataset.title || 'Project';
    const tag = card.dataset.tag || 'Project';
    const image = card.dataset.image || card.querySelector('img')?.src || '';
    const description = card.dataset.description || 'Project details';
    const galleryImages = (card.dataset.gallery || '').split('|').filter(Boolean);
    const link = card.dataset.link || 'https://example.com';

    projectModalImage.src = image;
    projectModalImage.alt = title;
    projectModalTag.textContent = tag;
    projectModalTitle.textContent = title;
    projectModalDescription.textContent = description;

    if (projectModalGallery) {
        projectModalGallery.innerHTML = galleryImages.length
            ? galleryImages.map(src => `<img src="${src}" alt="${title} preview" />`).join('')
            : `<img src="${image}" alt="${title} preview" />`;
    }

    if (projectModalLink) {
        projectModalLink.href = link;
        projectModalLink.textContent = `Visit ${title}`;
    }

    projectModal.classList.add('show');
    projectModal.setAttribute('aria-hidden', 'false');
};

const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('show');
    projectModal.setAttribute('aria-hidden', 'true');
};

document.querySelectorAll('.project-view-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        if (card) openProjectModal(card);
    });
});

if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectModal) {
    projectModal.addEventListener('click', (event) => {
        if (event.target.dataset.close === 'modal') closeProjectModal();
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && projectModal && projectModal.classList.contains('show')) {
        closeProjectModal();
    }
});

/*==================== TESTIMONIAL ====================*/
const testimonialBox = document.querySelector('.testimonial-box');
if (testimonialBox) {
    testimonialBox.addEventListener('mouseenter', () => {
        testimonialBox.style.transform = 'scale(1.01)';
    });

    testimonialBox.addEventListener('mouseleave', () => {
        testimonialBox.style.transform = 'scale(1)';
    });
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');
const setActiveLink = () => {
    let currentSection = 'home';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const isActive = linkHref === '#' + currentSection;
        link.classList.toggle('active-link', isActive);
    });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

/*==================== CHANGE BACKGROUND HEADER ====================*/
const header = document.getElementById('header');
const scrollHeader = () => {
    if (header) {
        header.classList.toggle('scroll-header', window.scrollY >= 80);
    }
};

window.addEventListener('scroll', scrollHeader);
scrollHeader();

/*==================== SHOW SCROLL UP ====================*/
const scrollUp = document.getElementById('scroll-up');
const toggleScrollUp = () => {
    if (scrollUp) {
        scrollUp.classList.toggle('show-scroll', window.scrollY >= 560);
    }
};

window.addEventListener('scroll', toggleScrollUp);
toggleScrollUp();

if (scrollUp) {
    scrollUp.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button');
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        const icon = themeButton.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('uil-moon');
            icon.classList.add('uil-sun');
        } else {
            icon.classList.remove('uil-sun');
            icon.classList.add('uil-moon');
        }
    });
} 