// Jab poora page load ho jaye tab yeh event chalega
window.addEventListener("load", () => {
    // Main content ko visible karne ke liye hidden class hata do
    document.querySelector(".main").classList.remove("hidden");
    // Home section ko active section banao
    document.querySelector(".home-section").classList.add("active");
    // Page loader ko fade-out animation dene ke liye
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
        // Jab fade-out animation complete ho jaye tab loader ko remove karo
        document.querySelector(".page-loader").style.display = "none";
    }, 600); // 600ms ka delay rakha hai fade-out ke liye
});

// Navbar toggle karne ke liye jab nav-toggler pe click ho
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
    hideSection(); // Jo section active hai usko fade-out karna
    toggleNavbar(); // Navbar ko show ya hide karna
    // Scroll ko disable/enable karna jab navbar toggle ho
    document.body.classList.toggle("hide-scrolling");
});

// Jo active section hai usko fade-out karna
function hideSection() {
    document.querySelector("section.active").classList.toggle("fade-out");
}

// Navbar ko toggle karne ka function
function toggleNavbar() {
    document.querySelector(".header").classList.toggle('active');
}

// Navigation link pe click karne par active section change karna
document.addEventListener("click", (e) => {
    // Check karo ki click hua element link hai aur uska hash empty nahi hai
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        // Transition ke liye overlay active karo
        document.querySelector(".overlay").classList.add("active");
        // Nav-toggler ko temporarily hide karo
        navToggler.classList.add("hide");

        if (e.target.classList.contains("nav-item")) {
            toggleNavbar(); // Navbar ko band karo agar nav-item click hua
        } else {
            hideSection(); // Current section ko fade-out karo
            document.body.classList.add("hide-scrolling"); // Scrolling ko disable karo
        }

        setTimeout(() => {
            // Jo current section active hai usko deactivate karo
            document.querySelector("section.active").classList.remove("active", "fade-out");
            // Click kiye gaye link ka section active karo
            document.querySelector(e.target.hash).classList.add("active");
            // Page ko top pe le jao
            window.scrollTo(0, 0);
            // Scroll aur UI ko normal state mein wapas le jao
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        }, 500); // 500ms ka delay rakha hai overlay ke liye
    }
});

// "About" section ke tabs ke liye logic
const tabscontainer = document.querySelector(".about-tabs"),
    aboutsection = document.querySelector(".about-section");

// Tabs container pe click event lagao
tabscontainer.addEventListener("click", (e) => {
    // Check karo ki tab item click hua aur active nahi hai
    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
        // Current active tab ko deactivate karo
        tabscontainer.querySelector(".active").classList.remove("active");
        // Click kiye gaye tab ko active karo
        e.target.classList.add("active");

        // Target content ka selector nikal lo
        const target = e.target.getAttribute("data-target");
        // Current active tab content ko deactivate karo
        aboutsection.querySelector(".tab-content.active").classList.remove("active");
        // Target tab content ko active karo
        aboutsection.querySelector(target).classList.add("active");
    }
});

// Portfolio item details ke popup ke liye logic
document.addEventListener("click", (e) => {
    // Check karo ki "View Project" button click hua
    if (e.target.classList.contains("view-project-btn")) {
        togglePortfolioPopup(); // Popup open karo
        // Popup ko top pe scroll karo
        document.querySelector(".portfolio-popup").scrollTo(0, 0);
        // Portfolio item details ko popup mein dikhana
        portfolioItemDetails(e.target.parentElement);
    }
});

// Popup ko toggle karne ka function
function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling"); // Scrolling ko disable karo
    document.querySelector(".main").classList.toggle("fade-out"); // Main content ko fade-out karo
}

// Popup ko close karna jab close button click ho
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

// Popup ko close karna agar user popup ke bahar click kare
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup(); // Popup close karo
    }
});

// Portfolio item ki details ko popup mein dikhane ka function
function portfolioItemDetails(portfolioItem) {
    // Popup thumbnail image set karo
    document.querySelector(".pp-thumbnail img").src =
        portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    // Popup header title set karo
    document.querySelector(".pp-header h3").innerHTML =
        portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    // Popup body content set karo
    document.querySelector(".pp-body").innerHTML =
        portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}
