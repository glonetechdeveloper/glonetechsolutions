document.addEventListener("DOMContentLoaded", () => {
    //navbar
    const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

    
    
    // TYPEWRITER EFFECT
    class TxtType {
      constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      }
  
      tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];
  
        this.txt = this.isDeleting
          ? fullTxt.substring(0, this.txt.length - 1)
          : fullTxt.substring(0, this.txt.length + 1);
  
        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  
        let delta = 200 - Math.random() * 100;
  
        if (this.isDeleting) { delta /= 2; }
  
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
  
        setTimeout(() => this.tick(), delta);
      }
    }
  
    window.onload = function () {
      const elements = document.getElementsByClassName('typewrite');
      for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
    };

  

    // GSAP SCROLL ANIMATIONS
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.utils.toArray(".card, .swiper-slide, .footer-content").forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
      });
    });
  //testimonials 
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-slide');
    const totalTestimonials = testimonials.length;
    
    function showTestimonial(index) {
      testimonials.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    
    document.querySelector('.testimonial-prev').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
      showTestimonial(currentTestimonial);
    });
    
    document.querySelector('.testimonial-next').addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      showTestimonial(currentTestimonial);
    });
    
    // Optional: auto slide
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
      showTestimonial(currentTestimonial);
    }, 6000);
    
  });
  
  // WHATSAPP CHAT POPUP
const openChatBtn = document.getElementById("open-chat");
const closeChatBtn = document.getElementById("close-chat");
const chatPopup = document.getElementById("chat-popup");

openChatBtn.addEventListener("click", () => {
  chatPopup.style.display = "flex";
});
closeChatBtn.addEventListener("click", () => {
  chatPopup.style.display = "none";
});

// NEWSLETTER FORM
const newsletterForm = document.getElementById("newsletter-form");
newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = newsletterForm.querySelector("input[type='email']").value;
  alert(`Thanks for subscribing, ${email}!`);
  newsletterForm.reset();
});

// BACK TO TOP BUTTON
const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// WHO WE SERVE CAROUSEL FULL FEATURED
const serveCarousel = document.getElementById("serve-carousel");
const serveWrapper = document.getElementById("serve-carousel-wrapper");
const serveCards = serveCarousel.querySelectorAll(".serve-card");
const prevBtn = document.getElementById("serve-prev");
const nextBtn = document.getElementById("serve-next");
const dotsContainer = document.getElementById("serve-dots");

let currentSlide = 0;
const totalSlides = serveCards.length;
const visibleCards = Math.floor(serveWrapper.offsetWidth / 220);
let autoScroll;

// Create dots
for (let i = 0; i <= totalSlides - visibleCards; i++) {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => {
    currentSlide = i;
    updateCarousel();
  });
  dotsContainer.appendChild(dot);
}

// Update Carousel View
function updateCarousel() {
  const offset = currentSlide * 220;
  serveCarousel.style.transform = `translateX(-${offset}px)`;

  const dots = dotsContainer.querySelectorAll("span");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSlide);
  });
}

// Looping
nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % (totalSlides - visibleCards + 1);
  updateCarousel();
});
prevBtn.addEventListener("click", () => {
  currentSlide =
    currentSlide - 1 < 0 ? totalSlides - visibleCards : currentSlide - 1;
  updateCarousel();
});

// AutoPlay
function startAutoScroll() {
  autoScroll = setInterval(() => {
    currentSlide = (currentSlide + 1) % (totalSlides - visibleCards + 1);
    updateCarousel();
  }, 3000);
}
function stopAutoScroll() {
  clearInterval(autoScroll);
}

// Init
updateCarousel();
startAutoScroll();

// Pause on Hover
serveWrapper.addEventListener("mouseover", stopAutoScroll);
serveWrapper.addEventListener("mouseout", startAutoScroll);

