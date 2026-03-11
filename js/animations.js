/* =========================
INITIALIZE ANIMATIONS
========================= */

function initAnimations(){

initMetricHover()
initSectionReveal()
initCounters()
initHeroAnimation()

}



/* =========================
METRIC BUTTON INTERACTION
========================= */

function initMetricHover(){

const metrics = document.querySelectorAll(".metric-card")

metrics.forEach(card => {

card.addEventListener("mouseenter", () => {

card.classList.add("metric-active")

})

card.addEventListener("mouseleave", () => {

card.classList.remove("metric-active")

})

})

}



/* =========================
SCROLL REVEAL ANIMATION
========================= */

function initSectionReveal(){

const sections = document.querySelectorAll(".section")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("visible")

}

})

},{
threshold:0.2
})

sections.forEach(section => observer.observe(section))

}



/* =========================
COUNTER ANIMATION
========================= */

function initCounters(){

const counters = document.querySelectorAll(".metric-number")

counters.forEach(counter => {

const target = parseInt(counter.getAttribute("data-target"))

let count = 0

const increment = target / 60

function update(){

count += increment

if(count < target){

counter.innerText = Math.floor(count)

requestAnimationFrame(update)

}else{

counter.innerText = target + "+"

}

}

update()

})

}



/* =========================
HERO TEXT ANIMATION
========================= */

function initHeroAnimation(){

const heroName = document.getElementById("heroName")
const heroTitle = document.getElementById("heroTitle")
const heroTagline = document.getElementById("heroTagline")

if(heroName) heroName.classList.add("hero-slide")
if(heroTitle) heroTitle.classList.add("hero-slide-delay")
if(heroTagline) heroTagline.classList.add("hero-slide-delay2")

}



/* =========================
RUN AFTER LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {

setTimeout(() => {

initAnimations()

},400)

})