// adapted from Scott Draper and https://codepen.io/Splode/pen/xdoOBB

// scroll start
let scrollState = 0;

// navbar classes
const navClasses = document.querySelector("nav").classList;

// function to run upon scroll
function scrollDetect(down, up) {
    // current scroll position
    let currentScroll = window.scrollY;
    // show the navbar at page top or on up scroll
    if (window.scrollY === 0 || currentScroll < scrollState) {
        up();
        // hide navbar if scrolling down
    } else {
        down();
    }
    // set previous scroll position
    scrollState = window.scrollY
}

// toggle classes based on scroll action
function downAction() {
    navClasses.remove('open');
    navClasses.add('collapse');
}

function upAction() {
    navClasses.remove('collapse');
    navClasses.add('open');
}

window.addEventListener("scroll", function () {
    scrollDetect(downAction, upAction);
});

console.log(scrollState)
console.log(navClasses)
