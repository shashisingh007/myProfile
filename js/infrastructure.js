/* =========================
INFRASTRUCTURE MAP
========================= */

function renderInfrastructure(){

const container = document.getElementById("infraMap")

if(!container) return


const nodes = [

"User Traffic",
"AWS Load Balancer",
"Kubernetes Cluster",
"Microservices Pods",
"Redis / Databases"

]


container.innerHTML=""


nodes.forEach((node,index)=>{

const card = document.createElement("div")

card.className="infra-node"

card.innerText=node

container.appendChild(card)


if(index !== nodes.length-1){

const line = document.createElement("div")

line.className="infra-line"

container.appendChild(line)

}

})

}



/* =========================
INITIALIZE
========================= */

document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

renderInfrastructure()

},400)

})