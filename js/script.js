/* =====================================================
   WAIKIKI DEV - ACE
   PORTFOLIO JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     DARK MODE
  ===================================================== */

  const themeButton =
    document.getElementById("themeBtn");

  const savedTheme =
    localStorage.getItem("waikiki-portfolio-theme");

  if (savedTheme === "dark") {

    document.body.classList.add("dark");

  }

  function updateThemeButton() {

    if (!themeButton) {
      return;
    }

    const isDark =
      document.body.classList.contains("dark");

    themeButton.textContent =
      isDark ? "☀️" : "🌙";

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

  }

  updateThemeButton();

  if (themeButton) {

    themeButton.addEventListener(
      "click",
      () => {

        document.body.classList.toggle("dark");

        const isDark =
          document.body.classList.contains("dark");

        localStorage.setItem(
          "waikiki-portfolio-theme",
          isDark
            ? "dark"
            : "light"
        );

        updateThemeButton();

      }
    );

  }


  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const menuButton =
    document.querySelector(".menu-btn");

  const navLinks =
    document.querySelector(".nav-links");

  if (menuButton && navLinks) {

    menuButton.addEventListener(
      "click",
      () => {

        navLinks.classList.toggle("active");

        menuButton.classList.toggle("active");

      }
    );

    navLinks
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          () => {

            navLinks.classList.remove(
              "active"
            );

            menuButton.classList.remove(
              "active"
            );

          }
        );

      });

  }


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
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

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
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

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 150;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });

    navigationLinks.forEach(link => {

      link.classList.remove(
        "active"
      );

      if (
        link.getAttribute("href") ===
        `#${currentSection}`
      ) {

        link.classList.add(
          "active"
        );

      }

    });

  }

  window.addEventListener(
    "scroll",
    updateActiveNavigation
  );

  updateActiveNavigation();


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".reveal, .project-card, .skill-card, .about-content"
    );

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

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

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(
      element => {

        element.classList.add(
          "reveal"
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

  const header =
    document.querySelector("header");

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 30) {

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
    updateHeader
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

      if (window.scrollY > 500) {

        backToTop.classList.add(
          "show"
        );

      } else {

        backToTop.classList.remove(
          "show"
        );

      }

    }

    window.addEventListener(
      "scroll",
      updateBackToTop
    );

    backToTop.addEventListener(
      "click",
      event => {

        event.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

    updateBackToTop();

  }


  /* =====================================================
     CONSOLE MESSAGE
  ===================================================== */

  console.log(
    "🚀 Waikiki Dev - Ace Portfolio loaded successfully."
  );

});
