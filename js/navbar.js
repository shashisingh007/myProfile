/* =========================
NAVBAR INITIALIZATION
========================= */

function initNavbar(){

enableSmoothScroll()
highlightActiveSection()

}



/* =========================
SMOOTH SCROLL
========================= */

function enableSmoothScroll(){

const links = document.querySelectorAll(".nav-menu a")

links.forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault()

const targetId = this.getAttribute("href")
const targetSection = document.querySelector(targetId)

if(targetSection){

window.scrollTo({

top: targetSection.offsetTop - 80,
behavior: "smooth"

})

}

})

})

}



/* =========================
ACTIVE LINK HIGHLIGHT
========================= */

function highlightActiveSection(){

const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-menu a")

window.addEventListener("scroll", () => {

let currentSection = ""

sections.forEach(section => {

const sectionTop = section.offsetTop - 120
const sectionHeight = section.offsetHeight

if(window.scrollY >= sectionTop &&
window.scrollY < sectionTop + sectionHeight){

currentSection = section.getAttribute("id")

}

})

navLinks.forEach(link => {

link.classList.remove("active")

if(link.getAttribute("href") === "#" + currentSection){

link.classList.add("active")

}

})

})

}



/* =========================
RUN NAVBAR
========================= */

document.addEventListener("DOMContentLoaded", () => {

setTimeout(() => {

initNavbar()

}, 300)

})