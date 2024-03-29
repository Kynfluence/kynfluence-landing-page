/**
* Template Name: Resi
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/resi-free-bootstrap-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/


(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  document.addEventListener("DOMContentLoaded", function () {
    const leftAnimations = ["founder-photo", "course-description", "founder-story-photo-wrapper", "sales-proff-wrapper", "syllabus-left-wrapper", "money-back-text-wrapper", "is-not-for-wrapper"];
    const rightAnimations = ["founder-description", "course-logo-wrapper", "founder-story-text-wrapper", "social-proff-wrapper", "syllabus-right-wrapper", "money-back-photo-wrapper", "is-for-wrapper"];
    const appearAnimations = ["social-media-wrapper", "introduction-wrapper", "course-video-wrapper", "success-wrapper", "will-be-wrapper", "faq-wrapper", "reviews-wrapper", "review-video-wrapper"];
    const CLASSES_TO_TRACK = [
      '.founder-photo',
      '.founder-description',
      '.course-description',
      '.course-logo-wrapper',
      '.social-media-wrapper',
      '.introduction-wrapper',
      '.course-video-wrapper',
      '.founder-story-photo-wrapper',
      '.founder-story-text-wrapper',
      '.sales-proff-wrapper',
      '.social-proff-wrapper',
      '.success-wrapper',
      '.syllabus-left-wrapper',
      '.syllabus-right-wrapper',
      '.will-be-wrapper',
      '.faq-wrapper',
      '.is-not-for-wrapper',
      '.is-for-wrapper',
      '.money-back-text-wrapper',
      '.money-back-photo-wrapper',
      '.reviews-wrapper',
      '.review-video-wrapper',
    ];

    // Create the observer
    const observer = new IntersectionObserver(entries => {
      const anyMatch = (classList, animations) => {
        for (const classItem of classList.values()) {
          if (animations.includes(classItem)) {
            return true;
          }
        }

        return false;
      }

      // We will fill in the callback later...
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // It's visible. Add the animation class here!
          if (anyMatch(entry.target.classList, leftAnimations)) {
            entry.target.classList.add('appearfromleft');
          } else if (anyMatch(entry.target.classList, rightAnimations)) {
            entry.target.classList.add('appearfromright');
          } else if (anyMatch(entry.target.classList, appearAnimations)) {
            entry.target.classList.add('appear');
          }
        }
      });
    });


    const ifExistsTrackWithObserve = (className, observer) => {
      if (document.querySelector(className)) {
        observer.observe(document.querySelector(className));
      }
    }

    // Tell the observer which elements to track
    CLASSES_TO_TRACK.map(className => {
      ifExistsTrackWithObserve(className, observer);
    });
  });
})();
