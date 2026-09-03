// ---------------------------------------------------------
// Mobile nav toggle (same code runs on every page)
// ---------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------------------------------------------------------
// Footer year
// ---------------------------------------------------------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ---------------------------------------------------------
// Projects intro background rotation
// ---------------------------------------------------------
const heroSlides = document.querySelectorAll('.projects-hero__slide');
if (heroSlides.length) {
  let activeSlideIndex = 0;

  setInterval(() => {
    heroSlides[activeSlideIndex].classList.remove('is-active');
    activeSlideIndex = (activeSlideIndex + 1) % heroSlides.length;
    heroSlides[activeSlideIndex].classList.add('is-active');
  }, 4200);
}

// ---------------------------------------------------------
// Media carousel for project cards (images + videos)
// ---------------------------------------------------------
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = [...carousel.querySelectorAll('.media-slide')];
  const prevButton = carousel.querySelector('.media-prev');
  const nextButton = carousel.querySelector('.media-next');
  const mediaLabel = carousel.closest('.project-media')?.querySelector('.project-media-label');

  if (!slides.length) return;

  let activeIndex = 0;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === activeIndex);
    });

    const activeSlide = slides[activeIndex];
    const activeImage = activeSlide.querySelector('img');
    const activeLabel = activeSlide.dataset.label || activeImage?.alt;
    if (mediaLabel && activeLabel) mediaLabel.textContent = activeLabel;

    slides.forEach((slide) => {
      const video = slide.querySelector('video');
      if (video) {
        if (slide.classList.contains('is-active')) {
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }

  prevButton?.addEventListener('click', () => showSlide(activeIndex - 1));
  nextButton?.addEventListener('click', () => showSlide(activeIndex + 1));
  showSlide(0);
});

// ---------------------------------------------------------
// Subtle scroll reveal for sections / page headers
// ---------------------------------------------------------
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll('.section, .page-header, .projects-hero, .project-card, .videos-section-fullscreen');

console.log('Reveal targets found:', revealTargets.length);

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
} else {
  // Add a small delay to ensure animations show even if visible on load
  setTimeout(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Element intersecting, adding is-visible:', entry.target.className);
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    revealTargets.forEach((el) => {
      console.log('Observing element:', el.className);
      observer.observe(el);
      // If element is already visible on page load, trigger animation
      if (el.getBoundingClientRect().top < window.innerHeight) {
        console.log('Element already in viewport, adding is-visible immediately');
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  }, 100);
}

// ---------------------------------------------------------
// Video carousel for RS-25 project
// ---------------------------------------------------------
const videoCarousel = document.querySelector('.video-carousel');
if (videoCarousel) {
  let currentVideoIndex = 0;
  const videoWrappers = document.querySelectorAll('.carousel-video-wrapper');
  const indicatorDots = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const videoTitle = document.querySelector('.video-title');

  function showVideo(index) {
    videoWrappers.forEach((wrapper, i) => {
      wrapper.style.display = i === index ? 'flex' : 'none';
    });
    indicatorDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Update title
    const ratios = ['50', '69', '80'];
    videoTitle.textContent = 'Area Ratio of ' + ratios[index];
    
    currentVideoIndex = index;
  }

  function nextVideo() {
    const nextIndex = (currentVideoIndex + 1) % videoWrappers.length;
    showVideo(nextIndex);
  }

  function prevVideo() {
    const prevIndex = (currentVideoIndex - 1 + videoWrappers.length) % videoWrappers.length;
    showVideo(prevIndex);
  }

  prevBtn.addEventListener('click', prevVideo);
  nextBtn.addEventListener('click', nextVideo);

  indicatorDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'), 10);
      showVideo(index);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (document.activeElement === videoCarousel || videoCarousel.contains(document.activeElement)) {
      if (e.key === 'ArrowLeft') prevVideo();
      if (e.key === 'ArrowRight') nextVideo();
    }
  });
}
