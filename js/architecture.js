/* =========================================
ARCHITECTURE VIEWER
========================================= */

function initArchitectureViewer(){

const images = document.querySelectorAll(".architecture-card img")

if(images.length === 0) return

let currentIndex = 0


/* =========================================
CREATE VIEWER
========================================= */

const viewer = document.createElement("div")
viewer.className="arch-viewer"

const viewerImg = document.createElement("img")
viewerImg.className="arch-image"

const closeBtn = document.createElement("div")
closeBtn.className="arch-close"
closeBtn.innerHTML="✕"

const nextBtn = document.createElement("div")
nextBtn.className="arch-next"
nextBtn.innerHTML="›"

const prevBtn = document.createElement("div")
prevBtn.className="arch-prev"
prevBtn.innerHTML="‹"

viewer.appendChild(viewerImg)
viewer.appendChild(closeBtn)
viewer.appendChild(nextBtn)
viewer.appendChild(prevBtn)

document.body.appendChild(viewer)



/* =========================================
OPEN VIEWER
========================================= */

function openViewer(index){

currentIndex = index

viewerImg.src = images[index].src

viewer.classList.add("active")

}



/* =========================================
NEXT / PREVIOUS
========================================= */

function showNext(){

currentIndex++

if(currentIndex >= images.length){

currentIndex = 0

}

viewerImg.src = images[currentIndex].src

}

function showPrev(){

currentIndex--

if(currentIndex < 0){

currentIndex = images.length - 1

}

viewerImg.src = images[currentIndex].src

}



/* =========================================
IMAGE CLICK
========================================= */

images.forEach((img,index)=>{

img.addEventListener("click",()=>{

openViewer(index)

})

})



/* =========================================
BUTTON EVENTS
========================================= */

nextBtn.addEventListener("click",showNext)

prevBtn.addEventListener("click",showPrev)

closeBtn.addEventListener("click",()=>{

viewer.classList.remove("active")

})



/* =========================================
BACKGROUND CLICK CLOSE
========================================= */

viewer.addEventListener("click",(e)=>{

if(e.target === viewer){

viewer.classList.remove("active")

}

})



/* =========================================
KEYBOARD CONTROL
========================================= */

document.addEventListener("keydown", e=>{

if(!viewer.classList.contains("active")) return

if(e.key === "Escape") viewer.classList.remove("active")

if(e.key === "ArrowRight") showNext()

if(e.key === "ArrowLeft") showPrev()

})

}



/* =========================================
INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

initArchitectureViewer()

},400)

})