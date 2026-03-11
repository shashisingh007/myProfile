/* =========================
ARCHITECTURE VIEWER
========================= */

function initArchitectureViewer(){

const images = document.querySelectorAll(".architecture-card img")

const viewer = document.createElement("div")

viewer.className="arch-viewer"

const viewerImg = document.createElement("img")

viewer.appendChild(viewerImg)

document.body.appendChild(viewer)



images.forEach(img => {

img.addEventListener("click",()=>{

viewer.classList.add("active")

viewerImg.src = img.src

})

})



viewer.addEventListener("click",()=>{

viewer.classList.remove("active")

})



document.addEventListener("keydown", e=>{

if(e.key==="Escape"){

viewer.classList.remove("active")

}

})

}



/* =========================
INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

initArchitectureViewer()

},400)

})