/* =========================
HERO PIPELINE VISUAL
========================= */

function initHeroPipeline(){

const container = document.querySelector(".hero-pipeline-bg")
if(!container) return

const canvas = document.createElement("canvas")
container.appendChild(canvas)

const ctx = canvas.getContext("2d")

canvas.width = container.offsetWidth
canvas.height = container.offsetHeight

let particles = []

for(let i=0;i<25;i++){
particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
speed:Math.random()*1+0.5
})
}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

ctx.strokeStyle="rgba(34,211,238,0.4)"

ctx.beginPath()
ctx.moveTo(p.x,p.y)
ctx.lineTo(p.x+30,p.y)
ctx.stroke()

p.x += p.speed

if(p.x > canvas.width){
p.x = 0
p.y = Math.random()*canvas.height
}

})

requestAnimationFrame(animate)

}

animate()

}

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

initHeroPipeline()

},300)

})