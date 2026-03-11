/* =========================================
INFRASTRUCTURE FLOW DIAGRAM
========================================= */

function renderInfrastructure(){

const container = document.getElementById("infraMap")

if(!container) return

const nodes = [

{
name:"Users",
icon:"🌐"
},

{
name:"CDN / Edge",
icon:"⚡"
},

{
name:"AWS Load Balancer",
icon:"☁️"
},

{
name:"Kubernetes Cluster",
icon:"☸️"
},

{
name:"Microservices",
icon:"📦"
},

{
name:"Databases",
icon:"🗄️"
},

{
name:"Monitoring",
icon:"📊"
}

]

container.innerHTML=""

nodes.forEach((node,index)=>{

const nodeCard = document.createElement("div")

nodeCard.className="infra-node"

nodeCard.innerHTML = `
<div class="infra-icon">${node.icon}</div>
<div class="infra-label">${node.name}</div>
`

container.appendChild(nodeCard)


if(index !== nodes.length-1){

const arrow = document.createElement("div")

arrow.className="infra-arrow"

arrow.innerHTML="➜"

container.appendChild(arrow)

}

})

}

/* =========================================
INITIALIZE
========================================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

renderInfrastructure()

},400)

})