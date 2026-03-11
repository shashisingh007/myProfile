/* =========================================
INITIALIZE NAVBAR
========================================= */

function initNavbar(){

enableSmoothScroll()
highlightActiveSection()
navbarScrollEffect()
createScrollProgress()

}

/* =========================================
SMOOTH SCROLL
========================================= */

function enableSmoothScroll(){

const links = document.querySelectorAll(".nav-menu a")

links.forEach(link => {

link.addEventListener("click", function(e){

const targetId = this.getAttribute("href")

if(targetId.startsWith("#")){

e.preventDefault()

const targetSection = document.querySelector(targetId)

if(targetSection){

window.scrollTo({

top: targetSection.offsetTop - 80,
behavior: "smooth"

})

}

}

})

})

}

/* =========================================
ACTIVE LINK HIGHLIGHT
========================================= */

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

/* =========================================
NAVBAR SCROLL EFFECT
========================================= */

function navbarScrollEffect(){

const header = document.querySelector(".header")

window.addEventListener("scroll", ()=>{

if(window.scrollY > 60){

header.style.padding = "12px 60px"
header.style.background = "rgba(2,6,23,0.95)"
header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)"

}else{

header.style.padding = "18px 60px"
header.style.background = "rgba(2,6,23,0.85)"
header.style.boxShadow = "none"

}

})

}

/* =========================================
SCROLL PROGRESS BAR
========================================= */

function createScrollProgress(){

const bar = document.createElement("div")

bar.style.position = "fixed"
bar.style.top = "0"
bar.style.left = "0"
bar.style.height = "3px"
bar.style.width = "0%"
bar.style.background = "#38bdf8"
bar.style.zIndex = "2000"

document.body.appendChild(bar)

window.addEventListener("scroll", ()=>{

const scrollTop = window.scrollY
const docHeight = document.body.scrollHeight - window.innerHeight

const progress = (scrollTop / docHeight) * 100

bar.style.width = progress + "%"

})

}

/* =========================================
RUN NAVBAR
========================================= */

document.addEventListener("DOMContentLoaded", () => {

setTimeout(() => {

initNavbar()

}, 300)

})