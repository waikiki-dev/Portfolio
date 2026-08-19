/* =====================================================
   WAIKIKI DEV - ACE
   PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTS
  ===================================================== */

  const body = document.body;

  const themeButton =
    document.getElementById("themeBtn");

  const menuButton =
    document.getElementById("menuBtn");

  const navLinks =
    document.querySelector(".nav-links");

  const header =
    document.querySelector(".site-header");

  const projectImage =
    document.getElementById("waikikiProjectImage");


  /* =====================================================
     PROJECT SCREENSHOTS
  ===================================================== */

  const lightProjectImage =
    "assets/waikiki-market-light.jpg";

  const darkProjectImage =
    "assets/waikiki-market-dark.jpg";


  /* =====================================================
     PROJECT SCREENSHOT UPDATE
  ===================================================== */

  function updateProjectScreenshot() {

    if (!projectImage) {
      return;
    }

    const isDark =
      body.classList.contains("dark");

    const newImage =
      isDark
        ? darkProjectImage
        : lightProjectImage;

    const newAlt =
      isDark
        ? "Waikiki Market dark mode screenshot"
        : "Waikiki Market light mode screenshot";


    /* Avoid unnecessary image reload */

    if (
      projectImage.getAttribute("src") ===
      newImage
    ) {
      projectImage.alt = newAlt;
      return;
    }


    /* Fade image out */

    projectImage.classList.add(
      "image-changing"
    );


    setTimeout(() => {

      projectImage.src = newImage;
      projectImage.alt = newAlt;


      projectImage.onload = () => {

        projectImage.classList.remove(
          "image-changing"
        );

      };


    }, 150);

  }


  /* =====================================================
     THEME
  ===================================================== */

  const savedTheme =
    localStorage.getItem(
      "waikiki-portfolio-theme"
    );


  /*
     Restore saved theme
  */

  if (savedTheme === "dark") {

    body.classList.add("dark");

  } else if (savedTheme === "light") {

    body.classList.remove("dark");

  }


  /* =====================================================
     THEME BUTTON
  ===================================================== */

  function updateThemeButton() {

    if (!themeButton) {
      return;
    }

    const isDark =
      body.classList.contains("dark");


    themeButton.textContent =
      isDark
        ? "☀️"
        : "🌙";


    themeButton.setAttribute(
      "aria-label",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    themeButton.setAttribute(
      "title",
      isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
    );


    themeButton.setAttribute(
      "aria-pressed",
      isDark
        ? "true"
        : "false"
    );

  }


  /* Initial state */

  updateThemeButton();
  updateProjectScreenshot();


  /* =====================================================
     THEME TOGGLE
  ===================================================== */

  if (themeButton) {

    themeButton.addEventListener(
      "click",
      () => {

        const willBeDark =
          !body.classList.contains("dark");


        /*
          Small transition state
        */

        body.classList.add(
          "theme-changing"
        );


        body.classList.toggle(
          "dark",
          willBeDark
        );


        localStorage.setItem(
          "waikiki-portfolio-theme",
          willBeDark
            ? "dark"
            : "light"
        );


        updateThemeButton();


        /*
          Update project screenshot
        */

        updateProjectScreenshot();


        /*
          Remove transition helper
        */

        setTimeout(() => {

          body.classList.remove(
            "theme-changing"
          );

        }, 350);

      }
    );

  }


  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  function closeMobileMenu() {

    if (!navLinks || !menuButton) {
      return;
    }


    navLinks.classList.remove(
      "active"
    );


    menuButton.classList.remove(
      "active"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );


    body.classList.remove(
      "menu-open"
    );

  }


  function openMobileMenu() {

    if (!navLinks || !menuButton) {
      return;
    }


    navLinks.classList.add(
      "active"
    );


    menuButton.classList.add(
      "active"
    );


    menuButton.setAttribute(
      "aria-expanded",
      "true"
    );


    body.classList.add(
      "menu-open"
    );

  }


  if (menuButton && navLinks) {

    menuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          navLinks.classList.contains(
            "active"
          );


        if (isOpen) {

          closeMobileMenu();

        } else {

          openMobileMenu();

        }

      }
    );


    /*
      Close menu when navigation
      link is clicked
    */

    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            closeMobileMenu();

          }
        );

      });

  }


  /* =====================================================
     CLOSE MENU ON RESIZE
  ===================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 800
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeMobileMenu();

      }

    }
  );


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {
            return;
          }


          event.preventDefault();


          /*
            Account for fixed header
          */

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            15;


          window.scrollTo({

            top:
              Math.max(
                0,
                targetPosition
              ),

            behavior:
              "smooth"

          });

        }
      );

    });


  /* =====================================================
     ACTIVE NAVIGATION
  ===================================================== */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  const navigationLinks =
    document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );


  function updateActiveNavigation() {

    if (!sections.length) {
      return;
    }


    let currentSection = "";


    const scrollPosition =
      window.scrollY +
      (header
        ? header.offsetHeight
        : 72) +
      80;


    sections.forEach(
      section => {

        const sectionTop =
          section.offsetTop;

        const sectionBottom =
          sectionTop +
          section.offsetHeight;


        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionBottom
        ) {

          currentSection =
            section.getAttribute(
              "id"
            );

        }

      }
    );


    navigationLinks.forEach(
      link => {

        const href =
          link.getAttribute(
            "href"
          );


        link.classList.toggle(
          "active",
          href ===
            `#${currentSection}`
        );

      }
    );

  }


  window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
      passive: true
    }
  );


  window.addEventListener(
    "resize",
    updateActiveNavigation
  );


  updateActiveNavigation();


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      `
      .project-card,
      .skill-card,
      .workflow-item,
      .stat-card,
      .about-text,
      .section-heading,
      .contact-card
      `
    );


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );


                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      (element, index) => {

        /*
          Add reveal class only if
          element does not already
          have it.
        */

        element.classList.add(
          "reveal"
        );


        /*
          Small stagger effect
        */

        element.style.setProperty(
          "--reveal-delay",
          `${Math.min(
            index * 45,
            300
          )}ms`
        );


        revealObserver.observe(
          element
        );

      }
    );

  } else {

    revealElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =====================================================
     HEADER SCROLL EFFECT
  ===================================================== */

  function updateHeader() {

    if (!header) {
      return;
    }


    if (
      window.scrollY > 30
    ) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  updateHeader();


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  const yearElements =
    document.querySelectorAll(
      "[data-current-year]"
    );


  const currentYear =
    new Date().getFullYear();


  yearElements.forEach(
    element => {

      element.textContent =
        currentYear;

    }
  );


  /* =====================================================
     BACK TO TOP
  ===================================================== */

  const backToTop =
    document.querySelector(
      ".back-to-top"
    );


  if (backToTop) {

    function updateBackToTop() {

      const shouldShow =
        window.scrollY > 500;


      backToTop.classList.toggle(
        "show",
        shouldShow
      );

    }


    window.addEventListener(
      "scroll",
      updateBackToTop,
      {
        passive: true
      }
    );


    backToTop.addEventListener(
      "click",
      event => {

        event.preventDefault();


        window.scrollTo({

          top: 0,

          behavior:
            "smooth"

        });

      }
    );


    updateBackToTop();

  }


  /* =====================================================
     IMAGE ERROR HANDLING
  ===================================================== */

  if (projectImage) {

    projectImage.addEventListener(
      "error",
      () => {

        projectImage.classList.remove(
          "image-changing"
        );


        console.warn(
          "⚠️ Waikiki Market screenshot could not be loaded:",
          projectImage.src
        );

      }
    );

  }


  /* =====================================================
     REDUCED MOTION
  ===================================================== */

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );


  function handleReducedMotion() {

    if (
      prefersReducedMotion.matches
    ) {

      body.classList.add(
        "reduce-motion"
      );

    } else {

      body.classList.remove(
        "reduce-motion"
      );

    }

  }


  handleReducedMotion();


  if (
    prefersReducedMotion.addEventListener
  ) {

    prefersReducedMotion.addEventListener(
      "change",
      handleReducedMotion
    );

  }


  /* =====================================================
     INITIAL PAGE STATE
  ===================================================== */

  requestAnimationFrame(() => {

    body.classList.add(
      "page-loaded"
    );

  });


  /* =====================================================
     CONSOLE
  ===================================================== */

  console.log(
    "🚀 Waikiki Dev - Ace Portfolio loaded successfully."
  );


  console.log(
    "🖼️ Waikiki Market light/dark screenshots enabled."
  );

});
