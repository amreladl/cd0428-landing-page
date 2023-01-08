/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const allSections = document.querySelectorAll('section');
const navBar = document.querySelector('ul#navbar__list');
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
* @description Goes to top of the page smoothly
*/
function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
* @description Hides navigation bar while not scrolling
*/
function hideNavBar(){
    navBar.style.display = '' 
    setTimeout(function hide() {
        navBar.style.display = 'none';
    }, 5000);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
* @description Builds navigation menu base on the number of sections and add anchor to each item
* @param {object} section - Section present on html
*/
function buildNavMenu(section) {
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.setAttribute('href', `#${section.id}`);
    anchor.setAttribute('id', `${section.id}_anchor`);
    anchor.className = 'menu__link'
    anchor.textContent = section.querySelector('h2').textContent;
    scrollToSmoothly(anchor,section)
    li.appendChild(anchor);
    fragment.appendChild(li);
}

/**
* @description Adds class 'active' to section and section anchor when section is near top of viewport
*/
function makeActive(){
    for (let section of allSections) {
        const box = section.getBoundingClientRect();
        const secAnchor = document.getElementById(`${section.id}_anchor`);
        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add('your-active-class')
            secAnchor.classList.add('menu__active')
        } else {
            section.classList.remove('your-active-class')
            secAnchor.classList.remove('menu__active')
        }
    }
    hideNavBar();
}

/**
* @description Deactivates default behaviour when anchor is clicked and replaces it with smooth scrollIntoView
* @param {object} anchor - Anchor in the navigation menu item
* @param {object} section - Section present on html
*/

function scrollToSmoothly(anchor, section) {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        section.scrollIntoView({behavior: "smooth"});
    });  
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
allSections.forEach(buildNavMenu);
navBar.appendChild(fragment);

// Set sections as active
document.addEventListener("scroll", makeActive);