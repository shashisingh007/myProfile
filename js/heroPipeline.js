/* =========================================
HERO DEVOPS PIPELINE VISUAL
========================================= */

function initHeroPipeline(){

const container = document.querySelector(".hero-pipeline-bg")

if(!container) return

const canvas = document.createElement("canvas")
container.appendChild(canvas)

const ctx = canvas.getContext("2d")

function resizeCanvas(){

canvas.width = container.offsetWidth
canvas.height = container.offsetHeight

}

resizeCanvas()
window.addEventListener("resize", resizeCanvas)



/* =========================================
PIPELINE NODES
========================================= */

let nodes = []

for(let i=0;i<40;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.6,
vy:(Math.random()-0.5)*0.6,
size:Math.random()*2+1

})

}



/* =========================================
ANIMATION LOOP
========================================= */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)



nodes.forEach(n=>{

n.x += n.vx
n.y += n.vy

if(n.x<0 || n.x>canvas.width) n.vx*=-1
if(n.y<0 || n.y>canvas.height) n.vy*=-1



/* NODE */

ctx.fillStyle="rgba(34,211,238,0.9)"

ctx.beginPath()
ctx.arc(n.x,n.y,n.size,0,Math.PI*2)
ctx.fill()



/* CONNECTIONS */

nodes.forEach(o=>{

let dx = n.x-o.x
let dy = n.y-o.y

let dist = Math.sqrt(dx*dx + dy*dy)

if(dist < 120){

ctx.strokeStyle="rgba(34,211,238,0.15)"

ctx.beginPath()
ctx.moveTo(n.x,n.y)
ctx.lineTo(o.x,o.y)
ctx.stroke()

}

})

})

requestAnimationFrame(animate)

}

animate()

}



/* =========================================
INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

initHeroPipeline()

},300)

})