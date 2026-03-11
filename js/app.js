/* =====================================================
APPLICATION BOOTSTRAP
===================================================== */

document.addEventListener("DOMContentLoaded", async () => {

await loadComponents()

startApplication()

})



/* =====================================================
LOAD HEADER + FOOTER COMPONENTS
===================================================== */

async function loadComponents(){

try{

const headerResponse = await fetch("components/header.html")
const headerHTML = await headerResponse.text()

const footerResponse = await fetch("components/footer.html")
const footerHTML = await footerResponse.text()

document.getElementById("header").innerHTML = headerHTML
document.getElementById("footer").innerHTML = footerHTML

}catch(error){

console.error("Component loading failed:", error)

}

}



/* =====================================================
START APPLICATION MODULES
===================================================== */

function startApplication(){

initializePortfolioData()

initializeAnimations()

initializeVisualSystems()

initializeNavbar()

initializeHeroSystems()

initializeInfrastructure()

}



/* =====================================================
LOAD PORTFOLIO DATA
===================================================== */

function initializePortfolioData(){

if(typeof loadPortfolioData === "function"){

loadPortfolioData()

}

}



/* =====================================================
ANIMATION SYSTEM
===================================================== */

function initializeAnimations(){

if(typeof initAnimations === "function"){

initAnimations()

}

}



/* =====================================================
BACKGROUND VISUAL SYSTEM
===================================================== */

function initializeVisualSystems(){

if(typeof initVisualEffects === "function"){

initVisualEffects()

}

}



/* =====================================================
NAVBAR SYSTEM
===================================================== */

function initializeNavbar(){

if(typeof initNavbar === "function"){

initNavbar()

}

}



/* =====================================================
HERO VISUALS
===================================================== */

function initializeHeroSystems(){

if(typeof initHeroPipeline === "function"){

initHeroPipeline()

}

}



/* =====================================================
INFRASTRUCTURE DIAGRAM
===================================================== */

function initializeInfrastructure(){

if(typeof renderInfrastructure === "function"){

renderInfrastructure()

}

}



/* =====================================================
WINDOW RESIZE HANDLER
===================================================== */

window.addEventListener("resize", () => {

if(typeof initHeroPipeline === "function"){

initHeroPipeline()

}

})