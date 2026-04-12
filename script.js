document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer for scroll animations (reveal classes)
  const revealElements = document.querySelectorAll(".reveal-up, .reveal-scale");
  
  const observerOptions = {
    root: document.querySelector('.container'), // Using the scrolling container
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  // Handle dot navigation and top navigation active states
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".side-indicator .dot");
  const navLinks = document.querySelectorAll(".nav-links a");

  const slideObserverOptions = {
    root: document.querySelector('.container'),
    threshold: 0.5 // Trigger when 50% of the slide is visible
  };

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideId = entry.target.getAttribute("id");

        // Update Dots
        dots.forEach(dot => {
          dot.classList.remove("active");
          if (dot.getAttribute("href") === `#${slideId}`) {
            dot.classList.add("active");
          }
        });

        // Update Top Nav
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${slideId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, slideObserverOptions);

  slides.forEach(slide => slideObserver.observe(slide));
  
  // Smooth scroll override for dot clicks inside the scroll-snapping container
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const container = document.querySelector('.container');
      
      if (targetElement) {
        container.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      const container = document.querySelector('.container');
      
      if (targetElement) {
        container.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

});
