/* =========================
INITIALIZE VISUAL EFFECTS
========================= */

function initVisualEffects(){

createNetworkBackground()
createPipelineFlow()

}



/* =========================
DEVOPS NETWORK NODES
========================= */

function createNetworkBackground(){

const canvas = document.createElement("canvas")

canvas.style.position="fixed"
canvas.style.top="0"
canvas.style.left="0"
canvas.style.width="100%"
canvas.style.height="100%"
canvas.style.pointerEvents="none"
canvas.style.zIndex="-1"

document.body.appendChild(canvas)

const ctx = canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let nodes=[]

for(let i=0;i<35;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*0.2,
vy:(Math.random()-0.5)*0.2

})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

nodes.forEach(n=>{

n.x+=n.vx
n.y+=n.vy

if(n.x<0||n.x>canvas.width) n.vx*=-1
if(n.y<0||n.y>canvas.height) n.vy*=-1

ctx.fillStyle="rgba(34,211,238,0.35)"

ctx.beginPath()
ctx.arc(n.x,n.y,2,0,Math.PI*2)
ctx.fill()

nodes.forEach(o=>{

let dx=n.x-o.x
let dy=n.y-o.y

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.strokeStyle="rgba(34,211,238,0.07)"

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



/* =========================
DEVOPS PIPELINE FLOW
========================= */

function createPipelineFlow(){

const canvas=document.createElement("canvas")

canvas.style.position="fixed"
canvas.style.top="0"
canvas.style.left="0"
canvas.style.width="100%"
canvas.style.height="100%"
canvas.style.pointerEvents="none"
canvas.style.zIndex="-2"

document.body.appendChild(canvas)

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let flows=[]

for(let i=0;i<20;i++){

flows.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*1.5+0.5

})

}

function animateFlow(){

ctx.clearRect(0,0,canvas.width,canvas.height)

flows.forEach(f=>{

ctx.strokeStyle="rgba(34,211,238,0.08)"

ctx.beginPath()
ctx.moveTo(f.x,f.y)
ctx.lineTo(f.x+40,f.y)

ctx.stroke()

f.x+=f.speed

if(f.x>canvas.width) f.x=0

})

requestAnimationFrame(animateFlow)

}

animateFlow()

}



/* =========================
START VISUALS
========================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

initVisualEffects()

},400)

})