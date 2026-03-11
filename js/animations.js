/* =========================
INITIALIZE ANIMATIONS
========================= */

function initAnimations(){

initMetricHover()
initSectionReveal()

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
SCROLL REVEAL
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
RUN AFTER LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {

setTimeout(() => {

initAnimations()

},400)

})