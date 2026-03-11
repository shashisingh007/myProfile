/* =========================
APP INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

loadComponents()

initializeApp()

})



/* =========================
LOAD HEADER + FOOTER
========================= */

async function loadComponents(){

try{

const headerResponse = await fetch("components/header.html")
const headerHTML = await headerResponse.text()

document.getElementById("header").innerHTML = headerHTML


const footerResponse = await fetch("components/footer.html")
const footerHTML = await footerResponse.text()

document.getElementById("footer").innerHTML = footerHTML

}catch(error){

console.error("Error loading components:", error)

}

}



/* =========================
INITIALIZE APPLICATION
========================= */

function initializeApp(){

if(typeof loadPortfolioData === "function"){
loadPortfolioData()
}

if(typeof initAnimations === "function"){
initAnimations()
}

if(typeof initVisualEffects === "function"){
initVisualEffects()
}

}