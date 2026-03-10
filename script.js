const App = {

data:null,

/* ================================
INIT
================================ */

init: async function(){

await this.loadComponents()

await this.loadData()

this.renderAll()

this.initializeAnimations()

},

/* ================================
LOAD HEADER + FOOTER
================================ */

loadComponents: async function(){

await Promise.all([

this.loadComponent("header","components/header.html"),
this.loadComponent("footer","components/footer.html")

])

},

loadComponent: async function(id,file){

try{

const res=await fetch(file)

const html=await res.text()

const el=document.getElementById(id)

if(el) el.innerHTML=html

}catch(e){

console.error("Failed loading component:",file)

}

},

/* ================================
LOAD DATA.JSON
================================ */

loadData: async function(){

try{

const res=await fetch("data.json")

this.data=await res.json()

}catch(e){

console.error("Failed loading data.json")

}

},

/* ================================
RENDER ALL
================================ */

renderAll(){

if(!this.data) return

this.renderHero()

this.renderHeader()

this.renderFooter()

this.renderMetrics()

this.renderSummary()

this.renderCompetencies()

this.renderSkills()

this.renderTools()

this.renderExperience()

this.renderProjects()

this.renderContact()

},

/* ================================
HELPERS
================================ */

setText(id,value){

const el=document.getElementById(id)

if(el) el.innerText=value

},

setHref(id,value){

const el=document.getElementById(id)

if(el) el.href=value

},

setSrc(id,value){

const el=document.getElementById(id)

if(el) el.src=value

},

stars(level){

let stars=""

for(let i=1;i<=5;i++){

stars+= i<=level ? "★":"☆"

}

return stars

},

/* ================================
HERO
================================ */

renderHero(){

const p=this.data.personal

this.setText("name",p.name)

this.setText("title",p.title)

this.setText("tagline",p.tagline)

this.setSrc("profileImage",p.profileImage)

this.setHref("downloadResume",p.resume)

this.setHref("linkedinBtn",p.linkedin)

this.setHref("githubBtn",p.github)

this.setHref("whatsappBtn",p.whatsapp)

},

/* ================================
HEADER
================================ */

renderHeader(){

const p=this.data.personal

this.setText("headerName",p.name)

this.setHref("headerLinkedin",p.linkedin)

this.setHref("headerGithub",p.github)

this.setHref("headerWhatsapp",p.whatsapp)

this.setHref("headerEmail","mailto:"+p.email)

this.setText("headerPhone",p.phone)

this.setText("headerLocation",p.location)

},

/* ================================
FOOTER
================================ */

renderFooter(){

const p=this.data.personal

this.setText("footerName",p.name)

this.setText("footerNameBottom",p.name)

this.setHref("footerLinkedin",p.linkedin)

this.setHref("footerGithub",p.github)

this.setHref("footerWhatsapp",p.whatsapp)

this.setHref("footerEmail","mailto:"+p.email)

this.setText("footerEmailText",p.email)

this.setText("footerPhone",p.phone)

},

/* ================================
METRICS
================================ */

renderMetrics(){

const container=document.querySelector(".metrics-container")

if(!container) return

container.innerHTML=this.data.metrics.map(m=>`

<div class="metric">

<h3 class="metric-number" data-value="${m.value.replace('+','')}">0</h3>

<p>${m.label}</p>

</div>

`).join("")

},

/* ================================
SUMMARY
================================ */

renderSummary(){

this.setText("summaryText",this.data.summary)

},

/* ================================
COMPETENCIES
================================ */

renderCompetencies(){

const container=document.getElementById("competenciesContainer")

if(!container) return

container.innerHTML=this.data.coreCompetencies

.map(c=>`<span class="competency">${c}</span>`)

.join("")

},

/* ================================
SKILLS
================================ */

renderSkills(){

const container=document.getElementById("skillsContainer")

if(!container) return

let html=""

for(const category in this.data.skills){

html+=`<div class="skill-card"><h3>${category}</h3>`

this.data.skills[category].forEach(skill=>{

html+=`

<div class="skill">

<span>${skill.name}</span>

<span class="skill-stars">${this.stars(skill.level)}</span>

</div>

`

})

html+=`</div>`

}

container.innerHTML=html

},

/* ================================
TOOLS
================================ */

renderTools(){

const container=document.getElementById("toolsContainer")

if(!container) return

let tools=[]

for(const cat in this.data.skills){

this.data.skills[cat].forEach(s=>tools.push(s.name))

}

tools=[...new Set(tools)]

container.innerHTML=tools.map(t=>{

const icon=t.toLowerCase().replace(/\s/g,"-")

return`

<div class="tool-card">

<img
src="assets/tools/${icon}.png"
alt="${t}"
onerror="this.src='assets/tools/default.png'"

>

<span>${t}</span>

</div>

`

}).join("")

},

/* ================================
EXPERIENCE
================================ */

renderExperience(){

const container=document.getElementById("experienceContainer")

if(!container) return

container.innerHTML=this.data.experience.map(job=>`

<div class="experience-card">

<h3>${job.role}</h3>

<h4>${job.company}</h4>

<p class="duration">${job.duration}</p>

<ul>

${job.responsibilities.map(r=>`<li>${r}</li>`).join("")}

</ul>

</div>

`).join("")

},

/* ================================
PROJECTS
================================ */

renderProjects(){

const container=document.getElementById("projectsContainer")

if(!container) return

container.innerHTML=this.data.projects.map(p=>`

<div class="project-card">

<h3>${p.name}</h3>

<p>${p.description}</p>

<div class="tech">

${p.technologies.map(t=>`<span class="tech-badge">${t}</span>`).join("")}

</div>

</div>

`).join("")

},

/* ================================
CONTACT
================================ */

renderContact(){

const p=this.data.personal

this.setHref("contactEmailBtn","mailto:"+p.email)

this.setHref("contactLinkedinBtn",p.linkedin)

this.setHref("contactGithubBtn",p.github)

},

/* ================================
ANIMATIONS
================================ */

initializeAnimations(){

this.animateMetrics()

this.initialize3DHovers()

},

animateMetrics(){

const counters=document.querySelectorAll(".metric-number")

counters.forEach(counter=>{

const target=+counter.dataset.value

let count=0

const update=()=>{

count+=Math.ceil(target/80)

if(count<target){

counter.innerText=count

requestAnimationFrame(update)

}else{

counter.innerText=target

}

}

update()

})

},

initialize3DHovers(){

document.querySelectorAll(".tool-card,.project-card,.experience-card")

.forEach(card=>{

card.addEventListener("mousemove",e=>{

const rect=card.getBoundingClientRect()

const x=e.clientX-rect.left

const y=e.clientY-rect.top

card.style.transform=`rotateX(${-(y-rect.height/2)/10}deg)
rotateY(${(x-rect.width/2)/10}deg)
scale(1.05)`

})

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"

})

})

}

}

/* ================================
START APP
================================ */

document.addEventListener("DOMContentLoaded",()=>{

App.init()

})
